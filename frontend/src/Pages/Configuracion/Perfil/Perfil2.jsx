/* Css */
import '@css/Perfil2.css'
/* React */
import { useNavigate } from 'react-router-dom'; 

/* Componentes */
import MenuDerechoDiv from "@c/Menu/Derecha";

/* Iconos */
import { FcReading,FcDocument, FcPicture  } from "react-icons/fc";
import { FcLock } from "react-icons/fc";



const Perfil2 = () => {
    const navigate = useNavigate();
    const Redirigir = (opcion) => {
        switch (opcion) {
            case 1:
                navigate('Datos-Personales');
                break;
            case 2:
                navigate('PerfilYPortada');
                break

            case 3:
                navigate('Seguridad')
                break;
            default:
                break
        }
        

    };
    return (
        <>
            <div className="Contenedor">
                <div className="contenedor2">
                    <div className="izquierda-perfil">

         
                    <div className="boton" onClick={() => Redirigir(2)}>
                        <FcReading id="icon"/> <p>Perfil y Portada</p>
                    </div>
              
                    <div className="boton" onClick={() => Redirigir(3)}>
                       <FcLock id="icon"/> <p>Seguridad</p>
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