import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../src/config';

const ObtenerPublicacionPorId = (id) => {
  const [publicacion, setPublicacion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPublicacion = async () => {
      try {
        const response = await fetch(`${BASE_URL}/graphql`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
              query {
                buscarPublicacionPorId(id: "${id}") {
                  id
                  descripcion
                  mediaUrl
                  count_coment
                  count_likes
                  usuario {
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

        if (result.data && result.data.buscarPublicacionPorId) {
          setPublicacion(result.data.buscarPublicacionPorId);
        } else {
          setError("Publicación no encontrada");
        }
      } catch (error) {
        console.error("Error al conectar con el servidor", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPublicacion();
  }, [id]);

  return { publicacion, loading, error };
};

export default ObtenerPublicacionPorId;
