import React, { useState, useEffect } from 'react';

const ObtenerPublicaciones = () => {
    const [publicaciones, setPublicaciones] = useState([]);

    useEffect(() => {
        const fetchPublicaciones = async () => {
            try {
                const response = await fetch("http://localhost:8080/graphql", {
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
                        }
                    }
                  `,
                    }),
                });

                const result = await response.json();

                // Verificar si las publicaciones existen
                if (result.data && result.data.listarPublicaciones) {
                    setPublicaciones(result.data.listarPublicaciones); // Almacenamos las publicaciones
                } else {
                    // Redirigir a 404 si no hay publicaciones
                    navigate('/404');
                }
            } catch (error) {
                console.error("Error al conectar con el servidor", error);
                navigate('/404'); // Redirigir en caso de error en la conexión
            }
        };

        fetchPublicaciones();
    }, []);

    return publicaciones; // Devolvemos el array de publicaciones para ser usado en otro componente
}

export default ObtenerPublicaciones;
