import React, { useState } from 'react';
import Cookies from 'js-cookie';

const ActualizarNombreApellido = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const alias = Cookies.get('alias'); // Obtén el alias desde la cookie

    if (!alias) {
      setMensaje('Alias no encontrado. Por favor, inicia sesión de nuevo.');
      return;
    }

    const query = `
      mutation {
        actualizarNombreApellidoPorAlias(alias: "${alias}", nombre: "${nombre}", apellido: "${apellido}") {
          alias
          nombre
          apellido
        }
      }
    `;

    try {
      const response = await fetch('http://localhost:8080/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      const result = await response.json();

      if (result.errors) {
        console.error('Error actualizando usuario:', result.errors);
        setMensaje('Error actualizando usuario');
      } else {
        setMensaje('Usuario actualizado con éxito');
      }
    } catch (error) {
      console.error('Error actualizando usuario:', error);
      setMensaje('Error actualizando usuario');
    }
  };

  return (
    <div>
      <h1>Actualizar Nombre y Apellido</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Apellido:</label>
          <input
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
          />
        </div>
        <button type="submit">Actualizar</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default ActualizarNombreApellido;