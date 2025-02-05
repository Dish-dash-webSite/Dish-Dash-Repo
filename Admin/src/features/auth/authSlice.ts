import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

interface AuthState {
    user: {
        id: string;
        email: string;
        role: string;
    } | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
};

// Async thunk for logout
export const logoutThunk = createAsyncThunk(
    'auth/logoutThunk',
    async (_, { dispatch }) => {
        try {
            // Call your logout API endpoint
            await fetch('http://localhost:3000/api/admin/logout', {
                method: 'POST',
                credentials: 'include',
            });
            
            // Dispatch the logout action
            dispatch(logout());
        } catch (error) {
            console.error('Logout failed:', error);
            throw error;
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart(state) {
            state.loading = true;
            state.error = null;
        },
        loginSuccess(state, action: PayloadAction<{ id: string; email: string; role: string }>) {
            state.user = action.payload;
            state.loading = false;
            state.error = null;
        },
        loginFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        logout(state) {
            state.user = null;
            state.loading = false;
            state.error = null;
        }
    },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer; 