import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import '@css/BotonesMenu.css'
import '@css/Colores.css'


export default function IconButtons({ icon: Icon, text }) {
  return (
    <button className="botones_layout" >
      <Icon id="Icon"/>
      <span id="text">{text}</span>
    </button>
  );
}