const express = require("express");
const validate = require("../../middlewares/validate");
const authValidation = require("../../validations/auth.validation");
const authController = require("../../controllers/v1/auth.controller");

const router = express.Router();

router
  .route("/")
  .post(validate(authValidation.loginUser), authController.loginUser);

module.exports = router;
