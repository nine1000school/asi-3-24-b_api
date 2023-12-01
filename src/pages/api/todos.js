import mw from "@/api/mw"

const handle = mw({
  POST: [
    async ({
      models: { TodoModel },
      req: {
        body: { description, categoryId },
      },
      res,
    }) => {
      const todo = await TodoModel.query()
        .insertAndFetch({
          description,
          categoryId,
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
