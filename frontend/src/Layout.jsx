import React, { useEffect, useState } from 'react'; // Asegúrate de incluir useEffect aquí
import { Route, Routes, Link, Outlet, useNavigate,NavLink } from 'react-router-dom';
import './layout.css';
import { useThemeContext } from './context/ThemeContext';
import ButtonMenu from './components/botones/BotonesMenu';
import { CiSearch } from "react-icons/ci";
import { TiHome } from "react-icons/ti";
import { GoPeople } from "react-icons/go";
import { FaFire } from "react-icons/fa";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { LuCalendarHeart } from "react-icons/lu";
import { IoSettingsSharp } from "react-icons/io5";
import { CiCirclePlus } from "react-icons/ci";
import MeetLogo from './components/logotipo/Logo';
import Avatar from './components/avatar/Avatar';
import Cookies from 'js-cookie';

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
              <li id='Buscar'><NavLink to="/busqueda"  className={({ isActive }) => isActive ? 'active' : ''}><ButtonMenu icon={CiSearch} text="Buscar"/></NavLink></li>
              <li><NavLink to="/bandas" className={({ isActive }) => isActive ? 'active' : ''}><ButtonMenu icon={GoPeople} text="Bandas"/></NavLink></li>
              <li><NavLink to="/mensajes" className={({ isActive }) => isActive ? 'active' : ''}><ButtonMenu icon={IoChatbubbleEllipsesOutline} text="Mensajes"/></NavLink></li>
              <li><NavLink to="/notificaciones className={({ isActive }) => isActive ? 'active' : ''}"><ButtonMenu icon={FaFire} text="Notificaciones"/></NavLink></li>
              <li><NavLink to="/eventos className={({ isActive }) => isActive ? 'active' : ''}"><ButtonMenu icon={LuCalendarHeart} text="Eventos"/></NavLink></li>
              <li id='Config'><NavLink to="/configuracion" className={({ isActive }) => isActive ? 'active' : ''}><ButtonMenu icon={IoSettingsSharp} text="Configuración"/></NavLink></li>
              
              <li><button className='boton_crear_publicacion'>
              
              <div class="svg-wrapper-1">
                <div class="svg-wrapper">
                  <CiCirclePlus/>
                </div>
              </div>
              <span>Crear</span>
            </button></li>            
            </ul>
            
          </nav>
          {console.log(alias)}
          <div className='Perfil'>
            <button style={{all:'none'}} onClick={handleClick}>
              <Avatar />
            </button>
          </div>
        </div> 
      </div>



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
