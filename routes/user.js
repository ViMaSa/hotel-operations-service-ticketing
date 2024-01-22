const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");
const { checkJwt } = require("../middleware/jwtMiddleware");

router.post("/register", userController.registerUser);

router.post("/login", userController.loginUser);

router.post("/refresh", userController.refreshUserToken);

router.get("/:id", checkJwt, userController.getUserById);

router.put("/:id", checkJwt, userController.updateUser);

router.delete("/:id", checkJwt, userController.deleteUser);

module.exports = router;
