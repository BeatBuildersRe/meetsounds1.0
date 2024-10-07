import React from 'react';
import "./Configuracion.css"
import { FcBusinessman, FcSafe } from "react-icons/fc";
import { FcImport } from "react-icons/fc";
import { useThemeContext } from '../../context/ThemeContext';
import R_Card2 from '../../components/Card/Card2';
import MenuDerechoDiv from '../Home/Derecha';
import { IoSunnyOutline } from "react-icons/io5";

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
                        
                    </div>

                    <MenuDerechoDiv></MenuDerechoDiv>
                </div>
            </div>

            <div />
        </>

    );


}
export default Configuracion;