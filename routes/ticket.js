const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticketController.js");
const { checkJwt } = require("../middleware/jwtMiddleware");

// Create ticket
router.post("/", checkJwt, ticketController.createTicket);

// Get all tickets route
router.get("/", ticketController.getAllTickets);

// Get ticket by id
router.get("/:id", ticketController.getTicketById);

// Update ticket
router.put("/:id", ticketController.updateTicket);

// Delete ticket
router.delete("/:id", ticketController.deleteTicket);

module.exports = router;
