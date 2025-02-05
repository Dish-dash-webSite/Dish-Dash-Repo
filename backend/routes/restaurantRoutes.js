const express = require('express');
const routerResto = express.Router();
const RestoController = require('../controllers/restaurantController');
const validateLogin = require('../middlewares/restoOwner');

// Public routes
routerResto.post('/login', validateLogin, RestoController.login);

// Protected routes
// routerResto.post('/logout', logout);

// Admin registration route
routerResto.post('/register', RestoController.register);
routerResto.get("/All/:id", RestoController.getAllRestaurant)

module.exports = routerResto; 
