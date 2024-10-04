import React from 'react';
import { Route, Routes, Link, Outlet } from 'react-router-dom';
import './layout.css';
import { useThemeContext } from './context/ThemeContext';

import ButtonMenu from './components/botones/BotonesMenu'
import { CiSearch } from "react-icons/ci";
import { TiHome } from "react-icons/ti";
import { GoPeople } from "react-icons/go";
import { FaFire } from "react-icons/fa";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { LuCalendarHeart } from "react-icons/lu";
import { IoSettingsSharp } from "react-icons/io5";
import { CiCirclePlus } from "react-icons/ci";
import MeetLogo from './components/logotipo/Logo'
import Avatar from './components/avatar/Avatar'
import ButtonPlus from './components/botones/BotonCrear'

// Componentes de página
const Messages = () => <div>Esta es la página de mensajes</div>;
const Settings = () => <div>Esta es la página de configuración</div>;

const Layout = () => {
  const { contextTheme, setContextTheme } = useThemeContext();

  // Función para manejar el cambio de tema
  const handleSwitch = () => {
    setContextTheme((prevTheme) => (prevTheme === "Light" ? "Dark" : "Light"));
  };
  return (
    <div className="Layout" id={contextTheme}>
      {/* Menú a la izquierda */}
      <div id="left-menu">
        <div className="meetsound-logo">

        </div>

        <div id="box">
            <nav>
              <ul>
                <MeetLogo />
                <li ><Link to="/"><ButtonMenu icon={TiHome} /><span>Inicio</span></Link></li>
                <li id='Buscar'><Link to="/busqueda"><ButtonMenu icon={CiSearch} /><span>Buscar</span></Link></li>
                <li><Link to="/bandas"><ButtonMenu icon={GoPeople} /><span>Bandas</span></Link></li>
                <li><Link to="/mensajes"><ButtonMenu icon={IoChatbubbleEllipsesOutline} /><span>Mensajes</span></Link></li>
                <li><Link to="/notificaciones"><ButtonMenu icon={FaFire} /><span>Notificaciones</span></Link></li>
                <li><Link to="/eventos"><ButtonMenu icon={LuCalendarHeart} /><span>Eventos</span></Link></li>
                <li id='Config'><Link to="/configuracion"><ButtonMenu icon={IoSettingsSharp} /><span>Configuración</span></Link></li>
              </ul>
            </nav>
          




          {/* <div className='BottonCrear'>
            <ButtonPlus icon={CiCirclePlus} />
          </div>
        <Link id="Link" className="link_configuracion" to="/Configuracion">
          <Item id="item_configuracion" sx={{ color: grey[50], position: 'relative', bottom: '-5em', pb: 1 }}>
            <BuildIcon sx={{ fontSize: 30 }} /><p>Configuracion</p>
          </Item>
        </Link>
        
        <Link id="Link" className="Link_Eventos" to="/Registro">
          <Item id="icon_eventos"><CelebrationIcon sx={{ color: grey[50], fontSize: 30 }} /><p>Eventos</p></Item>
        </Link>
      </Box> */}


        </div>
        <div className='Perfil'>
          <Link to="/cuenta"><Avatar /></Link>

        </div>
      </div>

      {/* App.jsx es para manejas las rutas, y Layout es el "menu" que permite 
          ingresar a las rutas que PERTENECEN al menu.
          
          El "menu" no tiene por que o no es recomendado manejar rutas que no le pertenecen :).


      */}

      {/* Contenido en el centro */}
      {/* <div id="main-content">
        <Routes>
          <Route path="messages" element={<Messages />} />
          <Route path="settings" element={<Settings />} />
          <Route path="configuracion" element={<Configuracion />} />
        </Routes>
      </div> */}

      {/* Sección derecha */}
      {/* <div id="right-section">
        <p>Sección derecha</p>
        {/* Contenido adicional o complementario 
      </div> */}
      <Outlet /> {/* ---TE OLVIDASTE ESTO: es para el manejo de rutas "hijas"--- */}
    </div>
  );
};

export default Layout;
