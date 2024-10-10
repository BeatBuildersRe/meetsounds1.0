import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const alias = Cookies.get('alias');
    setIsAuthenticated(!!alias); // Establece true si alias existe, false si no
  }, []);

  const logout = () => {
    Cookies.remove('alias'); // Elimina el alias de las cookies
    setIsAuthenticated(false); // Actualiza el estado de autenticación
  };

  const logoin = () => {
    setIsAuthenticated(true); // Actualiza el estado de autenticación
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
