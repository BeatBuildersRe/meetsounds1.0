import React from 'react';
import { IoHeartCircle, IoHeartCircleOutline } from 'react-icons/io5';
import UseToggle from "../../../components/Boton-seguir/btnSegui";
import Usuario from '../../Diccionario';

// Función para formatear números grandes en 'k' o 'M'
const formatNumber = (number) => {
    if (number < 1000) return number;
    if (number < 1000000) return Math.floor(number / 1000) + 'k';
    return Math.floor(number / 1000000) + 'M';
};

const SeguirDores = () => {
    // Obtener seguidores y seguidos desde Usuario
    const seguidores = Usuario[1].Seguidores;
    const seguidos = Usuario[1].Seguidos;

    // Formatear números
    const seguidores_i = formatNumber(seguidores);
    const seguidos_i = formatNumber(seguidos);

    return (
        <>
            <div id="icons">
                <IoHeartCircle id="icon" />
                <p>{seguidores_i}</p> {/* Mostrar el valor de seguidores */}
                <IoHeartCircleOutline id="icon" />
                <p>{seguidos_i}</p> {/* Mostrar el valor de seguidos */}
            </div>
            <div id="btn-seguir">
                <UseToggle />
            </div>
        </>
    );
};

export default SeguirDores;
