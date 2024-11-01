import { useState } from 'react';
import { BASE_URL } from '../config';
const useUpdateEmail = () => {
    const [usuario, setUsuario] = useState(null);
    const [cargando, setCargando] = useState(false); // Estado de carga
    const [error, setError] = useState(null); // Estado de error

    // Función para realizar la mutación de actualización de datos
    const actualizarContraseña = async ({ id, contrasena }) => {
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
                        actualizarUsuario(id:""){
                        email
                    }
                    `,
                }),
            });

            const result = await response.json();

            if (result.data && result.data.actualizarContrasena) {
                setUsuario(result.data.actualizarContrasena); // Actualizar los datos del usuario
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

    return { usuario, cargando, error, actualizarContraseña }; // Devolver estado y función de mutación
};

export default useUpdateEmail;
