const request = require("supertest");
const httpStatus = require("http-status");
const app = require("../../index.js");
const db = require("../../src/models");
const { userOne, userPassConflict } = require("../fixtures/user.fixture");

const { User } = db;

describe("User routes", () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });

  describe("POST /v1/users", () => {
    test("should return 201 and successfully create new user if data is ok", async () => {
      const res = await request(app)
        .post("/v1/users")
        .send(userOne)
        .expect(httpStatus.CREATED);

      expect(res.body).not.toHaveProperty("password");
      expect(res.body).toEqual({
        id: expect.anything(),
        first_name: userOne.first_name,
        last_name: userOne.last_name,
        username: userOne.username,
        email: userOne.email,
        role: userOne.role,
        createdAt: expect.anything(),
        updatedAt: expect.anything(),
      });
    });

    test("should return 400 and message should be confirm password does not match", async () => {
      const res = await request(app)
        .post("/v1/users")
        .send(userPassConflict)
        .expect(httpStatus.BAD_REQUEST);

      expect(res.body.message).toBe("confirm password does not match");
    });

    test("should return 409 and message should be email or username already exist", async () => {
      const res = await request(app)
        .post("/v1/users")
        .send(userOne)
        .expect(httpStatus.CONFLICT);

      expect(res.body.message).toBe("email or username already exist");
    });
  });

  afterAll(async () => {
    await db.User.truncate();
    await db.sequelize.close();
  });
});
