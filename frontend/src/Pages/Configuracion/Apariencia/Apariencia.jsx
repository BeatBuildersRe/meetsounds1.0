import React from 'react';
import ReactSwitch from 'react-switch';
import '@c/Apariencia.css'
import { useThemeContext } from '../../../context/ThemeContext';




export default function App() {
  const { contextTheme, setContextTheme } = useThemeContext();

  // Función para manejar el cambio de tema
  const handleSwitch = () => {
    setContextTheme((prevTheme) => (prevTheme === "Light" ? "Dark" : "Light"));
  };
  return (
    <>

      <div  id={contextTheme} className="Contenedor-seguridad" style={{zIndex:999}}>
        <h1>Apariencia</h1>
        {/* <ReactSwitch className='Modo-Oscuro'
        onChange={handleSwitch} 
        checked={contextTheme === "Dark"} 
        /> */}
        

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
      
    </>
    
  );
}
