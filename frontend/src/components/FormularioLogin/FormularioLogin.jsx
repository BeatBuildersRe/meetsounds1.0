
import React from 'react';
import '../../css/Colores.css'; // Variables globales de colores
import { CiLock, CiUser } from "react-icons/ci";
import { FaGoogle } from 'react-icons/fa';
import Meetsounds from '@c/logotipo/Logo';
import BotonGoogle from '@c/Buttons/ButtonGoogle/ButtonGoogle';
import DividerText from '../divider/Divider';
import '../../css/FormularioLogin.css';

const FormularioLogin = ({ username, setUsername, password, setPassword, manejarLogin, mensajeError }) => {
  return (
    <div className='contenedor_de_todo' >
        <div className='contenedor_formulario'>
            <Meetsounds />
            <BotonGoogle icon={FaGoogle} />
            <DividerText />
            <form className='formulario_login' onSubmit={(e) => { e.preventDefault(); manejarLogin(); }}>
                <div className='contenedor_inputs'>
                    <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder=""
                    className='input'
                    />
                    <span className='text_inputs'>
                        <CiUser size={20} style={{ marginRight: '10px' }} />
                        Usuario
                    </span>
                </div>
                <div className='contenedor_inputs'>
                    <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder=""
                    className='input'
                    />
                    <span className='text_inputs'>
                        <CiLock size={20} style={{ marginRight: '10px' }} />
                        Contraseña
                    </span>
                </div>
            </form>
            
                <div className="contenedor_recordarme">
                    <div className="contenedor_switch">
                        <input type="checkbox" role="switch" className="formulario" />
                        <span className="text_switch">Recordarme</span>
                    </div>
                </div>
            
            <button className="boton_de_inicio" onClick={manejarLogin}>
                <svg viewBox="0 0 24 24" className="arr-2" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                    ></path>
                </svg>
                <span className="text">Iniciar Sesión</span>
                <span className="circle"></span>
                <svg viewBox="0 0 24 24" className="arr-1" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                ></path>
                </svg>
            </button>
            <div className="link_recuperar_contraseña">
                    <a href="#">¿Olvidaste tu contraseña?</a>
            </div> 
            <div className="link_registro">
                <a href="/registro">
                    <button className='boton_mandar_al_registro'>
                    Crear cuenta nueva
                    <div className="arrow-wrapper">
                        <div className="arrow"></div>
                    </div>
                    </button>
                </a>   
            </div>
            <div className='terminos-condiciones'>
            <p>Al iniciar sesión, usted acepta nuestros <a href="#">Términos y Condiciones</a> y <a href="#">Políticas de Privacidad</a></p>
            </div>
        </div>
    </div>
    
  );
};

export default FormularioLogin;