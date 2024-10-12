import React, { useState,useContext } from "react";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../js/otro/AuthContext';

import '@css/LoginForm.css';
import { CiLogin, CiCirclePlus, CiLock, CiUser } from "react-icons/ci";
import { FaGoogle} from 'react-icons/fa';
import Meetsounds from '@c/logotipo/Logo';
import BotonGoogle from '@c/boton-google/ButtonGoogle'
import Divider from '@c/divider/Divider';






const InfiniteBackground = () => {
  // Definimos un estado para controlar si el contenido está activo o no
  const [showWelcome, setShowWelcome] = useState(true);
  const handleToggle = () => {
    setShowWelcome(!showWelcome); // Cambia el estado para mostrar uno u otro
  };

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
    <div className="background-container">
      <div className="background-filter"></div>
      {/* Fondo de imágenes en múltiples columnas */}
      <div className="background-columns">
        {/* Columna 1 */}
        <div className="background-scroll">
          <img src="https://img.freepik.com/foto-gratis/banda-haciendo-tonterias_23-2147624314.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" alt="Imagen 1" />
          <img src="https://img.freepik.com/foto-gratis/mujer-sonriente-tiro-completo-guitarra_23-2149154270.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" alt="Imagen 2" />
          <img src="https://img.freepik.com/foto-gratis/musica-guitarra-al-aire-libre_23-2148078957.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" alt="Imagen 3" />
          <img src="https://img.freepik.com/foto-gratis/vista-lateral-musicos-masculinos-casa-tocando-guitarra-teclado-electrico_23-2148847043.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" alt="Imagen 4" />
          <img src="https://img.freepik.com/foto-gratis/musica-guitarra-al-aire-libre_23-2148079080.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" alt="Imagen 5" />
          <img src="https://img.freepik.com/foto-gratis/joven-bella-cantante-pop-estrella-sonriente-microfono-sentado-escena-club_158538-7866.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" alt="Imagen 6" />
          <img src="https://img.freepik.com/foto-gratis/vista-frontal-ejecutante-masculino-posando-junto-ventana-mientras-toca-guitarra-electrica_23-2148680333.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" alt="Imagen 7" />
          <img src="https://img.freepik.com/foto-gratis/vista-lateral-artista-masculino-tocando-saxofon_23-2148730881.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" alt="Imagen 8" />
          <img src="https://img.freepik.com/foto-gratis/hombre-tocando-guitarra-electrica_23-2148680318.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" alt="Imagen 9" />
          <img src="https://img.freepik.com/foto-gratis/hermosa-nina-toca-cello-pasion-ambiente-concreto_150588-147.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" alt="Imagen 10" />
          <img src="https://img.freepik.com/foto-gratis/joven-tocando-instrumento-dia-internacional-jazz_23-2148927526.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" alt="Imagen 11" />
          <img src="https://img.freepik.com/foto-gratis/bodegon-equipamiento-musica_23-2148201746.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" alt="Imagen 12" />
        </div>

        {/* Columna 2 */}
        <div className="background-scroll">
        <img src="https://img.freepik.com/foto-gratis/mujer-tiro-completo-tocando-guitarra-al-aire-libre_23-2149223699.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" alt="Imagen 1" />
          <img src="https://img.freepik.com/foto-gratis/hombre-lugar-roca_23-2151734251.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" alt="Imagen 2" />
          <img src="https://img.freepik.com/foto-gratis/tiro-medio-hombre-mujer-guitarras_23-2149223645.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" alt="Imagen 3" />
          <img src="https://img.freepik.com/foto-gratis/musica-guitarra-al-aire-libre_23-2148079068.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" alt="Imagen 4" />
          <img src="https://img.freepik.com/foto-gratis/teclado-musical-guitarrista_23-2147624344.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" alt="Imagen 5" />
          <img src="https://img.freepik.com/foto-gratis/musico-masculino-guapo-saxofon_23-2148730909.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" alt="Imagen 6" />
          <img src="https://img.freepik.com/foto-gratis/vista-frontal-hombre-tocando-saxofon_23-2148207553.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" alt="Imagen 7" />
          <img src="https://img.freepik.com/foto-gratis/fotografia-blanco-negro-mujer-elegante_250224-135.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" alt="Imagen 8" />
          <img src="https://img.freepik.com/foto-gratis/musico-escenario-su-guitarra-clasica_23-2148465318.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" alt="Imagen 9" />
          <img src="https://img.freepik.com/foto-gratis/musico-veterano-tocando-trompeta_150588-93.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" alt="Imagen 10" />
          <img src="https://img.freepik.com/foto-gratis/mujeres-tiro-medio-jugando-juntas_23-2149223633.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" alt="Imagen 11" />
          <img src="https://img.freepik.com/foto-gratis/mujer_23-2147782054.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" alt="Imagen 12" />
        </div>

        {/* Columna 3 */}
        <div className="background-scroll">
        <img src="https://img.freepik.com/foto-gratis/cool-tatuado-hombre-tocando-guitarra-estudio_53876-95866.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" alt="Imagen 1" />
          <img src="https://img.freepik.com/foto-gratis/vista-frontal-musico-masculino_23-2148730861.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" alt="Imagen 2" />
          <img src="https://img.freepik.com/foto-gratis/gente-tiro-completo-jugando-juntos_23-2149223625.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" alt="Imagen 3" />
          <img src="https://img.freepik.com/foto-gratis/mujer-tiro-completo-posando-contrabajo_23-2149154309.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" alt="Imagen 4" />
          <img src="https://img.freepik.com/foto-gratis/jovenes-musicos-caucasicos-banda-actuando-luz-neon-estudio-azul_155003-43314.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" alt="Imagen 5" />
          <img src="https://img.freepik.com/foto-gratis/mujer-tiro-medio-cantando_23-2149163002.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" alt="Imagen 6" />
          <img src="https://img.freepik.com/foto-gratis/plano-medio-mujer-talentosa-cantando_23-2151194038.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" alt="Imagen 7" />
          <img src="https://img.freepik.com/foto-gratis/vista-cerca-guitara_23-2148201781.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" alt="Imagen 8" />
          <img src="https://img.freepik.com/foto-gratis/instrumento-musical-tienda_23-2150608903.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" alt="Imagen 9" />
          <img src="https://img.freepik.com/foto-gratis/mujer-desconectando-digital-casa-tocando-piano_23-2150037462.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" alt="Imagen 10" />
          <img src="https://img.freepik.com/foto-gratis/instrumento-musical-tienda_23-2150608945.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" alt="Imagen 11" />
          <img src="https://img.freepik.com/foto-gratis/concepto-minimalista-paredes-madera-guitarra-clasica_23-2148465319.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" alt="Imagen 12" />
        </div>

        {/* Columna 4 */}
        <div className="background-scroll">
        <img src="https://img.freepik.com/foto-gratis/instrumento-musical-tienda_23-2150608947.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" alt="Imagen 1" />
          <img src="https://img.freepik.com/foto-gratis/vista-superior-mujer-tocando-piano_23-2150060732.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" alt="Imagen 2" />
          <img src="https://img.freepik.com/foto-gratis/majestuoso-piano-escenario-actuacion-generativa-ai_188544-7791.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" alt="Imagen 3" />
          <img src="https://img.freepik.com/foto-gratis/alto-angulo-musico-masculino-tocando-corneta_23-2148680338.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" alt="Imagen 4" />
          <img src="https://img.freepik.com/foto-gratis/guitarras-electricas-cultivo_23-2147781745.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" alt="Imagen 5" />
          <img src="https://img.freepik.com/fotos-premium/vista-angulo-violines-colgados-contra-pared_1048944-15341634.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" alt="Imagen 6" />
          <img src="https://img.freepik.com/foto-gratis/hombre-talentoso-tiro-medio-tocando-saxofon_23-2149324272.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" alt="Imagen 7" />
          <img src="https://img.freepik.com/foto-gratis/artista-creando-musica-pop-dormitorio-alternativa_23-2149736733.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" alt="Imagen 8" />
          <img src="https://img.freepik.com/foto-gratis/adorable-nina-su-guitarra-parque-foto-alta-calidad_144627-74785.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" alt="Imagen 9" />
          <img src="https://img.freepik.com/foto-gratis/manos-sujetando-trompeta_23-2147624317.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" alt="Imagen 10" />
          <img src="https://img.freepik.com/foto-gratis/musico-celebrando-evento-dia-jazz_23-2148876980.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" alt="Imagen 11" />
          <img src="https://img.freepik.com/foto-gratis/vida-muerta-guitarra-electrica_23-2151376255.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" alt="Imagen 12" />
        </div>

        {/* Columna 5 */}
        <div className="background-scroll">
        <img src="https://img.freepik.com/foto-gratis/musico-tiro-medio-sentado-tocando-saxo_23-2148207506.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" alt="Imagen 1" />
          <img src="https://img.freepik.com/foto-gratis/piano-colorido-ninos-sobre-fondo-naranja_23-2148201801.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" alt="Imagen 2" />
          <img src="https://img.freepik.com/foto-gratis/mujer-alto-angulo-tocando-piano_23-2150060730.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" alt="Imagen 3" />
          <img src="https://img.freepik.com/foto-gratis/tambores-imagen-conceptual_1204-203.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" alt="Imagen 4" />
          <img src="https://img.freepik.com/foto-gratis/musico-tiro-completo-tocando-contrabajo-al-aire-libre_23-2149356937.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" alt="Imagen 5" />
          <img src="https://img.freepik.com/foto-gratis/majestuoso-piano-escenario-actuacion-generativa-ai_188544-7791.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" alt="Imagen 6" />
          <img src="https://img.freepik.com/foto-gratis/primer-plano-parte-kit-bateria-sobre-fondo-borroso_169016-20614.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" alt="Imagen 7" />
          <img src="https://img.freepik.com/foto-gratis/grafico-tiza-tambor-pizarra_1379-353.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" alt="Imagen 8" />
          <img src="https://img.freepik.com/foto-gratis/musico-veterano-tocando-trompeta_150588-90.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" alt="Imagen 9" />
          <img src="https://img.freepik.com/foto-gratis/interpretacion-musica-country-cantando-al-aire-libre_23-2149498447.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" alt="Imagen 10" />
          <img src="https://img.freepik.com/foto-gratis/cerrar-musico-tocando-saxofon_23-2149247196.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" alt="Imagen 11" />
          <img src="https://img.freepik.com/foto-gratis/mujer-sonriente-tiro-medio-instrumento_23-2149154303.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" alt="Imagen 12" />
        </div>
      </div>

      {/* Contenido centrado */}
      <div className="container">
        <div className={`welcome-container ${showWelcome ? 'slide-in-left' : 'slide-out-left'}`}>
          <div className="modal">
            <div className="contenedor-logo">
              <Meetsounds />
            </div>
            <h1>Bienvenido a MeetSounds</h1>
            <div className="contenedor_botones_redirecionantes">
            <button className="boton_login_"onClick={handleToggle}>
              <CiLogin size={30}style={{ marginRight: '10px' }} /> 
              <p className="text">Iniciar Sesión</p>
            </button>
            <a href="/registro" className="boton_a_link">
              <button className="boton_registro">
                <CiCirclePlus size={30} style={{ marginRight: '10px' }} />
                <p className="text">Registrarte</p>
              </button>
            </a>         

            </div>
             
          </div>
        </div>
      
      
        <div className={`new-section-container ${!showWelcome ? 'slide-in-right' : 'slide-out-right'}`}>
          <div className="content-box">
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
                  <div className="contenedor_inputs">
                    <input
                      className="input"
                      placeholder=""
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <span className="texto_inputs"><CiUser size={20}style={{ marginRight: '10px' }}  />Usuario</span>
                  </div>
                  <div className="contenedor_inputs">
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
                    <div className="contenedor_switch">
                      <input type="checkbox" role="switch" class="formulario" />
                      <span className="text_switch">Recordarme</span>
                    </div>
                  </div>
                  <button className="boton_de_inicio" onClick={manejarLogin}>
                    <svg viewBox="0 0 24 24" class="arr-2" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                      ></path>
                    </svg>
                    <span className="text">Iniciar Sesión</span>
                    <span className="circle"></span>
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
                        <div className="arrow-wrapper">
                            <div className="arrow"></div>
                        </div>
                      </button>
                    </a>
                    
                  </div>
                  <div className="terminos-condiciones">
                    <p>Al iniciar sesión, usted acepta nuestros <a href="#">Términos y Condiciones</a> y <a href="#">Políticas de Privacidad</a></p>
                  </div>
                </div>
                
              </div>
              {mensajeError && (<div
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
              {mensajeError}</div>)} 
            </div>

           
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default InfiniteBackground;
