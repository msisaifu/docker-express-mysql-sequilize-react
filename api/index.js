const httpStatus = require("http-status");
const express = require("express");
const cors = require("cors");
const routes = require("./src/routes/v1");
const morgan = require("./src/config/morgan");
const config = require("./src/config/config");
const ApiError = require("./src/utils/ApiError");
const { errorHandler, errorConverter } = require("./src/middlewares/error");
const { setAuthInfo } = require("./src/middlewares/auth");

const port = process.env.PORT || 5555;
const app = express();

if (config.env !== "test") {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// enable cors
app.use(cors());
app.options("*", cors());
// parse json request body
app.use(express.json());
// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// Set authorization information into IDENTITY
app.use(setAuthInfo);
// v1 api routes
app.use("/v1", routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  res.send({ error: new ApiError(httpStatus.NOT_FOUND, "Not found") });
});

// convert error to ApiError,
app.use(errorConverter);
// handle error
app.use(errorHandler);

if (!module.parent) {
  app.listen(port, () => console.log("listining on port ", port));
}

module.exports = app;
