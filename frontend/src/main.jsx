import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ThemeContextProvider } from './context/ThemeContext';
import { AuthProvider } from './js/otro/AuthContext'; // Importa el AuthProvider


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider> {/* Envuelve toda la aplicación con AuthProvider */}
    <ThemeContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeContextProvider>
  </AuthProvider>
);