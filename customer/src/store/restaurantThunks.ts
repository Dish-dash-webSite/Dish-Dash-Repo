import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Restaurant } from '../types';

const BASE_URL = 'http://localhost:3000/api/resto';

// Fetch all restaurants
export const fetchRestaurants = createAsyncThunk<Restaurant[]>(
  'restaurants/fetchRestaurants',
  async () => {
    try {
      const response = await axios.get<Restaurant[]>(BASE_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      throw error;
    }
  }
);

// Fetch popular restaurants
export const fetchPopularRestaurants = createAsyncThunk<Restaurant[]>(
  'restaurants/fetchPopularRestaurants',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<Restaurant[]>('http://localhost:3000/api/resto/popular', {
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (!Array.isArray(response.data)) {
        throw new Error('Invalid response format');
      }
      
      return response.data;
    } catch (error: any) {
      console.error('Fetch error:', error.response || error);
      return rejectWithValue(error.response?.data || 'Failed to fetch restaurants');
    }
  }
);

// Define search params type
type SearchParams = string | { lat: number; lng: number };

export const searchRestaurants = createAsyncThunk<Restaurant[], SearchParams>(
  'restaurants/search',
  async (searchParams) => {
    try {
      const response = await axios.get<Restaurant[]>(`/api/resto/search`, {
        params: typeof searchParams === 'string' ? { q: searchParams } : searchParams
      });
      return response.data;
    } catch (error) {
      console.error('Error searching restaurants:', error);
      throw error;
    }
  }
);
