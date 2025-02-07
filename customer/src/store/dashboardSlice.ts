import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch dashboard data
export const fetchDashboardData = createAsyncThunk(
  "dashboard/fetchDashboardData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:3000/api/driver/dashboard", {}, { withCredentials: true });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch dashboard data");
    }
  }
);

// Initial state
interface DashboardState {
  driver: any;
  balance: number;
  delivered: number;
  available: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  driver: "",
  balance: 0,
  delivered: 0,
  available: 0,
  isLoading: false,
  error: null,
};

// Slice
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.driver = action.payload.driver;
        state.balance = action.payload.balance;
        state.delivered = action.payload.Delivered;
        state.available = action.payload.available;
        state.isLoading = false;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      });
  },
});

export default dashboardSlice.reducer;
