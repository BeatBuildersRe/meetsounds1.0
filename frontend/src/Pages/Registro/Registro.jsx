import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/Registro.css';

function Registro1() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación
    if (!email || !username || !password) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    // Guardar datos en localStorage
    const userData = { email, username, password };
    localStorage.setItem('userData', JSON.stringify(userData));
    // Navegar a la siguiente página
    navigate('/registro2');
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
            />
          </div>
          <div className="contenedorRegistro">
            <button className="btnRegistro" type="submit">Siguiente</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registro1;

