import React, { useState } from 'react';
/* Css */
import '@css/Publicaciones.css'
/* Componentes */
import MenuListComposition from '@c/mini-menu/minMenu';
import TextoConVerMas from './TextoVerMas';
import Avatar from '@mui/material/Avatar';
import ImageGallery from './Galeria';
import Reacciones from './Reacciones';
import GaleriaDeImagenes from './GaleriaV2';
/* Iconos */
import { AiOutlineMenu } from "react-icons/ai";
import { TbMusicHeart } from "react-icons/tb";
import { CiRead } from "react-icons/ci";
import { TiMessages } from "react-icons/ti";
import { VscShare } from "react-icons/vsc";
import { FaArrowLeft } from "react-icons/fa";

/* Imagenes */
import img from '@public/perfill.png'
import img_media from '@public/ract.jpg'
import imgTest from '@public/imgtest.png'
import imgTest2 from '@public/imgtest2.png'
import imgTest3 from '@public/imgtest3.png'
import imgTest4 from '@public/imgtest4.png'
import { Button } from '@mui/material';
import zIndex from '@mui/material/styles/zIndex';

const Publicaciones = () => {
    const textoLargo = "Este es el texto que es muy largo y sale el cartel de 'VER MAS' se puede configura la longitud de caracterres que queres que muestre y tambien sale el bton de mostar menos, que largo aun no sale jajaj, ya me canse de escribir XD, aaah ahi esta, taraaaan! ta zarpado no? yo se que si UwU y se expande y todo me quedaron guchi las imagenes tambien ";

    const [renderizado, setRenderizado] = useState(true);

    // Función que alterna el estado entre true y false
    const cambiarRenderizado = () => {
        setRenderizado(!renderizado);
    };
    return (
        <>
            {renderizado ? (
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
                        {/* Contenedor que funciona como botón */}
                        <div onClick={cambiarRenderizado} style={{ cursor: 'pointer', position: 'sticky' }}>
                            {/* Texto con opción de "Mostrar más" */}
                            <div id="usuario-texto">
                                <TextoConVerMas texto={textoLargo} maxLength={200} />
                            </div>

                            {/* Galería de imágenes */}
                            <div id="usuario-media">
                                <ImageGallery />
                            </div>
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
            ) : (
                <>
                    <div className='btn-atras'>
                        <button
                            onClick={cambiarRenderizado}
                            id='pick'>
                            <FaArrowLeft />  Volver
                        </button>
                    </div>
                    <div className='Publicaciones'>



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
                            {/* Contenedor que funciona como botón */}

                            {/* Texto con opción de "Mostrar más" */}
                            <div id="usuario-texto">
                                <TextoConVerMas texto={textoLargo} maxLength={200} />
                            </div>

                            <div className="galeria-de-imagenes">
                                <GaleriaDeImagenes></GaleriaDeImagenes>



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
            )}
        </>
    );
}

export default Publicaciones;