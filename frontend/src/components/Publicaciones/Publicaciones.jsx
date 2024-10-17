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
import ObtenerUsuarios from '@services/GetUsuarios';

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

    const [renderizado, setRenderizado] = useState(true);
    const [publicacionSeleccionada, setPublicacionSeleccionada] = useState(null); // Estado para la publicación seleccionada
    const navigate = useNavigate();

    const texto = 'daodksadopdo'

    const cambiarRenderizado = (key = null) => {
        setRenderizado(!renderizado);
        if (key) {
            setPublicacionSeleccionada(publi[key]); // Actualiza la publicación seleccionada
        }
    };

    const arr = [imgTest, imgTest3];

    /* const VerPerfil = (alias) => {
        if (alias) {
            navigate('perfil-encontrado/' + alias);
        } else {
            console.error('Usuario no encontrado');
        }
    };
 */

    return (
        <>
           <h1>fsdsd</h1>
           <h1>fsdsd</h1>
           <h1>fsdsd</h1>
           <h1>fsdsd</h1>
           <h1>fsdsd</h1>
           <h1>fsdsd</h1>
           <h1>fsdsd</h1>
           <h1>fsdsd</h1>
           <h1>fsdsd</h1>
           <h1>fsdsd</h1>
           <h1>fsdsd</h1>
           <h1>fsdsd</h1>
           <h1>fsdsd</h1>
           <h1>fsdsd</h1>
           <h1>fsdsd</h1>
           <h1>fsdsd</h1>
           <h1>fsdsd</h1>
           <h1>fsdsd</h1>
           <h1>fsdsd</h1>
           <h1>fsdsd</h1>
        </>
           
    );
};

export default Publicaciones;

