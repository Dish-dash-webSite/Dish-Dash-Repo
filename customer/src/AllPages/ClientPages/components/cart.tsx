import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import { addItem, removeItem } from '../../../store/cartSlice';
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalItems, totalPrice } = useSelector((state: RootState) => state.cart);

  const handleIncrement = (item: CartItem) => {
    dispatch(addItem({ ...item, quantity: 1 }));
  };

  const handleDecrement = (item: CartItem) => {
    if (item.quantity > 1) {
      dispatch(addItem({ ...item, quantity: -1 }));
    } else {
      dispatch(removeItem(item));
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120 } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.2 } }
  };

  const cardHover = {
    hover: { 
      y: -2,
      boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
      transition: { type: 'spring', stiffness: 300 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F9FAFB] to-[#F3F4F6] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3 mb-8"
        >
          <ShoppingCart className="w-8 h-8 text-[#FC8A06]" />
          <h1 className="text-3xl font-bold text-[#03081F]">
            Your Cart <span className="text-[#FC8A06]">({totalItems} items)</span>
          </h1>
        </motion.div>
        
        <AnimatePresence>
          {items.length > 0 ? (
            <>
              <div className="space-y-4">
                {items.map((item) => (
                  <motion.div
                    key={item.name}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    whileHover="hover"
                    variants={cardHover}
                    className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-between border border-gray-100"
                  >
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-[#03081F]">{item.name}</h3>
                      <p className="text-[#6B7280]">${parseFloat(item.price).toFixed(2)} each</p>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <motion.button 
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDecrement(item)}
                        className="p-2 rounded-lg bg-[#FC8A06]/10 text-[#FC8A06] hover:bg-[#FC8A06]/20 transition-colors"
                      >
                        <Minus size={18} />
                      </motion.button>
                      
                      <span className="text-lg font-medium text-[#03081F] min-w-[24px] text-center">
                        {item.quantity}
                      </span>
                      
                      <motion.button 
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleIncrement(item)}
                        className="p-2 rounded-lg bg-[#FC8A06]/10 text-[#FC8A06] hover:bg-[#FC8A06]/20 transition-colors"
                      >
                        <Plus size={18} />
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => dispatch(removeItem(item))}
                        className="p-2 text-red-500/80 hover:text-red-600 transition-colors"
                      >
                        <Trash2 size={20} />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8 bg-white rounded-xl shadow-lg p-6 border border-gray-100"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-[#03081F]">Subtotal</h3>
                  <p className="text-2xl font-bold text-[#FC8A06]">${totalPrice.toFixed(2)}</p>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={totalItems === 0}
                  className="w-full bg-gradient-to-r from-[#FC8A06] to-[#FFA53E] text-white py-3 px-6 rounded-lg font-semibold text-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => navigate('/payment')}
                >
                  Proceed to Checkout
                </motion.button>
              </motion.div>

            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center py-20"
            >
              <ShoppingCart className="w-20 h-20 text-[#FC8A06] mb-4" />
              <h2 className="text-2xl font-semibold text-[#03081F]">Your cart is empty</h2>
              <p className="text-[#6B7280] mt-2">Add items to get started</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Cart;