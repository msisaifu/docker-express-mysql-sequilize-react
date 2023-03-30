const express = require("express");
const { authenticated } = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const cardValidation = require("../../validations/card.validation");
const cardController = require("../../controllers/v1/card.controller");

const router = express.Router();

router
  .route("/")
  .post(
    authenticated(["A"]),
    validate(cardValidation.create),
    cardController.create
  )
  .get(
    authenticated(["A"]),
    validate(cardValidation.getAll),
    cardController.getAll
  );

router
  .route("/:cardId")
  .get(
    authenticated(["A"]),
    validate(cardValidation.getOne),
    cardController.getOne
  )
  .put(
    authenticated(["A"]),
    validate(cardValidation.update),
    cardController.update
  )
  .patch(
    authenticated(["A"]),
    validate(cardValidation.update),
    cardController.update
  )
  .delete(
    authenticated(["A"]),
    validate(cardValidation.destroy),
    cardController.destroy
  );

module.exports = router;
