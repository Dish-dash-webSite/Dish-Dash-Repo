import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UserSignin, UserSignup, AuthResponse } from "../types/index";

const API_URL = "http://localhost:3000/api/users";

axios.defaults.withCredentials = true;


// Login user
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials: UserSignin, { rejectWithValue }) => {
    try {
      console.log('Making login request to:', `${API_URL}/login`);
      const response = await axios.post<AuthResponse>(`${API_URL}/login`, credentials, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      });
      console.log('Login response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Login error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      return rejectWithValue(
        error.response?.data?.message || 
        error.message || 
        "Login failed"
      );
    }
  }
);

// Register user
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: UserSignup, { rejectWithValue }) => {
    try {
      const response = await axios.post<AuthResponse>(`${API_URL}/register`, userData, {
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
export const fetchUserProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/profile`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 
        error.message || 
        "Failed to fetch profile"
      );
    }
  }
);

// Logout user
export const logoutUser = createAsyncThunk(
  "auth/logout", 
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(`${API_URL}/logout`, {}, { 
        withCredentials: true 
      });
      return null;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 
        error.message || 
        "Logout failed"
      );
    }
  }
);
