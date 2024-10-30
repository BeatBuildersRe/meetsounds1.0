// src/index.js

// Definimos global en el entorno del navegador
window.global ||= window;

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ThemeContextProvider } from './context/ThemeContext';
import { AuthProvider } from './js/otro/AuthContext'; // Asegúrate de que esté correctamente implementado
import { WebSocketProvider } from './services/WebSocketProvider'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <ThemeContextProvider>
      <BrowserRouter>
        <WebSocketProvider> {/* Envolvemos con el StompProvider */}
          <App />
        </WebSocketProvider>
      </BrowserRouter>
    </ThemeContextProvider>
  </AuthProvider>
);
