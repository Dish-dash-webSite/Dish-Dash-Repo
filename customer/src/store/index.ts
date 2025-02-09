import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlices";
import restaurantsReducer from "./restaurantsSlice";
import driverReducer from "./driverSlice";
import dashboardReducer from "./dashboardSlice";
import categoriesReducer from './categoriesSlice';
import restoMenuReducer from "./RestoSlice"
import authRestoSlice from "./authRestoSlice"
import productsSlice from "./restaurantOwnerSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    restaurants: restaurantsReducer,
    driver: driverReducer,
    dashboard: dashboardReducer,
    categories: categoriesReducer,
    restoMenu: restoMenuReducer,
    restoAuth: authRestoSlice,
    restOwner: productsSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
