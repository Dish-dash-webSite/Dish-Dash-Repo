import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage"

const ClientApp: React.FC = () => {
  return (
    <Routes>
           <Route path="/" element={<Homepage />} />

    </Routes>
  );
};

export default ClientApp;
