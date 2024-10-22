import React from 'react';
import ReactSwitch from 'react-switch';
import '@css/Apariencia.css'
import { useThemeContext } from '../../../context/ThemeContext';
import MenuDerechoDiv from '@c/Menu/Derecha';



export default function App() {
  const { contextTheme, setContextTheme } = useThemeContext();

  // Función para manejar el cambio de tema
  const handleSwitch = () => {
    setContextTheme((prevTheme) => (prevTheme === "Light" ? "Dark" : "Light"));
  };
  return (
    <>
      <div className="Contenedor">
        <div className="contenedor2">
          <div className="izquierda-apariencia">

            {/* AREA DE TRABAJO */}
            {/* MANTERNER ESTE FORMATO DE DIVS PARA OTRAS PAGINAS Y SU CSS */}

            <div className="toggle-switch">
              <label className="switch-label">
                <input
                  type="checkbox"
                  className="checkbox"
                  onChange={handleSwitch}
                  checked={contextTheme === "Light"} /* Activado en Light, desactivado en Dark */
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
          <MenuDerechoDiv></MenuDerechoDiv>
        </div>
      </div>
      <div />
    </>









  );
}
