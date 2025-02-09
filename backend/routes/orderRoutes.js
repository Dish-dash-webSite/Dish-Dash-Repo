// orderRoutes.js

const express = require('express');
const orderController = require('../controllers/orderController');
const router = express.Router();

// Create a new order
router.post('/create', orderController.createOrder);

router.post('/confirm-payment', orderController.confirmPayment);

module.exports = router;
