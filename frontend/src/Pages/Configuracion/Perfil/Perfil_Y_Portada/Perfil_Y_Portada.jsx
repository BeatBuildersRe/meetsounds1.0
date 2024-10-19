/* Css */
import '@css/Perfil_Y_Portada.css';
/* React */
import React from 'react';
import { useForm } from "react-hook-form";
/* Componentes */
import MenuDerechoDiv from "@c/Menu/Derecha";

const Perfil_Y_Portada = () => {

    return (
        <>
            <div className="Contenedor">
                <div className="contenedor2">
                    <div className="izquierda-Perfil-Y-Portada">
                        <div className='media'>

                        </div>
                    </div>
                    <MenuDerechoDiv />
                </div>
            </div>
        </>
    );
};

export default Perfil_Y_Portada;
