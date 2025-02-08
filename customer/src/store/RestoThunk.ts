// restaurantThunk.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// This function fetches the menu data for a restaurant
export const fetchMenu = createAsyncThunk(
    'restaurant/fetchMenuData', // Action name
    async (restaurantId: string) => {
        try {
            // Replace with your actual API endpoint
            const response = await axios.get(`http://localhost:3000/api/owner/all/${restaurantId}`);
            console.log("data from menu bonjour", response.data)
            return response.data; // Return the menu data to the reducer
        } catch (error) {
            throw new Error('Failed to fetch menu data');
        }
    }
);
