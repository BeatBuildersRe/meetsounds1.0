import React, { useContext } from 'react';
import "./Configuracion.css"

import { useThemeContext } from '../../context/ThemeContext';
import R_Card2 from '../../components/Card/Card2';
import MenuDerechoDiv from '../Home/Derecha';

import { AuthContext } from '../../js/otro/AuthContext'; // Asegúrate de que la ruta sea correcta
import { useNavigate } from 'react-router-dom'; // Para redirigir después de cerrar sesión

import { CiLogout,CiUser,CiLock,CiLight } from "react-icons/ci";


const Configuracion = () => {
    const { contextTheme, setContextTheme } = useThemeContext();

    // Función para alternar entre Light y Dark
    const toggleTheme = () => {
        setContextTheme(contextTheme === "Light" ? "Dark" : "Light");
    };

    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Llama a la función de cierre de sesión
        navigate('/login'); // Redirige a la página de inicio de sesión
      };

    return (
        <>
            <div className="Contenedor">
                <div className="contenedor2">
                    <div className="izquierda-configuracion">
                        <h2>Configuración</h2>
                        <R_Card2 to="perfil" text="Perfil" icon={<CiUser />} />
                        <R_Card2 to="seguridad" text="Seguridad" icon={<CiLock/>} />
                        <button onClick={handleLogout}>Cerrar Sesión</button>
                        <R_Card2 to="apariencia" text="Apariencia" icon={<CiLight />} />

                    </div>

                    <MenuDerechoDiv></MenuDerechoDiv>
                </div>
            </div>

            <div />
        </>

    );


}
export default Configuracion;