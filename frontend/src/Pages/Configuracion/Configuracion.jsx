import React from 'react';
import "./Configuracion.css"
import { FcBusinessman, FcSafe } from "react-icons/fc";
import { FcImport } from "react-icons/fc";
import { useThemeContext } from '../../context/ThemeContext';
import R_Card2 from '../../components/Card/Card2';
import MenuDerecho from '@c/Menu/Menu';

const Configuracion = () => {
    const { contextTheme, setContextTheme } = useThemeContext();

    // Función para alternar entre Light y Dark
    const toggleTheme = () => {
        setContextTheme(contextTheme === "Light" ? "Dark" : "Light");
    };

    const seguridad_texto = "En esta sección, puedes actualizar tu contraseña y dirección de correo electrónico para mantener tu cuenta segura y asegurarte de recibir todas las notificaciones importantes.";
    const seguridad_texto_short = "Email y Contraseña.";
    const perfil_texto = "En esta sección, puedes actualizar tu información personal para mantener tu perfil siempre al día. Comparte tus intereses, preferencias y vincula tus redes sociales para personalizar tu experiencia.";
    const perfil_texto_short = "Datos personales, perfil, preferencias";

    return (
        <>
            <div className="Contenedor">


                <div className="izquierda-configuracion">
                    <h2>Configuración</h2>
                    <R_Card2 to="perfil" text="Perfil" icon={<FcBusinessman />} />
                    <R_Card2 to="seguridad" text="Seguridad" icon={<FcSafe />} />
                    <R_Card2 to="/login" text="Cerrar Sesión" icon={<FcImport />} />
                </div>
                <div className="derecha">
                    <MenuDerecho></MenuDerecho>
                </div>
            </div>
        </>

    );


}
export default Configuracion;