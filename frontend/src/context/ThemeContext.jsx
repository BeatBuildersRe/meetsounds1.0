import { createContext, useContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  // Lee el tema inicial de localStorage o establece "Light" si no existe.
  const getInitialTheme = () => {
    return localStorage.getItem('theme') || "Light";
  };

  const [contextTheme, setContextTheme] = useState(getInitialTheme); // Inicializamos con lo que esté en localStorage o "Light"

  useEffect(() => {
    // Almacena el tema en localStorage cada vez que cambia.
    localStorage.setItem('theme', contextTheme);
  }, [contextTheme]);

  const values = { contextTheme, setContextTheme };

  return (
    <ThemeContext.Provider  value={values}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext debe ser usado dentro de un ThemeContextProvider");
  }
  return context;
};
