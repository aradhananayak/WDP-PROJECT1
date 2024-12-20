import React from 'react';
import ReactDOM from 'react-dom/client'; // Use the new `react-dom/client` import
import App from './App';
import './index.css';

// Select the root element
const rootElement = document.getElementById('root');

// Create a root using ReactDOM.createRoot
const root = ReactDOM.createRoot(rootElement);

// Render the App component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
