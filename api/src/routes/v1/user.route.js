const express = require("express");
const validate = require("../../middlewares/validate");
const userValidation = require("../../validations/user.validation");
const userController = require("../../controllers/v1/user.controller");

const router = express.Router();

router
  .route("/")
  .post(validate(userValidation.createUser), userController.createUser);

module.exports = router;
