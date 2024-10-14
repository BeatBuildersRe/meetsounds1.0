import * as React from 'react';
import Button from '@mui/material/Button';


export default function IconLabelButton({ icon: Icon, label }) {
  return (
    <Button
      variant="contained"
      endIcon={<Icon />} // Usa el icono pasado como prop
      sx={{
        width: '100%', // Ancho del 100%
        border: '1px solid #222', // Borde negro de 1px
        background: 'linear-gradient(145deg, #333, #111)', // Degradado gris oscuro a negro
        color: '#fff', // Color del texto inicial
        borderRadius: '15px', // Bordes redondeados
        padding: '8px 16px', // Espaciado interno del botón
        position: 'relative', // Necesario para posicionar el pseudo-elemento
        overflow: 'hidden', // Oculta el desbordamiento del borde animado
        transition: 'all 0.2s ease', // Transición suave
        display: 'flex', // Usa flexbox para centrar el contenido
        alignItems: 'center', // Centra verticalmente
        justifyContent: 'center', // Centra horizontalmente

        '&:before': {
          content: '""',
          position: 'absolute',
          top: '100%',
          left: '0',
          width: '100%',
          height: '200%',
          background: '#f1f1f1',
          transition: 'top 0.2s ease',
          zIndex: 0,
          borderRadius: '25% 25% 0 0', // Curvatura en el borde superior
        },

        '&:hover:before': {
          top: '-50%',
        },

        '&:hover': {
          color: '#222', // Cambia el color del texto al negro
          transform: 'scale(1.05)', // Aumenta el tamaño en un 5%
        },

        '& .MuiButton-endIcon': {
          transition: 'color 0.2s ease', // Transición suave para el icono
          zIndex: 1, // Asegura que el icono esté sobre el fondo animado
        },

        '&:hover .MuiButton-endIcon': {
          color: '#222', // Cambia el color del icono al negro en hover
        },
      }}
    >
      {label}
    </Button>
  );
}
