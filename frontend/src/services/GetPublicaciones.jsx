import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../src/config';
import { useNavigate } from 'react-router-dom'; // Para redirección

const ObtenerPublicaciones = () => {
    const [publicaciones, setPublicaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPublicaciones = async () => {
            try {
                const response = await fetch(`${BASE_URL}/graphql`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        query: `
                            query {
                                listarPublicaciones {
                                    id
                                    descripcion
                                    mediaUrl
                                    count_likes
                                    count_coment
                                    usuario{
                                        nombre
                                        apellido
                                        alias
                                        fotoPerfilUrl
                                    }
                                }
                            }
                        `,
                    }),
                });

                const result = await response.json();

                if (result.data && result.data.listarPublicaciones) {
                    setPublicaciones(result.data.listarPublicaciones);
                    setLoading(false);
                } else {
                    navigate('/404');
                }
            } catch (error) {
                console.error("Error al conectar con el servidor", error);
                setError(error);
                navigate('/404');
            }
        };

        fetchPublicaciones();
    }, [navigate]);

    return { publicaciones, loading, error };
};

export default ObtenerPublicaciones;
