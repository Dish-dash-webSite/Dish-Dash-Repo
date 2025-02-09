import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Swal from 'sweetalert2'
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

interface CartItem {
  name: string;
  price: string;
  quantity: number;
  id: string;
  imageUrl: string;
  description: string;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  orderId: string | null;
  paymentStatus: string;
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  orderId: null,
  paymentStatus: 'pending'
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<AppetizerProps & { quantity?: number }>) => {
      const quantity = action.payload.quantity || 1;
      
      // Ensure ID is a string
      const itemId = String(action.payload.id);
      
      if (!itemId) {
        throw new Error('Cannot add item to cart without an ID');
      }
      
      const existingItem = state.items.find(item => item.id === itemId);
      
      if (existingItem) {
        existingItem.quantity += quantity;
        if (existingItem.quantity < 1) {
          existingItem.quantity = 1;
        }
      } else {
        state.items.push({ 
          id: itemId, // Use the string ID
          name: action.payload.name,
          price: action.payload.price,
          quantity: 1,
          imageUrl: action.payload.imageUrl,
          description: action.payload.description
        });
      }
      
      state.totalItems += quantity;
      state.totalPrice += parseFloat(action.payload.price) * quantity;
      
      // Ensure totals don't go negative
      if (state.totalItems < 0) state.totalItems = 0;
      if (state.totalPrice < 0) state.totalPrice = 0;
      
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Cart Updated",
        showConfirmButton: false,
        timer: 1500
      });
    },
    removeItem: (state, action: PayloadAction<CartItem>) => {
      const itemIndex = state.items.findIndex(item => item.name === action.payload.name);
      if (itemIndex >= 0) {
        const item = state.items[itemIndex];
        state.totalItems -= item.quantity;
        state.totalPrice -= parseFloat(item.price) * item.quantity;
        state.items.splice(itemIndex, 1);
      }
    },
    setOrderId: (state, action: PayloadAction<string>) => {
      state.orderId = action.payload;
    },
    setPaymentStatus: (state, action: PayloadAction<string>) => {
      state.paymentStatus = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.orderId = action.payload.orderId;
    });
  }
});

// Create order thunk
const createOrder = createAsyncThunk('cart/createOrder', async (orderData, { dispatch }) => {
  try {
    const response = await axios.post('http://localhost:3000/api/orders/create', orderData);
    if (!response.data?.order?.id) {
      throw new Error('Order creation failed: No order ID returned from server');
    }
    return { orderId: response.data.order.id }; // Ensure orderId is returned
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
});

// Create payment thunk
const createPayment = createAsyncThunk('cart/createPayment', async (paymentData, { dispatch, getState }) => {
  const state = getState() as RootState;
  const response = await axios.post('http://localhost:3000/api/payments/create-payment-intent', {
    amount: paymentData.amount,
    currency: paymentData.currency,
    orderId: paymentData.orderId
  });
  return response.data;
});

export const { addItem, removeItem, setOrderId, setPaymentStatus } = cartSlice.actions;
export { createOrder, createPayment };
export default cartSlice.reducer;