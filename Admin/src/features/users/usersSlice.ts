import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
    id: number;
    email: string;
    role: 'customer' | 'restaurant' | 'driver' | 'admin';
    phoneNumber?: string;
    createdAt: string;
    updatedAt: string;
}

interface UsersState {
    users: User[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: UsersState = {
    users: [],
    status: 'idle',
    error: null
};

// Async thunk for fetching users
export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/users/profile', {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw error.response?.data?.message || 'Failed to fetch users';
            }
            throw 'Failed to fetch users';
        }
    }
);

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload;
                state.error = null;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch users';
            });
    }
});

export default usersSlice.reducer; 