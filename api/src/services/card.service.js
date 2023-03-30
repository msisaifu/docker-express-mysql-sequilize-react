const httpStatus = require("http-status");
const { Card } = require("../models");
const ApiError = require("../utils/ApiError");

/**
 * Create a board
 * @param {Object} payload
 * @returns {Promise<Card>}
 */
const create = async (payload) => {
  return Card.create(payload);
};

/**
 * Query for users
 * @returns {Promise<QueryResult>}
 */
const getAll = async () => {
  return await Card.findAll();
};

/**
 * Get Card by id
 * @param {ObjectId} id
 * @returns {Promise<Card>}
 */
const getOne = async (id) => {
  return Card.findByPk(id);
};

/**
 * Update Card by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<Card>}
 */
const update = async (id, payload) => {
  const Card = await getOne(id);
  if (!Card) {
    throw new ApiError(httpStatus.NOT_FOUND, "Card not found");
  }
  Object.assign(Card, payload);
  await Card.save();
  return Card;
};

/**
 * Delete Card by id
 * @param {ObjectId} userId
 * @returns {Promise<Card>}
 */
const destroy = async (userId) => {
  const Card = await getOne(userId);
  if (!Card) {
    throw new ApiError(httpStatus.NOT_FOUND, "Card not found");
  }
  return Card.destroy();
};

module.exports = {
  create,
  getAll,
  getOne,
  update,
  destroy,
};
