const Joi = require("joi");

const loginUser = {
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().required(),
      userName: Joi.string(),
    })
    .options({ allowUnknown: true }),
};

module.exports = {
  loginUser,
};
