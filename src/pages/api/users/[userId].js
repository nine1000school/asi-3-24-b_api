import auth from "@/api/middlewares/auth"
import { validate } from "@/api/middlewares/validate"
import mw from "@/api/mw"
import {
  emailValidator,
  idValidator,
  passwordValidator,
  usernameValidator,
} from "@/utils/validators"

const handle = mw({
  GET: [
    validate({
      query: {
        userId: idValidator,
      },
    }),
    async ({
      models: { UserModel },
      input: {
        query: { userId },
      },
      res,
    }) => {
      const user = await UserModel.query().findById(userId).throwIfNotFound()

      res.send(user)
    },
  ],
  PATCH: [
    validate({
      query: {
        userId: idValidator,
      },
      body: {
        email: emailValidator,
        username: usernameValidator,
        password: passwordValidator,
      },
    }),
    async ({
      models: { UserModel },
      input: {
        body,
        body: { email, username, password },
        query: { userId },
      },
      res,
    }) => {
      const updatedUser = await UserModel.query()
        .updateAndFetchById(userId, {
          ...body,
          updatedAt: UserModel.fn.now(),
        })
        .throwIfNotFound()
      const [passwordHash, passwordSalt] =
        await UserModel.hashPassword(password)

      await UserModel.query().insertAndFetch({
        email,
        username,
        passwordHash,
        passwordSalt,
      })

      res.send(updatedUser)
    },
  ],
  DELETE: [
    auth,
    validate({
      query: {
        userId: idValidator,
      },
    }),
    async ({
      models: { UserModel },
      input: {
        query: { userId },
      },
      res,
    }) => {
      const post = await UserModel.query().findById(userId).throwIfNotFound()

      await post.$query().delete()

      res.send(post)
    },
  ],
})

export default handle
