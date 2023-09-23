const request = require("supertest");
const app = require("../../main");

describe("Home Route", () => {
  it("should return a welcome message", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("This is the start of the backend");
  });
});
