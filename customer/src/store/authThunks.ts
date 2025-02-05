import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "/api/users";

// ✅ Login user (uses cookies instead of localStorage)
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials, {
        withCredentials: true, // ✅ Allow cookies
      });
      return response.data; // No need to manually store tokens
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// ✅ Fetch user profile (cookies will handle auth)
export const fetchUserProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/profile`, {
        withCredentials: true, // ✅ Ensure cookies are sent
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch profile");
    }
  }
);

// ✅ Logout user (cookies will be cleared server-side)
export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
  return null;
});
