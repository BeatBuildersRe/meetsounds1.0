import * as React from 'react';
import Divider from '@mui/material/Divider';

export default function DividerText() {
  return (
    <Divider 
      sx={{
        width: '80%',      // Asegura que ocupe todo el ancho
        borderBottomWidth: '1px',  // Controla el grosor de la línea
        borderColor: 'black',  // Color de la línea
        textAlign: 'center',   // Alinea el texto al centro
        '&::before': { 
          borderTop: 'thin solid black'  // Estilo de la línea antes del texto
        },
        '&::after': { 
          borderTop: 'thin solid black'  // Estilo de la línea después del texto
        }
      }}
    >
      
    </Divider>
  );
}