import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlices";
import restaurantsReducer from "./restaurantsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    restaurants: restaurantsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
