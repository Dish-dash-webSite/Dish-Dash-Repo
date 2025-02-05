import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import AllPages from './AllPages';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <AllPages />
      </div>
    </Router>
  );
}

export default App;
