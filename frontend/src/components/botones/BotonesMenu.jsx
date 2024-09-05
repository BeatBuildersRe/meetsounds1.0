import * as React from 'react';
import IconButton from '@mui/material/IconButton';


export default function IconButtons({ icon: Icon}) {
  return (
    <IconButton 
    sx={{
      background:'Transparent',
      color:'#f2f2f2',
      fontSize: '2rem', // Ajusta el tamaño del icono
      '&:hover': {
        background:'Transparent',
      }
      
    }
    }>
      <Icon
      sx={{
        fontSize: '5rem', // Ajusta el tamaño del icono
      }} />
    </IconButton>
  );
}