const httpStatus = require("http-status");
const ApiError = require("../../utils/ApiError");
const catchAsync = require("../../utils/catchAsync");
const { cardService } = require("../../services");

const create = catchAsync(async (req, res) => {
  const model = await cardService.create(req.body);
  res.status(httpStatus.CREATED).send(model);
});

const getAll = catchAsync(async (req, res) => {
  const result = await cardService.getAll();
  res.send(result);
});

const getOne = catchAsync(async (req, res) => {
  const model = await cardService.getOne(req.params.cardId);
  if (!model) {
    throw new ApiError(httpStatus.NOT_FOUND, "Record not found");
  }
  res.send(model);
});

const update = catchAsync(async (req, res) => {
  const model = await cardService.update(req.params.cardId, req.body);
  res.send(model);
});

const destroy = catchAsync(async (req, res) => {
  await cardService.destroy(req.params.cardId);
  res.json({ message: "record deleted" });
});

module.exports = {
  create,
  getAll,
  getOne,
  update,
  destroy,
};
