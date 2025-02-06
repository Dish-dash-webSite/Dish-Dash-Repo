import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

type UserRole = 'customer' | 'restaurantowner' | 'meta' | 'driver' | 'admin' | 'banned';

interface User {
    id: number;
    email: string;
    role: UserRole;
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
            const response = await axios.get('http://localhost:3000/api/admin/users', {
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

export const updateUserRole = createAsyncThunk(
    'users/updateRole',
    async ({ userId, role }: { userId: number, role: string }, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `http://localhost:3000/api/admin/users/${userId}/role`,
                { role },
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data?.message || 'Failed to update role');
            }
            return rejectWithValue('Failed to update role');
        }
    }
);

export const banUser = createAsyncThunk(
    'users/banUser',
    async ({ userId, isBanned }: { userId: number, isBanned: boolean }, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `http://localhost:3000/api/admin/users/ban/${userId}`,
                { isBanned },
                { withCredentials: true }
            );

            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data?.message || 'Failed to ban/unban user');
            }
            return rejectWithValue('Failed to ban/unban user');
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
            })
            .addCase(updateUserRole.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateUserRole.fulfilled, (state, action) => {
                const updatedUser = action.payload;
                state.users = state.users.map(user => 
                    user.id === updatedUser.id ? updatedUser : user
                );
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(updateUserRole.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string || 'Failed to update role';
            })
            .addCase(banUser.fulfilled, (state, action) => {
                const updatedUser = action.payload.user;
                state.users = state.users.map(user =>
                    user.id === updatedUser.id ? updatedUser : user
                );
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(banUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string || 'Failed to ban/unban user';
            });
    }
});

export default usersSlice.reducer; 