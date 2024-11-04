import '@css/Publicaciones.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TbMusicHeart } from "react-icons/tb";
import { TiMessages } from "react-icons/ti";

export default function Component() {
  const { publicaciones: publicacionesIniciales, loading, error } = ObtenerPublicaciones();
  const navigate = useNavigate();
  const [publicaciones, setPublicaciones] = useState([]);

  useEffect(() => {
    if (publicacionesIniciales) {
      setPublicaciones(publicacionesIniciales);
    }
  }, [publicacionesIniciales]);

  const toggleLike = (id) => {
    setPublicaciones((prevPublicaciones) =>
      prevPublicaciones.map((pub) =>
        pub.id === id
          ? {
              ...pub,
              count_likes: pub.liked ? pub.count_likes - 1 : pub.count_likes + 1,
              liked: !pub.liked,
            }
          : pub
      )
    );
  };

  const comentar = (id) => {
    navigate(`/publicacion/${id}`);
  };

  if (loading) return <div className="loading">Cargando publicaciones...</div>;
  if (error) return <div className="error">Error al cargar las publicaciones.</div>;

  return (
    <div className="contenedor-publicaciones">
      {publicaciones.map((publi) => (
        <div key={publi.id} className="publicacion">
          <div className="cabecera-publicacion">
            <div className="imagen-perfil">
              <img 
                src={publi.usuario.fotoPerfilUrl} 
                alt={`Perfil de ${publi.usuario.nombre}`}
              />
            </div>
            <div className="usuario">
              <p>{publi.usuario.nombre} {publi.usuario.apellido}</p>
              <p>@{publi.usuario.alias}</p>
            </div>
          </div>

          {publi.descripcion && (
            <div className="descripcion">
              <p>{publi.descripcion}</p>
            </div>
          )}

          {publi.mediaUrl && (
            <div className="media">
              <img src={publi.mediaUrl} alt="Contenido multimedia" />
            </div>
          )}

          <div className="botones">
            <button onClick={() => toggleLike(publi.id)}>
              <TbMusicHeart size={20} />
              <span>{publi.count_likes}</span>
            </button>
            <button onClick={() => comentar(publi.id)}>
              <TiMessages size={20} />
              <span>{publi.count_coment}</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}