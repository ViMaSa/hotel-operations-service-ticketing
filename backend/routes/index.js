const express = require("express");
const router = express.Router();
const checkJWT = require("../middleware/jwtMiddleware");

// Route variables
const ticketRoutes = require("./ticket");
const userRoutes = require("./user");

// Routes
router.use("/tickets", checkJWT, ticketRoutes);
router.use("/user", userRoutes);

// Home page route
router.use("", (req, res) => {
  res.send("This is the start of the backend");
});

module.exports = router;
