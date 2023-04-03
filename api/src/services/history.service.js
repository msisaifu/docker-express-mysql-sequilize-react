const { History } = require("../models");

/**
 * create history
 * @param {Object} body
 * @returns {Promise<User>}
 */
const create = async (payload) => {
  return History.create(payload);
};

module.exports = {
  create,
};
