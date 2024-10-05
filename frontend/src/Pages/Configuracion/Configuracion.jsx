import React from 'react';
import "./Configuracion.css"
import { FcBusinessman, FcSafe } from "react-icons/fc";
import { FcImport } from "react-icons/fc";
import { useThemeContext } from '../../context/ThemeContext';
import R_Card2 from '../../components/Card/Card2';
import MenuDerechoDiv from '../Home/Derecha';

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
                        <R_Card2 to="perfil" text="Perfil" icon={<FcBusinessman />} />
                        <R_Card2 to="seguridad" text="Seguridad" icon={<FcSafe />} />
                        <R_Card2 to="/login" text="Cerrar Sesión" icon={<FcImport />} />


                    </div>

                    <MenuDerechoDiv></MenuDerechoDiv>
                </div>
            </div>

            <div />
        </>

    );


}
export default Configuracion;