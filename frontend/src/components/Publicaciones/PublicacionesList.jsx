import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const PublicacionesList = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [usuarios, setUsuarios] = useState({});
  const [comentariosVisibles, setComentariosVisibles] = useState({});
  const [nuevoComentario, setNuevoComentario] = useState({});
  const [pagina, setPagina] = useState(0);
  const [cargando, setCargando] = useState(false);
  const [meGustaStatus, setMeGustaStatus] = useState({});
  const navigate = useNavigate();
  const TAMANO_PAGINA = 7;

  const fetchPublicaciones = async (pagina) => {
    setCargando(true);
    const response = await fetch(`http://localhost:8080/listarPublicaciones?page=${pagina}&size=${TAMANO_PAGINA}`);
    const result = await response.json();
    setPublicaciones((prev) => [...prev, ...result.content]);
    setCargando(false);
  };

  useEffect(() => {
    fetchPublicaciones(pagina);
  }, [pagina]);

  const loadMore = useCallback(() => {
    if (!cargando) {
      setPagina((prev) => prev + 1);
    }
  }, [cargando]);

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
      const response = await fetch('http://localhost:8080/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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

  const verificarMeGusta = async (idPublicacion, usuarioAlias) => {
    const response = await fetch('http://localhost:8080/usuarioHaDadoMeGusta', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        idPublicacion,
        usuarioAlias,
      }).toString(),
    });

    if (response.ok) {
      const result = await response.json();
      setMeGustaStatus((prev) => ({ ...prev, [idPublicacion]: result }));
    }
  };

  useEffect(() => {
    const usuarioActual = 'usuarioAliasEjemplo'; // Reemplaza con el alias del usuario autenticado
    publicaciones.forEach((publicacion) => {
      verificarMeGusta(publicacion.id, usuarioActual);
    });
  }, [publicaciones]);

  const manejarMeGusta = async (idPublicacion, usuarioAlias) => {
    const haDadoMeGusta = meGustaStatus[idPublicacion];

    const url = haDadoMeGusta ? 'http://localhost:8080/quitarMeGusta' : 'http://localhost:8080/darMeGusta';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        idPublicacion,
        usuarioAlias,
      }).toString(),
    });

    if (response.ok) {
      setMeGustaStatus((prev) => ({ ...prev, [idPublicacion]: !haDadoMeGusta }));
    }
  };

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
    const response = await fetch('http://localhost:8080/Comentar', {
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
          <div key={index} style={{ border: '1px solid #ccc', padding: '16px', marginBottom: '16px' }}>
            {usuario && (
              <div onClick={() => handleUserClick(usuario.alias)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                <img
                  src={usuario.fotoPerfilUrl || '/default-profile.png'}
                  alt={`${usuario.nombre} ${usuario.apellido}`}
                  style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '8px' }}
                />
                <div>
                  <strong>{usuario.nombre} {usuario.apellido}</strong>
                </div>
              </div>
            )}
            <p>{publicacion.descripcion}</p>
            {publicacion.mediaUrl && (
              <img src={publicacion.mediaUrl} alt="Publicación" style={{ maxWidth: '100%', marginTop: '8px' }} />
            )}
            <div>
              <span>Comentarios: {publicacion.count_coment}</span>
              <span>Likes: {publicacion.count_likes}</span>
              <button
                onClick={() => manejarMeGusta(publicacion.id, usuario.alias)}
                style={{ marginLeft: '8px' }}
              >
                {meGustaStatus[publicacion.id] ? 'Quitar me gusta' : 'Dar me gusta'}
              </button>
            </div>
            {/* Formulario para comentar */}
            <div style={{ marginTop: '16px' }}>
              <textarea
                placeholder="Escribe tu comentario..."
                value={nuevoComentario[publicacion.id] || ''}
                onChange={(e) => handleComentarioChange(publicacion.id, e.target.value)}
                rows="3"
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
              {nuevoComentario[publicacion.id]?.trim() && (
                <button
                  onClick={() => enviarComentario(publicacion.id, usuario.alias)}
                  style={{ marginTop: '8px', padding: '8px 16px', cursor: 'pointer' }}
                >
                  Enviar
                </button>
              )}
            </div>
            <button onClick={() => toggleComentarios(index)}>
              {comentariosVisibles[index]?.visible ? 'Ocultar comentarios' : 'Ver comentarios'}
            </button>
            {comentariosVisibles[index]?.visible && (
              <div style={{ marginTop: '8px', padding: '8px', backgroundColor: '#f9f9f9', border: '1px solid #ddd' }}>
                {comentariosAMostrar.length > 0 ? (
                  comentariosAMostrar.map((comentario, idx) => (
                    <div key={idx} style={{ borderBottom: '1px solid #eee', padding: '4px 0' }}>
                      <strong>{comentario.idAliasUsuario}:</strong> {comentario.comentario}
                      <div style={{ fontSize: 'small', color: 'gray' }}>{comentario.fechaEnvio}</div>
                    </div>
                  ))
                ) : (
                  <p>No hay comentarios aún.</p>
                )}
                {publicacion.count_coment > (comentariosVisibles[index]?.cantidad || 0) && (
                  <button onClick={() => verMasComentarios(index)} style={{ marginTop: '8px' }}>
                    Ver más comentarios
                  </button>
                )}
              </div>
            )}
          </div>
        );
      })}
      {cargando && <p>Cargando más publicaciones...</p>}
    </div>
  );
};

export default PublicacionesList;