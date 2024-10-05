import React from 'react';
import { IoHeartCircle, IoHeartCircleOutline } from 'react-icons/io5';
import UseToggle from "../../../components/Boton-seguir/btnSegui";

// Función para formatear números grandes en 'k' o 'M'
const formatNumber = (number) => {
    if (number < 1000) return number;
    if (number < 1000000) return Math.floor(number / 1000) + 'k';
    return Math.floor(number / 1000000) + 'M';
};

const SeguirDores = ({ seguidos, seguidores, amigo, condicion }) => {
    // Obtener seguidores y seguidos desde Usuario


    // Formatear números
    const seguidores_i = formatNumber(seguidores);
    const seguidos_i = formatNumber(seguidos);
    const Menu = () => {
        if (condicion) {
            return (
                <div id="btn-seguir">
                    <UseToggle amigo={(amigo)} />
                </div>
            )
        }else{
            
            
        }
    }
    return (
        <>
            <div id="icons">
                <IoHeartCircle id="icon" />
                <p>{seguidores_i}</p> {/* Mostrar el valor de seguidores */}
                <IoHeartCircleOutline id="icon" />
                <p>{seguidos_i}</p> {/* Mostrar el valor de seguidos */}
            </div>

            <Menu></Menu>

        </>
    );
};

export default SeguirDores;
