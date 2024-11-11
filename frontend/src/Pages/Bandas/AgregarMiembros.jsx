import { CiSearch } from "react-icons/ci";
import Avatar from '@mui/material/Avatar';
import plus from '@public/plus2.svg';
import Cookies from 'js-cookie';
import useObtenerUsuarioLogeado from "../../services/GetUsuarioLogeado";
import '@css/Colores.css';
import GetAlias from "../../services/GetAlias";
import { useEffect, useState } from "react";
import ServiceBandas from "../../services/ServiceBandas";

const AgregarMiembros = ({onMiembrosSeleccionados,cerrar}) => {
    const alias = GetAlias();
    const { usuario, cargando, error } = useObtenerUsuarioLogeado();
    const { ConsultarMiembros, amigo } = ServiceBandas();
    const [miembros, setMiembros] = useState([]);

    useEffect(() => {
        ConsultarMiembros(alias);
    }, []);

    const agregarMiembros = (id) => {
        // Encuentra el amigo por id (asumiendo que "id" es único)
        const amigoSeleccionado = amigo.find(amig => amig.id === id);
        
        // Verifica si el amigo no está ya en la lista de miembros
        if (amigoSeleccionado && !miembros.some(m => m.id === amigoSeleccionado.id)) {
            setMiembros(prevMiembros => [...prevMiembros, amigoSeleccionado]);
        }
    };
    const GuardarMiembros =()=>{
        onMiembrosSeleccionados(miembros);
        cerrar()
    }
    const eliminarMiembro = (id) => {
        // Filtra los miembros por id para eliminar el miembro
        setMiembros(prevMiembros => prevMiembros.filter(miembro => miembro.id !== id));
    };

    return (
        <>
            <div className="Agregar_miembro">
                <nav>
                    <button className="btn" onClick={()=>cerrar()}>Salir</button>
                    <button className="btn2" onClick={()=>GuardarMiembros()}>Agregar</button>
                    <h2>Agregar Miembros</h2>
                </nav>
                <label id='label'>
                    <CiSearch id='icon' />
                    <input type="search" placeholder='Buscar' />
                </label>
                <div className="centroA">
                    <div className="izquierdoA">
                        <h3>Amigos</h3>
                        {amigo?.map((amigo, index) => (
                            <div key={index} className="card-a" onClick={() => agregarMiembros(amigo.id)}>
                                <Avatar alt="Remy Sharp" src={plus} />
                                <p>{amigo.nombre} {amigo.apellido}</p>
                            </div>
                        ))}
                    </div>
                    <div className="derechoAaa">
                        <h3>Agregar a:</h3>
                        {miembros.map((miembro, index) => (
                            <div key={index} className="card-a" onClick={() => eliminarMiembro(miembro.id)}>
                                <Avatar alt="Remy Sharp" src={plus} />
                                <p>{miembro.nombre} {miembro.apellido}</p>
                            </div>
                        ))}
                        
                    </div>
                </div>
            </div>
        </>
    );
};

export default AgregarMiembros;
