const Joi = require("joi");

const create = {
  body: Joi.object()
    .keys({
      title: Joi.string().required(),
      list_id: Joi.required(),
      description: Joi.string(),
    })
    .options({ allowUnknown: true }),
};

const getAll = {};

const getOne = {
  params: Joi.object().keys({
    cardId: Joi.required(),
  }),
};

const update = {
  params: Joi.object().keys({
    cardId: Joi.required(),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string().required(),
      list_id: Joi.required(),
      description: Joi.string(),
    })
    .min(1)
    .options({ allowUnknown: true }),
};

const destroy = {
  params: Joi.object().keys({
    cardId: Joi.required(),
  }),
};

module.exports = {
  create,
  getAll,
  getOne,
  update,
  destroy,
};
