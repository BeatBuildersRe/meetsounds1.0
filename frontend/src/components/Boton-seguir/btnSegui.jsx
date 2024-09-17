import { useState } from 'react';
import { AiFillMessage } from "react-icons/ai";
import { BsPersonFillAdd, BsPersonFillCheck } from "react-icons/bs";
import Usuario from '../../Pages/Diccionario';
// Hook personalizado para alternar entre true y false
function UseToggle() {
    // Estilos del contenedor del botón
    const divStyle = {
        all: 'unset',
        display: 'flex',
        flexDirection: 'column',
        width: 'fit-content',
        fontSize: 'x-large',
        padding: '0.5%',
        border: '1px solid gray',
        borderRadius: '10%',
    };

    // Estilos para los botones
    const btnStyle = {
        all: 'unset',
        padding: '3px',
        color: "white",
        cursor: 'pointer',
    };

    // Estado para controlar el toggle (seguido/no seguido)
    const [isFollowed, setIsFollowed] = useState(Usuario[1].seguir); /* <== aqui va si el usuario lo sigue, funciona con true y false */

    // Función para alternar entre seguido y no seguido
    const toggleFollow = () => {
        setIsFollowed((prevState) => !prevState); // Alterna el estado
        if (!isFollowed) {
            Usuario[1].Seguidores += 1; // Incrementa seguidores
            console.log("seguido");
        } else {
            Usuario[1].Seguidores -= 1; // Decrementa seguidores
            console.log("NO seguido");
        }
    };

    return (
        <div style={divStyle}>
            {/* Botón de seguir/no seguir */}
            <button onClick={toggleFollow} style={btnStyle}>
                {isFollowed ? <BsPersonFillCheck style={{ color: 'green' }} /> : <BsPersonFillAdd />}
            </button>

            {/* Botón de mensaje */}
            <button style={btnStyle}>
                <AiFillMessage />
            </button>
        </div>
    );
}

export default UseToggle;
