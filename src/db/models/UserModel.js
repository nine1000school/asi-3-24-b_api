import config from "@/config"
import BaseModel from "@/db/models/BaseModel"
import LikeModel from "@/db/models/LikeModel"
import PostModel from "@/db/models/PostModel"
import { pbkdf2, randomBytes } from "node:crypto"
import { promisify } from "node:util"

const pbkdf2Async = promisify(pbkdf2)

class UserModel extends BaseModel {
  static tableName = "users"

  static async hashPassword(
    password,
    salt = randomBytes(config.security.password.keylen).toString("hex"),
  ) {
    return [
      (
        await pbkdf2Async(
          password,
          salt + config.security.password.pepper,
          config.security.password.iterations,
          config.security.password.keylen,
          config.security.password.digest,
        )
      ).toString("hex"),
      salt,
    ]
  }

  static tableName = "users"
  static get relationMappings() {
    return {
      posts: {
        relation: BaseModel.HasManyRelation,
        modelClass: PostModel,
        join: {
          from: "users.id",
          to: "posts.userId",
        },
      },
      likes: {
        relation: BaseModel.HasManyRelation,
        modelClass: LikeModel,
        join: {
          from: "users.id",
          to: "likes.userId",
        },
      },
    }
  }
}

export default UserModel
