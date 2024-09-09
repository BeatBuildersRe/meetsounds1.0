import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import "./Configuracion.css"
import ActionAreaCard from '../../components/Card'
import img_user from '../../assets/Img-Card-User.png'
import img_seguridad from '../../assets/Img-Card-Seg.png'

import Perfil from '../Configuracion/Perfil/Perfil';
import Seguridad from './Seguridad/Seguridad';

const Configuracion = () => {


    return (
        <div className="contenedor-configuracion">
            <div className="configuracion-menu">
                {/* opciones que elije el usuario */}
                <ActionAreaCard
                    text={"Perfil"}
                    descripcion={"Perfil, informacion personal"}
                    img={img_user}
                    to="perfil"
                />
                <ActionAreaCard
                    text={"Seguridad"}
                    descripcion={"Seguridad y Privacidad"}
                    img={img_seguridad}
                    to="seguridad"
                />
            </div>
            
           
        </div>
    );
};

export default Configuracion;