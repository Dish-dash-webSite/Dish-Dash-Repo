import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RestoRegistartion, RestoLogin, AuthResponse } from "../types/index";
// Login user
export const loginResto = createAsyncThunk(
    "auth/loginResto",
    async (credentials: RestoLogin, { rejectWithValue }) => {
        try {
            const response = await axios.post<AuthResponse>("http://localhost:3000/api/owner/loginResto", credentials, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            console.log('Login response:', response.data);  // Debugging log
            return response.data
                ;  // Return the successful response data
        } catch (error: any) {  // Fixing the error syntax here
            console.error('Login error:', {
                status: error?.response?.status,
                data: error?.response?.data,
                message: error?.message,
            });

            // Return a rejected value with a meaningful error message
            return rejectWithValue(
                error?.response?.data?.message ||
                error.message ||
                "An unexpected error occurred while logging in."
            );
        }
    })

// Register user
export const registerResto = createAsyncThunk(
    'auth/Restoregister',
    async (userData: RestoRegistartion, { rejectWithValue }) => {
        try {
            const response = await axios.post<AuthResponse>(`http://localhost:3000/api/owner/createResto`, userData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message ||
                error.message ||
                "Registration failed"
            );
        }
    }
);

// Fetch user profile
// export const fetchUserProfile = createAsyncThunk(
//     "auth/fetchProfile",
//     async (_, { rejectWithValue }) => {
//         try {
//             const response = await axios.get(`${API_URL}/profile`, {
//                 withCredentials: true,
//             });
//             return response.data;
//         } catch (error: any) {
//             return rejectWithValue(
//                 error.response?.data?.message ||
//                 error.message ||
//                 "Failed to fetch profile"
//             );
//         }
//     }
// );

// Logout user
// export const logoutUser = createAsyncThunk(
//     "auth/logout",
//     async (_, { rejectWithValue }) => {
//         try {
//             await axios.post(`${API_URL}/logout`, {}, {
//                 withCredentials: true
//             });
//             return null;
//         } catch (error: any) {
//             return rejectWithValue(
//                 error.response?.data?.message ||
//                 error.message ||
//                 "Logout failed"
//             );
//         }
//     }
// );
