const request = require("supertest");
const httpStatus = require("http-status");
const app = require("../../index.js");
const db = require("../../src/models");
const { userOne } = require("../fixtures/user.fixture");

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
        username: userOne.username,
        email: userOne.email,
        role: userOne.role,
        createdAt: expect.anything(),
        updatedAt: expect.anything(),
      });
    });
  });

  afterAll(async () => {
    await db.User.truncate();
    await db.sequelize.close();
  });
});
