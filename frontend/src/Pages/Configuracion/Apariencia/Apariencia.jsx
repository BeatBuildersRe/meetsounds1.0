import React from 'react';
import ReactSwitch from 'react-switch';
import './Apariencia.css'
import { useThemeContext } from '../../../context/ThemeContext';
import zIndex from '@mui/material/styles/zIndex';



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
        <ReactSwitch className='Modo-Oscuro'
        onChange={handleSwitch} 
        checked={contextTheme === "Dark"} 
      />
      </div>
      
    </>
    
  );
}
