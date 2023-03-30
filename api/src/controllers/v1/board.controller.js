const httpStatus = require("http-status");
const ApiError = require("../../utils/ApiError");
const catchAsync = require("../../utils/catchAsync");
const { boardService } = require("../../services");

const create = catchAsync(async (req, res) => {
  const user = req.IDENTITY;
  const body = req.body;
  body["created_by"] = user.id;
  const model = await boardService.create(req.body);
  res.status(httpStatus.CREATED).send(model);
});

const getAll = catchAsync(async (req, res) => {
  const result = await boardService.getAll();
  res.send(result);
});

const getOne = catchAsync(async (req, res) => {
  const model = await boardService.getOne(req.params.boardId);
  if (!model) {
    throw new ApiError(httpStatus.NOT_FOUND, "Record not found");
  }
  res.send(model);
});

const update = catchAsync(async (req, res) => {
  const model = await boardService.update(req.params.boardId, req.body);
  res.send(model);
});

const destroy = catchAsync(async (req, res) => {
  await boardService.destroy(req.params.boardId);
  res.json({ message: "record deleted" });
});

module.exports = {
  create,
  getAll,
  getOne,
  update,
  destroy,
};
