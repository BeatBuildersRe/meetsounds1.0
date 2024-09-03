import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './layout.css';
import { grey } from '@mui/material/colors';
import Badge from '@mui/material/Badge';
import BuildIcon from '@mui/icons-material/Build';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import ButtonDesplegable from './components/botones/BotonDesplegable';
import Buttonprincipal from './components/botones/BotonesPrincipales';
import { CiSearch } from "react-icons/ci";
import { TiHome } from "react-icons/ti";
import { GoPeople } from "react-icons/go";
import { FaFire } from "react-icons/fa";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { LuCalendarHeart } from "react-icons/lu";

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        width: 'fit-content',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
        color: (theme) => (theme.palette.mode === 'dark' ? 'grey.900' : 'grey.300'),
        borderColor: (theme) => theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        marginTop: 2,
        marginLeft: 2,
        background: '#18191a',
        fontSize: '1.300vw',
        fontWeight: '700',
        display: 'flex',
        alignItems: 'center',
        ...sx,
      }}
      {...other}
    />
  );
}

Item.propTypes = {
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default function GridTemplateRows() {
  return (
    <div className="Layout_contenedor" style={{ background: '#18191a' }}>
      
      <Box id="box" sx={{ display: 'grid', height: '100vh', gridTemplateRows: 'repeat(7, 4rem)' }}>
      
        <div className="Div_logo">
          <img id="logo1" src="/public/Logo5.png" alt="" />
          <img id="logo2" src="/public/Logo6.png" alt="" />
        </div>
        
        <Link id="Link" to="/">
          <Item id="item_inicio"><Buttonprincipal icon={TiHome} label="Inicio"/></Item>
        </Link>
        
        <Link id="Link" to="/Busqueda">
          <Item id="item_busqueda"><Buttonprincipal icon={CiSearch} label="Buscar"/></Item>
          
        </Link>

        <Link id="Link" to="/Notificaciones">
          <Item id="item_notificaciones"><Buttonprincipal icon={GoPeople} label="Bandas"/></Item>
        </Link>

        <Link id="Link" to="/Mensajes">
          <Item id="item_mensajes">
            <Badge badgeContent={4} color="primary">
            <Buttonprincipal icon={IoChatbubbleEllipsesOutline} label="Mensajes"/>
            </Badge>
          </Item>
        </Link>

        <Link id="Link" className="Link_Bandas" to="/Bandas">
        <Item id="icon_bandas">
        <Badge badgeContent={4} color="primary">
        <Buttonprincipal icon={FaFire } label="Notificaciones"/>
        </Badge>
        </Item>
        </Link>

        <Link id="Link" className="Link_Eventos" to="/Eventos">
          <Item id="icon_eventos"><Buttonprincipal icon={LuCalendarHeart } label="Eventos"/></Item>
        </Link>

        <Link id="Link" className="link_configuracion" to="/Configuracion">
          <Item id="item_configuracion" sx={{ color: grey[50], position: 'relative', bottom: '-5em', pb: 1 }}>
          <ButtonDesplegable/>
          </Item>
        </Link>
        
        

      </Box>

      <Outlet />
    </div>
  );
}
