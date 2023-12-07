import { UnauthorizedError } from "@/api/errors"
import { validate } from "@/api/middlewares/validate"
import mw from "@/api/mw"
import { emailValidator, passwordValidator } from "@/utils/validators"

const handle = mw({
  POST: [
    validate({
      body: {
        email: emailValidator,
        password: passwordValidator,
      },
    }),
    async ({
      input: {
        body: { email, password },
      },
      models: { UserModel },
      res,
    }) => {
      const user = await UserModel.query().findOne({ email })

      if (!user) {
        throw new UnauthorizedError()
      }

      const [passwordHash] = await UserModel.hashPassword(
        password,
        user.passwordSalt,
      )

      if (passwordHash !== user.passwordHash) {
        throw new UnauthorizedError()
      }

      res.send({ result: "SUCCESS" })
    },
  ],
})

export default handle
