const httpStatus = require("http-status");
const { Op } = require("sequelize");
var bcrypt = require("bcryptjs");
const { User } = require("../models");
const ApiError = require("../utils/ApiError");

/**
 * Create a user
 * @param {Object} payload
 * @returns {Promise<User>}
 */
const createUser = async (payload) => {
  try {
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(payload["password"], salt);
    payload["password"] = hash;

    return User.create(payload);
  } catch (e) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Something wrong");
  }
};

/**
 * Check duplicate username or email
 * @param {Object} payload
 * @returns {Promise<User>}
 */
const duplicateUser = async (payload) => {
  return User.findOne({
    where: {
      [Op.or]: [{ username: payload["username"] }, { email: payload["email"] }],
    },
  });
};

module.exports = {
  createUser,
  duplicateUser,
};
