const httpStatus = require("http-status");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const { Token } = require("../models");
const config = require("../config/config");
const ApiError = require("./../utils/ApiError");

/**
 * Generate token
 * @param {Object} user {id, role}
 * @param {string} expires
 * @param {string} type
 * @param {string} [secret]
 * @returns {string}
 */
const generateToken = (user, expires, type, secret = config.jwt.secret) => {
  const payload = {
    user: user,
    type,
  };
  return jwt.sign(payload, secret, {
    expiresIn: expires,
  });
};

/**
 * Generate auth tokens
 * @param {User} user
 * @returns {<Object>} {access_token, refresh_token}
 */
const generateAuthTokens = async (user) => {
  const { id, role } = user;
  const access_token = generateToken(
    { id, role },
    config.jwt.accessTokenLifetime,
    config.jwt.accessTokenType
  );
  const refresh_token = generateToken(
    { id, role },
    config.jwt.refreshTokenLifetime,
    config.jwt.refreshTokenType
  );

  await saveToken(access_token, refresh_token, id);

  return {
    access_token,
    refresh_token,
  };
};

/**
 * Save a token
 * @param {string} access_token
 * @param {string} refresh_token
 * @param {ModelId} user_id
 */
const saveToken = async (access_token, refresh_token, user_id) => {
  await Token.create({
    access_token,
    refresh_token,
    user_id,
    active: 1,
  });
};

module.exports = {
  generateAuthTokens,
};
