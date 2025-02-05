const express = require('express');
const routerResto = express.Router();
const RestoController = require('../controllers/restaurantController');
const adminAuth = require('../middlewares/adminAuth');

// Public routes
routerResto.post('/login', RestoController.login);

// Protected routes
routerResto.post('/logout', adminAuth, RestoController.logout);

// Admin registration route
routerResto.post('/register', RestoController.register);

module.exports = router; 
