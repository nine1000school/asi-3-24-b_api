import { HTTP_ERRORS } from "@/api/constants"
import mw from "@/api/mw"

const handle = mw({
  GET: [
    async ({
      models: { TodoModel },
      req: {
        query: { todoId },
      },
      res,
    }) => {
      const todo = await TodoModel.query().findById(todoId)

      if (!todo) {
        res.status(HTTP_ERRORS.NOT_FOUND).send({ error: "Not found" })

        return
      }

      res.send(todo)
    },
  ],
  PATCH: [
    async ({
      models: { TodoModel },
      req: {
        body,
        query: { todoId },
      },
      res,
    }) => {
      const todo = await TodoModel.query().findById(todoId)

      if (!todo) {
        res.status(HTTP_ERRORS.NOT_FOUND).send({ error: "Not found" })

        return
      }

      const updatedTodo = await TodoModel.query().updateAndFetchById(
        todoId,
        body,
      )

      res.send(updatedTodo)
    },
  ],
  DELETE: [
    async ({
      models: { TodoModel },
      req: {
        query: { todoId },
      },
      res,
    }) => {
      const todo = await TodoModel.query().findById(todoId)

      if (!todo) {
        res.status(HTTP_ERRORS.NOT_FOUND).send({ error: "Not found" })

        return
      }

      await TodoModel.query().deleteById(todoId)

      res.send(todo)
    },
  ],
})

export default handle
