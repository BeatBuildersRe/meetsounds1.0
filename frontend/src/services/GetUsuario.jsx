import { useState, useEffect } from 'react';
import { BASE_URL } from '../config';
const useObtenerUsuario = (Alias) => {
    const [usuario, setUsuario] = useState([]);
    const [cargando, setCargando] = useState(true); // Estado de carga
    const [error, setError] = useState(null); // Estado de error

    useEffect(() => {
        // Verificar si el Alias está definido antes de hacer la consulta
        if (!Alias) {
            setCargando(false); // Detener la carga si no hay Alias
            return;
        }

        const fetchUsuarios = async () => {
            try {
                const response = await fetch(`${BASE_URL}/graphql`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        query: `
                        query {
                            buscarPorAlias(alias: "${Alias}"){
                                id
                                nombre
                                apellido
                                alias
                                fotoPerfilUrl
                                fotoPortadaUrl
                                edad
                                descripcion
                                genero
                                fechaNacimiento
                            }
                        }
                        `,
                    }),
                });

                const result = await response.json();

                if (result.data && result.data.buscarPorAlias) {
                    setUsuario(result.data.buscarPorAlias);
                } else {
                    console.log('fallo consulta');
                }
            } catch (error) {
                console.error("Error al conectar con el servidor", error);
                setError(error); // Guardar el error
            } finally {
                setCargando(false); // Finaliza la carga
            }
        };

        fetchUsuarios();
    }, [Alias]); // Añadir Alias como dependencia para que el efecto se ejecute cuando cambie

    return { usuario, cargando, error }; // Devolver usuario, estado de carga y error
};

export default useObtenerUsuario;
