const express = require("express");
const { authenticated } = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const boardListValidation = require("../../validations/board_list.validation");
const boardListController = require("../../controllers/v1/board_list.controller");

const router = express.Router();

router
  .route("/")
  .post(
    authenticated(["A"]),
    validate(boardListValidation.create),
    boardListController.create
  )
  .get(
    authenticated(["A"]),
    validate(boardListValidation.getAll),
    boardListController.getAll
  );

router
  .route("/:boardListId")
  .get(
    authenticated(["A"]),
    validate(boardListValidation.getOne),
    boardListController.getOne
  )
  .put(
    authenticated(["A"]),
    validate(boardListValidation.update),
    boardListController.update
  )
  .patch(
    authenticated(["A"]),
    validate(boardListValidation.update),
    boardListController.update
  )
  .delete(
    authenticated(["A"]),
    validate(boardListValidation.destroy),
    boardListController.destroy
  );

module.exports = router;
