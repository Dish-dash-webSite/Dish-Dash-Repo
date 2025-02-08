import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage"
import SignUp from "./pages/Signup"
import Login from "./pages/Login"
import MenuList from "./components/RestaurantMenu";
import Navbar from "../../components/Navbar";
import Header from "./components/Header";
import Footer from "../../components/Footer"
const ClientApp: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <Routes>
        <Route path="*" element={<Homepage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/menulist/:id" element={<MenuList />} />
      </Routes>
      <Footer />
    </div>
  );
};





export default ClientApp;
