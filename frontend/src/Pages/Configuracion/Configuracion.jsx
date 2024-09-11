import React, { useState } from 'react';
import "./Configuracion.css"
import Perfil from '../Configuracion/Perfil/Perfil';
import Seguridad from './Seguridad/Seguridad';
import R_Card from '../../components/Card/Card';
import Seguridad_6 from '../../img/seguridad6.jpg'
import Seguridad_5 from '../../img/seguridad5.jpg'

const Configuracion = () => {
    const seguridad_texto = "En esta sección, puedes actualizar tu contraseña y dirección de correo electrónico para mantener tu cuenta segura y asegurarte de recibir todas las notificaciones importantes."
    const seguridad_texto_short = "Email y Contraseña."
    const perfil_texto = "En esta sección, puedes actualizar tu información personal para mantener tu perfil siempre al día. Comparte tus intereses, preferencias y vincula tus redes sociales para personalizar tu experiencia."
    const perfil_texto_short = "Datos personales, perfil, preferencias"
    return (
        <div className="contenedor-configuraci">
           
            <R_Card 
                to="perfil" 
                img={Seguridad_5} 
                titulo="Perfil"
                descripcion={perfil_texto}
                descripcion_short={perfil_texto_short}
            
            />
            <R_Card 
                to="seguridad" 
                img={Seguridad_6} 
                titulo="Seguridad"
                descripcion={seguridad_texto}
                descripcion_short={seguridad_texto_short}
            
            />
           
           
        </div>
    );
};

export default Configuracion;