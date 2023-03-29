const jwt = require("jsonwebtoken");
const config = require("../config/config");
const { tokenService } = require("../services");
const authorizationKey = require("../utils/authorizationKey");

const authenticated = (roles) => async (req, res, next) => {
  try {
    let token = authorizationKey(req);
    if (!token) {
      return res.status(404).json({
        success: false,
        msg: "Token not found",
      });
    }
    const decoded = jwt.verify(token, config.jwt.secret);
    const {
      user: { role },
    } = decoded;

    let tokenActive = await tokenService.isTokenActive(token);
    let canAccess = roles && roles.includes(role);

    if (!tokenActive || !canAccess) {
      return res.status(401).json({ success: false, msg: "Unauthorised" });
    }
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(419).json({ success: false, msg: error.message });
    }
    return res.status(401).json({ success: false, msg: error.message });
  }
};

module.exports = { authenticated };
