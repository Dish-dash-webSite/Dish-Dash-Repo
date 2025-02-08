const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware"); // Ensure this extracts JWT from cookies

// Authentication Routes
router.post("/register", userController.register);
router.post("/login", userController.login); // Will set token in cookies
router.post("/logout", userController.logout); // Logout should clear cookies

// Protected Routes (Require Auth)
router.get("/profile", authMiddleware, userController.getProfile);
router.put("/profile", authMiddleware, userController.updateProfile);
router.delete("/profile", authMiddleware, userController.deleteProfile);

module.exports = router;
