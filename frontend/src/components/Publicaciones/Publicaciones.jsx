/* Css */
import '@css/Publicaciones.css';
/* React */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
/* Componentes */
import MenuListComposition from '@c/mini-menu/minMenu';
import TextoConVerMas from './TextoVerMas';
import Avatar from '@mui/material/Avatar';
import ImageGallery from './Galeria';
import Reacciones from './Reacciones';
import GaleriaDeImagenes from './GaleriaV2';
/* servivios */
import ObtenerPublicaciones from '@services/GetPublicaciones';
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
    const { publicaciones, loading, error } = ObtenerPublicaciones();

    if (loading) return <p>Cargando publicaciones...</p>;
    if (error) return <p>Error al cargar las publicaciones.</p>;

    const arr = [imgTest, imgTest3];



    return (
        <div>
            {publicaciones.map((publicacion, index) => (
                <div key={index} className="publicacion">
                    <p>{publicacion.descripcion ? publicacion.descripcion : 'Descripción no disponible'}</p>

                    {publicacion.usuario ? (
                        <div>
                            <h2>{publicacion.usuario.nombre} {publicacion.usuario.apellido} (@{publicacion.usuario.alias})</h2>
                            <img src={publicacion.usuario.fotoPerfilUrl} alt="Foto de perfil" />
                        </div>
                    ) : (
                        <p>Usuario no disponible</p>
                    )}

                    <p>Likes: {publicacion.count_likes}</p>
                    <p>Comentarios: {publicacion.count_coment}</p>
                </div>
            ))}
        </div>

    );
};

export default Publicaciones;

