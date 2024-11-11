// src/hooks/useBuscarUsuarios.js
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { BASE_URL } from '../../config';

const useBuscarUsuarios = (query) => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (query.length >= 1) {
            const fetchUsers = async () => {
                setLoading(true);
                try {
                    const response = await fetch(`${BASE_URL}/graphql`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            query: `
                                query BuscarUsuarios($text: String) {
                                    buscarUsuarioPorTexto(text: $text) {
                                        nombre
                                        apellido
                                        alias
                                        fotoPerfilUrl
                                    }
                                }
                            `,
                            variables: { text: query.trim() },
                        }),
                    });

                    if (!response.ok) throw new Error('Error en la respuesta del servidor');
                    
                    const data = await response.json();
                    const aliasVisitante = Cookies.get('alias');
                    const filteredResults = data.data.buscarUsuarioPorTexto.filter(user => user.alias !== aliasVisitante);
                    setResults(filteredResults);
                } catch (error) {
                    console.error('Error fetching users:', error);
                    setResults([]);
                } finally {
                    setLoading(false);
                }
            };

            const debounceFetch = setTimeout(fetchUsers, 300);
            return () => clearTimeout(debounceFetch);
        } else {
            setResults([]);
        }
    }, [query]);

    return { results, loading };
};

export default useBuscarUsuarios;
