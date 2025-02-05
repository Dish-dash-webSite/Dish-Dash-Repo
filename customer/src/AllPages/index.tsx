import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginCard from './OwnerRestaurantPages/login';
import SignUpCard from "./OwnerRestaurantPages/SignUp"
function App(): JSX.Element {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginCard />} />
                <Route path="/signup" element={<SignUpCard />} />
            </Routes>
        </Router>
    );
}

export default App;