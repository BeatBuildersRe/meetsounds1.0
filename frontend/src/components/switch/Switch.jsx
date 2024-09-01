import * as React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

export default function CustomSwitch() {
  return (
    <FormControlLabel
      control={
        <Switch
          defaultChecked
          sx={{
            width: 65, // Tamaño total del switch
            height: 45, // Altura total del switch
            
            '& .MuiSwitch-switchBase': {
              padding: 1.8, // Espacio alrededor del círculo
              '&.Mui-checked': {
                color: 'white', // Color del círculo cuando está activado
                transform: 'translateX(20px)', // Desplazamiento del círculo cuando está activado
                '& + .MuiSwitch-track': {
                  backgroundColor: 'Black', // Color de la barra cuando está activado
                },
              },
              '& + .MuiSwitch-track': {
                backgroundColor: 'gray', // Color de la barra cuando está desactivado
              },
            },
            '& .MuiSwitch-thumb': {
              width: 15, // Tamaño del círculo
              height: 15, // Tamaño del círculo
              borderRadius: '50%', // Asegura que el círculo sea redondo
              transition: 'all 0.3s ease', // Transición suave
              transform: 'scale(1)', // Mantiene el círculo normal cuando está inactivo
              
            },
            '& .MuiSwitch-track': {
              borderRadius: 15, // Radio de la barra
            },
          }}
        />
      }
      label="Recordarme"
      sx={{
        fontSize: '0.1rem', // Tamaño de la etiqueta reducido
        marginLeft: 0, // Reduce el espacio entre el switch y la etiqueta
      }}
    />
  );
}
