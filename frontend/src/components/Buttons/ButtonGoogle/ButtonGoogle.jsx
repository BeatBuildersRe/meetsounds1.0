import * as React from 'react';
import Button from '@mui/material/Button';
import '../../../css/Colores.css'; // Variables globales de colores
import '../../../css/ButtonGoogle.css'; // Estilos específicos del botón

export default function IconLabelButton({ icon: Icon, label }) {
  return (
    <Button
      className="boton_google"
      variant="contained"
      endIcon={<Icon />} // Usa el icono pasado como prop
    >
      {label}
    </Button>
  );
}
