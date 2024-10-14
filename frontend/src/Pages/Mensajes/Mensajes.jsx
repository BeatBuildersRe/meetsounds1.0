import * as React from 'react';
import '@css/Mensajes.css'
import MenuDerechoDiv from '../Home/Derecha';
const Mensajes = () => {
    return (
        <>
            <div className="Contenedor">
                <div className="contenedor2">
                    <div className="izquierda-mensajes">

                    {/* AREA DE TRABAJO */}
                    {/* MANTERNER ESTE FORMATO DE DIVS PARA OTRAS PAGINAS Y SU CSS */}


                    </div>
                    <MenuDerechoDiv></MenuDerechoDiv>
                </div>
            </div>
            <div />
        </>
    )
}
export default Mensajes;