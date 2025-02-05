import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Delivery from "./AllPages/DeliveryPages/Delivery";
import ClientApp from "./AllPages/ClientPages/ClientApp"
import { store } from "./store";
import { Provider } from "react-redux"; 
const App: React.FC = () => {
  return (
    <Provider store={store}> {/* ✅ Wrap Redux Provider */}
    <Router>
      <Routes>
        <Route path="delivery/*" element={<Delivery />} />
        <Route path="/*" element={<ClientApp />} />
      </Routes>
    </Router>
    </Provider>
  );
};

export default App;

