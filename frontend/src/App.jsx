// App.js
import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useThemeContext } from './context/ThemeContext';
import { AuthContext } from './js/otro/AuthContext';
import Layout from './Layout';
import Home from './Pages/Home/Home';
import Busqueda from './Pages/Busqueda/Busqueda';
import Notificaciones from './Pages/Notificaciones/Notificaciones';
import Mensajes from './Pages/Mensajes/Mensajes';
import Bandas from './Pages/Bandas/Bandas';
import Configuracion from './Pages/Configuracion/Configuracion';
import Perfil2 from './Pages/Configuracion/Perfil/Perfil2';
import DatosPersonales from './Pages/Configuracion/Perfil/Datos_Personales/DatosPersonales';
import Seguridad from './Pages/Configuracion/Seguridad/Seguridad';
import Apariencia from './Pages/Configuracion/Apariencia/Apariencia';
import Error_404 from './Pages/Error/Error-404';
import FotosPerfil from './Pages/Configuracion/Perfil/FotosPerfil';
import Perfil_Y_Portada from './Pages/Configuracion/Perfil/Perfil_Y_Portada/Perfil_Y_Portada';
import Login from './Pages/Login/LoginForm';
import Registro from './Pages/Registro/Registro';
import Registro2 from './Pages/Registro/Registro2';
import ChatComponent from './Pages/Chat/ChatComponent';
import Cuenta from './Pages/PerfilUsuario/PerfilUsuario';
import Cuenta2 from './Pages/PerfilUsuario/PerfilUsuario2';
import ActualizarNombreApellido from './Pages/Configuracion/EditarPerfil/ActualizarNombreApeliido';
import PerfilEncontrado from './Pages/PerfilUsuario/PerfilEncontrado';
import PerfilEncontrado2 from './Pages/PerfilUsuario/PerfilEncontrado2';
import OnboardingForm from './Pages/OnBoarding/OnboardingForm';
import AliasGuard from './services/AliasGuard'; // Importa el nuevo componente de protección
import ChatsUsuario from './Pages/Mensajes/ChatsUsuarios';
import Publicaciones2 from './Pages/Home/InicioComentarios';
import '@css/App.css';

function App() {
  const { contextTheme, setContextTheme } = useThemeContext();
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated === null) {
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
          <Route path="configuracion/perfil" element={<Perfil2 />} />
          <Route path="configuracion/perfil/Datos-Personales" element={<DatosPersonales />} />
          <Route path="configuracion/perfil/PerfilYPortada" element={<Perfil_Y_Portada />} />
          <Route path="configuracion/perfil/Seguridad" element={<Seguridad />} />
          <Route path="configuracion/apariencia" element={<Apariencia />} />
          <Route path="/publicacion/:id" element={<Publicaciones2 />} />
          
          {/* Usa AliasGuard aquí */}
          <Route path="perfil-encontrado/:alias" element={<><AliasGuard /><PerfilEncontrado /></>} />
          <Route path="perfil-encontrado2/:alias" element={<><AliasGuard /><PerfilEncontrado2 /></>} />
          <Route path="cuenta/:alias" element={<><AliasGuard /><Cuenta /></>} />
          <Route path="cuenta2/:alias" element={<><AliasGuard /><Cuenta2 /></>} />
        </Route>

        <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/registro2" element={<Registro2 />} />
        <Route path="*" element={<Error_404 />} />


        {/* Ruta para el onboarding */}
        <Route path="/onboarding" element={<OnboardingForm />} />

        {/* {/Ruta para actualizar nombre y apellido (SOLO PRUEBA)/} */} 


        <Route path="configuracion/editarperfil/actualizar-nombre-apellido" element={<ActualizarNombreApellido />} />
        <Route path="cuenta/fotosperfil" element={<FotosPerfil />} />
        <Route path="/chat/:chatId" element={<ChatComponent />} />
        <Route path="/chats-usuario" element={<ChatsUsuario />} />
      </Routes>
    </div>
  );
}

export default App;