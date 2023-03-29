const request = require("supertest");
const httpStatus = require("http-status");
const app = require("../../index.js");
const db = require("../../src/models");
const { userService } = require("../../src/services");
const { userOne } = require("../fixtures/user.fixture");
const {
  loginByUsername,
  loginByEmail,
  wrongLoginCredential,
} = require("../fixtures/auth.fixture");

const { User } = db;

describe("Auth routes", () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    let user = await userService.createUser(userOne);
  });

  describe("POST /v1/auth", () => {
    // beforeEach(async () => await new Promise((r) => setTimeout(r, 500)));
    afterEach(async () => await new Promise((r) => setTimeout(r, 500)));

    test("login by username and should return 200 and return user and token information", async () => {
      const res = await request(app)
        .post("/v1/auth")
        .send(loginByUsername)
        .expect(httpStatus.OK);
      expect(res.body.user).toEqual({
        id: expect.anything(),
        first_name: userOne.first_name,
        last_name: userOne.last_name,
        username: userOne.username,
        email: userOne.email,
        role: userOne.role,
      });
      expect(res.body.token).toEqual({
        access_token: expect.anything(),
        refresh_token: expect.anything(),
      });
    });
    test("login by email and should return 200 and return user and token information", async () => {
      const res = await request(app)
        .post("/v1/auth")
        .send(loginByEmail)
        .expect(httpStatus.OK);
      expect(res.body.user).toEqual({
        id: expect.anything(),
        first_name: userOne.first_name,
        last_name: userOne.last_name,
        username: userOne.username,
        email: userOne.email,
        role: userOne.role,
      });
      expect(res.body.token).toEqual({
        access_token: expect.anything(),
        refresh_token: expect.anything(),
      });
    });
    test("wrong credentials and should return 404", async () => {
      const res = await request(app)
        .post("/v1/auth")
        .send(wrongLoginCredential)
        .expect(httpStatus.NOT_FOUND);
    });
  });

  afterAll(async () => {
    await db.User.truncate();
    await db.sequelize.close();
  });
});
