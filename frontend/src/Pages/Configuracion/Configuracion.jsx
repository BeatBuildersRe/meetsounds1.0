import React, { useState } from 'react';
import "./Configuracion.css"
import Perfil from '../Configuracion/Perfil/Perfil';
import Seguridad from './Seguridad/Seguridad';
import R_Card from '../../components/Card/Card';
import { FcBusinessman,FcSafe } from "react-icons/fc";
import { FcImport } from "react-icons/fc";


import Seguridad_6 from '../../img/seguridad6.jpg'
import Seguridad_5 from '../../img/seguridad5.jpg'
import { useThemeContext } from '../../context/ThemeContext';
import R_Card2 from '../../components/Card/Card2';

const Configuracion = () => {
    const {contextTheme} = useThemeContext()
    const seguridad_texto = "En esta sección, puedes actualizar tu contraseña y dirección de correo electrónico para mantener tu cuenta segura y asegurarte de recibir todas las notificaciones importantes."
    const seguridad_texto_short = "Email y Contraseña."
    const perfil_texto = "En esta sección, puedes actualizar tu información personal para mantener tu perfil siempre al día. Comparte tus intereses, preferencias y vincula tus redes sociales para personalizar tu experiencia."
    const perfil_texto_short = "Datos personales, perfil, preferencias"
    return (
        <div className="contenedor-configuraci">
            <h2>Configuracion</h2>
            <R_Card2 to="seguridad" text="Perfil" icon={<FcBusinessman />}/>
            <R_Card2 to="seguridad" text="seguridad" icon={<FcSafe />}/>
            <R_Card2 to="/login" text="Cerrar Sesion" icon={<FcImport></FcImport>}/>
           
           
        </div>
    );
};

export default Configuracion;