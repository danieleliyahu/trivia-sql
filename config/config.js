require("dotenv").config();
const DB_PASSWORD = process.env.DB_PASSWORD;

module.exports = {
  development: {
    username: "root",
    password: DB_PASSWORD,
    database: "trivia",
    host: "127.0.0.1",
    dialect: "mysql",
    define: {
      underscored: true,
    },
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
