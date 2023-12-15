import { validate } from "@/api/middlewares/validate"
import mw from "@/api/mw"
import {
  emailValidator,
  passwordValidator,
  usernameValidator,
} from "@/utils/validators"

const handle = mw({
  POST: [
    validate({
      body: {
        email: emailValidator,
        username: usernameValidator,
        password: passwordValidator,
      },
    }),
    async ({
      input: {
        body: { email, username, password },
      },
      models: { UserModel },
      res,
    }) => {
      const user = await UserModel.query().findOne({ email, username })

      if (user) {
        res.send({ result: true })

        return
      }

      const [passwordHash, passwordSalt] =
        await UserModel.hashPassword(password)

      await UserModel.query().insertAndFetch({
        email,
        username,
        passwordHash,
        passwordSalt,
      })

      res.send({ result: true })
    },
  ],
  GET: [
    async ({ res, models: { UserModel } }) => {
      const query = UserModel.query()
      const users = await query.clone().orderBy("createdAt", "DESC")

      res.send({
        result: users,
      })
    },
  ],
})

export default handle
