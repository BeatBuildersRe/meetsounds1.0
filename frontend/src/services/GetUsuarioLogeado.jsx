import { useState, useEffect } from 'react';
import { BASE_URL } from '../config';
import GetAlias from './GetAlias';
const useObtenerUsuarioLogeado = () => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const Alias = GetAlias()
  useEffect(() => {
    // Verificar si el Alias está definido antes de hacer la consulta
    if (!Alias) {
      setCargando(false); // Detener la carga si no hay Alias
      setError('Alias no proporcionado.');
      return;
    }

    const fetchUsuario = async () => {
      try {
        const response = await fetch(`${BASE_URL}/graphql`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `
              query {
                buscarPorAlias(alias: "${Alias}") {
                  id
                  nombre
                  apellido
                  alias
                  fotoPerfilUrl
                  fotoPortadaUrl
                  edad
                  descripcion
                  contrasena
                  genero
                  fechaNacimiento
                  email
                  telefono
                }
              }
            `,
          }),
        });

        // Manejar respuesta no exitosa (4xx, 5xx)
        if (!response.ok) {
          const errorMessage = `Error ${response.status}: ${response.statusText}`;
          throw new Error(errorMessage);
        }

        const result = await response.json();

        // Verificar si los datos fueron encontrados
        if (result.data && result.data.buscarPorAlias) {
          setUsuario(result.data.buscarPorAlias);
        } else {
          // Caso de usuario no encontrado
          setError('No se pudo encontrar el usuario con ese alias.');
        }
      } catch (error) {
        // Diferenciar errores de conexión o de servidor
        if (error.message.includes('Failed to fetch')) {
          setError('Fallo en la conexión con el servidor. Verifica tu red.');
        } else {
          setError(`Error al obtener los datose: ${error.message}`);
        }
      } finally {
        setCargando(false); // Finaliza la carga
      }
    };

    fetchUsuario();
  }, [Alias]); // Efecto se ejecuta cuando cambia el Alias

  return { usuario, cargando, error }; // Devolver usuario, estado de carga y error
};

export default useObtenerUsuarioLogeado;
