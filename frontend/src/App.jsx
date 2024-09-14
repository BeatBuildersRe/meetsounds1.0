import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './Pages/Home/Home';
import Busqueda from './Pages/Busqueda/Busqueda';
import Notificaciones from './Pages/Notificaciones/Notificaciones';
import Mensajes from './Pages/Mensajes/Mensajes';
import Bandas from './Pages/Bandas/Bandas';
import Configuracion from './Pages/Configuracion/Configuracion';
import Perfil from './Pages/Configuracion/Perfil/Perfil';
import Seguridad from './Pages/Configuracion/Seguridad/Seguridad';
import Error_404 from './Pages/Error/Error-404';
import Login from './Pages/Login/LoginForm';
import Registro from './Pages/Registro/Registro';
import Cuenta from './Pages/PerfilUsuario/PerfilUsuario'
import ReactSwitch from 'react-switch';

import './App.css';
import { useThemeContext } from './context/ThemeContext';

function App() {
  const { contextTheme, setContextTheme } = useThemeContext();

  // Función para manejar el cambio de tema
  const handleSwitch = () => {
    setContextTheme((prevTheme) => (prevTheme === "Light" ? "Dark" : "Light"));
  };

  return (
    <div id={contextTheme}>
      {/* El valor de checked depende directamente de contextTheme */}
      <ReactSwitch 
        onChange={handleSwitch} 
        checked={contextTheme === "Dark"} 
      />

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="busqueda" element={<Busqueda />} />
          <Route path="/" element={<Home />} />
          <Route path="notificaciones" element={<Notificaciones />} />
          <Route path="Mensajes" element={<Mensajes />} />
          <Route path="Bandas" element={<Bandas />} />
          <Route path="Configuracion" element={<Configuracion />} />
          <Route path="configuracion/perfil" element={<Perfil />} />
          <Route path="configuracion/seguridad" element={<Seguridad />} />
          <Route path="cuenta" element={<Cuenta />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="*" element={<Error_404 />} />
      </Routes>
    </div>
  );
}

export default App;
