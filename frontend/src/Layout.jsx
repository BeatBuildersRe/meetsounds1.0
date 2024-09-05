import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import './layout.css';
import Configuracion from './Pages/Configuracion/Configuracion';

import ButtonMenu from './components/botones/BotonesMenu'
import { CiSearch } from "react-icons/ci";
import { TiHome } from "react-icons/ti";
import { GoPeople } from "react-icons/go";
import { FaFire } from "react-icons/fa";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { LuCalendarHeart } from "react-icons/lu";
import { IoSettingsSharp } from "react-icons/io5";
import MeetLogo from './components/logotipo/Logo'

// Componentes de página
const Messages = () => <div>Esta es la página de mensajes</div>;
const Settings = () => <div>Esta es la página de configuración</div>;

const Layout = () => {
  return (
    <div className="Layout">
      {/* Menú a la izquierda */}
      <div id="left-menu">
        <div className="meetsound-logo">
        
        </div>
        
        <div id="box">
        
          <nav>
          
            <ul>
            <MeetLogo/>
              <li><Link to="/messages"><ButtonMenu icon={TiHome}/><span>Inicio</span></Link></li>
              <li><Link to="/messages"><ButtonMenu icon={CiSearch}/><span>Buscar</span></Link></li>
              <li><Link to="/messages"><ButtonMenu icon={GoPeople}/><span>Bandas</span></Link></li>
              <li><Link to="/messages"><ButtonMenu icon={IoChatbubbleEllipsesOutline}/><span>Mensajes</span></Link></li>
              <li><Link to="/messages"><ButtonMenu icon={FaFire}/><span>Notificaciones</span></Link></li>
              <li><Link to="/messages"><ButtonMenu icon={LuCalendarHeart}/><span>Eventos</span></Link></li>
              <li><Link to="/configuracion"><ButtonMenu icon={IoSettingsSharp}/><span>Configuracion</span></Link></li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Contenido en el centro */}
      <div id="main-content">
        <Routes>
          <Route path="messages" element={<Messages />} />
          <Route path="settings" element={<Settings />} />
          <Route path="configuracion" element={<Configuracion />} />
        </Routes>
      </div>

      {/* Sección derecha */}
      <div id="right-section">
        <p>Sección derecha</p>
        {/* Contenido adicional o complementario */}
      </div>
    </div>
  );
};

export default Layout;
