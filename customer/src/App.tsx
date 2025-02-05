import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux"; // ✅ Import Provider
import { store } from "./store"; // ✅ Import Redux store
import Navbar from "./components/Navbar";
import AllPages from "./AllPages";

function App() {
  return (
    <Provider store={store}> {/* ✅ Wrap Redux Provider */}
      <Router>
        <div className="App">
          <Navbar />
          <AllPages />
        </div>
      </Router>
    </Provider>
  );
}

export default App;

