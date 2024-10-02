import React, { useState } from 'react';
import '../../css/Registro.css';
import { FaGoogle, FaSpotify } from 'react-icons/fa';
import BotonGoogle from '../../components/boton-google/ButtonGoogle';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";

const Registro = () => {
  const navigate = useNavigate(); 

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');

  const validatePassword = (password) => {
    const strength = getPasswordStrength(password);
    setPasswordStrength(strength.text);
    return strength.valid;
  };

  const getPasswordStrength = (password) => {
    const lengthValid = password.length >= 12;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (lengthValid && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar) {
      return { text: 'Fuerte', valid: true };
    }
    if (lengthValid) {
      return { text: 'Normal', valid: true };
    }
    return { text: 'Débil', valid: false };
  };

  const getStrengthClass = () => {
    if (passwordStrength === 'Fuerte') return 'strong';
    if (passwordStrength === 'Normal') return 'normal';
    return 'weak';
  };

  const OnSubmit = (data) => {
    console.log(data);
    navigate('/registro2'); 
  };

  return (
    <div id="cuerpo">
      <form className="cuerpoRegistro" onSubmit={handleSubmit(OnSubmit)}>
        <center><h1 className="titRegistro">Regístrate</h1></center>

        <div className="ingreso">
          {/* Campo de Email */}
          <input 
            className="formCampo" 
            type="email" 
            placeholder='Correo Electrónico'
            {...register('correoElectronico', {
              required: 'El campo Correo Electrónico es requerido',
              maxLength: {
                value: 100,
                message: 'El campo Correo Electrónico debe tener como máximo 100 caracteres'
              }
            })} 
          />
          {errors.correoElectronico && <p>{errors.correoElectronico.message}</p>}

          {/* Campo de Contraseña */}
          <input 
            className="formCampo" 
            type="password" 
            placeholder='Contraseña'
            {...register('contraseña', {
              required: 'El campo Contraseña es requerido',
              validate: validatePassword 
            })} 
            onChange={(e) => {
              setPassword(e.target.value);
              validatePassword(e.target.value);
            }}
          />
          {errors.contraseña && <p>{errors.contraseña.message}</p>}
          
          {/* Indicador de fortaleza de contraseña */}
          <div className={`passwordStrength ${getStrengthClass()}`}>
            {passwordStrength}
          </div>

          {/* Campo de Usuario */}
          <input 
            className="formCampo" 
            type="text" 
            placeholder='Nombre de usuario'
            {...register('nombreUsuario', { required: 'El campo Nombre de usuario es requerido' })} 
          />
          {errors.nombreUsuario && <p>{errors.nombreUsuario.message}</p>}
        </div>

        <div className="contenedorRegistro">
          <button className="btnRegistro" type="submit">Regístrate</button>
        </div>

        <center><p className='separador'>o</p></center>
        <center><h3>Regístrate con:</h3></center>
        <div className='apiRegistro'>
          <BotonGoogle icon={FaGoogle} />
          <BotonGoogle icon={FaSpotify} />
        </div>

        <div className="linkLogin">
          <center><p className="textLogin">¿Ya tienes una cuenta? Inicia Sesión</p></center>
        </div>
      </form>
    </div>
  );
};

export default Registro;
