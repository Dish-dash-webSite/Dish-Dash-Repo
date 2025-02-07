// src/store/restaurantSlice.ts

import { createSlice } from '@reduxjs/toolkit';
import { Restaurant } from '../types';
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

export const addRestaurant = createAsyncThunk(
  'restaurants/addRestaurant',
  async (restaurantData: Restaurant, { rejectWithValue }) => {
    try {
      const response = await axios.post(`http://localhost:3000/api/resto/create`, restaurantData);
      return response.data; // Return restaurant data after successful creation
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add restaurant');
    }
  }
)

interface RestaurantState {
  restaurants: Restaurant[]; // List of restaurants
  loading: boolean;
  error: string | null;
}

const initialState: RestaurantState = {
  restaurants: [],
  loading: false,
  error: null,
};

const restaurantSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add Restaurant - Pending state
      .addCase(addRestaurant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Add Restaurant - Fulfilled state
      .addCase(addRestaurant.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurants.push(action.payload); // Add new restaurant to the list
      })
      // Add Restaurant - Rejected state
      .addCase(addRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Set error if the request fails
      });
  },
});

export const { clearError } = restaurantSlice.actions;
export default restaurantSlice.reducer;
