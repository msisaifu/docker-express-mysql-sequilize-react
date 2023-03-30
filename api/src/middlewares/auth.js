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
    const tokenActive = await tokenService.isTokenActive(token);
    if (!tokenActive) {
      return res.status(401).json({ success: false, msg: "Unauthorised" });
    }

    const decoded = jwt.verify(token, config.jwt.secret);
    const {
      user: { role },
    } = decoded;

    let canAccess = roles && roles.includes(role);

    if (!canAccess) {
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

const setAuthInfo = (req, res, next) => {
  try {
    let token = authorizationKey(req);
    const decoded = jwt.verify(token, config.jwt.secret);
    if (decoded && token) {
      const { user } = decoded;
      req.IDENTITY = user;
    }
  } catch (error) {}
  next();
};

module.exports = { authenticated, setAuthInfo };
