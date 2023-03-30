const express = require("express");
const { authenticated } = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const boardValidation = require("../../validations/board.validation");
const boardController = require("../../controllers/v1/board.controller");

const router = express.Router();

router
  .route("/")
  .post(
    authenticated(["A"]),
    validate(boardValidation.create),
    boardController.create
  )
  .get(
    authenticated(["A"]),
    validate(boardValidation.getAll),
    boardController.getAll
  );

router
  .route("/:boardId")
  .get(
    authenticated(["A"]),
    validate(boardValidation.getOne),
    boardController.getOne
  )
  .put(
    authenticated(["A"]),
    validate(boardValidation.update),
    boardController.update
  )
  .patch(
    authenticated(["A"]),
    validate(boardValidation.update),
    boardController.update
  )
  .delete(
    authenticated(["A"]),
    validate(boardValidation.destroy),
    boardController.destroy
  );

module.exports = router;
