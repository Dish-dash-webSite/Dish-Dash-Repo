// store/restaurantSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state for the restaurant
interface RestaurantState {
    name: string;
    cuisine: string;
    address: string;
    rating: number;
    contactNumber: string;
    openingTime: string;
    closingTime: string;
    loading: boolean;
    successMessage: string | null;
    error: string | null;
}

const initialState: RestaurantState = {
    name: '',
    cuisine: '',
    address: '',
    rating: 0,
    contactNumber: '',
    openingTime: '',
    closingTime: '',
    loading: false,
    successMessage: null,
    error: null,
};

// Async thunk to create restaurant
export const createRestaurant = createAsyncThunk(
    'restaurant/create',
    async (restaurantData: RestaurantState, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:3000/api/resto/create', restaurantData);
            console.log("hello from new", response.data)
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const restaurantSlice = createSlice({
    name: 'restaurant',
    initialState,
    reducers: {
        // Optionally, you can add an action to clear the success/error messages
        clearMessages: (state) => {
            state.successMessage = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createRestaurant.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(createRestaurant.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.successMessage = action.payload; // Set success message from backend response
            })
            .addCase(createRestaurant.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string; // Set error message
            });
    },
});

// Export actions and reducer
export const { clearMessages } = restaurantSlice.actions;
export default restaurantSlice.reducer;
