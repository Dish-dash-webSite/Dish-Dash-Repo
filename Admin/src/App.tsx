import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Login from './Pages/login';
import MainLayout from './layouts/MainLayout';
import Users from './components/Users';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<Users />} />
          <Route path="/*" element={<MainLayout />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;