// profileThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store"; // Import RootState for type safety
import { UserProfile, UserRole } from "../types";
const API_URL = "http://localhost:3000/api/users";

axios.defaults.withCredentials = true;

// Fetch user profile
export const fetchProfile = createAsyncThunk(
  "profile/fetch",
  async (_, { rejectWithValue }) => {
    try {
      console.log('Fetching profile...');
      const response = await axios.get(`${API_URL}/profile`, {
        withCredentials: true // Important for cookies/auth
      });
      console.log('Profile response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Profile fetch error:', error);
      return rejectWithValue(error.response?.data?.message || "Failed to fetch profile");
    }
  }
);

// Update user profile
export const updateProfile = createAsyncThunk(
  "profile/update",
  async (profileData: Partial<UserProfile>, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/profile`, profileData, {
        withCredentials: true
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to update profile");
    }
  }
);

export const deleteProfile = createAsyncThunk(
  "profile/delete",
  async (_, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/profile`);
      return null;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete profile");
    }
  }
);