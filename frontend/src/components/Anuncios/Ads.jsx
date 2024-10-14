import React, { useState, useEffect } from 'react';
import './ads.css'
import ads from '@assets/ads.png'
import img_lit from '@assets/img_lit.png'
import ads2 from '@assets/ads2.png'
const Carrusel = () => {
  // Array con las imágenes del carrusel
  const imagenes = [
    img_lit,
    ads,
    ads2
  ];

  // Estado para controlar el índice de la imagen actual
  const [imagenActual, setImagenActual] = useState(0);

  // useEffect para cambiar la imagen cada 60 segundos (1 minuto)
  useEffect(() => {
    const intervalo = setInterval(() => {
      setImagenActual((prevImagenActual) => (prevImagenActual + 1) % imagenes.length);
    }, 6000); // 60,000 milisegundos = 1 minuto

    // Limpiar el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalo);
  }, [imagenes.length]);

  return (
    <div className='ads'>
      <h4>Patrocinio</h4>
      <div className='publicidad'>
        <img src={imagenes[imagenActual]} alt={`Imagen ${imagenActual + 1}`} />
      </div>
    </div>
  );
};

export default Carrusel;
