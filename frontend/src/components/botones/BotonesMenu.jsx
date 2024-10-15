import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import './BotonesMenu.css'


export default function IconButtons({ icon: Icon, text }) {
  return (
    <button className="botones_layout" >
      <Icon id="Icon"/>
      <span id="text">{text}</span>
    </button>
  );
}