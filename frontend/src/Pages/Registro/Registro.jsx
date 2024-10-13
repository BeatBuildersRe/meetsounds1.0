import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/Registro.css';

function Registro1() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // Nuevo estado para manejar errores

  const navigate = useNavigate();

  // Limpiar el localStorage al montar el componente
  useEffect(() => {
    localStorage.removeItem('userData');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación local
    if (!email || !username || !password) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    // Crear la consulta GraphQL
    const query = `
      mutation {
        comprobarCredenciales(user: {
          alias: "${username}",
          email: "${email}"
        }) {
          id
        }
      }
    `;

    try {
      const response = await fetch('http://localhost:8080/graphql', { // Cambia el puerto y URL si es necesario
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }

      const result = await response.json();

      // Verificar si hay errores devueltos por el backend
      if (result.errors && result.errors.length > 0) {
        const errorMessage = result.errors[0].message; // Obtener el mensaje del error
        setError(errorMessage); // Guardar el error en el estado
        return;
      }

      // Si no hay errores, guardar los datos en localStorage
      const userData = { email, username, password };
      localStorage.setItem('userData', JSON.stringify(userData));
      console.log('Datos guardados en localStorage:', userData);

      // Navegar a la siguiente página
      navigate('/registro2');
    } catch (err) {
      console.error('Error al realizar la solicitud:', err);
      setError('Ocurrió un error. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  return (
    <div id="cuerpo1">
      <div className="login-container">
        <h1 className="titulo">Registro</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label className="labelRegistro1" htmlFor="email">Correo Electrónico</label>
            <input
              className="formCampos"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingresa tu correo"
              required
            />
          </div>
          <div className="form-group">
            <label className="labelRegistro1" htmlFor="username">Nombre de Usuario</label>
            <input
              className="formCampos"
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingresa tu nombre de usuario"
              required
            />
          </div>
          <div className="form-group">
            <label className="labelRegistro1" htmlFor="password">Contraseña</label>
            <input
              className="formCampos"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>} {/* Mostrar el error si existe */}

          <div className="contenedorRegistro">
            <button className="btnRegistro" type="submit">Siguiente</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registro1;
