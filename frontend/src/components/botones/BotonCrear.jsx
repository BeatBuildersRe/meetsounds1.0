import * as React from 'react';
import IconButton from '@mui/material/IconButton';


export default function IconButtons({ icon: Icon}) {
  return (
    <IconButton 
    sx={{
      border:'1px solid #f2f2f2',
      color:'#f2f2f2',
      fontSize: '3rem', // Ajusta el tamaño del icono
      transition:'0.3s',
      
      borderRadius:'15px',
      '&:hover': {
        background:'#555',
        border:'1px solid #555',
        transition:'0.3s',
        
      },
      '@media (max-width: 1200px)': {
        fontSize: '2rem', // Ajusta el tamaño del icono a 1200px
      }
      
    }
    }>
      <Icon
      sx={{
        fontSize: '5rem', // Ajusta el tamaño del icono
        '@media (max-width: 1200px)': {
          fontSize: '2rem', // Ajusta el tamaño del icono a 1200px
        }
      }} />
    </IconButton>
  );
}