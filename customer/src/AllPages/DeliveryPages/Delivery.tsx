import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import WorkSpace from "./pages/workSpace";

const Delivery: React.FC = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="workSpace" element={<WorkSpace />} />
    </Routes>
  );
};


export default Delivery;