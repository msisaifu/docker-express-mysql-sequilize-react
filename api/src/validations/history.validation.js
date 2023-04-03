const Joi = require("joi");

const create = {
  body: Joi.object()
    .keys({
      card_id: Joi.required(),
      move_from: Joi.required(),
      move_to: Joi.required(),
    })
    .options({ allowUnknown: true }),
};

module.exports = {
  create,
};
