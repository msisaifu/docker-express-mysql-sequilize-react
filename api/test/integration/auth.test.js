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

    test("Test logging in with a username, expecting a successful response (status code 200) and receiving user and token information.", async () => {
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
    test("Test logging in with an email, expecting a successful response (status code 200) and receiving user and token information.", async () => {
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
    test("Test attempting to log in with incorrect credentials, expecting a response with a 'Not Found' status code (404).", async () => {
      await request(app)
        .post("/v1/auth")
        .send(wrongLoginCredential)
        .expect(httpStatus.NOT_FOUND);
    });
  });

  describe("GET /v1/auth/authentication", () => {
    let access_token, refresh_token, previous_token;

    beforeAll(async () => {
      const login = await request(app)
        .post("/v1/auth")
        .send(loginByUsername)
        .expect(httpStatus.OK);
      access_token = login.body.token.access_token;
      refresh_token = login.body.token.refresh_token;
    });

    afterEach(async () => await new Promise((r) => setTimeout(r, 500)));

    test("Test accessing a protected route by including an authorization header in the request, expecting a successful response (status code 200).", async () => {
      await request(app)
        .get("/v1/auth/authentication")
        .set("Authorization", `Bearer ${access_token}`)
        .send()
        .expect(httpStatus.OK);
    });

    test("Test attempting to access a protected route with an expired access token, expecting a response with a '419 Authentication Timeout' status code.", async () => {
      await new Promise((r) => setTimeout(r, 5000));
      await request(app)
        .get("/v1/auth/authentication")
        .set("Authorization", `Bearer ${access_token}`)
        .send()
        .expect(419);
    }, 6000);

    test("Test implementing a functionality to generate a new access token using a refresh token, expecting a successful response (status code 200).", async () => {
      const res = await request(app)
        .post("/v1/auth/refresh_token")
        .set("Authorization", `Bearer ${access_token}`)
        .send({ refresh_token })
        .expect(httpStatus.OK);

      previous_token = access_token;
      access_token = res.body.token.access_token;
      refresh_token = res.body.token.refresh_token;
    });

    test("Test accessing a protected route using a new access token, expecting a successful response (status code 200).", async () => {
      await request(app)
        .get("/v1/auth/authentication")
        .set("Authorization", `Bearer ${access_token}`)
        .send()
        .expect(httpStatus.OK);
    });

    test("Test attempting to access a protected route with a previous token, expecting a response with an 'Unauthorized' status code (401).", async () => {
      await request(app)
        .get("/v1/auth/authentication")
        .set("Authorization", `Bearer ${previous_token}`)
        .send()
        .expect(httpStatus.UNAUTHORIZED);
    });
  });

  afterAll(async () => {
    await db.User.truncate();
    await db.sequelize.close();
  });
});
