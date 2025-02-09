// orderController.js

const { Order, Payment, OrderItem } = require('../database/associations');
const stripe = require('stripe');

exports.createOrder = async (req, res) => {
  try {
    const { items, totalAmount, customerId, restaurantId, deliveryAddress } = req.body;
    
    console.log('Received order data:', { items, totalAmount, customerId, restaurantId, deliveryAddress });

    // Validate required fields
    if (!items || !totalAmount || !customerId || !restaurantId || !deliveryAddress) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate items array
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Items must be a non-empty array' });
    }

    // Validate menuItemId for each item
    const invalidItems = items.filter(item => !item.id);
    if (invalidItems.length > 0) {
      return res.status(400).json({ error: 'Some items are missing valid IDs' });
    }

    // Create the order
    const order = await Order.create({
      customerId,
      restaurantId,
      totalAmount,
      deliveryAddress,
      status: 'pending',
      paymentStatus: 'pending'
    });

    console.log('Order created:', order.toJSON());

    // Create order items
    const orderItems = items.map(item => {
      return {
        orderId: order.id,
        menuItemId: item.id,
        quantity: item.quantity,
        priceAtTimeOfOrder: item.price
      };
    });

    await OrderItem.bulkCreate(orderItems);

    res.status(201).json({
      success: true,
      order: {
        id: order.id
      },
      message: 'Order created successfully'
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
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

    console.log('Payment and order status updated:', { payment, order });

    res.status(200).json({
      success: true,
      message: 'Payment confirmed and order status updated'
    });
  } catch (error) {
    console.error('Error confirming payment:', error);
    res.status(500).json({ error: error.message });
  }
};
