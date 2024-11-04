import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../src/config";
import { useNavigate } from "react-router-dom"; // Para redirección
import useObtenerUsuarioID from "./GetUsuarioID";
import useObtenerUsuarios from "@services/GetUsuarios";

const metodoBandas = () => {
  const {id} = useObtenerUsuarioID()
  const  { usuarios, cargando, error: error2} = useObtenerUsuarios()
  const {contador, setContador } = useState(0)
  const [bandas, setBandas] = useState([]);
  
  const {Bandas, SetBandas} = useState([])

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {

  const ListarBandas = async () => {
    try {
      const response = await fetch(`${BASE_URL}/graphql`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
                            query{
                                listarBandas{
                                    id
                                    descripcion
                                    nombreBanda
                                    idCreador
                                    miembros
                                    
                                }
                                }
                        `,
        }),
      });

      const result = await response.json();
      if (result.data && result.data.listarBandas) {
        setBandas(result.data.listarBandas);
        
        const bandasdelUSuario = bandas.find(ban => ban.idCreador === id.di)
        setBandas(bandasdelUSuario)
      
        
        /* const id_user  = id.id
        console.log(id_user)
        const bandasDelUsuario = bandas.filter(banda => banda.idCreador == id_user);
        console.dir(bandasDelUsuario)
        const miembrosDeBanda = bandasDelUsuario.miembros ;
        const usuariosMiembros = usuarios.filter(usuario => miembrosDeBanda.includes(usuario.id));
        console.log(usuariosMiembros); */

        


        setLoading(false);
      } else {
      }
    } catch (error) {
      console.error("Error al conectar con el servidor", error);
      setError(error);
    }
  };
  ListarBandas();
  },[])

  return { bandas, loading, error };
};

export default metodoBandas;
