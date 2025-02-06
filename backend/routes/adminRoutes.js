const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const adminAuth = require('../middlewares/adminAuth');

// Public routes
router.post('/login', adminController.login);
router.get('/users', adminController.getAllUsers);
router.get('/users/:id', adminController.getUserById);
router.put('/users/:id', adminController.updateUser);
router.put('/users/:id/role', adminController.updateUserRole);
router.delete('/users/:id', adminController.deleteUser);
router.get('/restaurants',adminController.getAllRestaurants)
router.get('/users/:id',adminController.getRestaurantById)

// Protected routes
router.post('/logout', adminController.logout);

// Admin registration route
router.post('/register', adminController.register);

router.put('/users/ban/:id', adminController.banUser);


module.exports = router; 