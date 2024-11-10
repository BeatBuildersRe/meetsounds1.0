import MenuDerechoDiv from "@c/Menu/Derecha";
import '@css/Bandas.css';
import Avatar from '@mui/material/Avatar';
import icon from '@public/plus.svg';
import { useNavigate } from "react-router-dom";
import ServiceBandas from "../../services/ServiceBandas";
import { useEffect, useState } from "react";
import Default_img from '@public/perfil_imagen.png';
import React from "react"; // Importa React para usar React.memo

const Bandas = () => {
    const { cargando, error, CrearBanda, MisBandas, banda, Misbanda } = ServiceBandas();
    const [vacio,setVacio] = useState('')
    
    useEffect(() => {
        const idUsuario = "6724d794e7a89c7dc3dc9ae1";
        MisBandas({ idUsuario });   
    }, []);
    
    const handleCrearBanda = async () => {
        const idUsuario = '6724d794e7a89c7dc3dc9ae1';
        const nombre = "One bandaaaas";
        const descripcion = "Creada desde el for 3";
        await CrearBanda({ idUsuario, nombre, descripcion });
    };

    const navigate = useNavigate();

    const irACrearBanda = () => {
        navigate("CrearBanda");
    };

    const irAmiBanda = (Nombre_Banda, Id_Banda) => {
        navigate(`/Bandas/${Nombre_Banda}`, { state: { Id_Banda } });
    };
    const Configurar = (Nombre_Banda) => {
        const banda = Mibanda;
        localStorage.setItem("banda", JSON.stringify(banda));
        navigate(`/Bandas/${Nombre_Banda}/Configurar`, { state: { banda } });
      };
    
    return (
        <>
            <div className="Contenedor">
                <div className="contenedor2">
                    <div className="izquierda-bandas">
                        {!Misbanda && (<h1>Crea una Banda</h1>)}
                        {Misbanda?.map((banda, index) => (
                            <div 
                                className="Card_Banda" 
                                style={{ backgroundImage: `url(${banda.urlFotoBanda})`, backgroundSize: 'cover', backgroundPosition: 'center' }} 
                                key={index} 
                                onClick={() => irAmiBanda(banda.nombreBanda, banda.id)}
                            >
                                <h2 className="banda-nombre">{banda.nombreBanda}</h2>
                                <div className="miebros-avatar">
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                    <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                                    <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                                </div>
                            </div>
                        ))}

                        <button className="Btn-crear" onClick={() => irACrearBanda()}>
                            <img src={icon} alt="" />
                        </button>
                    </div>
                    <MenuDerechoDiv />
                </div>
            </div>
            <div />
        </>
    );
};

// Exporta el componente con React.memo para evitar renderizados innecesarios
export default React.memo(Bandas);
