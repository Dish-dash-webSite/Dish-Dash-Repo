import './index.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
function App() {
  return (
    <>

      {/* <Router> */}
      <Router>
        <Routes>
          <Route path="/" element={
            <div className="p-4 bg-blue-500 text-white text-center">
              Home Page - Tailwind CSS is working!
            </div>
          } />
        </Routes>
        </Router>
    </>
  );
}

export default App;