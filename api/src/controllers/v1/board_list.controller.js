const httpStatus = require("http-status");
const ApiError = require("../../utils/ApiError");
const catchAsync = require("../../utils/catchAsync");
const { boardListService } = require("../../services");

const create = catchAsync(async (req, res) => {
  const model = await boardListService.create(req.body);
  res.status(httpStatus.CREATED).send(model);
});

const getAll = catchAsync(async (req, res) => {
  const result = await boardListService.getAll();
  res.send(result);
});

const getOne = catchAsync(async (req, res) => {
  const model = await boardListService.getOne(req.params.boardListId);
  if (!model) {
    throw new ApiError(httpStatus.NOT_FOUND, "Record not found");
  }
  res.send(model);
});

const update = catchAsync(async (req, res) => {
  const model = await boardListService.update(req.params.boardListId, req.body);
  res.send(model);
});

const destroy = catchAsync(async (req, res) => {
  await boardListService.destroy(req.params.boardListId);
  res.json({ message: "record deleted" });
});

module.exports = {
  create,
  getAll,
  getOne,
  update,
  destroy,
};
