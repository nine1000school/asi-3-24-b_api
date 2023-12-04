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
      const todo = await TodoModel.query().findById(todoId).throwIfNotFound()

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
      const updatedTodo = await TodoModel.query()
        .updateAndFetchById(todoId, body)
        .throwIfNotFound()

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
      const todo = await TodoModel.query().findById(todoId).throwIfNotFound()

      await todo.$query().delete()

      res.send(todo)
    },
  ],
})

export default handle
