const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController'); // Import controller

// Get all restaurants
router.get('/', restaurantController.getAllRestaurants);

// Get a single restaurant by ID
router.get('/:id', restaurantController.getRestaurantById);

// Create a new restaurant
router.post('/', restaurantController.createRestaurant);

// Update a restaurant
router.put('/:id', restaurantController.updateRestaurant);

// Delete a restaurant
router.delete('/:id', restaurantController.deleteRestaurant);

module.exports = router;






