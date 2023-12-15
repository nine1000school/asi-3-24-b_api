import BaseModel from "@/db/models/BaseModel"
import PostModel from "@/db/models/PostModel"
import UserModel from "@/db/models/UserModel"

class LikeModel extends BaseModel {
  static tableName = "likes"
  static get relationMappings() {
    return {
      users: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: "likes.userId",
          to: "users.id",
        },
      },
    }
  }
}

export default LikeModel
