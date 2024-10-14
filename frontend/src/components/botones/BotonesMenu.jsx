import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import './BotonesMenu.css'

export default function IconButtons({ icon: Icon}) {
  return (
    <IconButton id='IconButtom'
    >
      <Icon id='Icon'
       />
    </IconButton>
  );
}