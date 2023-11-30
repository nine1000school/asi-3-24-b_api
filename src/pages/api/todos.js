import mw from "@/api/mw"

const handle = mw({
  POST: [
    async ({
      db,
      req: {
        body: { description, categoryId },
      },
      res,
    }) => {
      const [todo] = await db("todos")
        .insert({ description, categoryId })
        .returning("*")

      res.send(todo)
    },
  ],
  GET: [async ({ res, db }) => res.send(await db("todos"))],
})

export default handle
