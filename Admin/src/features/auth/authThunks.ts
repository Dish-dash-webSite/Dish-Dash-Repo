import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginStart, loginSuccess, loginFailure } from './authSlice';
import axios from 'axios';

export const login = createAsyncThunk(
    'admin/login',
    async ({ email, password }: { email: string; password: string }, { dispatch }) => {
        dispatch(loginStart());
        try {
            const response = await axios.post('http://localhost:3000/api/admin/login', { email, password }, {
                withCredentials: true, // Include cookies
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.data) {
                dispatch(loginSuccess(response.data));
                console.log('Login successful:', response.data);
                return response.data;
            } else {
                throw new Error('Login failed: No data received');
            }
        } catch (error) {
            let message = 'Login failed';
            if (axios.isAxiosError(error)) {
                // Handle Axios-specific errors
                message = error.response?.data?.message || error.message;
            } else if (error instanceof Error) {
                // Handle generic errors
                message = error.message;
            }
            console.error('Login error:', message);
            dispatch(loginFailure(message));
            throw error;
        }
    }
); 