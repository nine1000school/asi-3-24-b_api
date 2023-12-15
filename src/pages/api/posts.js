import auth from "@/api/middlewares/auth"
import { validate } from "@/api/middlewares/validate"
import mw from "@/api/mw"
import {
  contentValidator,
  idValidator,
  pageValidator,
  titleValidator,
} from "@/utils/validators"
import config from "@/web/config"

const handle = mw({
  POST: [
    auth,
    validate({
      body: {
        userId: idValidator,
        title: titleValidator,
        content: contentValidator,
      },
    }),
    async ({
      models: { PostModel },
      input: {
        body: { userId, title, content },
      },
      res,
    }) => {
      const post = await PostModel.query().insertAndFetch({
        userId,
        title,
        content,
      })

      res.send(post)
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
      models: { PostModel },
      input: {
        query: { page },
      },
    }) => {
      const query = PostModel.query()
      const posts = await query
        .clone()
        .withGraphFetched("user")
        .orderBy("createdAt", "DESC")
        .limit(config.ui.itemsPerPage)
        .offset((page - 1) * config.ui.itemsPerPage)
      const [{ count }] = await query.clone().count()

      res.send({
        result: posts,
        meta: {
          count,
        },
      })
    },
  ],
})

export default handle
