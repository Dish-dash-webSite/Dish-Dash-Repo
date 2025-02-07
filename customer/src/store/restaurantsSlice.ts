import { createSlice } from '@reduxjs/toolkit';
import type { Restaurant, Category } from '../types';

interface RestaurantsState {
  featuredRestaurants: Restaurant[];
  categories: Category[];
  popularRestaurants: Restaurant[];
}

const initialState: RestaurantsState = {
  featuredRestaurants: [
    {
      id: '1',
      name: 'Chef Burgers London',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      discount: 40,
      type: 'Restaurant'
    },
    {
      id: '2',
      name: 'Grand AI Cafe London',
      image: 'https://images.unsplash.com/photo-1564759298141-cef86f51d4d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      discount: 20,
      type: 'Restaurant'
    },
    {
      id: '3',
      name: 'Butterbrot Caf\'e London',
      image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      discount: 17,
      type: 'Restaurant'
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
      type: 'Fast Food'
    },
    {
      id: 'papajohns',
      name: 'Papa Johns',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      type: 'Pizza'
    },
    {
      id: 'kfc',
      name: 'KFC West London',
      image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      type: 'Fast Food'
    }
  ]
};

export const restaurantsSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {}
});

export default restaurantsSlice.reducer;