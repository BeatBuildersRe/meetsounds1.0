import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useThemeContext } from './context/ThemeContext';
import { AuthContext } from './js/otro/AuthContext'; // Asegúrate de importar el contexto de autenticación
import Layout from './Layout';
import Home from './Pages/Home/Home';
import Busqueda from './Pages/Busqueda/Busqueda';
import Notificaciones from './Pages/Notificaciones/Notificaciones';
import Mensajes from './Pages/Mensajes/Mensajes';
import Bandas from './Pages/Bandas/Bandas';
import Configuracion from './Pages/Configuracion/Configuracion';
import Perfil from './Pages/Configuracion/Perfil/Perfil';
import Seguridad from './Pages/Configuracion/Seguridad/Seguridad';
import Apariencia from './Pages/Configuracion/Apariencia/Apariencia';
import Error_404 from './Pages/Error/Error-404';

import Login from './Pages/Login/LoginForm';
import Registro from './Pages/Registro/Registro';
import Registro2 from './Pages/Registro/Registro2';

import Cuenta from './Pages/PerfilUsuario/PerfilUsuario'
import './App.css';

import ActualizarNombreApellido from './Pages/Configuracion/EditarPerfil/ActualizarNombreApeliido';
import PerfilEncontrado from './Pages/PerfilUsuario/PerfilEncontrado';


function App() {
  const { contextTheme, setContextTheme } = useThemeContext();
  const { isAuthenticated } = useContext(AuthContext); // Usar el contexto de autenticación

  // Función para manejar el cambio de tema
  const handleSwitch = () => {
    setContextTheme((prevTheme) => (prevTheme === "Light" ? "Dark" : "Light"));
  };

  if (isAuthenticated === null) {
    // Mostrar pantalla de carga si la autenticación aún no se ha determinado
    return <div>Cargando...</div>;
  }

  return (
    <div id={contextTheme}>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Layout /> : <Navigate to="/login" />}>
          <Route path="busqueda" element={<Busqueda />} />
          <Route path="/" element={<Home />} />
          <Route path="notificaciones" element={<Notificaciones />} />
          <Route path="Mensajes" element={<Mensajes />} />
          <Route path="Bandas" element={<Bandas />} />
          <Route path="Configuracion" element={<Configuracion />} />
          <Route path="configuracion/perfil" element={<Perfil />} />
          <Route path="configuracion/seguridad" element={<Seguridad />} />
          <Route path="configuracion/apariencia" element={<Apariencia />} />
          <Route path="perfil-encontrado/:alias" element={<PerfilEncontrado />} />

          {/* Esta ruta maneja perfiles de usuarios */}
          <Route path="cuenta/:alias" element={<Cuenta />} />
        </Route>

        {/* Ruta para el login, redirigir si ya está autenticado */}
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login />}
        />

        <Route path="/registro" element={<Registro />} />
        <Route path="/registro2" element={<Registro2 />} />
        <Route path="*" element={<Error_404 />} />

        {/*Ruta para actualizar nombre y apellido (SOLO PRUEBA)*/}
        <Route path="configuracion/editarperfil/actualizar-nombre-apellido" element={<ActualizarNombreApellido />} />
          
        {/* Otras rutas */}

        

      </Routes>
      {/* <ReactSwitch 
        className='Modo-Oscuro'
        onChange={handleSwitch} 
        checked={contextTheme === "Dark"} 
      /> */}
    </div>
  );
}

export default App;
