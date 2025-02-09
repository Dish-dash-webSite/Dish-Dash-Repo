// orderRoutes.js

const express = require('express');
const orderController = require('../controllers/orderController');
const router = express.Router();

// Create a new order
router.post('/create', async (req, res) => {
  try {
    await orderController.createOrder(req, res);
  } catch (error) {
    console.error('Error in order creation route:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

router.post('/confirm-payment', orderController.confirmPayment);

module.exports = router;
