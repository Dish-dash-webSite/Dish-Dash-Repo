import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Delivery from "./AllPages/DeliveryPages/Delivery";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="delivery/*" element={<Delivery />} />
      </Routes>
    </Router>
  );
};

export default App;
