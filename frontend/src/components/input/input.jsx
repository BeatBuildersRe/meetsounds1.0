import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function BasicTextFields({ label, id, Icon, type = "text" }) {
  return (
    <Box
    component="form"
    sx={{ 
      '& > :not(style)': { 
        m: 1, // Ajusta este margen si es necesario
        width: '100%' // Mantén el ancho al 100% dentro del contenedor
      },
      maxWidth: '100%',
      width: '100%',
      margin: '0', // Asegúrate de que no haya márgenes adicionales
      padding: '0' // Asegúrate de que no haya padding adicional
    }}
    noValidate
    autoComplete="off"
  >
  <TextField 
  id={id} 
  label={label} 
  variant="outlined"
  type={type}
  InputProps={{
    endAdornment: <Icon style={{ color: '#222' }} size={24} />,
  }}
  sx={{ 
    width: '100%', // Asegura que el TextField ocupe todo el ancho disponible
    margin: '0', // Elimina cualquier margen que pueda causar desplazamiento
    padding: '0', // Elimina padding adicional
    '& .MuiOutlinedInput-root': {
      borderRadius: '20px',
      '& fieldset': {
        borderColor: '#222',
      },
      '&:hover fieldset': {
        borderColor: '#222',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#222',
      },
    },
    '& .MuiInputLabel-root': {
      color: '#222',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#222',
    },
  }}
/>
</Box>
  );
}
