import React, { useState } from 'react';
/* css */
import './GaleriaV2.css'
/* imagenes */
import imgTest from '@public/imgtest.png'
import imgTest2 from '@public/imgtest2.png'
import imgTest3 from '@public/imgtest3.png'
import imgTest4 from '@public/imgtest4.png'
import imgTest5 from '@public/ract.jpg'
/* iconos */
import { MdArrowBackIos } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";

const GaleriaDeImagenes = ({imagenes = []}) => {
  // Lista de imágenes que vamos a mostrar en la galería
 

  // Estado para controlar el índice de la imagen actual
  const [indiceActual, setIndiceActual] = useState(0);

  // Función para avanzar a la siguiente imagen
  const siguienteImagen = () => {
    setIndiceActual((indiceActual + 1) % imagenes.length);
  };

  // Función para retroceder a la imagen anterior
  const anteriorImagen = () => {
    setIndiceActual((indiceActual - 1 + imagenes.length) % imagenes.length);
  };

  return (
    <div className="Galeria">

      <img
        src={imagenes[indiceActual]}
        alt={`Imagen ${indiceActual + 1}`}
       
      />
      
      <div /* style={{ marginTop: '10px' }} */>
        {/* Botón para retroceder */}
        <button  id='btn-img-atras' onClick={anteriorImagen} >
          <MdArrowBackIos/>
        </button>
        {/* Botón para avanzar */}
        <button id='btn-img-siguiente' onClick={siguienteImagen}>
          <MdArrowForwardIos/>
        </button>
      </div>
    </div>
  );
};

export default GaleriaDeImagenes;
