const express = require('express');
const routerResto = express.Router();
const RestoController = require('../controllers/restaurantController');
const validateLogin = require('../middlewares/restoOwner');

// Public routes
// routerResto.post('/login', validateLogin, RestoController.login);

// Protected routes
// routerResto.post('/logout', logout);

// Admin registration route
// routerResto.post('/register', RestoController.register);
// routerResto.post("/create", RestoController.CrateRestaurant)

// Import controller

// Get all restaurants
routerResto.get('/', RestoController.getAllRestaurants);
routerResto.get("/all", RestoController.getAllResto)
// Get a single restaurant by ID
routerResto.get('/:id', RestoController.getRestaurantById);

// Create a new restaurant
// router.post('/', RestoController.CrateRestaurant);


// Update a restaurant
routerResto.put('/:id', RestoController.updateRestaurant);


// Delete a restaurant
routerResto.delete('/:id', RestoController.deleteRestaurant);


module.exports = routerResto;






