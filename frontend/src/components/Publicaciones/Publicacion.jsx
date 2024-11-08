import React, { useEffect, useState } from 'react';

const Publicacion = ({ publicacion, fetchUsuario, usuarios }) => {
  const [comentariosVisibles, setComentariosVisibles] = useState(false);
  const [cantidadComentarios, setCantidadComentarios] = useState(5);
  const [nuevoComentario, setNuevoComentario] = useState('');

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
        publicacionId: publicacion._id, // Aquí se asegura que estamos pasando la ID correcta
        idAliasUsuario: publicacion.idUsuario, // Asegúrate de que este campo sea correcto
        text: nuevoComentario,
      }).toString(),
    });

    if (response.ok) {
      // Lógica para actualizar la publicación con el nuevo comentario
      const comentario = {
        comentario: nuevoComentario,
        idAliasUsuario: publicacion.idUsuario,
        fechaEnvio: new Date().toISOString(),
      };
      publicacion.comentarios.push(comentario); // Asegúrate de que publicacion tiene un array de comentarios
      setNuevoComentario(''); // Limpiar campo de comentario
    }
  };

  const comentariosAMostrar = publicacion.comentarios.slice(0, cantidadComentarios);

  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', marginBottom: '16px' }}>
      {usuarios[publicacion.idUsuario] && (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={usuarios[publicacion.idUsuario].fotoPerfilUrl || '/default-profile.png'}
            alt="Usuario"
            style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '8px' }}
          />
          <strong>{`${usuarios[publicacion.idUsuario].nombre} ${usuarios[publicacion.idUsuario].apellido}`}</strong>
        </div>
      )}
      <p>{publicacion.descripcion}</p>
      {publicacion.mediaUrl && <img src={publicacion.mediaUrl} alt="Publicación" style={{ maxWidth: '100%', marginTop: '8px' }} />}
      <div>
        <span>Comentarios: {publicacion.count_coment}</span>
        <span>Likes: {publicacion.count_likes}</span>
      </div>

      {/* Formulario para comentar */}
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