import { validate } from "@/api/middlewares/validate"
import mw from "@/api/mw"
import {
  descriptionValidator,
  idValidator,
  statusValidator,
} from "@/utils/validators"

const handle = mw({
  GET: [
    validate({
      query: {
        todoId: idValidator,
      },
    }),
    async ({
      models: { TodoModel },
      input: {
        query: { todoId },
      },
      res,
    }) => {
      const todo = await TodoModel.query().findById(todoId).throwIfNotFound()

      res.send(todo)
    },
  ],
  PATCH: [
    validate({
      query: {
        todoId: idValidator,
      },
      body: {
        description: descriptionValidator.optional(),
        categoryId: idValidator.optional(),
        isDone: statusValidator.optional(),
      },
    }),
    async ({
      models: { TodoModel },
      input: {
        body,
        query: { todoId },
      },
      res,
    }) => {
      const updatedTodo = await TodoModel.query()
        .updateAndFetchById(todoId, body)
        .withGraphFetched("category")
        .throwIfNotFound()

      res.send(updatedTodo)
    },
  ],
  DELETE: [
    validate({
      query: {
        todoId: idValidator,
      },
    }),
    async ({
      models: { TodoModel },
      input: {
        query: { todoId },
      },
      res,
    }) => {
      const todo = await TodoModel.query().findById(todoId).throwIfNotFound()

      await todo.$query().delete()

      res.send(todo)
    },
  ],
})

export default handle
