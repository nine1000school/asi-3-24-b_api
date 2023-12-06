import { HTTP_ERRORS } from "@/api/constants"
import { NotFoundError, PublicError } from "@/api/errors"
import log from "@/api/middlewares/log"
import methodNotAllowed from "@/api/middlewares/methodNotAllowed"
import config from "@/config"
import BaseModel from "@/db/models/BaseModel"
import TodoModel from "@/db/models/TodoModel"
import knex from "knex"
import { NotFoundError as ObjectionNotFoundError } from "objection"

const mw = (handlers) => async (req, res) => {
  const middlewares = handlers[req.method]
  const sanitizedMiddlewares = [log, ...(middlewares || [methodNotAllowed])]
  let currentMiddlewareIndex = 0
  const db = knex(config.db)

  BaseModel.knex(db)

  const ctx = {
    db,
    models: {
      TodoModel,
    },
    req,
    res,
    next: async () => {
      const middleware = sanitizedMiddlewares[currentMiddlewareIndex]
      currentMiddlewareIndex += 1

      await middleware(ctx)
    },
  }

  try {
    await ctx.next()
  } catch (err) {
    const error =
      err instanceof ObjectionNotFoundError ? new NotFoundError() : err

    if (!(error instanceof PublicError)) {
      // eslint-disable-next-line no-console
      console.error(error)

      res
        .status(HTTP_ERRORS.INTERNAL_SERVER_ERROR)
        .send({ error: "Something went wrong." })

      return
    }

    if (error instanceof NotFoundError) {
      res.status(HTTP_ERRORS.NOT_FOUND).send({ error })

      return
    }

    res.status(HTTP_ERRORS.CLIENT_ERROR).send({ error })
  } finally {
    await db.destroy()
  }
}

export default mw
