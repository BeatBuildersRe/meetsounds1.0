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
    <form class="cuerpoRegistro" onSubmit={handleSubmit}>

      <center><h1 class="titRegistro">Registrate</h1></center>
      <div class="divCampos">
        <label class="nombreCampo">Email</label>
        <input class="formCampo"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Ingresa tu email"
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>
      <div class="divCampos">
        <label class="nombreCampo">Contraseña</label>
        <input class="formCampo"
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
      <center><p className='separador'>o</p></center>
      <center><h3>Regístrate con:</h3></center>
      <div className='apiRegistro'>
          <BotonGoogle icon={FaGoogle}/>
          <BotonGoogle icon={FaSpotify}/>
      </div>
      <div class="linkLogin">
        <center><p class="textLogin">¿Ya tienes una cuenta? <a href="/login">Inicia Sesión</a></p></center>
      </div>
    </form>
    </body>
  );
};

export default Registro;