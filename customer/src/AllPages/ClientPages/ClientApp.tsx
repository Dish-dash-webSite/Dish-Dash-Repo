import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage"
import SignUp from "./pages/Signup"
import Login from "./pages/Login"
import MenuList from "./components/RestaurantMenu";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer"
import Profile from "./components/Profile"
import OrderTracking from "./components/OrderTracking"
import Specialoffers from "./pages/Specialoffers"
import Cart from "./components/cart"
import Payment from "./components/payment"

const ClientApp: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="*" element={<Homepage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/menulist/:id" element={<MenuList />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/specialoffers" element={<Specialoffers />} />
      <Route path="/order-tracking/:orderId" element={<OrderTracking />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/payment" element={<Payment />} />
      </Routes>
      <Footer />
    </div>
  
  );
};





export default ClientApp;
