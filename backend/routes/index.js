const express = require("express");
const router = express.Router();
const { checkJwt } = require("../middleware/jwtMiddleware");

// Route variables
const ticketRoutes = require("./ticket");
const userRoutes = require("./user");

// Routes
router.use("/tickets", checkJwt, ticketRoutes);
router.use("/user", userRoutes);

// Home page route
router.use("", (req, res) => {
  res.send("This is the start of the backend");
});

// Air Brake route
router.get('/hello/', function hello(_req, _res) {
  throw new Error('hello from Express');
});

module.exports = router;
