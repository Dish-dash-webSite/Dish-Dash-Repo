const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const adminAuth = require('../middlewares/adminAuth');

// Public routes
router.post('/login', adminController.login);

// Protected routes
router.post('/logout', adminController.logout);

// Admin registration route
router.post('/register', adminController.register);

module.exports = router; 