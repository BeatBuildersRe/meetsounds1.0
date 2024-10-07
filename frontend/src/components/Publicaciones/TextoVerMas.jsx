import React, { useState } from 'react';

const TextoConVerMas = ({ texto, maxLength = 100 }) => {
  const [mostrarTodo, setMostrarTodo] = useState(false);

  const toggleMostrarTodo = () => {
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
      
        <button id='btn-mostar-mas' onClick={toggleMostrarTodo}>
            {mostrarTodo ? 'Mostrar menos' : 'Mostrar más'}
        </button>
      </p>
      
    </div>
  );
};

export default TextoConVerMas;
