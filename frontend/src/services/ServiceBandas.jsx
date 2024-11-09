import { useState } from "react";
import { BASE_URL } from "../config";
import GetAlias from "./GetAlias";
const ServiceBandas = () => {
  const [banda, setBanda] = useState(null);
  const [cargando, setCargando] = useState(false); 
  const [error, setError] = useState(null); 
  const [Miembros, setMiembros ]= useState(null); 
  const [finish, setFinish] = useState(false)
  // EStados de MisBandas
  const [Misbanda, setMisBanda] = useState(null);
  const [Mibanda, setMiBanda] = useState(null);
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
                    id
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
  const MiBandas = async ({IdBanda}) =>{
    console.log("BANDA ID: ", IdBanda)
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
              buscarBandaPorId(idBanda:"${IdBanda}"){
                id
                nombreBanda
                descripcion
                urlFotoPortada
                idCreador
                miembros
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
      } else if (result.data && result.data.buscarBandaPorId) {
        setMiBanda(result.data.buscarBandaPorId); // Actualizar los datos de la banda
      } else {
        console.log("Falló la mutación");
      }
    } catch (error) {
      console.error("Error al conectar con el servidor", error);
      setError("Error al conectar con el servidor"); // Guardar el error
    } finally {
      setCargando(false); // Finaliza la carga
    }
    return Mibanda
  }

  // -------------------------------- LISTAR MIEMBROS -----------------------------------//
  const ListarMiembros = async (alias) =>{
    console.log(alias)
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
              misSeguidores(idAlias:"${alias}"){
                id
                alias
                nombre
                apellido
                fotoPerfilUrl
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
      } else if (result.data && result.data.misSeguidores) {
        setMiembros(result.data.misSeguidores); // Actualizar los datos de la banda
      } else {
        console.log("Falló la mutación");
      }
    } catch (error) {
      console.error("Error al conectar con el servidor", error);
      setError("Error al conectar con el servidor"); // Guardar el error
    } finally {
      setCargando(false); // Finaliza la carga
    }
    
  }
  
  const ActualizarPortada = async (idBanda,PortadaImg) => {
    console.log(idBanda,PortadaImg)
    const formData = new FormData();
    formData.append('idBanda', idBanda);
    formData.append('file', PortadaImg);

    try {
        const response = await fetch(`${BASE_URL}/actualizarFotoBanda`, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
          setFinish(true)
        } else {
            // Si la respuesta no es correcta, capturamos el mensaje de error
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error desconocido al actualizar la foto');
        }
    } catch (error) {
        console.error("Error:", error.message);
        console.error("Error al actualizar portada")
        // Mostrar el mensaje de error al usuario
        console.error("Error al actualizar portada")  // Suponiendo que has definido un estado para mostrar el error
    }
    const MiBandas = async ({IdBanda}) =>{
    console.log("BANDA ID: ", IdBanda)
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
              buscarBandaPorId(idBanda:"${IdBanda}"){
                id
                nombreBanda
                descripcion
                urlFotoPortada
                idCreador
                miembros
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
      } else if (result.data && result.data.buscarBandaPorId) {
        setMiBanda(result.data.buscarBandaPorId); // Actualizar los datos de la banda
      } else {
        console.log("Falló la mutación");
      }
    } catch (error) {
      console.error("Error al conectar con el servidor", error);
      setError("Error al conectar con el servidor"); // Guardar el error
    } finally {
      setCargando(false); // Finaliza la carga
    }
    return Mibanda
  }
};

  return { cargando, error, CrearBanda, MisBandas,ActualizarPortada,finish,MiBandas,ListarMiembros,Mibanda,Miembros, banda, Misbanda }; // Devolver estado, función de mutación y datos de la banda

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