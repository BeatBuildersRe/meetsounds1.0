import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '@css/Registro.css';

function Registro1() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('userData');
  }, []);

  const validatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++; 
    if (/[A-Z]/.test(password)) strength++; 
    if (/[a-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++; 
    if (/[\W_]/.test(password)) strength++; 

    switch (strength) {
      case 5:
        return 'Fuerte';
      case 4:
        return 'Normal'; 
      case 3:
        return 'Débil';
      default:
        return 'Muy débil';
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    const strength = validatePasswordStrength(value);
    setPasswordStrength(strength);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !username || !password) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    if (passwordStrength === 'Débil' || passwordStrength === 'Muy débil') {
      alert("La contraseña es demasiado débil. Por favor, elige una contraseña más fuerte.");
      return;
    }

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
      const response = await fetch('http://localhost:8080/graphql', {
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

      if (result.errors && result.errors.length > 0) {
        const errorMessage = result.errors[0].message;
        setError(errorMessage);
        return;
      }

      if (passwordStrength === 'Normal' || passwordStrength === 'Fuerte') {
        const userData = { email, username, password };
        localStorage.setItem('userData', JSON.stringify(userData));
        console.log('Datos guardados en localStorage:', userData);

        navigate('/registro2');
      } else {
        alert("La contraseña debe ser al menos de fortaleza 'Normal'.");
      }
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
              onChange={handlePasswordChange}
              placeholder="Ingresa tu contraseña"
              required
            />
            {password && (
              <p className={`password-strength ${passwordStrength.toLowerCase()}`}>
                Fortaleza de la contraseña: {passwordStrength}
              </p>
            )}
          </div>

          {error && <p className="error">{error}</p>}

          <div className="contenedorRegistro">
            <button className="btnRegistro" type="submit">Siguiente</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registro1;
