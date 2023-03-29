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

describe("Auth routes", () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    await userService.createUser(userOne);
  });

  describe("POST /v1/auth", () => {
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
      await request(app)
        .post("/v1/auth")
        .send(wrongLoginCredential)
        .expect(httpStatus.NOT_FOUND);
    });
  });

  describe("GET /v1/auth/authentication", () => {
    let access_token;

    beforeAll(async () => {
      const login = await request(app)
        .post("/v1/auth")
        .send(loginByUsername)
        .expect(httpStatus.OK);
      access_token = login.body.token.access_token;
    });

    afterEach(async () => await new Promise((r) => setTimeout(r, 500)));

    test(" access to a protected route by including an authorization header in the request and should return 200", async () => {
      await request(app)
        .get("/v1/auth/authentication")
        .set("Authorization", `Bearer ${access_token}`)
        .send()
        .expect(httpStatus.OK);
    });

    test("Test that attempting to access a protected route with an expired access token results and should return 419", async () => {
      await new Promise((r) => setTimeout(r, 5000));
      await request(app)
        .get("/v1/auth/authentication")
        .set("Authorization", `Bearer ${access_token}`)
        .send()
        .expect(419);
    }, 6000);

    // test("Implement a functionality to generate a new access token by using a refresh token. and should return ", async () => {
    //   await new Promise((r) => setTimeout(r, 5000));
    //   await request(app)
    //     .get("/v1/auth/authentication")
    //     .set("Authorization", `Bearer ${access_token}`)
    //     .send()
    //     .expect(419);
    // }, 6000);
  });

  afterAll(async () => {
    await db.User.truncate();
    await db.sequelize.close();
  });
});
