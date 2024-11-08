import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Publicacion = ({ publicacion, fetchUsuario, usuarios }) => {
  const [comentariosVisibles, setComentariosVisibles] = useState(false);
  const [cantidadComentarios, setCantidadComentarios] = useState(5);
  const [nuevoComentario, setNuevoComentario] = useState('');
  const [meGustaStatus, setMeGustaStatus] = useState(false);

  // Obtener el alias del usuario autenticado desde las cookies
  const getAliasFromCookies = () => {
    const cookies = document.cookie.split('; ');
    const aliasCookie = cookies.find(cookie => cookie.startsWith('alias='));
    return aliasCookie ? aliasCookie.split('=')[1] : null;
  };

  const usuarioAlias = getAliasFromCookies();
  const navigate = useNavigate();

  useEffect(() => {
    verificarMeGusta();
  }, []);

  const verificarMeGusta = async () => {
    const response = await fetch('http://localhost:8080/usuarioHaDadoMeGusta', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        idPublicacion: publicacion.id,
        usuarioAlias,
      }).toString(),
    });

    if (response.ok) {
      const result = await response.json();
      setMeGustaStatus(result);
    }
  };

  const manejarMeGusta = async () => {
    const url = meGustaStatus ? 'http://localhost:8080/quitarMeGusta' : 'http://localhost:8080/darMeGusta';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        idPublicacion: publicacion.id,
        usuarioAlias,
      }).toString(),
    });

    if (response.ok) {
      setMeGustaStatus(!meGustaStatus);
      // Actualizar el contador de likes en tiempo real
      publicacion.count_likes = meGustaStatus ? publicacion.count_likes - 1 : publicacion.count_likes + 1;
    }
  };

  const toggleComentarios = () => {
    setComentariosVisibles(!comentariosVisibles);
  };

  const verMasComentarios = () => {
    setCantidadComentarios(cantidadComentarios + 5);
  };

  const handleComentarioChange = (e) => {
    setNuevoComentario(e.target.value);
  };

  const enviarComentario = async () => {
    const response = await fetch('http://localhost:8080/Comentar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        publicacionId: publicacion.id,
        idAliasUsuario: usuarioAlias,
        text: nuevoComentario,
      }).toString(),
    });

    if (response.ok) {
      const comentario = {
        comentario: nuevoComentario,
        idAliasUsuario: usuarioAlias,
        fechaEnvio: new Date().toISOString(),
      };
      publicacion.comentarios.push(comentario);
      setNuevoComentario('');
    }
  };

  const comentariosAMostrar = publicacion.comentarios.slice(0, cantidadComentarios);

  const irAlPerfil = (alias) => {
    navigate(`/perfil-encontrado2/${alias}`);
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', marginBottom: '16px' }}>
      {usuarios[publicacion.idUsuario] && (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={usuarios[publicacion.idUsuario].fotoPerfilUrl || '/default-profile.png'}
            alt="Usuario"
            style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '8px', cursor: 'pointer' }}
            onClick={() => irAlPerfil(usuarios[publicacion.idUsuario].alias)}
          />
          <strong
            style={{ cursor: 'pointer' }}
            onClick={() => irAlPerfil(usuarios[publicacion.idUsuario].alias)}
          >
            {`${usuarios[publicacion.idUsuario].nombre} ${usuarios[publicacion.idUsuario].apellido}`}
          </strong>
        </div>
      )}
      <p>{publicacion.descripcion}</p>
      {publicacion.mediaUrl && <img src={publicacion.mediaUrl} alt="Publicación" style={{ maxWidth: '100%', marginTop: '8px' }} />}
      <div>
        <span>Comentarios: {publicacion.count_coment}</span>
        <span>Likes: {publicacion.count_likes}</span>
        <button onClick={manejarMeGusta} style={{ marginLeft: '8px' }}>
          {meGustaStatus ? 'Quitar me gusta' : 'Dar me gusta'}
        </button>
      </div>

      <textarea
        placeholder="Escribe tu comentario..."
        value={nuevoComentario}
        onChange={handleComentarioChange}
        rows="3"
        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', marginTop: '8px' }}
      />
      {nuevoComentario.trim() && (
        <button onClick={enviarComentario} style={{ marginTop: '8px', padding: '8px 16px', cursor: 'pointer' }}>
          Enviar
        </button>
      )}
      <button onClick={toggleComentarios} style={{ marginTop: '8px', cursor: 'pointer' }}>
        {comentariosVisibles ? 'Ocultar comentarios' : 'Ver comentarios'}
      </button>
      {comentariosVisibles && (
        <div style={{ marginTop: '8px', padding: '8px', backgroundColor: '#f9f9f9', border: '1px solid #ddd' }}>
          {comentariosAMostrar.length > 0 ? (
            comentariosAMostrar.map((comentario, idx) => (
              <div key={idx} style={{ borderBottom: '1px solid #eee', padding: '4px 0' }}>
                <strong>{comentario.idAliasUsuario}:</strong>
                <p>{comentario.comentario}</p>
                <small>Fecha: {new Date(comentario.fechaEnvio).toLocaleString()}</small>
              </div>
            ))
          ) : (
            <p>No hay comentarios.</p>
          )}
          {comentariosAMostrar.length < publicacion.comentarios.length && (
            <button onClick={verMasComentarios}>Ver más comentarios</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Publicacion;
