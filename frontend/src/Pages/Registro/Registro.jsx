import React, { useState } from 'react';
import '../../css/Registro.css';
import { FaGoogle } from 'react-icons/fa';
import BotonGoogle from '../../components/boton-google/ButtonGoogle';
import { FaSpotify } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Registro = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: ''
  });

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  /* Se cambia al registro 2 si todos los datos son correctos */

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      console.log('Formulario enviado', formData);
      navigate('/Registro2');
    } else {
      alert(`Faltan los siguientes campos: ${Object.values(validationErrors).join(', ')}`);
    }
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.email) errors.email = 'Email';
    if (!data.password) errors.password = 'Contraseña';
    if (!data.username) errors.username = 'Nombre de usuario';
    return errors;
  };

  return (
    <body id="cuerpo">
      <form className="cuerpoRegistro" onSubmit={handleSubmit}>
        <center><h1 className="titRegistro">Regístrate</h1></center>

        <div className="divCampos">
          <label className="nombreCampo">Email</label>
          <input
            className="formCampo"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Ingresa tu email"
          />
        </div>

        <div className="divCampos">
          <label className="nombreCampo">Contraseña</label>
          <input
            className="formCampo"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Ingresa tu contraseña"
          />
        </div>

        <div className="divCampos">
          <label className="nombreCampo">Nombre de Usuario</label>
          <input
            className="formCampo"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Ingresa tu nombre de usuario"
          />
        </div>

        <div className="contenedorRegistro">
          <button className="btnRegistro">Regístrate</button>
        </div>

        <center><p className='separador'>o</p></center>
        <center><h3>Regístrate con:</h3></center>
        <div className='apiRegistro'>
          <BotonGoogle icon={FaGoogle} />
          <BotonGoogle icon={FaSpotify} />
        </div>

        <div className="linkLogin">
          <center><p className="textLogin">¿Ya tienes una cuenta? <a href="/login">Inicia Sesión</a></p></center>
        </div>
      </form>
    </body>
  );
};

export default Registro;


