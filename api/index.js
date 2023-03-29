const httpStatus = require("http-status");
const express = require("express");
const cors = require("cors");
const morgan = require("./src/config/morgan");
const config = require("./src/config/config");
const ApiError = require("./src/utils/ApiError");
const { errorHandler } = require("./src/middlewares/error");

const port = process.env.PORT || 5555;
const app = express();
// enable cors
app.use(cors());
app.options("*", cors());

if (config.env !== "test") {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  res.send({ error: new ApiError(httpStatus.NOT_FOUND, "Not found") });
});

// handle error
app.use(errorHandler);

app.listen(port, () => console.log("listining on port ", port));
