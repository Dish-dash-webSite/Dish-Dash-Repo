import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Loader2, CreditCard } from 'lucide-react';
import { RootState } from '../../../store';
import axios from 'axios';  
import { createOrder, createPayment, setPaymentStatus } from '../../../store/cartSlice';

const stripePromise = loadStripe('pk_test_51QpoShDsjllDQns0wu4qDGefRuo61uCqb6Hn5Yo9HmMMEPH8sCutR7yzf4sDVeQLPyVTyor00UoecTprhVWvSG3u00CY2xp2MW');


const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const { totalPrice, orderId, paymentStatus, items } = useSelector((state: RootState) => state.cart);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
console.log('Items:', items);
  const handlePayment = async () => {
    if (!stripe || !elements) {
      console.error('Stripe or Elements not loaded');
      return;
    }

    setIsProcessing(true);

    try {
      // First create the order
      if (!orderId) {
        // Validate items before creating the order
        const invalidItems = items.filter(item => {
          const itemId = String(item.id);
          return !itemId || itemId.startsWith('temp-');
        });
        
        if (invalidItems.length > 0) {
          throw new Error('Some items have invalid IDs. Please refresh the menu and try again.');
        }
        
        const orderData = {
          items: items.map(item => ({
            id: String(item.id),
            quantity: item.quantity,
            price: item.price
          })),
          totalAmount: totalPrice,
          customerId: 1,
          restaurantId: 1,
          deliveryAddress: '123 Main St'
        };
        
        const createdOrder = await dispatch(createOrder(orderData)).unwrap();
        if (!createdOrder?.orderId) {
          throw new Error('Failed to create order: No order ID returned');
        }
      }

      // Then create payment intent
      const { clientSecret } = await dispatch(createPayment({
        amount: totalPrice * 100,
        currency: 'usd',
        orderId: orderId
      })).unwrap();

      // Confirm payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
        },
      });

      if (result.error) {
        throw result.error;
      }

      if (result.paymentIntent.status === 'succeeded') {
        await axios.post('http://localhost:3000/api/payments/confirm-payment', {
          paymentIntentId: result.paymentIntent.id
        });
        setPaymentSuccess(true);
        dispatch(setPaymentStatus('paid'));
      }
    } catch (error: unknown) {
      console.error('Payment process error:', error);
      if (error instanceof Error) {
        alert('Payment failed: ' + error.message);
      } else if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error || error.message;
        alert('Payment failed: ' + errorMessage);
      } else {
        alert('Payment failed: An unknown error occurred');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#03081F',
        '::placeholder': {
          color: '#9CA3AF',
        },
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        <div className="flex items-center gap-3 mb-8">
          <CreditCard className="w-8 h-8 text-[#FC8A06]" />
          <h1 className="text-3xl font-bold text-[#03081F]">Payment Details</h1>
        </div>

        <AnimatePresence>
          {paymentSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center py-12"
            >
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-6">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold text-[#03081F] mb-2">Payment Successful!</h2>
              <p className="text-[#6B7280]">Your order has been processed successfully.</p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-gray-50 p-4 rounded-lg">
                <CardElement options={cardElementOptions} />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePayment}
                disabled={isProcessing || !stripe}
                className="w-full bg-gradient-to-r from-[#FC8A06] to-[#FFA53E] text-white py-3 px-6 rounded-lg font-semibold text-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isProcessing ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  `Pay $${totalPrice.toFixed(2)}`
                )}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const Payment: React.FC = () => {
  console.log('Rendering Payment component');
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F9FAFB] to-[#F3F4F6] py-12 px-4 sm:px-6 lg:px-8">
      <Elements stripe={stripePromise}>
        <PaymentForm />
      </Elements>
    </div>
  );
};

export default Payment; 