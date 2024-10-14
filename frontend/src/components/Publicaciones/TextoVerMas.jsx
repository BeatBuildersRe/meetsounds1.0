import zIndex from '@mui/material/styles/zIndex';
import React, { useState } from 'react';

const TextoConVerMas = ({ texto, maxLength = 100 }) => {
  const [mostrarTodo, setMostrarTodo] = useState(false);

  const toggleMostrarTodo = (e) => {
    // Evitamos que el clic en "Mostrar más" también active el evento del contenedor padre
    e.stopPropagation();
    setMostrarTodo(!mostrarTodo);
  };


  // Si el texto es más corto que maxLength, no mostramos el botón "Mostrar más"
  if (texto.length <= maxLength) {
    return <p>{texto}</p>;
  }

  return (
    <div>
      <p>
        {mostrarTodo ? texto : `${texto.substring(0, maxLength)}...`}
      
        <button id='btn-mostar-mas' onClick={toggleMostrarTodo} style={{}}>
            {mostrarTodo ? 'Mostrar menos' : 'Mostrar más'}
        </button>
      </p>
      
    </div>
  );
};

export default TextoConVerMas;
