import { DB_FILENAME } from "@/api/constants"
import { readFile } from "node:fs/promises"

export const readDatabase = async () => {
  try {
    const data = await readFile(DB_FILENAME, { encoding: "utf-8" })

    return JSON.parse(data)
  } catch (err) {
    return []
  }
}
