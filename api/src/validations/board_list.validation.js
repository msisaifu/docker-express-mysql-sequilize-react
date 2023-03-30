const Joi = require("joi");

const create = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    board_id: Joi.required(),
  }),
};

const getAll = {
  query: Joi.object().keys({}),
};

const getOne = {
  params: Joi.object().keys({
    boardListId: Joi.required(),
  }),
};

const update = {
  params: Joi.object().keys({
    boardListId: Joi.required(),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string().required(),
    })
    .min(1),
};

const destroy = {
  params: Joi.object().keys({
    boardListId: Joi.required(),
  }),
};

module.exports = {
  create,
  getAll,
  getOne,
  update,
  destroy,
};
