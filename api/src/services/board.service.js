const httpStatus = require("http-status");
const { Board, BoardList, Card, History } = require("../models");
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
  return Board.findAll();
};

/**
 * Get Board by id
 * @param {ObjectId} id
 * @returns {Promise<Board>}
 */
const getOne = async (id) => {
  return Board.findByPk(id, {
    include: [
      {
        model: BoardList,
        as: "board_lists",
        include: [
          {
            model: Card,
            as: "cards",
            include: [
              {
                model: History,
                as: "histories",
                include: [
                  {
                    model: BoardList,
                    as: "to",
                  },
                  {
                    model: BoardList,
                    as: "from",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  });
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
