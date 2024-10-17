import React, { useState, useEffect } from 'react';

const ObtenerPublicaciones = () => {
    const [userData, setUserData] = useState({
        nombre: '',
        apellido: '',
        alias: '',
        fotoPerfilUrl: '',
        fotoPortadaUrl: '',
        c_seguidores: '',
        c_seguidos: '',
        descripcion: ''
    });

    useEffect(() => {

        const fetchUserData = async () => {
            try {
                const response = await fetch("http://localhost:8080/graphql", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        query: `
                    query {
                        listarPublicaciones{
                            id,
                            descripcion,
                            mediaUrl,
                            count_likes,
    
                        }
                    }
                  `,
                    }),
                });

                const result = await response.json();

                // Verificamos si el usuario existe
                if (result.data && result.data.buscarPorAlias) {
                    setUserData(result.data.buscarPorAlias);
                } else {
                    // Si el usuario no existe, redirigir a la página 404
                    navigate('/404');
                }
            } catch (error) {
                console.error("Error al conectar con el servidor", error);
                navigate('/404'); // Redirigir también en caso de error en la conexión
            }
        };

        fetchUserData();

    }, []);

}

export default ObtenerPublicaciones;