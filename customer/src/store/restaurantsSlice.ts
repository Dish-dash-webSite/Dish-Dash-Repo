import { createSlice } from '@reduxjs/toolkit';
import { fetchPopularRestaurants, searchRestaurants } from './restaurantThunks';
import type { Restaurant } from '../types';

interface RestaurantsState {
  popularRestaurants: Restaurant[];
  searchResults: Restaurant[];
  loading: boolean;
  error: string | null;
}

const initialState: RestaurantsState = {
  popularRestaurants: [],
  searchResults: [],
  loading: false,
  error: null
};

const restaurantsSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Popular restaurants
      .addCase(fetchPopularRestaurants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopularRestaurants.fulfilled, (state, action) => {
        state.loading = false;
        state.popularRestaurants = action.payload;
        console.log('Popular restaurants updated:', action.payload);
      })
      .addCase(fetchPopularRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch restaurants';
      })
      // Search restaurants
      .addCase(searchRestaurants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchRestaurants.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to search restaurants';
      });
  },
});

export default restaurantsSlice.reducer;