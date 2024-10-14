import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Inicializa como null
  const [loading, setLoading] = useState(true); // Estado para manejar la carga

  useEffect(() => {
    const alias = Cookies.get('alias');
    setIsAuthenticated(!!alias); // Establece true si alias existe
    setLoading(false); // Termina el estado de carga
  }, []);

  const logout = () => {
    Cookies.remove('alias'); // Elimina el alias de las cookies
    setIsAuthenticated(false); // Actualiza el estado de autenticación
  };

  // Muestra una pantalla de carga mientras se verifica la autenticación
  if (loading) {
    return <div>Cargando...</div>; // Puedes personalizar esto o agregar un spinner
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
