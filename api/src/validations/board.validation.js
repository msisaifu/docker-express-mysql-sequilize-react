const Joi = require("joi");

const create = {
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
    })
    .options({ allowUnknown: true }),
};

const getAll = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getOne = {
  params: Joi.object().keys({
    boardId: Joi.required(),
  }),
};

const update = {
  params: Joi.object().keys({
    boardId: Joi.required(),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
    })
    .min(1),
};

const destroy = {
  params: Joi.object().keys({
    boardId: Joi.required(),
  }),
};

module.exports = {
  create,
  getAll,
  getOne,
  update,
  destroy,
};
