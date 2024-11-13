import React, { useState } from 'react';
import '@css/menu.css';
import '@css/Colores.css';
import { CiSearch } from "react-icons/ci";
import { IoMdMusicalNote, IoMdImage } from "react-icons/io";
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate
import useBuscarUsuarios from '../../Pages/Busqueda/useBuscarUsuarios'; // Importa el hook personalizado

/* Componentes */
import Carrusel from '../Anuncios/Ads';

const MenuDerecho = () => {
    const [query, setQuery] = useState(""); // Estado para la búsqueda
    const { results, loading } = useBuscarUsuarios(query); // Usa el hook personalizado de búsqueda
    const navigate = useNavigate(); // Inicializa navigate para la navegación

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    const handleUserClick = (usuario) => {
        navigate(`/perfil-encontrado2/${usuario.alias}`); // Redirige al perfil del usuario
    };

    const formatNumber = (number) => {
        if (number < 1000) return number;
        if (number < 1000000) return Math.floor(number / 1000) + 'k';
        return Math.floor(number / 1000000) + 'M';
    };

    const Tendencias = () => {
        const Post = {
            1: { titulo: 'Duki', views: 100 },
            2: { titulo: 'Emilia', views: 1000 },
            3: { titulo: 'Lit', views: 100000 },
            4: { titulo: 'Maseking', views: 10000000 },
            5: { titulo: 'Anuel', views: 10000000 }
        };

        return (
            <ul>
                {Object.keys(Post).map(key => (
                    <li key={key}>
                        {Post[key].titulo}
                        <div id='p'>
                            <p>{formatNumber(Post[key].views)}</p>
                            <IoMdImage id='icon' />
                        </div>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className="Contenedor-menu" id='Contenedor-menuu'>
            <label id='label'>
                <CiSearch id='icon' />
                <input 
                    type="search" 
                    placeholder='Buscar'
                    value={query} 
                    onChange={handleChange} // Llama a handleChange para actualizar el estado de búsqueda
                />
            </label>

            {/* Resultados de búsqueda */}
            {loading && <p>Buscando...</p>}
            <ul className="result-list">
                {results.length > 0 ? (
                    results.map((user) => (
                        <li 
                            key={user.alias} 
                            onClick={() => handleUserClick(user)} // Redirige al perfil del usuario al hacer clic
                            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '10px' }}
                        >
                            <img src={user.fotoPerfilUrl || "/placeholder.svg"} alt={`${user.nombre} ${user.apellido}`} style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }} />
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span>{user.nombre} {user.apellido}</span>
                                <p>@{user.alias}</p>
                            </div>
                        </li>
                    ))
                ) : (
                    !loading && query.length >= 1 && <li>No se encontraron resultados</li>
                )}
            </ul>

            {/* <div className='tendencia'>
                <h4>Los Más Escuchados</h4>
                <Tendencias />
                <h4 id='btn-mas'>Más Tendencias <IoMdMusicalNote /></h4>
            </div> */}

            <Carrusel />
            {/* <div className='seguir'>
                <h4>Quizás te interese...</h4>
            </div> */}
        </div>
    );
}

export default MenuDerecho;
