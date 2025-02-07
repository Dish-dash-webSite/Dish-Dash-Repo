  import { createSlice } from "@reduxjs/toolkit";
  import { verifyDriver } from "./driverThunks";

  interface DriverState {
    isVerified: boolean;
    isLoading: boolean;
    error: string | null;
    driver: any; 
    balance: number;
    delivered: number;
    available: number;
  }

  export const initialState: DriverState = {
    isVerified: false,
    isLoading: true,
    error: null,
    driver: null,
    balance: 0,
    delivered: 0,
    available: 0,
  };


  const driverSlice = createSlice({
    name: "driver",
    initialState,
    reducers: {
      clearError: (state) => {
        state.error = null;
      },
      setLoading: (state, action) => {
        state.isLoading = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
        // Verify Driver cases
        .addCase(verifyDriver.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(verifyDriver.fulfilled, (state, action) => {
          state.isVerified = Boolean(action.payload?.isDriver); // Ensure it's a boolean
          state.driver = action.payload; // Store full driver data separately
          state.isLoading = false;
        })
        
        
        .addCase(verifyDriver.rejected, (state, action) => {
          state.error = action.payload as string;
          state.isLoading = false; // No need for setTimeout here
        });
    },
  });

  export const { clearError, setLoading } = driverSlice.actions;
  export default driverSlice.reducer;