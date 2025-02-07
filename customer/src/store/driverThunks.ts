import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { VerifyDriverResponse } from "../types"; // Adjust the import path as needed


export const verifyDriver = createAsyncThunk(
  "driver/verifyDriver",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post<VerifyDriverResponse>(
        "http://localhost:3000/api/driver/verifyDriver",
        {},
        { withCredentials: true }
      );

      // Add a 3-second delay before resolving
      console.log("response.data",response.data);
      
      await new Promise((resolve) => setTimeout(resolve, 3000));
      return response.data; // Return the verified driver data
    } catch (error: any) {
      // Add a 3-second delay even if there's an error
      await new Promise((resolve) => setTimeout(resolve, 3000));
      return rejectWithValue(error.response?.data?.message || "Verification failed");
    }
  }
);


