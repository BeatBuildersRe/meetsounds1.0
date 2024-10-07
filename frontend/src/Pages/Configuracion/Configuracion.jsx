import React from 'react';
import "./Configuracion.css"

import { useThemeContext } from '../../context/ThemeContext';
import R_Card2 from '../../components/Card/Card2';
import MenuDerechoDiv from '../Home/Derecha';

import { CiLogout,CiUser,CiLock,CiLight } from "react-icons/ci";


const Configuracion = () => {
    const { contextTheme, setContextTheme } = useThemeContext();

    // Función para alternar entre Light y Dark
    const toggleTheme = () => {
        setContextTheme(contextTheme === "Light" ? "Dark" : "Light");
    };

    return (
        <>
            <div className="Contenedor">
                <div className="contenedor2">
                    <div className="izquierda-configuracion">
                        <h2>Configuración</h2>
                        <R_Card2 to="perfil" text="Perfil" icon={<CiUser />} />
                        <R_Card2 to="seguridad" text="Seguridad" icon={<CiLock/>} />
                        <R_Card2 to="/login" text="Cerrar Sesión" icon={<CiLogout />} />
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