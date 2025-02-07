import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Category } from '../types';

export const fetchCategories = createAsyncThunk<Category[]>(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<Category[]>('http://localhost:3000/api/resto/categories', {
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
      return rejectWithValue('Failed to fetch categories');
    }
  }
); 