import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Restaurant, Category } from '../types';

interface RestaurantsState {
  featuredRestaurants: Restaurant[];
  categories: Category[];
  popularRestaurants: Restaurant[];
  loading: boolean;
  searchResults: Restaurant[];
}

const initialState: RestaurantsState = {
  featuredRestaurants: [
    {
      id: '1',
      name: 'Chef Burgers London',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      discount: 40,
      type: 'Restaurant',
      address: '123 Burger St, London',
      cuisineType: 'Fast Food',
      contactNumber: '+44 20 1234 5678',
      openingH: '09:00',
      closingH: '22:00',
      rating: 4.5
    },
    {
      id: '2',
      name: 'Grand AI Cafe London',
      image: 'https://images.unsplash.com/photo-1564759298141-cef86f51d4d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      discount: 20,
      type: 'Restaurant',
      address: '456 Cafe St, London',
      cuisineType: 'Cafe',
      contactNumber: '+44 20 2345 6789',
      openingH: '08:00',
      closingH: '23:00',
      rating: 4.2
    },
    {
      id: '3',
      name: 'Butterbrot Caf\'e London',
      image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      discount: 17,
      type: 'Restaurant',
      address: '789 Bread St, London',
      cuisineType: 'Bakery',
      contactNumber: '+44 20 3456 7890',
      openingH: '07:00',
      closingH: '24:00',
      rating: 4.0
    }
  ],
  categories: [
    {
      id: '1',
      name: 'Burgers & Fast food',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      restaurantCount: 21
    },
    {
      id: '2',
      name: 'Salads',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      restaurantCount: 32
    },
    {
      id: '3',
      name: 'Pasta & Casuals',
      image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      restaurantCount: 4
    },
    {
      id: '4',
      name: 'Pizza',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      restaurantCount: 39
    },
    {
      id: '5',
      name: 'Breakfast',
      image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      restaurantCount: 4
    },
    {
      id: '6',
      name: 'Soups',
      image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      restaurantCount: 32
    }
  ],
  popularRestaurants: [
    {
      id: 'mcdonalds',
      name: 'McDonald\'s London',
      image: 'https://images.unsplash.com/photo-1619881590738-a111d176d906?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      type: 'Fast Food',
      address: '123 Oxford St, London',
      cuisineType: 'Fast Food',
      contactNumber: '+44 20 1234 5678',
      openingH: '06:00',
      closingH: '23:00',
      rating: 4.2
    },
    {
      id: 'papajohns',
      name: 'Papa Johns',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      type: 'Pizza',
      address: '456 Pizza Lane, London',
      cuisineType: 'Pizza',
      contactNumber: '+44 20 2345 6789',
      openingH: '11:00',
      closingH: '23:00',
      rating: 4.0
    },
    {
      id: 'kfc',
      name: 'KFC West London',
      image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      type: 'Fast Food',
      address: '789 Chicken St, London',
      cuisineType: 'Fast Food',
      contactNumber: '+44 20 3456 7890',
      openingH: '10:00',
      closingH: '23:00',
      rating: 4.1
    }
  ],
  loading: false,
  searchResults: []
};

export const searchRestaurants = createAsyncThunk(
  'restaurants/search',
  async (searchParams: string | { lat: number; lng: number }) => {
    // Your search logic here
    return [];
  }
);

const restaurantsSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchRestaurants.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchRestaurants.fulfilled, (state, action) => {
        state.searchResults = action.payload;
      });
  },
});

export default restaurantsSlice.reducer;