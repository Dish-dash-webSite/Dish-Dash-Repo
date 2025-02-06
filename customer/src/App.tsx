import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Delivery from "./AllPages/DeliveryPages/Delivery";
import ClientApp from "./AllPages/ClientPages/ClientApp";
import { store } from "./store";
import { Provider } from "react-redux";
import RestaurantOwner from "./AllPages/OwnerRestaurantPages/restoApp";

const App: React.FC = () => {
  return (
    <Provider store={store}> {/* ✅ Wrap Redux Provider */}
      <Router>
        <Routes>
          <Route path="delivery/*" element={<Delivery />} />
          <Route path="/*" element={<ClientApp />} />
          <Route path="restaurant/*" element={<RestaurantOwner />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;