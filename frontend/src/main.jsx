import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ThemeContextProvider } from './context/ThemeContext';
import { AuthProvider } from './js/otro/AuthContext'; // Asegúrate de que esté correctamente implementado

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <ThemeContextProvider>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </ThemeContextProvider>
  </AuthProvider>
);
