import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Category {
  id: number;
  name: string;
}

export const fetchCategories = createAsyncThunk<Category[]>(
  'categories/fetchCategories',
  async () => {
    const response = await axios.get<Category[]>('/api/resto/categories');
    return response.data;
  }
); 