import React, { useState } from 'react';
/* Css */
import '@css/Publicaciones.css'
/* Componentes */
import MenuListComposition from '@c/mini-menu/minMenu';
import TextoConVerMas from './TextoVerMas';
import Avatar from '@mui/material/Avatar';
import Reacciones from './Reacciones';
/* Iconos */
import { AiOutlineMenu } from "react-icons/ai";
import { TbMusicHeart } from "react-icons/tb";
import { CiRead } from "react-icons/ci";


import { TiMessages } from "react-icons/ti";
import { VscShare } from "react-icons/vsc";
import { IoIosSave } from "react-icons/io";

import img from '@public/perfill.png'
import img_media from '@public/ract.jpg'

const Publicaciones = () => {
    const textoLargo = "Este es el texto";


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
                    </div>
                    <div id="usuario-media">
                        <img id='img' src={img_media} alt="" />
                    </div>
                    <div id='btn-reacciones'>
                        <div id='btn_1'>
                            <Reacciones Icon={TbMusicHeart} tipe='like' key={0}></Reacciones>
                            <Reacciones Icon={TiMessages} tipe='comentarios' key={0}></Reacciones>
                            <Reacciones Icon={CiRead} tipe='vistas' key={0}></Reacciones>
                        </div>
                        <div id='btn_2'>
                            <Reacciones Icon={VscShare} tipe='compartir' key={0}></Reacciones>

                        </div>


                    </div>

                </div>
            </div>

        </>
    );
}

export default Publicaciones;