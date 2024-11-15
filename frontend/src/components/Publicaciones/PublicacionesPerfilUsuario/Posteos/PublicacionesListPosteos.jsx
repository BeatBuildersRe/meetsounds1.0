import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Publicacion from '../../Publicacion';
import {BASE_URL} from '../../../../config'
const PublicacionesListPosteos = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [usuarios, setUsuarios] = useState({});
  const [comentariosVisibles, setComentariosVisibles] = useState({});
  const [nuevoComentario, setNuevoComentario] = useState({});
  const [pagina, setPagina] = useState(0);
  const [cargando, setCargando] = useState(false);
  const [noMasPublicaciones, setNoMasPublicaciones] = useState(false);
  const navigate = useNavigate();
  const { alias } = useParams(); // Obtener el alias de la URL
  const TAMANO_PAGINA = 7;

  const fetchPublicaciones = async (pagina) => {
    setCargando(true);
    const response = await fetch(`${BASE_URL}/listarPosteosUsuario?alias=${alias}&page=${pagina}&size=${TAMANO_PAGINA}`);
    const result = await response.json();

    if (result.content.length === 0) {
      setNoMasPublicaciones(true);
    } else {
      setPublicaciones((prev) => [...prev, ...result.content]);
    }
    setCargando(false);
  };

  useEffect(() => {
    fetchPublicaciones(pagina);
  }, [pagina, alias]); // Dependemos de alias para actualizar si cambia la URL

  const loadMore = useCallback(() => {
    if (!cargando && !noMasPublicaciones) {
      setPagina((prev) => prev + 1);
    }
  }, [cargando, noMasPublicaciones]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
        loadMore();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loadMore]);

  const fetchUsuario = async (idUsuario) => {
    if (!usuarios[idUsuario]) {
      const response = await fetch(`${BASE_URL}/graphql`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `query {
            buscarUsuarioPorId(id: "${idUsuario}") {
              fotoPerfilUrl
              nombre
              apellido
              alias
            }
          }`,
        }),
      });
      const result = await response.json();
      setUsuarios((prevUsuarios) => ({
        ...prevUsuarios,
        [idUsuario]: result.data.buscarUsuarioPorId,
      }));
    }
  };

  useEffect(() => {
    publicaciones.forEach((publicacion) => fetchUsuario(publicacion.idUsuario));
  }, [publicaciones]);

  const handleUserClick = (alias) => {
    navigate(`/perfil-encontrado2/${alias}`);
  };

  const toggleComentarios = (index) => {
    setComentariosVisibles((prev) => ({
      ...prev,
      [index]: {
        visible: !prev[index]?.visible,
        cantidad: 10,
      },
    }));
  };

  const verMasComentarios = (index) => {
    setComentariosVisibles((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        cantidad: prev[index].cantidad + 10,
      },
    }));
  };

  const handleComentarioChange = (publicacionId, text) => {
    setNuevoComentario((prev) => ({
      ...prev,
      [publicacionId]: text,
    }));
  };

  const enviarComentario = async (publicacionId, idAliasUsuario) => {
    const text = nuevoComentario[publicacionId];
    const response = await fetch(`${BASE_URL}/Comentar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        publicacionId,
        idAliasUsuario,
        text,
      }).toString(),
    });

    if (response.ok) {
      const updatedPublicaciones = publicaciones.map((pub) => {
        if (pub.id === publicacionId) {
          return {
            ...pub,
            comentarios: [
              ...pub.comentarios,
              {
                comentario: text,
                idAliasUsuario,
                fechaEnvio: new Date().toISOString(),
              },
            ],
            count_coment: pub.count_coment + 1,
          };
        }
        return pub;
      });
      setPublicaciones(updatedPublicaciones);
      setNuevoComentario((prev) => ({ ...prev, [publicacionId]: '' }));
    }
  };

  return (
    <div>
      {publicaciones.map((publicacion, index) => {
        const usuario = usuarios[publicacion.idUsuario];
        const comentariosAMostrar = publicacion.comentarios.slice(0, comentariosVisibles[index]?.cantidad || 0);

        return (
          <Publicacion
            key={index}
            publicacion={publicacion}
            fetchUsuario={fetchUsuario}
            usuarios={usuarios}
            usuarioAlias="usuarioAliasEjemplo"
            toggleComentarios={() => toggleComentarios(index)}
            verMasComentarios={() => verMasComentarios(index)}
            comentariosVisibles={comentariosVisibles[index]?.visible}
            comentariosAMostrar={comentariosAMostrar}
            handleComentarioChange={(text) => handleComentarioChange(publicacion.id, text)}
            enviarComentario={() => enviarComentario(publicacion.id, usuario.alias)}
            handleUserClick={() => handleUserClick(usuario.alias)}
          />
        );
      })}
      {/*{cargando && !noMasPublicaciones && <p>Cargando más publicaciones...</p>}*/}
      {/*{noMasPublicaciones && <p>No hay más publicaciones para mostrar.</p>}*/}
    </div>
  );
};

export default PublicacionesListPosteos;
