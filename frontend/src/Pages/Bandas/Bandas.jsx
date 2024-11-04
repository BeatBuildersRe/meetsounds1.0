import MenuDerechoDiv from "@c/Menu/Derecha";
import '@css/Bandas.css'
import metodoBandas from "@services/GetBandas";
const Bandas = () => {
    //const {bandas, loading, error} = metodoBandas()
    
    return (
        <>
            <div className="Contenedor">
                <div className="contenedor2">
                    <div className="izquierda-bandas">
                    <h3>Mis Bandas</h3>
{/* 
                    {bandas?.map((bandas, index) =>(
                        <div key={index}>
                            <p>{bandas.nombreBanda}</p>
                            <p>{bandas.descripcion}</p>
                          
                        </div>
                    ))} */}
                    

                    </div>
                    <MenuDerechoDiv></MenuDerechoDiv>
                </div>
            </div>
            <div />
        </>

    )
}
export default Bandas;