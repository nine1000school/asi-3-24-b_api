const knexfile = {
  client: "pg",
  connection: "postgres://avetisk@localhost:5432/asi_3_24_b",
  migrations: {
    directory: "./src/db/migrations",
    stub: "./src/db/migration.stub",
    loadExtensions: [".mjs"],
  },
}

export default knexfile
