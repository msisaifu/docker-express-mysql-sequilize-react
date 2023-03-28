const httpStatus = require("http-status");
const express = require("express");
const cors = require("cors");
const morgan = require("./config/morgan");
const logger = require("./config/logger");
const config = require("./config/config");
const ApiError = require("./utils/ApiError");
const { errorConverter, errorHandler } = require("./middlewares/error");

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
  next(res.json({ error: new ApiError(httpStatus.NOT_FOUND, "Not found") }));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

app.listen(port, () => console.log("listining on port ", port));
