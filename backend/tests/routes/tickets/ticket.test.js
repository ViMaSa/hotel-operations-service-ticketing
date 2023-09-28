const request = require("supertest");
const app = require("../../../main");

describe("Ticket Route", () => {
  const invalidId = -1;
  let newTicketId;

  describe("POST /tickets", () => {
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

    const nullFieldTicket = {
      priority: 3,
      guest_first_name: "John",
      guest_last_name: "Wick",
      check_in_date: "2023-10-23",
      ticket_request_type: "Maintenance Ticket",
      description: "Toilet - Clogged",
      status: "Open"
    };

    const invalidTypeTicket = {
      priority: "something",
      guest_first_name: "John",
      guest_last_name: "Wick",
      room_number: 10114,
      check_in_date: "2023-10-23",
      ticket_request_type: "Maintenance Ticket",
      description: "Toilet - Clogged",
      status: "Open"
    };

    it("Should create a new valid ticket", async () => {
      const response = await request(app).post("/tickets").send(newTicket);

      newTicketId = response.body.id;

      expect(response.statusCode).toBe(201);
      expect(response.body.guest_last_name).toBe("Wick");
      expect(response.body.id).toBeTruthy();
    });

    it("Should not create a new ticket with missing fields", async () => {
      const response = await request(app).post("/tickets").send(nullFieldTicket);

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe("ticket.room_number cannot be null");
    })

    it("Should not create a new ticket with incorrect data types", async () => {
      const response = await request(app).post("/tickets").send(invalidTypeTicket);

      expect(response.statusCode).toBe(500);
      expect(response.body.message)
    })
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

    it("Should return error fetching ticket by id that does not exist", async() => {
      const response = await request(app).get(`/tickets/${invalidId}`);

      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe("Ticket not found");
    })
  });

  describe("PUT /ticket/:id", () => {
    it("Should return update ticket by id", async () => {
      const updateDetail = {
        guest_first_name: "Jason",
      }

      const response = await request(app)
        .put(`/tickets/${newTicketId}`)
        .send(updateDetail);

      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe("Ticket updated");
    })
  })

  describe("DELETE /tickets/:id", () => {
    it("Should delete ticket by id", async () => {
      const response = await request(app).delete(`/tickets/${newTicketId}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe("Ticket deleted")
    });

    it("Should return error when ticket id does not exist", async () => {
      const response = await request(app).delete(`/tickets/${invalidId}`);

      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe("Ticket not found");
    })
  });
});
