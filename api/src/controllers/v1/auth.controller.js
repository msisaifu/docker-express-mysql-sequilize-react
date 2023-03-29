const catchAsync = require("../../utils/catchAsync");
const authorizationKey = require("../../utils/authorizationKey");
const { authService, tokenService } = require("../../services");

const loginUser = catchAsync(async (req, res) => {
  const user = await authService.loginUser(req.body);
  const token = await tokenService.generateAuthTokens(user);

  res.send({ user, token });
});

const refreshToken = catchAsync(async (req, res) => {
  const payload = req.body;
  const access_token = authorizationKey(req);
  const { refresh_token } = payload;
  const token = await tokenService.verifyRefreshToken({
    access_token,
    refresh_token,
  });

  res.send({ token });
});

const authetication = catchAsync(async (req, res) => {
  res.send({ message: "passed authentication" });
});

module.exports = {
  loginUser,
  refreshToken,
  authetication,
};
