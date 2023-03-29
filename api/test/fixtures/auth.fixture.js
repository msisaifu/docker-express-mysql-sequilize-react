const { userOne } = require("../fixtures/user.fixture");

const loginByUsername = {
  login: userOne.username,
  password: userOne.password,
};

const loginByEmail = {
  login: userOne.email,
  password: userOne.password,
};

const wrongLoginCredential = {
  login: "asas",
  password: "1234",
};

module.exports = {
  loginByUsername,
  loginByEmail,
  wrongLoginCredential,
};
