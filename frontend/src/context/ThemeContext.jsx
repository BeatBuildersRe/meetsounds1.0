import { createContext, useContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [contextTheme, setContextTheme] = useState("Light"); // Inicializamos con "Light"
  
  const values = { contextTheme, setContextTheme };

  return (
    <ThemeContext.Provider value={values}>
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
