import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";

const Delivery: React.FC = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default Delivery;