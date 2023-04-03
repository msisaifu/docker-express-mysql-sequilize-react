const express = require("express");
const { authenticated } = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const historyValidation = require("../../validations/history.validation");
const historyController = require("../../controllers/v1/history.controller");

const router = express.Router();

router
  .route("/")
  .post(
    authenticated(["A"]),
    validate(historyValidation.create),
    historyController.create
  );

module.exports = router;
