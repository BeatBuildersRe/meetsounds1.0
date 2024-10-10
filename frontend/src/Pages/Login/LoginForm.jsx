import { Link } from 'react-router-dom';
import Boton from '@c/input/input';
import '@css/LoginForm.css';
import { CiUser, CiLock } from "react-icons/ci";
import Meetsounds from '@c/logotipo/Logo';
import Remember from '@c/switch/Switch';
import BotonGoogle from '@c/boton-google/ButtonGoogle'
import { FaGoogle, FaSpotify, FaInstagram } from 'react-icons/fa';
import Divider from '@c/divider/Divider';
import BotonInicio from '@c/boton-inicio/BotonInicio'
import BotonRegistro from '@c/boton-registro/BotonRegistro'
import React, { useState,useContext } from "react";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { AuthContext } from '../../js/otro/AuthContext';
// import SuffleHero from '../suffle-hero/SuffleHero'
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
<div className="contenedor11">
      <div className="contenedor-logo">
        <Meetsounds />
      </div>
      <div className="contenedor-formulario-imagen">
        <div className="wrapper">
          <h1>Inicia Sesión</h1>
          <div className="ingreso">
            <input
              className="input"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="input"
              placeholder="Contraseña"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="iniciar">
            <button onClick={manejarLogin}>Iniciar Sesión</button>
          </div>

          {mensajeError && <p style={{ color: "Black" }}>{mensajeError}</p>}

          <div className="register-link">
            <p>¿No tenés una cuenta?</p>
            <a href="/registro">Regístrate</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm