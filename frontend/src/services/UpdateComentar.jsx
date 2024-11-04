import { useState } from 'react';
import { BASE_URL } from '../config';

const useUpdateComentario = () => {
    const [usuario, setUsuario] = useState(null);
    const [cargando, setCargando] = useState(false); // Estado de carga
    const [error, setError] = useState(null); // Estado de error

    // Función para realizar la mutación de actualización de datos
    const comentar = async ({ publicacion, usuario, comentario }) => {
        console.log("consulta: ", publicacion, usuario, comentario)
        setCargando(true);
        setError(null);

        try {
            const response = await fetch(`${BASE_URL}/graphql`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    query: `
                    mutation {
                        comentar(publicacionId: "${publicacion}", idAliasUsuario: "${usuario}", text: "${comentario}")
                    }
                    `,
                }),
            });

            const result = await response.json();

            if (result.data && result.data.comentar) {
                setUsuario(result.data.comentar); // Actualizar los datos del usuario
                
            } else {
                console.log('Falló la mutación');
            }
        } catch (error) {
            console.error("Error al conectar con el servidor", error);
            setError(error); // Guardar el error
        } finally {
            setCargando(false); // Finaliza la carga
        }
    };

    return { comentar}; // Devolver la función de mutación y el estado
};

export default useUpdateComentario;
