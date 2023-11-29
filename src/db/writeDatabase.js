import { DB_FILENAME } from "@/api/constants"
import { writeFile } from "node:fs/promises"

export const writeDatabase = async (db) => {
  const data = JSON.stringify(db)

  await writeFile(DB_FILENAME, data, { encoding: "utf-8" })
}
