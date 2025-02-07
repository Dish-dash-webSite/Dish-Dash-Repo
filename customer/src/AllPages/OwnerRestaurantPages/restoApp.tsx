import React from "react";
import Dashboard from "./pages/dashboard";
import RestaurantForm from "./pages/CreateRestaurant";
import { Routes, Route } from "react-router-dom";
// import RestaurantNav from "./pages/navBar";
import Sidebar from "./pages/sideBar"
import ProfileCard from "./pages/Profile"

const RestaurantOwner: React.FC = () => {
    return (
        <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="restaurant" element={<RestaurantForm />} />
            <Route path="profile" element={<ProfileCard />} />
        </Routes>
    );
};

export default RestaurantOwner;