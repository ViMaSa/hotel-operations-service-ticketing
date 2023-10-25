const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");
const checkJwt = require("../middleware/jwtMiddleware");

router.post("/register", userController.registerUser);

router.post("/login", userController.loginUser);

router.get("/:id", checkJwt, userController.getUserById);

router.put("/:id", userController.updateUser);

router.delete("/:id", userController.deleteUser);

module.exports = router;
