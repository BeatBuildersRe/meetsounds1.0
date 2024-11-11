import React, { useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import useBuscarUsuarios from './useBuscarUsuarios';
import '@css/Colores.css';
import '@css/Busqueda.css';

const Busqueda = () => {
    const [query, setQuery] = useState("");
    const { results, loading } = useBuscarUsuarios(query);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    const handleUserClick = (usuario) => {
        navigate(`/perfil-encontrado2/${usuario.alias}`);
    };

    return (
        <div className="Contenedor">
            <div className="izquierda-busqueda">
                <div className="barra">
                    <div className="card">
                        <label id="label">
                            <CiSearch id="icon" />
                            <input
                                type="search"
                                placeholder="Buscar"
                                value={query}
                                onChange={handleChange}
                                className="input-busqueda"
                            />
                        </label>
                        <div className="blob"></div>
                    </div>
                </div>

                {/* Lista de resultados de búsqueda */}
                <ul className="result-list">
                    {loading && <p>Buscando...</p>}
                    {results.length > 0 ? (
                        results.map((user) => (
                            <ul key={user.alias}>
                                <li onClick={() => handleUserClick(user)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '10px', marginTop: '0px' }}>
                                    <img src={user.fotoPerfilUrl || "/placeholder.svg"} alt={`${user.nombre} ${user.apellido}`} style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }} />
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <span>{user.nombre} {user.apellido}</span>
                                        <p>@{user.alias}</p>
                                    </div>
                                </li>
                            </ul>
                        ))
                    ) : (
                        !loading && query.length >= 1 && <li>No se encontraron resultados</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Busqueda;
