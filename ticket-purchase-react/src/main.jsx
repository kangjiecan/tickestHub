// src/main.jsx or src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css'; // <-- Add this line
import './index.css'; // Keep or add for custom global styles

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  //
);