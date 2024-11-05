import { useState } from "react";
import { BASE_URL } from "../config";
const useUpdateUsuario = () => {
  const [consulta, setconsulta] = useState(null);
  const [cargando, setCargando] = useState(false); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  // Función para realizar la mutación de actualización de datos
  const actualizarEmail = async ({ id, email }) => {
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
                    mutation{
                        actualizarUsuario(id:"${id}", user:{email:"${email}"}){
                            email
   
                        }
                        }


                    `,
        }),
      });

      const result = await response.json();

      if (result.data && result.data.actualizarUsuario) {
        setconsulta(result.data.actualizarUsuario); // Actualizar los datos del consulta
      } else {
        console.log("Falló la mutación");
      }
    } catch (error) {
      console.error("Error al conectar con el servidor", error);
      setError(error); // Guardar el error
    }
  };

  const actualizarContraseña = async ({ id, contrasena }) => {
    setCargando(true);
    setError(null);
    console.log('id: ', {id}, 'contra:', {contrasena})
    try {
      const response = await fetch(`${BASE_URL}/graphql`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
                    mutation{
                        actualizarContrasena(id:"${id}", contrasena:"${contrasena}")  
                        
                    }
                `,
        }),
      });

      const result = await response.json();

      
    } catch (error) {
      console.error("Error al conectar con el servidor", error);
      setError(error); // Guardar el error
    }
  };

  const actualizarTelefono = async ({ id, telefono }) => {
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
                    mutation{
                        actualizarUsuario(id:"${id}", user:{telefono:"${telefono}"}){
                            telefono
                          }
                        }


                    `,
        }),
      });

      const result = await response.json();

      if (result.data && result.data.actualizarUsuario) {
        setconsulta(result.data.actualizarUsuario); // Actualizar los datos del consulta
      } else {
        console.log("Falló la mutación");
      }
    } catch (error) {
      console.error("Error al conectar con el servidor", error);
      setError(error); // Guardar el error
    }
  };

  return { consulta, cargando, error, actualizarEmail, actualizarContraseña, actualizarTelefono }; // Devolver estado y función de mutación
};

export default useUpdateUsuario;
