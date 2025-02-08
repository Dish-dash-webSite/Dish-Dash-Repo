import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import WorkSpace from "./pages/workSpace";
import Migrate from "./pages/migrate";
import Form from "./component/form";
const Delivery: React.FC = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="workSpace" element={<WorkSpace />} />
      <Route path="migrate" element={<Migrate />} />
      <Route path="Form" element={<Form />} />
    </Routes>
  );
};


export default Delivery;