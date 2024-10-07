import React,{useState} from 'react';
/* Css */
import '@css/Publicaciones.css'
/* Componentes */
import MenuListComposition from '@c/mini-menu/minMenu';
import TextoConVerMas from './Publicaciones/TextoVerMas';
import Avatar from '@mui/material/Avatar';
/* Iconos */
import { AiOutlineMenu } from "react-icons/ai";
import { TbMusicHeart } from "react-icons/tb";

import img from '@public/perfill.png'
import img_media from '@public/ract.jpg'

const Publicaciones = () => {
    const textoLargo = "Este es el texto";

    const [like, setLike] = useState(0)
    
    const colorLike =()=>{
        setLike(like + 1);

        
    }

    return (
        <>
            <div className="Publicaciones">
                <div className="seccion_1">
                    <Avatar src={img} />
                    
                </div>
                <div className="seccion_2">
                    <div id='usuario'>

                        <div id="usuario-info">
                            <p id='p-nombre'>Nombre  -  10min</p>
                            <p id='p-id'>@Nombre</p>
                        </div>

                        <div id='usuario-btn' >
                            <MenuListComposition></MenuListComposition>
                        </div>
                    </div>
                    <div id="usuario-texto">
                        <TextoConVerMas texto={textoLargo} maxLength={200} />
                        <p>like : {like}</p>
                    </div>
                    <div id="usuario-media">
                        <img id='img' src={img_media} alt="" />
                    </div>
                    <div id='btn-reacciones'>
                        < TbMusicHeart id='btn-like' onClick={Like}/>

                    </div>

                </div>
            </div>

        </>
    );
}

export default Publicaciones;