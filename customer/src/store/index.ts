import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlices";
import restaurantsReducer from "./restaurantsSlice";
import driverReducer from "./driverSlice";
import dashboardReducer from "./dashboardSlice";
import categoriesReducer from './categoriesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    restaurants: restaurantsReducer,
    driver: driverReducer,
    dashboard: dashboardReducer,
    categories: categoriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
