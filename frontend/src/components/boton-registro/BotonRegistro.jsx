import * as React from 'react';
import Button from '@mui/material/Button';

export default function BasicButtons() {
  return (
    <Button
      variant="outlined"
      sx={{
        color: '#222', // Color del texto negro
        borderColor: '#222', // Color del borde negro
        borderRadius: '5px', // Bordes redondeados
        padding: '4px 8px', // Espaciado interno reducido
        fontSize: '0.75rem', // Tamaño de texto más pequeño
        transition: 'all 0.3s ease', // Transición suave para el hover

        // Asegurarse de que el botón tenga un ancho máximo en pantallas grandes
        maxWidth: '200px',
        width: '100%', // Ancho del botón al 100% del contenedor padre

        // Media query para pantallas pequeñas
        '@media (max-width: 600px)': {
          fontSize: '0.65rem', // Tamaño de texto más pequeño en pantallas pequeñas
          padding: '4px 12px', // Ajusta el padding en pantallas pequeñas
        },

        '&:hover': {
          backgroundColor: '#222', // Fondo negro en hover
          color: '#fff', // Texto blanco en hover
          borderColor: '#222', // Color del borde negro en hover
        },
      }}
    >
      Regístrate
    </Button>
  );
}
