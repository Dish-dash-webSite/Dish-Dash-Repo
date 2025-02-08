import React from "react";
import Dashboard from "./pages/dashboard";
import { Routes, Route } from "react-router-dom";
import RestaurantForm from "./pages/CreateRestaurant.tsx"
import LoginForm from "./pages/login.tsx"
const RestaurantOwner: React.FC = () => {
    return (
        <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="create&&immegrate" element={<RestaurantForm />} />
            <Route path="loginResto" element={<LoginForm />} />
        </Routes>
    );
};

export default RestaurantOwner;

