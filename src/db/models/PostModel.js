import BaseModel from "@/db/models/BaseModel"
import UserModel from "@/db/models/UserModel"
import LikeModel from "@/db/models/LikeModel"

class PostModel extends BaseModel {
  static tableName = "posts"
  static get relationMappings() {
    return {
      user: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: "posts.userId",
          to: "users.id",
        },
      },
      likes: {
        relation: BaseModel.HasManyRelation,
        modelClass: LikeModel,
        join: {
          from: "posts.id",
          to: "likes.postId",
        },
      },
    }
  }
}

export default PostModel
