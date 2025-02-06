




import { createSlice } from "@reduxjs/toolkit";
import { loginUser, fetchUserProfile, logoutUser } from "./authThunks";

const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: token || null,
    isLoading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
      });
  },
});

export default authSlice.reducer;



















// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // Define API base URL
// const API_URL = "/api/users";

// // Get token from localStorage (if exists)
// const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

// // Async Thunks
// export const loginUser = createAsyncThunk(
//   "auth/login",
//   async (credentials: { email: string; password: string }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${API_URL}/login`, credentials);
//       localStorage.setItem("token", response.data.token);
//       return response.data; // { user, token }
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || "Login failed");
//     }
//   }
// );

// export const registerUser = createAsyncThunk(
//   "auth/register",
//   async (userData: { name: string; email: string; password: string }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${API_URL}/register`, userData);
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || "Registration failed");
//     }
//   }
// );

// export const fetchUserProfile = createAsyncThunk(
//   "auth/fetchProfile",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`${API_URL}/profile`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       return response.data;
//     } catch (error:any) {
//       return rejectWithValue(error.response?.data?.message || "Failed to fetch profile");
//     }
//   }
// );

// export const logoutUser = createAsyncThunk("auth/logout", async () => {
//   await axios.post(`${API_URL}/logout`);
//   return null;
// });

// // Auth Slice
// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     user: null,
//     token: token || null,
//     isLoading: false,
//     error: null as string | null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginUser.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload as string;
//       })
//       .addCase(registerUser.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state) => {
//         state.isLoading = false;
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload as string;
//       })
//       .addCase(fetchUserProfile.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(fetchUserProfile.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.user = action.payload;
//       })
//       .addCase(fetchUserProfile.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload as string;
//       })
//       .addCase(logoutUser.fulfilled, (state) => {
//         state.user = null;
//         state.token = null;
//       });
//   },
// });

// export default authSlice.reducer;
