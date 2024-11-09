import { useState } from "react";
import { BASE_URL } from "../config";

const ServiceBandas = () => {
  const [banda, setBanda] = useState(null);
  const [cargando, setCargando] = useState(false); 
  const [error, setError] = useState(null); 
  // EStados de MisBandas
  const [Misbanda, setMisBanda] = useState(null);
  const [Miscargando, setMisCargando] = useState(false); 
  const [Miserror, setMisError] = useState(null); 

  // Función para realizar la mutación de actualización de datos
  const CrearBanda = async ({ idUsuario, nombre, descripcion }) => {
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
                crearBanda(idUsuario:"${idUsuario}", banda:{
                    nombreBanda: "${nombre}",
                    descripcion: "${descripcion}",
                    miembros:[
                    "${idUsuario}"
                    ]
                } ){
                    id
                    nombreBanda
                    descripcion
                    miembros
                    idCreador
                }	
            }
          `,
        }),
      });

      const result = await response.json();

      // Validación de la respuesta
      if (result.errors) {
        console.error("Error en la mutación:", result.errors);
        setError(result.errors[0].message);
      } else if (result.data && result.data.crearBanda) {
        setBanda(result.data.crearBanda); // Actualizar los datos de la banda
      } else {
        console.log("Falló la mutación");
      }
    } catch (error) {
      console.error("Error al conectar con el servidor", error);
      setError("Error al conectar con el servidor"); // Guardar el error
    } finally {
      setCargando(false); // Finaliza la carga
    }

  };

  const MisBandas = async ({idUsuario}) =>{
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
            query{
                listarBandaPorUsuario(idUsuario:"${idUsuario}"){
                    nombreBanda
                    descripcion
                    urlFotoPortada
                    miembros
                    idCreador
                }
                }
          `,
        }),
      });

      const result = await response.json();

      // Validación de la respuesta
      if (result.errors) {
        console.error("Error en la mutación:", result.errors);
        setError(result.errors[0].message);
      } else if (result.data && result.data.listarBandaPorUsuario) {
        setMisBanda(result.data.listarBandaPorUsuario); // Actualizar los datos de la banda
      } else {
        console.log("Falló la mutación");
      }
    } catch (error) {
      console.error("Error al conectar con el servidor", error);
      setError("Error al conectar con el servidor"); // Guardar el error
    } finally {
      setCargando(false); // Finaliza la carga
    }
    return Misbanda
  }

  return { cargando, error, CrearBanda, MisBandas, banda, Misbanda }; // Devolver estado, función de mutación y datos de la banda

};

export default ServiceBandas;

// Pasar los datos asi

/* const{ cargando, error, CrearBanda, banda }= ServiceBandas()

    const idUsuario = '6724d794e7a89c7dc3dc9ae1'
    const nombre = "One direction2"
    const descripcion = "Creada desde el for 2"

    const handleCrearBanda = async () => {
        
        // Llama a la función CrearBanda pasando los parámetros
        await CrearBanda({ idUsuario, nombre, descripcion });
    };
 */