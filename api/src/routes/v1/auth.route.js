const express = require("express");
const validate = require("../../middlewares/validate");
const authValidation = require("../../validations/auth.validation");
const authController = require("../../controllers/v1/auth.controller");
const { authenticated } = require("../../middlewares/auth");

const router = express.Router();

router
  .route("/")
  .post(validate(authValidation.loginUser), authController.loginUser);

router
  .route("/authentication")
  .get(authenticated(["A"]), authController.authetication);

router
  .route("/refresh_token")
  .post(validate(authValidation.refreshToken), authController.refreshToken);

module.exports = router;
