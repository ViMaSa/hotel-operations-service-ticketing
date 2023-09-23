const request = require("supertest");
const app = require("../../main");

describe("Ticket Route", () => {
  it("Should return ticket information", async () => {
    const response = await request(app).get("/tickets");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });
});
