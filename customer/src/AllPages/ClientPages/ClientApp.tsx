import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage"
import SignUp from "./pages/Signup"
import Login from "./pages/Login"
import Profile from "./components/Profile"
import OrderTracking from "./components/OrderTracking"


const ClientApp: React.FC = () => {
  return (
    <Routes>
      <Route path="*" element={<Homepage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/order-tracking/:orderId" element={<OrderTracking />} />
    </Routes>

  );
};





export default ClientApp;
