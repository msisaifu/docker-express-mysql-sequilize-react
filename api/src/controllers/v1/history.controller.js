const catchAsync = require("../../utils/catchAsync");
const { historyService } = require("../../services");

const create = catchAsync(async (req, res) => {
  const model = await historyService.create(req.body);

  res.send(model);
});

module.exports = { create };
