/* Css */
import '@css/Colores.css';
import '@css/layout.css';

/* React */
import React, { useEffect, useState } from 'react'; // Asegúrate de incluir useEffect aquí
import { Route, Routes, Link, Outlet, useNavigate, NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
/* Componentes */
import { useThemeContext } from './context/ThemeContext';
import Avatar from '@c/avatar/Avatar';
import MeetLogo from '@c/logotipo/Logo';
import PostModal from '@c/Modal/modal'
import ButtonMenu from './components/botones/BotonesMenu';
import AvatarV3 from '@c/avatar/AvatarV3';
/* Iconos */
import { CiSearch } from "react-icons/ci";
import { TiHome } from "react-icons/ti";
import { GoPeople } from "react-icons/go";
import { FaFire } from "react-icons/fa";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { LuCalendarHeart } from "react-icons/lu";
import { IoSettingsSharp } from "react-icons/io5";
import { CiCirclePlus } from "react-icons/ci";


const Layout = () => {
  const [alias, setAlias] = useState(undefined);
  const navigate = useNavigate();
  const { contextTheme, setContextTheme } = useThemeContext();

  useEffect(() => {
    const storedAlias = Cookies.get('alias');
    if (storedAlias) {
      setAlias(storedAlias);
    }
  }, []); // Ejecuta solo una vez al montar el componente

  const handleClick = () => {
    if (alias) {
      navigate('/cuenta/' + alias);
    } else {
      console.error('Alias is undefined, cannot navigate.');
    }
  };

  const handleSwitch = () => {
    setContextTheme((prevTheme) => (prevTheme === "Light" ? "Dark" : "Light"));
  };

  if (!alias) {
    return <div>Cargando...</div>; // O cualquier indicador de carga que prefieras
  }
  const handlePost = (files, description, location) => {
    console.log('Archivos:', files)
    console.log('Descripción:', description)
    console.log('Ubicación:', location)
    // Aquí puedes manejar la lógica para publicar
  }
  return (
    <div className="Layout" id={contextTheme}>
      {/* Menú a la izquierda */}
      <div id="left-menu">
        <div className="logo_cabecera">
          <MeetLogo />
        </div>

        <div id="box">
          <nav>
            <ul>
              <li><NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}><ButtonMenu icon={TiHome} text="Inicio" /></NavLink></li>
              <li id='Buscar'><NavLink to="/busqueda" className={({ isActive }) => isActive ? 'active' : ''}><ButtonMenu icon={CiSearch} text="Buscar" /></NavLink></li>
              {/* <li><NavLink to="/bandas" className={({ isActive }) => isActive ? 'active' : ''}><ButtonMenu icon={GoPeople} text="Bandas" /></NavLink></li> */}
              <li><NavLink to="/mensajes" className={({ isActive }) => isActive ? 'active' : ''}><ButtonMenu icon={IoChatbubbleEllipsesOutline} text="Mensajes" /></NavLink></li>
              {/* <li><NavLink to="/notificaciones"><ButtonMenu icon={FaFire} text="Notificaciones" /></NavLink></li> */}
              {/*  <li><NavLink to="/notificaciones className={({ isActive }) => isActive ? 'active' : ''}"><ButtonMenu icon={FaFire} text="Notificaciones" /></NavLink></li> */}
              {/*               <li><NavLink to="/eventos className={({ isActive }) => isActive ? 'active' : ''}"><ButtonMenu icon={LuCalendarHeart} text="Eventos" /></NavLink></li>
 */}              <li id='Config'><NavLink to="/configuracion" className={({ isActive }) => isActive ? 'active' : ''}><ButtonMenu icon={IoSettingsSharp} text="Ajustes" /></NavLink></li>

              <li className='PostModal'><PostModal
                username="usuario123"
                userAvatar="/ruta/a/tu/avatar.jpg"
                onPost={handlePost}
              /></li>
            </ul>


          </nav>
          <div className='Perfil'>
            <button style={{
    background: 'transparent', // Fondo transparente
    border: 'none',            // Sin borde
    padding: 0,                // Sin padding adicional
    cursor: 'pointer',         // Cambia el cursor a pointer para indicar clic
    outline: 'none',           // Elimina el contorno en algunos navegadores
  }} onClick={handleClick}>
              <Avatar />
            </button>
          </div>
        </div>
      </div>





      {/* App.jsx es para manejas las rutas, y Layout es el "menu" que permite 
          ingresar a las rutas que PERTENECEN al menu.
          
          El "menu" no tiene por que o no es recomendado manejar rutas que no le pertenecen :).


      */}


      <Outlet /> {/* ---TE OLVIDASTE ESTO: es para el manejo de rutas "hijas"--- */}
    </div>
  );
};

export default Layout;
