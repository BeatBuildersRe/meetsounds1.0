import { Link } from 'react-router-dom';

import '@css/LoginForm.css';
import { CiUser, CiLock } from "react-icons/ci";
import Meetsounds from '@c/logotipo/Logo';

import BotonGoogle from '@c/boton-google/ButtonGoogle'
import { FaGoogle} from 'react-icons/fa';
import Divider from '@c/divider/Divider';

import React, { useState,useContext } from "react";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { AuthContext } from '../../js/otro/AuthContext';

const LoginForm = () => {

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mensajeError, setMensajeError] = useState("");
  const { setIsAuthenticated } = useContext(AuthContext);
  

  // Función para manejar el login
  const manejarLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/autenticacion/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: username,
          password: password,
        }),
        credentials: "include", // Esto asegura que las cookies de sesión se envíen/reciban correctamente
      });

      if (!response.ok) {
        console.error("Error en la solicitud al servidor:", response.statusText);
        setMensajeError("Error en la solicitud al servidor");
        return;
      }
  
      const data = await response.text(); // Asegúrate de que esta respuesta sea lo que esperas
      console.log("Respuesta del servidor:", data);
  
      // Verifica si el servidor retorna "Login exitoso"
      if (data === "Login exitoso") {
        console.log("Login exitoso, redirigiendo...");
        setMensajeError("");
        const alias = username;  // Cambia esto para que sea el alias real del usuario
        Cookies.set('alias', alias, { expires: 7 }); // Guarda el alias en una cookie con duración de 7 días
        setIsAuthenticated(true);
        navigate("/");  // Redirige al usuario a la página principal
      } else {
        console.error("Error en el login:", data);
        setMensajeError("Credenciales incorrectas o error en el servidor");
      }
    } catch (error) {
      console.error("Error en la conexión con el servidor:", error);
      setMensajeError("Error en la conexión con el servidor");
    }
  };

return (
  <div className="contenedor_de_todo">
    <div className="contenedor_formulario_con_algo_mas">
      <div className="contenedor_formulario">
        <div className="contenedor-logo">
          <Meetsounds />
        </div>
        <div className="contenedor_social">
          <BotonGoogle icon={FaGoogle} />
        </div>
        <Divider />
        <div class="contenedor_inputs">
          <input
            className="input"
            placeholder=""
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <span className="texto_inputs"><CiUser size={20}style={{ marginRight: '10px' }}  />Usuario</span>
        </div>
        <div class="contenedor_inputs">
          <input
            className="input"
            placeholder=""
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="texto_inputs"><CiLock size={20}  style={{ marginRight: '10px' }}/>Contraseña</span>
        </div>
        <div className="contenedor_recordarme">
          <div class="contenedor_switch">
            <input type="checkbox" role="switch" class="formulario" />
            <span class="text_switch">Recordarme</span>
          </div>
        </div>
        <button class="boton_de_inicio" onClick={manejarLogin}>
          <svg viewBox="0 0 24 24" class="arr-2" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
            ></path>
          </svg>
          <span class="text">Iniciar Sesión</span>
          <span class="circle"></span>
          <svg viewBox="0 0 24 24" class="arr-1" xmlns="http://www.w3.org/2000/svg">
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
              <div class="arrow-wrapper">
                  <div class="arrow"></div>
              </div>
            </button>
          </a>
        </div>
        <div className="terminos-condiciones">
          <p>Al iniciar sesión, usted acepta nuestros <a href="#">Términos y Condiciones</a> y <a href="#">Políticas de Privacidad</a></p>
        </div>
      </div>
      
    </div>
        
    {mensajeError && (
  <div
    style={{
      color: "white", // Color del texto
      backgroundColor: "red", // Fondo rojo para destacar el error
      padding: "10px", // Espaciado interno
      borderRadius: "5px", // Bordes redondeados
      position: "absolute", // Posicionamiento absoluto
      top: "20px", // Espaciado desde la parte superior
      left: "50%", // Centra horizontalmente
      transform: "translateX(-50%)", // Asegura el centrado en toda la página
      zIndex: 1000, // Asegura que se muestre por encima de otros elementos
    }}
  >
    {mensajeError}
  </div>
)}

      
  </div>
);
}

export default LoginForm