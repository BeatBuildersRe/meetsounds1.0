import React from 'react';
import Button from '@mui/material/Button';
import './BotonesPrincipales.css';

export default function ButtonPrincipal({ icon: Icon, label }) {
    return (
      <Button
        variant="outlined"
        startIcon={<Icon style={{ fontSize: '1.5em', marginRight: '8px' }} />}
        sx={{
            color:'#f2f2f2',
            border:'none',
          padding: '10px 20px',
          borderRadius: '10px',
          backgroundColor: 'transparent',
          transition: 'background-color 0.3s ease',
          '&:hover': {
            backgroundColor: 'rgba(128, 128, 128, 0.5)', // Gris medio transparente
            display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          },
          // Media query for small screens
          '@media (max-width: 800px)': {
            '.button-label': {
              display: 'none',
            },
            '.button-icon': {
              fontSize: '2em', // Icono más grande cuando desaparece el label
              marginRight: '0', // Elimina el margen cuando no hay label
            },
          },
        }}
      >
        <span className="button-label">{label}</span>
      </Button>
    );
  }
  