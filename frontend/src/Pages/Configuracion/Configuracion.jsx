import React, { useState } from 'react';
import "./Configuracion.css"
import ActionAreaCard from '../../components/Card'
import img_user from '../../assets/Img-Card-User.png'
import img_seguridad from '../../assets/Img-Card-Seg.png'
import Pefil from './Pefil/Perfil';
const Configuracion = () => {
    // Estado para almacenar la opción seleccionada
    const [opcionSeleccionada, setOpcionSeleccionada] = useState('Perfil');

    // Función para renderizar el formulario según la opción seleccionada
    const renderFormulario = () => {
        switch (opcionSeleccionada) {
            case 'Perfil':
                return <Pefil/>;
            case 'Seguridad':
                return <div>Formulario de Seguridad y Privacidad</div>;
            default:
                return <div><h1>default</h1></div>;
        }
    };

    return (
        <div className="contenedor-configuracion">
            <div className="configuracion-menu">
                {/* opciones que elije el usuario */}
                <ActionAreaCard 
                    text={"Perfil"} 
                    descripcion={"Perfil, informacion personal"} 
                    img={img_user} 
                    onClick={() => setOpcionSeleccionada('Perfil')} 
                />
                <ActionAreaCard 
                    text={"Seguridad"} 
                    descripcion={"Seguridad y Privacidad"} 
                    img={img_seguridad} 
                    onClick={() => setOpcionSeleccionada('Seguridad')} 
                />
            </div>
            <div className="configuracion-formulario">
                {/* Cambia el contenido basado en la opción seleccionada */}
                {renderFormulario()}
            </div>
        </div>
    );
};

export default Configuracion;