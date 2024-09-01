import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './layout.css';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { grey } from '@mui/material/colors';
import BallotIcon from '@mui/icons-material/Ballot';
import SearchIcon from '@mui/icons-material/Search';
import MessageIcon from '@mui/icons-material/Message';
import Badge from '@mui/material/Badge';
import CottageIcon from '@mui/icons-material/Cottage';
import CelebrationIcon from '@mui/icons-material/Celebration';
import BuildIcon from '@mui/icons-material/Build';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

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
          <Item id="item_inicio"><CottageIcon sx={{ color: grey[50], fontSize: 30 }} /><p>Inicio</p></Item>
        </Link>

        <Link id="Link" to="/Busqueda">
          <Item id="item_busqueda"><SearchIcon sx={{ color: grey[50], fontSize: 30 }} /><p>Busqueda</p></Item>
        </Link>

        <Link id="Link" to="/Notificaciones">
          <Item id="item_notificaciones">
            <Badge badgeContent={1} color="primary">
              <NotificationsActiveIcon sx={{ color: grey[50], fontSize: 30 }} />
            </Badge><p>Notificaciones</p>
          </Item>
        </Link>

        <Link id="Link" to="/Mensajes">
          <Item id="item_mensajes">
            <Badge badgeContent={4} color="primary">
              <MessageIcon sx={{ color: grey[50], fontSize: 30 }} />
            </Badge><p>Mensajes</p>
          </Item>
        </Link>

        <Link id="Link" className="Link_Bandas" to="/Bandas">
          <Item id="icon_bandas"><BallotIcon sx={{ color: grey[50], fontSize: 30 }} /><p>Bandas</p></Item>
        </Link>

        <Link id="Link" className="Link_Eventos" to="/Eventos">
          <Item id="icon_eventos"><CelebrationIcon sx={{ color: grey[50], fontSize: 30 }} /><p>Eventos</p></Item>
        </Link>

        <Link id="Link" className="link_configuracion" to="/Configuracion">
          <Item id="item_configuracion" sx={{ color: grey[50], position: 'relative', bottom: '-5em', pb: 1 }}>
            <BuildIcon sx={{ fontSize: 30 }} /><p>Configuracion</p>
          </Item>
        </Link>
        
        <Link to="/PerfilUsuario"></Link>

        {/* Nuevo enlace para el Login */}
        <Link id="Link"  to="/Login">
          <Item id="item_login"><p>Login</p></Item>
        </Link>

      </Box>

      <Outlet />
    </div>
  );
}
