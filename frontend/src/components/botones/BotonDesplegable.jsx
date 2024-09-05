import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { grey } from '@mui/material/colors';

import Buttonprincipal from './BotonesPrincipales';
import { LiaGripLinesSolid } from "react-icons/lia";
import { IoSettingsSharp } from "react-icons/io5";



export default function ConfigButton() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="config-button"
        sx={{ color: grey[50] }}
        onClick={handleClick}
        startIcon={<LiaGripLinesSolid  sx={{ fontSize: 30 }} />}
      >
        Más
      </Button>
      <Menu
        id="config-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'config-button',
        }}
        sx={{
            '& .MuiPaper-root': {
              backgroundColor: grey[900], // Fondo gris oscuro
              color: grey[50], // Texto en color claro
            },
          }}
      >
        <MenuItem onClick={handleClose}>
          <Link to="/Configuracion" className="link_configuracion"><Buttonprincipal icon={IoSettingsSharp} label="Configuración"/></Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>Otra opción 1</MenuItem>
        <MenuItem onClick={handleClose}>Otra opción 2</MenuItem>
      </Menu>
    </div>
  );
}
