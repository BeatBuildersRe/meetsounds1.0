import React, { useState, useEffect } from 'react';
import { CiSearch } from "react-icons/ci";
import MenuDerechoDiv from "../Home/Derecha";
import '@css/Busqueda.css';

const Busqueda = () => {
    const [query, setQuery] = useState(""); // Estado para la búsqueda
    const [results, setResults] = useState([]); // Estado para almacenar los resultados
    const [loading, setLoading] = useState(false); // Estado para manejar la carga

    // Manejador de cambio en el input
    const handleChange = (e) => {
        setQuery(e.target.value); // Actualiza la consulta con cada tecla
    };

    // Efecto para hacer la búsqueda cuando el query cambia
    useEffect(() => {
        if (query.length >= 1) { // Solo busca si el usuario ha escrito más de 2 caracteres
            const fetchUsers = async () => {
                setLoading(true);
                try {
                    const response = await fetch(`http://localhost:8080/graphql`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            query: `
                                query BuscarUsuarios($text: String) {
                                    buscarUsuarioPorTexto(text: $text) {
                                        nombre
                                        apellido
                                        alias
                                    }
                                }
                            `,
                            variables: {
                                text: query.trim(), // Cambia alias a text
                            },
                        }),
                    });
    
                    if (!response.ok) {
                        throw new Error('Error en la respuesta del servidor');
                    }
    
                    const data = await response.json();
    
                    if (data.errors) {
                        console.error('Errores de GraphQL:', data.errors);
                        setResults([]);
                    } else {
                        setResults(data.data.buscarUsuarioPorTexto); // Cambia buscarUsuariosPorTexto a buscarUsuarioPorTexto
                    }
                } catch (error) {
                    console.error('Error fetching users:', error);
                    setResults([]);
                } finally {
                    setLoading(false); // Termina la carga
                }
            };
    
            const debounceFetch = setTimeout(() => {
                fetchUsers();
            }, 300); // Espera de 300ms antes de realizar la búsqueda
    
            return () => clearTimeout(debounceFetch);
        } else {
            setResults([]); // Limpia los resultados si el query es muy corto
        }
    }, [query]); // Escucha cambios en el valor de 'query'
    
    

    return (
        <>
            <div className="Contenedor">
                <div className="contenedor2">
                    <div className="izquierda-busqueda">
                        {/* AREA DE TRABAJO */}
                        {/* MANTENER ESTE FORMATO DE DIVS PARA OTRAS PAGINAS Y SU CSS */}
                        <div className="barra">
                            <div className="card">
                                <label id="label">
                                    <CiSearch id="icon" />
                                    <input
                                        type="search"
                                        placeholder="Buscar"
                                        value={query} // Agregar el estado de la búsqueda
                                        onChange={handleChange} // Llama a handleChange en cada entrada
                                    />
                                </label>
                                <div className="blob"></div>
                            </div>
                        </div>

                        {/* Muestra los resultados */}
                        {loading && <p>Cargando...</p>}
                        <ul className="result-list">
                            {results.length > 0 ? (
                                results.map((user, index) => (
                                    <li key={index}>
                                        {user.nombre} {user.apellido} ({user.alias})
                                    </li>
                                ))
                            ) : (
                                !loading && query.length > 2 && <li>No se encontraron resultados</li>
                            )}
                        </ul>
                    </div>

                    {/* <MenuDerechoDiv></MenuDerechoDiv> */}
                </div>
            </div>
        </>
    );
};

export default Busqueda;
