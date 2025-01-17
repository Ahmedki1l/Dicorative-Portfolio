import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { AppDataProvider } from './context/AppDataContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppDataProvider>
      <App />
    </AppDataProvider>
  </BrowserRouter>
);
