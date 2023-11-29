import mw from "@/api/mw"
import { readDatabase } from "@/db/readDatabase"
import { writeDatabase } from "@/db/writeDatabase"
import { randomUUID } from "node:crypto"

const handle = mw({
  POST: [
    async (req, res) => {
      const {
        body: { description },
      } = req
      const db = await readDatabase()
      const todo = {
        id: randomUUID(),
        description,
        done: false,
      }

      await writeDatabase([...db, todo])

      res.send(todo)
    },
  ],
  GET: [async (req, res) => res.send(await readDatabase())],
})

export default handle
