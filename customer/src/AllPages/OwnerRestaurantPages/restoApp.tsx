import React from "react";
import Dashboard from "./pages/dashboard";  
import { Routes, Route } from "react-router-dom";

const RestaurantOwner: React.FC = () => {
  return (
    <Routes>
      <Route path="restaurant" element={<Dashboard />} />
    </Routes>
  );
};

export default RestaurantOwner;
