import React from "react";
import Dashboard from "./pages/dashboard";
// import RestaurantForm from "./pages/CreateRestaurant";
import { Routes, Route } from "react-router-dom";

const RestaurantOwner: React.FC = () => {
    return (
        <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            {/* <Route path="restaurant" element={<RestaurantForm />} /> */}
        </Routes>
    );
};

export default RestaurantOwner;