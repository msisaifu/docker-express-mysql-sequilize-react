const httpStatus = require("http-status");
const ApiError = require("../../utils/ApiError");
const catchAsync = require("./../../utils/catchAsync");
const { userService } = require("./../../services");

const createUser = catchAsync(async (req, res) => {
  const duplicateUser = await userService.duplicateUser(req.body);
  if (duplicateUser) {
    throw new ApiError(httpStatus.CONFLICT, "email or username already exist");
  }
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

module.exports = {
  createUser,
};
