import * as React from 'react';
import Button from '@mui/material/Button';
import { FaCircle, FaArrowRight } from 'react-icons/fa';
import { keyframes } from '@mui/system';

// Animación para la flecha que entra de más a la izquierda
const arrowSlideIn = keyframes`
  from {
    transform: translateX(-50px); /* Empieza mucho más a la izquierda */
    opacity: 0;
  }
  to {
    transform: translateX(-20px);
    opacity: 1;
  }
`;

// Animación para agrandar el círculo y cambiar el color
const circleGrowAndChangeColor = keyframes`
  from {
    transform: scale(0.2); /* Tamaño inicial pequeño */
    background-color: #000; /* Color negro inicial */
    border-radius: 50%; /* Mantiene la forma circular */
  }
  to {
    transform: scale(1.5); /* Tamaño mayor en hover */
    background-color: #fff; /* Color blanco en hover */
    border-radius: 50%; /* Mantiene la forma circular */
  }
`;

export default function BasicButtons() {
  return (
    <Button
      variant="contained"
      sx={{
        width: '100%', // Ancho del botón al 100% del contenedor padre
        
        borderRadius: '20px', // Bordes redondeados de 20px
        backgroundColor: '#f5f5f5', // Fondo blanco menos intenso
        color: '#000', // Color del texto negro
        padding: '8px 16px', // Espaciado interno del botón
        position: 'relative', // Necesario para posicionar los íconos
        overflow: 'hidden', // Oculta el desbordamiento del ícono animado
        transition: 'all 0.3s ease', // Transición suave para los cambios de estilo
        '& .MuiButton-startIcon': {
          position: 'absolute', // Posición absoluta para el ícono
          left: '16px', // Posiciona el punto a la izquierda
          color: '#000', // Color negro para el ícono de punto
          fontSize: '16px', // Tamaño pequeño para el ícono de punto
          transition: 'color 0.3s ease, transform 0.3s ease', // Transición suave para el color y el tamaño
          zIndex: 1, // Asegura que el punto esté sobre la flecha
          borderRadius: '50%', // Mantiene la forma circular
        },
        '& .MuiButton-endIcon': {
          position: 'absolute', // Posición absoluta para el ícono
          left: '16px', // Posiciona la flecha en el mismo lugar que el punto
          color: '#fff', // Color inicial de la flecha
          fontSize: '16px', // Tamaño de la flecha
          opacity: 0, // Oculta la flecha por defecto
          transition: 'opacity 0.3s ease, transform 0.6s ease', // Transición suave para la opacidad y la transformación
          zIndex: 1, // Asegura que la flecha esté sobre el fondo animado
        },
        '&:hover': {
          backgroundColor: '#000', // Fondo negro en hover
          color: '#fff', // Color del texto blanco en hover
          
          maxWidth: 'none', // Elimina el límite de ancho en hover
          '& .MuiButton-startIcon': {
            color: '#fff', // Cambia el color del punto a blanco en hover
            animation: `${circleGrowAndChangeColor} 0.3s ease forwards`, // Animación para agrandar y cambiar color
            transform: 'scale(1.2)', // Agranda el punto en hover
          },
          '& .MuiButton-endIcon': {
            color: '#000', // Cambia el color de la flecha a negro en hover
            opacity: 1, // Muestra la flecha en hover
            animation: `${arrowSlideIn} 0.6s ease forwards`, // Animación para la entrada de la flecha
            transform: 'translateX(0)', // Muestra la flecha en su posición final
            left: '24px', // Asegura que la flecha esté alineada con el punto agrandado
          },
        },
        // Media query para pantallas pequeñas
        '@media (max-width: 600px)': {
          fontSize: '14px', // Ajusta el tamaño del texto en pantallas pequeñas
          padding: '6px 12px', // Ajusta el padding en pantallas pequeñas
          '& .MuiButton-startIcon': {
            fontSize: '14px', // Ajusta el tamaño del ícono en pantallas pequeñas
          },
          '& .MuiButton-endIcon': {
            fontSize: '14px', // Ajusta el tamaño de la flecha en pantallas pequeñas
          },
        },
      }}
      startIcon={<FaCircle />} // Ícono de punto a la izquierda
      endIcon={<FaArrowRight />} // Ícono de flecha a la derecha
    >
      Iniciar
    </Button>
  );
}
