/* Css */
import './Perfil2.css'
/* React */
import { useNavigate } from 'react-router-dom'; 

/* Componentes */
import MenuDerechoDiv from "../../Home/Derecha";

/* Iconos */
import { FcReading,FcDocument, FcPicture  } from "react-icons/fc";


const Perfil2 = () => {
    const navigate = useNavigate();
    const Redirigir = (opcion) => {
        switch (opcion) {
            case 1:
                navigate('Datos-Personales');
                break;
            case 2:
                break

            default:
                break;
        }
        

    };
    return (
        <>
            <div className="Contenedor">
                <div className="contenedor2">
                    <div className="izquierda-perfil">

                    <div className="boton"  onClick={() => Redirigir(1)}>
                        <FcReading id="icon"/> <p>Datos Personales</p>
                    </div>
                    <div className="boton" onClick={Redirigir}>
                        <FcPicture id="icon"/> <p>Perfil y Portada</p>
                    </div>
                    <div className="boton" onClick={Redirigir}>
                       <FcDocument id="icon"/> <p>Informacion</p>
                    </div>
                    </div>
                    <MenuDerechoDiv></MenuDerechoDiv>
                </div>
            </div>
            <div />
        </>

    )
}
export default Perfil2;