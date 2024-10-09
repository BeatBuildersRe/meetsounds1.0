import MenuDerechoDiv from "../Home/Derecha";
import '@css/Busqueda.css'
import { CiSearch } from "react-icons/ci";
const Busqueda = () => {
    return (
        <>
            <div className="Contenedor">
                <div className="contenedor2">
                    <div className="izquierda-busqueda">

                    {/* AREA DE TRABAJO */}
                    {/* MANTERNER ESTE FORMATO DE DIVS PARA OTRAS PAGINAS Y SU CSS */}
                    
                        <div className="barra">
                            
                        <div class="card">
                        <label id="label">
                                <CiSearch id="icon" />
                                <input type="search" placeholder="Buscar" />
                            </label>
                            <div class="blob"></div>
                        </div>
                        </div>
                        
                   
                    
                    
                        
                    
                        

                    </div>
                    
                    {/* <MenuDerechoDiv></MenuDerechoDiv> */}
                </div>
            </div>
            <div />
        </>
    )
}

export default Busqueda;