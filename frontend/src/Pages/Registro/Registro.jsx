import React, { useState } from 'react';
import '../../css/Registro.css';
import { FaGoogle } from 'react-icons/fa';
import BotonGoogle from '../../components/boton-google/ButtonGoogle'
import { FaSpotify} from 'react-icons/fa';



const Registro = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {

      
      console.log('Formulario enviado', formData);
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.email) errors.email = 'El email es requerido';
    if (!data.password) errors.password = 'La contraseña es requerida';
    return errors;
  };


  return (
    <body id='cuerpo'>
    <form onSubmit={handleSubmit}>
      
      <div>
        <h1>Registrate</h1>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Ingresa tu email"
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>
      <div>
        <label>Contraseña</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Ingresa tu contraseña"
        />
        {errors.password && <p className="error">{errors.password}</p>}
      </div>
      <div class="contenedorRegistro">
        <button class="btnRegistro">Registrate</button>
      </div>
      <p>o</p>
      <h3>Regístrate con:</h3>
      <div className='apiRegistro'>
          <BotonGoogle icon={FaGoogle}/>
          <BotonGoogle icon={FaSpotify}/>
      </div>
      <div>
        <p>¿Ya tienes una cuenta? <a href="/login">Inicia Sesión</a></p>
      </div>
    </form>
    </body>
  );
};

export default Registro;