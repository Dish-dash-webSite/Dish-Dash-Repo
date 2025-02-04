import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Import your components
// import Home from './Home';
// import About from './About';
// import Contact from './Contact';

function AppOne() {
    return (
        <Router>
            <div>
                <nav>
                    {/* Add Links or navigation */}
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </nav>

                {/* Define routes */}
                {/* <Route  path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} /> */}
            </div>
        </Router>
    );
}

export default AppOne;