/* Css */
import '@css/Publicaciones.css';
/* React */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/* Componentes */
import MenuListComposition from '@c/mini-menu/minMenu';
import TextoConVerMas from './TextoVerMas';
import Avatar from '@mui/material/Avatar';
import ImageGallery from './Galeria';
import GaleriaDeImagenes from './GaleriaV2';
/* servivios */
import ObtenerPublicaciones from '@services/GetPublicaciones';
import Reacciones from '@services/Reacciones';
/* Iconos */
import { TbMusicHeart } from "react-icons/tb";
import { CiRead } from "react-icons/ci";
import { TiMessages } from "react-icons/ti";
import { VscShare } from "react-icons/vsc";
import { FaArrowLeft } from "react-icons/fa";
/* Imagenes */
import img from '@public/perfill.png';
import imgTest from '@public/imgtest.png';
import imgTest3 from '@public/imgtest3.png';

const Publicaciones = () => {
    const { publicaciones: publicacionesIniciales, loading, error } = ObtenerPublicaciones();
    const navigate = useNavigate();

    // Estado para controlar las publicaciones
    const [publicaciones, setPublicaciones] = useState([]);
  
    useEffect(() => {
      if (publicacionesIniciales) {
        // Inicializamos el estado con las publicaciones iniciales
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
                liked: !pub.liked, // Alternar estado de "liked"
              }
            : pub
        )
      );

        
    };
    const comentar = (id) =>{
      navigate(`/publicacion/${id}`);
    };
  
    if (loading) return <p>Cargando publicaciones...</p>;
    if (error) return <p>Error al cargar las publicaciones.</p>;
    
   


    return (
        <div>
            {publicaciones.map((publi, index) => (
                <div key={publi.id} className='publicacion'>
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
                    <div className='descripcion'>
                        <p>{publi.descripcion? publi.descripcion : ''}</p>
                    </div>
                    <div className='media'>
                        <img src={publi.mediaUrl? publi.mediaUrl : ''} alt="" />
                    </div>

                    <div className='botones'>
                        <button  onClick={() => toggleLike(publi.id)}>like</button>

                        <p>{publi.count_likes}</p>
                        <button onClick={() => comentar(publi.id)}>comentar</button>
                        <p>{publi.count_coment}</p>
                    </div>
                </div>

            ))}
        </div>

    );
};

export default React.memo(Publicaciones);

