const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticketController.js");

// Create ticket
router.post("/", ticketController.createTicket);

// Get all tickets route
router.get("/", ticketController.getAllTickets);

// Get ticket by id
router.get("/:id", ticketController.getTicketById);

// Update ticket
router.put("/:id", ticketController.updateTicket);

// Delete ticket
router.delete("/:id", ticketController.deleteTicket);

module.exports = router;
