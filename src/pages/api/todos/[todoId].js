import { HTTP_ERRORS } from "@/api/constants"
import mw from "@/api/mw"
import { readDatabase } from "@/db/readDatabase"
import { writeDatabase } from "@/db/writeDatabase"
import { merge } from "@corex/deepmerge"

const handle = mw({
  GET: [
    async (req, res) => {
      const {
        query: { todoId },
      } = req
      const db = await readDatabase()
      const todo = db.find(({ id }) => id === todoId)

      if (!todo) {
        res.status(HTTP_ERRORS.NOT_FOUND).send({ error: "Not found" })

        return
      }

      res.send(todo)
    },
  ],
  PATCH: [
    async (req, res) => {
      const {
        body,
        query: { todoId },
      } = req
      const db = await readDatabase()
      const todoIndex = db.findIndex(({ id }) => id === todoId)

      if (todoIndex === -1) {
        res.status(HTTP_ERRORS.NOT_FOUND).send({ error: "Not found" })

        return
      }

      const todo = db[todoIndex]
      const newTodo = merge([todo, body])

      await writeDatabase(db.with(todoIndex, newTodo))

      res.send(newTodo)
    },
  ],
  DELETE: [
    async (req, res) => {
      const {
        body,
        query: { todoId },
      } = req
      const db = await readDatabase()
      const todoIndex = db.findIndex(({ id }) => id === todoId)

      if (todoIndex === -1) {
        res.status(HTTP_ERRORS.NOT_FOUND).send({ error: "Not found" })

        return
      }

      const todo = db[todoIndex]
      const deletedTodo = merge([todo, body])

      await writeDatabase(db.filter(({ id }) => id !== todoId))

      res.send(deletedTodo)
    },
  ],
})

export default handle
