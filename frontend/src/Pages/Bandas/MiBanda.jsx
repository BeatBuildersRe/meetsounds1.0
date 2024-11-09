import MenuDerechoDiv from "@c/Menu/Derecha";
import { useNavigate } from "react-router-dom";
import ServiceBandas from "../../services/ServiceBandas";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import default_img from '@public/ract.jpg'
const MiBanda = () => {
    const location = useLocation(); // Mueve esta declaración al inicio
    const navigate = useNavigate();
    const { Id_Banda } = location.state || {};
    const { MiBandas, Mibanda } = ServiceBandas();

    const [nombre,setNombre] = useState('')
    useEffect(() => {
        const IdBanda = Id_Banda
        MiBandas({ IdBanda });
        
    }, [Id_Banda]);
    
    useEffect(() => {
        setNombre(Mibanda?.nombreBanda)
        
    }, [Mibanda]);
    
    const [miBanda, setMiBanda] = useState();

    

    const Configurar = (Nombre_Banda) => {
        const banda = Mibanda
        localStorage.setItem("banda", JSON.stringify(banda));
        navigate(`/Bandas/${Nombre_Banda}/Configurar`, { state: {banda}});
    };

    return (
        <>
            <div className="Contenedor">
                {console.log(Mibanda)}
                <div className="contenedor2">
                    <div className="izquierda-bandas">
                        <div className="Banda_Portada">
                            {/* No la trae desde la bd */}
                            {console.info(Mibanda.fotoUrlPortda)}                          
                        </div>

                        <div className="informacioon">
                            <h3>{Mibanda.nombreBanda}</h3>
                            <h4>{Mibanda.descripcion}</h4>
                        </div>
                        <button onClick={()=> Configurar(nombre)}>Configurar</button>
                    </div>
                    <MenuDerechoDiv />
                </div>
            </div>
            <div />
        </>
    );
};

export default MiBanda;
