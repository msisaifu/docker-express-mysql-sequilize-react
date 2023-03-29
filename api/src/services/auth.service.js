const httpStatus = require("http-status");
var bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const { User } = require("../models");
const ApiError = require("../utils/ApiError");

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const loginUser = async (payload) => {
  const { login, password } = payload;
  const user = await getUserByEmailOrUsername(login);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  await isPasswordMatch(password, user.password);
  let { id, email, userName, role, firstName, lastName } = user;
  return { id, email, userName, role, firstName, lastName };
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserByEmailOrUsername = async (login) => {
  return User.findOne({
    where: {
      [Op.or]: [{ userName: login }, { email: login }],
    },
  });
};

const isPasswordMatch = async (password, hash) => {
  let res = await bcrypt.compare(password, hash);
  if (!res) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Incorrect username or password"
    );
  }
};

module.exports = {
  loginUser,
};