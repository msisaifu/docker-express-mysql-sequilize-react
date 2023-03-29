const Joi = require("joi");

const loginUser = {
  body: Joi.object()
    .keys({
      login: Joi.string(),
      password: Joi.string().required(),
    })
    .options({ allowUnknown: true }),
};

module.exports = {
  loginUser,
};
