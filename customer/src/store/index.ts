import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlices";
import restaurantsReducer from "./restaurantsSlice";
import driverReducer from "./driverSlice";
import dashboardReducer from "./dashboardSlice";
import categoriesReducer from './categoriesSlice';
import restoMenuReducer from "./RestoSlice";
import profileReducer from './profileSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export 

const store = configureStore({
  reducer: {
    auth: authReducer,
    restaurants: restaurantsReducer,
    driver: driverReducer,
    dashboard: dashboardReducer,
    categories: categoriesReducer,
    restoMenu: restoMenuReducer,
    profile: profileReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(/* any additional middleware if needed */),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
