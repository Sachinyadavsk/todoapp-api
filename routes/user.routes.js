const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth.middleware");

// Public Routes
router.post("/register", userController.register);
router.post("/login", userController.login);

// Protected Routes
router.get("/", userController.getUsers);
router.get("/:id", authMiddleware, userController.getUser);
router.put("/:id", authMiddleware, userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;