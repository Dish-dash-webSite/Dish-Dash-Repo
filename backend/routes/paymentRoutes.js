// paymentRoutes.js

const express = require('express');
const paymentController = require('../controllers/paymentController');
const router = express.Router();

router.post('/create-payment-intent', paymentController.createPaymentIntent);
router.post('/confirm-payment', paymentController.confirmPayment);

module.exports = router;
