const httpStatus = require("http-status");
const { BoardList } = require("../models");
const ApiError = require("../utils/ApiError");

/**
 * Create a BoardList
 * @param {Object} payload
 * @returns {Promise<BoardList>}
 */
const create = async (payload) => {
  return BoardList.create(payload);
};

/**
 * Query for users
 * @returns {Promise<QueryResult>}
 */
const getAll = async () => {
  return BoardList.findAll();
};

/**
 * Get BoardList by id
 * @param {ObjectId} id
 * @returns {Promise<BoardList>}
 */
const getOne = async (id) => {
  return BoardList.findByPk(id);
};

/**
 * Update BoardList by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<BoardList>}
 */
const update = async (id, payload) => {
  const BoardList = await getOne(id);
  if (!BoardList) {
    throw new ApiError(httpStatus.NOT_FOUND, "BoardList not found");
  }
  Object.assign(BoardList, payload);
  return BoardList.save();
};

/**
 * Delete BoardList by id
 * @param {ObjectId} userId
 * @returns {Promise<BoardList>}
 */
const destroy = async (userId) => {
  const BoardList = await getOne(userId);
  if (!BoardList) {
    throw new ApiError(httpStatus.NOT_FOUND, "BoardList not found");
  }
  return BoardList.destroy();
};

module.exports = {
  create,
  getAll,
  getOne,
  update,
  destroy,
};
