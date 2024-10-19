import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { AuthContext } from '../../js/otro/AuthContext';
import Fondo from '@c/FondoLoginRegister/FondoLoginRegister';
import MenuRedireccionable from '@c/MenuRedireccionable/MenuRedireccionable';
import FormularioLogin from '@c/FormularioLogin/FormularioLogin';
import { BASE_URL } from '../../config'
const InfiniteBackground = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mensajeError, setMensajeError] = useState("");
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleToggleWelcome = () => setShowWelcome(!showWelcome);
  const handleShowSecondModal = () => setShowSecondModal(true);

  const manejarLogin = async () => {
    try {
      const response = await fetch(`${BASE_URL}/autenticacion/login`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ username, password }),
        credentials: "include",
      });

      if (!response.ok) throw new Error(response.statusText);

      const data = await response.text();
      if (data === "Login exitoso") {
        setMensajeError("");
        Cookies.set('alias', username, { expires: 7 });
        setIsAuthenticated(true);
        navigate("/");
      } else {
        setMensajeError("Credenciales incorrectas o error en el servidor");
      }
    } catch (error) {
      console.error("Error en la conexión con el servidor:", error);
      setMensajeError("Error en la conexión con el servidor");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setMensajeError(""), 5000);
    return () => clearTimeout(timer);
  }, [mensajeError]);

  const styles = {
    container: {
      zIndex: 10,
      position: "absolute",
      width: "100vw",
      height: "100vh",
      overflow: "hidden",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    menu: {
      transition: "transform 0.7s ease", // Animación de transición
      transform: showSecondModal ? "translateX(-200%)" : "translateX(0)", // Mueve a la izquierda cuando se muestra el modal
    },
    form: {
      transition: "transform 0.7s ease", // Animación de transición
      transform: showSecondModal ? "translateX(0)" : "translateX(300%)", // Mueve desde la derecha
      position: "absolute", // Para que se superponga sobre el menú
     
    },
    errorMessage: {
      color: "white",
      backgroundColor: "red",
      padding: "10px",
      borderRadius: "5px",
      position: "absolute",
      top: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 1000,
    },
  };

  return (
    <div>
      <Fondo />
      <div style={styles.container}>
        {/* Menú con animación hacia la izquierda */}
        <div style={styles.menu}>
          {showWelcome && (
            <MenuRedireccionable
              handleToggleWelcome={handleToggleWelcome}
              handleShowSecondModal={handleShowSecondModal}
            />
          )}
        </div>
        
        {/* Formulario con animación desde la derecha */}
        <div style={styles.form}>
          {showSecondModal && (
            <FormularioLogin
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              manejarLogin={manejarLogin}
              mensajeError={mensajeError}
            />
          )}
        </div>

        {mensajeError && <div style={styles.errorMessage}>{mensajeError}</div>}
      </div>
    </div>
  );
};

export default InfiniteBackground;
