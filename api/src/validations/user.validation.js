const Joi = require("joi");

const createUser = {
  body: Joi.object()
    .keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      first_name: Joi.string(),
      last_name: Joi.string(),
      confirm_password: Joi.any()
        .equal(Joi.ref("password"))
        .required()
        .label("Confirm password")
        .options({ messages: { "any.only": "{{#label}} does not match" } }),
      username: Joi.string().required(),
      role: Joi.string().required().valid("A"),
    })
    .options({ allowUnknown: true }),
};

module.exports = {
  createUser,
};
