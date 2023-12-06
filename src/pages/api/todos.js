import { validate } from "@/api/middlewares/validate"
import mw from "@/api/mw"
import {
  descriptionValidator,
  idValidator,
  pageValidator,
  statusValidator,
} from "@/utils/validators"
import config from "@/web/config"

const handle = mw({
  POST: [
    validate({
      body: {
        description: descriptionValidator,
        categoryId: idValidator,
        isDone: statusValidator.optional(),
      },
    }),
    async ({
      models: { TodoModel },
      input: {
        body: { description, categoryId, isDone },
      },
      res,
    }) => {
      const todo = await TodoModel.query()
        .insertAndFetch({
          description,
          categoryId,
          isDone,
        })
        .withGraphFetched("category")

      res.send(todo)
    },
  ],
  GET: [
    validate({
      query: {
        page: pageValidator.optional(),
      },
    }),
    async ({
      res,
      models: { TodoModel },
      input: {
        query: { page },
      },
    }) => {
      const query = TodoModel.query()
      const todos = await query
        .clone()
        .withGraphFetched("category")
        .limit(config.ui.itemsPerPage)
        .offset((page - 1) * config.ui.itemsPerPage)
      const [{ count }] = await query.clone().count()
      setTimeout(
        () =>
          res.send({
            result: todos,
            meta: {
              count,
            },
          }),
        3000,
      )
    },
  ],
})

export default handle
