const httpStatus = require("http-status");
const { Board } = require("../models");
const ApiError = require("../utils/ApiError");

/**
 * Create a board
 * @param {Object} payload
 * @returns {Promise<Board>}
 */
const create = async (payload) => {
  return Board.create(payload);
};

/**
 * Query for users
 * @returns {Promise<QueryResult>}
 */
const getAll = async () => {
  return await Board.findAll();
};

/**
 * Get Board by id
 * @param {ObjectId} id
 * @returns {Promise<Board>}
 */
const getOne = async (id) => {
  return Board.findByPk(id);
};

/**
 * Update Board by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<Board>}
 */
const update = async (id, payload) => {
  const Board = await getOne(id);
  if (!Board) {
    throw new ApiError(httpStatus.NOT_FOUND, "Board not found");
  }
  Object.assign(Board, payload);
  await Board.save();
  return Board;
};

/**
 * Delete Board by id
 * @param {ObjectId} userId
 * @returns {Promise<Board>}
 */
const destroy = async (userId) => {
  const Board = await getOne(userId);
  if (!Board) {
    throw new ApiError(httpStatus.NOT_FOUND, "Board not found");
  }
  return Board.destroy();
};

module.exports = {
  create,
  getAll,
  getOne,
  update,
  destroy,
};
