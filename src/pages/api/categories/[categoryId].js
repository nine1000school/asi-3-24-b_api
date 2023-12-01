import { HTTP_ERRORS } from "@/api/constants"
import mw from "@/api/mw"

const handle = mw({
  GET: [
    async ({
      db,
      req: {
        query: { categoryId },
      },
      res,
    }) => {
      const [category] = await db("categories").where({ id: categoryId })

      if (!category) {
        res.status(HTTP_ERRORS.NOT_FOUND).send({ error: "Not found" })

        return
      }

      res.send(category)
    },
  ],
  PATCH: [
    async ({
      db,
      req: {
        body,
        query: { categoryId },
      },
      res,
    }) => {
      const [category] = await db("categories").where({ id: categoryId })

      if (!category) {
        res.status(HTTP_ERRORS.NOT_FOUND).send({ error: "Not found" })

        return
      }

      const [updatedCategory] = await db("categories")
        .update(body)
        .where({ id: categoryId })
        .returning("*")

      res.send(updatedCategory)
    },
  ],
  DELETE: [
    async ({
      db,
      req: {
        query: { categoryId },
      },
      res,
    }) => {
      const [category] = await db("categories").where({ id: categoryId })

      if (!category) {
        res.status(HTTP_ERRORS.NOT_FOUND).send({ error: "Not found" })

        return
      }

      await db("categories").delete().where()

      res.send(category)
    },
  ],
})

export default handle
