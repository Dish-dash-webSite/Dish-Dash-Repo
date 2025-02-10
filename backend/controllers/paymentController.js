// paymentController.js
const stripe = require('stripe')("ge ur code from stripe");
const { Payment, Order } = require('../database/associations');

exports.createPayment = async (req, res) => {
  const { amount, currency, orderId } = req.body;
  console.log('Received payment data:', { amount, currency, orderId });
  try {
    console.log('Creating payment intent with data:', { amount, currency, orderId });
    // Verify order exists
    const order = await Order.findByPk(orderId);
    if (!order) {
      console.error('Order not found for ID:', orderId);
      return res.status(404).json({ error: 'Order not found' });
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
      metadata: { orderId }
    });

    console.log('Payment intent created:', paymentIntent.id);

    // Create payment record
    const payment = await Payment.create({
      orderId,
      paymentIntentId: paymentIntent.id,
      amount,
      currency,
      status: 'pending'
    });

    console.log('Payment record created:', payment.id);

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      orderId,
      paymentId: payment.id
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.confirmPayment = async (req, res) => {
  try {
    const { paymentIntentId } = req.body;

    console.log('Confirming payment for intent:', paymentIntentId);

    // Retrieve payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    const orderId = paymentIntent.metadata.orderId;

    console.log('Payment intent retrieved, order ID:', orderId);

    // Update payment and order status
    const [payment, order] = await Promise.all([
      Payment.update(
        { status: 'paid' },
        { where: { paymentIntentId } }
      ),
      Order.update(
        { status: 'confirmed', paymentStatus: 'paid' },
        { where: { id: orderId } }
      )
    ]);

    console.log('Payment and order status updated');

    res.status(200).json({
      success: true,
      message: 'Payment confirmed and order status updated'
    });
  } catch (error) {
    console.error('Error confirming payment:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.createPaymentIntent = async (req, res) => {
  const { amount, currency, orderId } = req.body;
  console.log('Received payment data:', { amount, currency, orderId });
  try {
    console.log('Creating payment intent with data:', { amount, currency, orderId });
    
    // Verify order exists
    const order = await Order.findByPk(orderId);
    if (!order) {
      console.error('Order not found for ID:', orderId);
      return res.status(404).json({ error: 'Order not found' });
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
      metadata: { orderId }
    });

    console.log('Payment intent created:', paymentIntent.id);

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      orderId,
      paymentId: paymentIntent.id
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.createPaymentRecord = async (req, res) => {
  const { orderId, paymentIntentId, amount, currency, status } = req.body;
  try {
    const payment = await Payment.create({
      orderId,
      paymentIntentId,
      amount,
      currency,
      status
    });

    res.status(201).json({
      success: true,
      payment
    });
  } catch (error) {
    console.error('Error creating payment record:', error);
    res.status(500).json({ error: error.message });
  }
};