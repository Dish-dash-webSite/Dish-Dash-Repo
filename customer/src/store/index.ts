import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlices";
import RestoCreate from "./RestoSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    resto: RestoCreate,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
