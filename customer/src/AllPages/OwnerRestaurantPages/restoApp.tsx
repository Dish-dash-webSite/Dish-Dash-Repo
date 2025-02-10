import React from "react";
import { Routes, Route } from "react-router-dom";
import RestaurantForm from "./pages/CreateRestaurant.tsx"
import LoginForm from "./pages/login.tsx"
import ItemsCard from "./pages/home.tsx"
import { Items } from "../../types"
import Navbare from "./pages/dashboard";
import AddNewItemCard from "./pages/addItem.tsx"
import { useState } from "react";

const RestaurantOwner: React.FC = () => {
    return (
        <Routes>
            <Route path="create&&immegrate" element={<RestaurantForm />} />
            <Route path="loginResto" element={<LoginForm />} />
            <Route element={<Navbare />} >
                <Route path="home" element={<ItemsCard />} />
                <Route path="additem" element={<AddNewItemCard />} />
            </Route>
        </Routes >
    );
};

export default RestaurantOwner;

