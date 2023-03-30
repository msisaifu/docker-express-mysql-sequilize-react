const express = require("express");
const userRoute = require("./user.route");
const authRoute = require("./auth.route");
const boardRoute = require("./board.route");
const router = express.Router();

const defaultRoutes = [
  {
    path: "/users",
    route: userRoute,
  },
  {
    path: "/boards",
    route: boardRoute,
  },
  {
    path: "/auth",
    route: authRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
