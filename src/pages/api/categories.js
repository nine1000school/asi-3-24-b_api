import mw from "@/api/mw"

const handle = mw({
  POST: [
    async ({
      db,
      req: {
        body: { name },
      },
      res,
    }) => {
      const [category] = await db("categories").insert({ name }).returning("*")

      res.send(category)
    },
  ],
  GET: [async ({ res, db }) => res.send(await db("categories"))],
})

export default handle
