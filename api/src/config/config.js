const fs = require("fs");

module.exports = {
  development: {
    username: process.env.MYSQL_USER || "docker",
    password: process.env.MYSQL_PASSWORD || "docker",
    database: process.env.MYSQL_DATABASE || "docker",
    host: process.env.MYSQL_HOST || "db",
    port: 3306,
    dialect: "mysql",
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  test: {
    username: process.env.MYSQL_USER || "docker",
    password: process.env.MYSQL_PASSWORD || "docker",
    database: process.env.MYSQL_TEST_DATABASE || "docker-test",
    host: process.env.MYSQL_HOST || "db",
    host: "127.0.0.1",
    port: 3306,
    dialect: "mysql",
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  production: {
    username: process.env.MYSQL_USER || "docker",
    password: process.env.MYSQL_PASSWORD || "docker",
    database: process.env.MYSQL_DATABASE || "docker",
    host: process.env.MYSQL_HOST || "db",
    port: process.env.MYSQL_PORT || "3306",
    dialect: "mysql",
    dialectOptions: {
      bigNumberStrings: true,
      ssl: {
        // ca: fs.readFileSync(__dirname + "/mysql-ca-main.crt"),
      },
    },
  },
};
