const request = require("supertest");
const app = require("../../main");

describe("Ticket Route", () => {
  let newTicketId;

  describe("POST /tickets", () => {
    it("should create a new ticket and return it", async () => {
      const newTicket = {
        priority: 3,
        guest_first_name: "John",
        guest_last_name: "Wick",
        room_number: 10114,
        check_in_date: "2023-10-23",
        ticket_request_type: "Maintenance Ticket",
        description: "Toilet - Clogged",
        status: "Open"
      };

      const response = await request(app).post("/tickets").send(newTicket);

      newTicketId = response.body.id;

      expect(response.statusCode).toBe(201);
      expect(response.body.guest_last_name).toBe("Wick");
      expect(response.body.id).toBeTruthy();
    });
  });

  describe("GET /tickets", () => {
    it("Should return ticket information", async () => {
      const response = await request(app).get("/tickets");

      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toEqual(true);
    });
  });

  describe("GET /tickets/:id", () => {
    it("Should return ticket information by id", async () => {
      const response = await request(app).get(`/tickets/${newTicketId}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.id).toEqual(newTicketId);
    });
  });

  describe("DELETE /tickets/:id", () => {
    it("Should delete ticket by id", async () => {
      const response = await request(app).delete(`/tickets/${newTicketId}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe("Ticket deleted")
    });

    it("Should return error when ticket id does not exist", async () => {
      const invalidId = -1;

      const response = await request(app).delete(`/tickets/${invalidId}`);

      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe("Ticket not found");
    })
  });
});
