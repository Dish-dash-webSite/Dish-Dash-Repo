import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage"
import SignUp from "./pages/Signup"
import Login from "./pages/Login"
import 

const ClientApp: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};





export default ClientApp;
