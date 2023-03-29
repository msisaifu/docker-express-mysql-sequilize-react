const catchAsync = require("../../utils/catchAsync");
const { authService, tokenService } = require("../../services");

const loginUser = catchAsync(async (req, res) => {
  const user = await authService.loginUser(req.body);
  const token = await tokenService.generateAuthTokens(user);

  res.send({ user, token });
});

module.exports = {
  loginUser,
};
