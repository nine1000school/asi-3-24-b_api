export const up = async (db) => {
  await db.schema.createTable("users", (table) => {
    table.increments("id")
    table.text("email").notNullable().unique()
    table.text("username").notNullable().unique()
    table.text("passwordHash").notNullable()
    table.text("passwordSalt").notNullable()
    table.timestamps(true, true, true)
  })
  await db.schema.createTable("posts", (table) => {
    table.increments("id")
    table.integer("userId").notNullable()
    table.text("title").notNullable()
    table.text("content").notNullable()
    table.integer("vues").notNullable().defaultTo(0)
    table.timestamps(true, true, true)
    table.foreign("userId").references("id").inTable("users")
  })
  await db.schema.createTable("likes", (table) => {
    table.increments("id")
    table.integer("number").notNullable().defaultTo(0)
    table.integer("userId").notNullable()
    table.integer("postId").notNullable()
    table.foreign("userId").references("id").inTable("users")
    table.foreign("postId").references("id").inTable("posts")
  })
}

export const down = async (db) => {
  await db.schema.dropTable("users")
  await db.schema.dropTable("posts")
  await db.schema.dropTable("likes")
}
