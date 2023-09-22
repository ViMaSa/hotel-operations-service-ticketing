const express = require("express");
const router = express.Router();

// Route variables
const ticketRoutes = require("./ticket");

// Routes
router.use("/tickets", ticketRoutes);

// Home page route
router.use("", (req, res) => {
  res.send("This is the start of the backend");
});

module.exports = router;
