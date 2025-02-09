import { createSlice } from "@reduxjs/toolkit";
import { loginResto, registerResto } from "./authThunkcResto";
import { AuthState } from "../types/index";

const initialState: AuthState = {
    user: null,
    token: null,
    loading: false,
    error: null,
};

const authRestoSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Login cases
            .addCase(loginResto.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginResto.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(loginResto.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Register cases
            .addCase(registerResto.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerResto.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(registerResto.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    }
})

export const { clearError } = authRestoSlice.actions;
export default authRestoSlice.reducer;