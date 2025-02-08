// restaurantSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { fetchMenu } from './RestoThunk'; // Import thunk for fetching menu data

interface RestaurantState {
    menu: any | null; // The menu data will be fetched for a restaurant
    loading: boolean;
    error: string | null;
}

const initialState: RestaurantState = {
    menu: [],
    loading: false,
    error: null,
};

const restaurantSlice = createSlice({
    name: 'restaurant',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMenu.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMenu.fulfilled, (state, action) => {
                state.menu = action.payload;
                state.loading = false;
            })
            .addCase(fetchMenu.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to fetch menu data';
                state.loading = false;
            });
    },
});

export default restaurantSlice.reducer;
