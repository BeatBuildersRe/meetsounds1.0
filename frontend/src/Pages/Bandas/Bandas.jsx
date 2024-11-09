import MenuDerechoDiv from "@c/Menu/Derecha";
import '@css/Bandas.css'
import { useNavigate } from "react-router-dom";
import ServiceBandas from "../../services/ServiceBandas";
import { useEffect, useState } from "react";
const Bandas = () => {
    const  { cargando, error, CrearBanda, MisBandas, banda, Misbanda } = ServiceBandas()
    const estaVacio = (Misbanda) => Misbanda.length === 0;

    useEffect(() =>{
        const idUsuario = "6724d794e7a89c7dc3dc9ae1"
        MisBandas({ idUsuario});   
    },[])
    

    const handleCrearBanda = async () => {
        const idUsuario = '6724d794e7a89c7dc3dc9ae1'
        const nombre = "One bandaaaas"
        const descripcion = "Creada desde el for 3"
        // Llama a la función CrearBanda pasando los parámetros
        await CrearBanda({ idUsuario, nombre, descripcion });
    };
    const navigate = useNavigate();

    const irACrearBanda = () => {
        navigate("CrearBanda"); // Navega a la ruta especificada
    };
    
    return (
        <>
            <div className="Contenedor">
                <div className="contenedor2">
                    <div className="izquierda-bandas">
                    {console.dir(Misbanda)}
                    

                    {Misbanda?.map((banda,index)=>(
                        <div key={index}>
                            <p>{banda.nombreBanda}</p>
                        </div>
                    ))}

                    <button onClick={() => irACrearBanda()} style={{width:'fit-content'}}> crear Banda</button>
                    </div>
                    <MenuDerechoDiv></MenuDerechoDiv>
                </div>
            </div>
            <div />
        </>

    )
}
export default Bandas;