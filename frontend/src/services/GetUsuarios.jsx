import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useObtenerUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [cargando, setCargando] = useState(true); // Estado de carga
    const [error, setError] = useState(null); // Estado de error
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await fetch("http://localhost:8080/graphql", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        query: `
                        query {
                            buscarTodosLosUsuarios {
                                nombre
                                apellido
                                alias
                                fotoPerfilUrl
                                c_seguidores
                            }
                        }
                        `,
                    }),
                });

                const result = await response.json();

                if (result.data && result.data.buscarTodosLosUsuarios) {
                    setUsuarios(result.data.buscarTodosLosUsuarios);
                } else {
                    navigate('/404');
                }
            } catch (error) {
                console.error("Error al conectar con el servidor", error);
                setError(error); // Guardar el error
                navigate('/404');
            } finally {
                setCargando(false); // Finaliza la carga
            }
        };

        fetchUsuarios();
    }, [navigate]);

    return { usuarios, cargando, error }; // Devolver usuarios, estado de carga y error
};

export default useObtenerUsuarios;
