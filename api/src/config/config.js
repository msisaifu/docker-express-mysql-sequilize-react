const fs = require("fs");
const dotenv = require("dotenv");
const path = require("path");
const Joi = require("joi");

dotenv.config({ path: path.join(__dirname, "../../.env") });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("production", "development", "test")
      .required(),
    PORT: Joi.number().default(5555),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
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
