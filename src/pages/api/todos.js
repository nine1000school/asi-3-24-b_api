import { validate } from "@/api/middlewares/validate"
import mw from "@/api/mw"
import {
  descriptionValidator,
  idValidator,
  statusValidator,
} from "@/utils/validators"

const handle = mw({
  POST: [
    validate({
      body: {
        description: descriptionValidator,
        categoryId: idValidator,
        isDone: statusValidator.optional(),
      },
    }),
    async ({
      models: { TodoModel },
      input: {
        body: { description, categoryId, isDone },
      },
      res,
    }) => {
      const todo = await TodoModel.query()
        .insertAndFetch({
          description,
          categoryId,
          isDone,
        })
        .withGraphFetched("category")

      res.send(todo)
    },
  ],
  GET: [
    async ({ res, models: { TodoModel } }) => {
      const todos = await TodoModel.query().withGraphFetched("category")

      res.send(todos)
    },
  ],
})

export default handle
