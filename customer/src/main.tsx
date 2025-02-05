import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './AllPages/index';

// Ensure that the 'root' element exists, otherwise, handle the case when it's null
const rootElement = document.getElementById('root');

if (rootElement) {
  // Safe to proceed since rootElement is not null
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  console.error("Root element not found. Please check your HTML.");
}
