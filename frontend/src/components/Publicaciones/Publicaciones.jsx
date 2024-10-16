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
    const [publicacionSeleccionada, setPublicacionSeleccionada] = useState(null); // Nuevo estado para la publicación seleccionada

    const cambiarRenderizado = (key = null) => {
        setRenderizado(!renderizado);
        if (key) {
            setPublicacionSeleccionada(publi[key]); // Actualiza la publicación seleccionada
        }
    };

    const arr = [imgTest, imgTest3];
    const publi = {
        1: {
            imgPerfil: img,
            nombre: 'Mauro Berni',
            tiempo: '10min',
            texto: 'djñaddfjfkfjkldjkfljfkfdjkls',
            imgPubli: [
                imgTest,
                imgTest,
                imgTest3
            ]
        },
        2: {
            imgPerfil: img,
            nombre: 'Marcelo Agarate',
            tiempo: '15min',
            texto: 'bybe bybe oooooh',
            imgPubli: [imgTest3]
        },
        3: {
            imgPerfil: img,
            nombre: 'Bruce Wane',
            tiempo: '15min',
            texto: 'Soy batman',
            imgPubli: [imgTest3]
        }
    };

    const navigate = useNavigate();
    const handleClick = () => {
        if (alias) {
            navigate('/cuenta/' + alias);
        } else {
            console.error('Usuario no encontrado');
        }
    };

    return (
        <>
            {renderizado ? (
                Object.keys(publi).map((key) => {
                    const { imgPerfil, nombre, tiempo, texto, imgPubli } = publi[key];
                    return (
                        <div key={key} className="Publicaciones">
                            <div className="seccion_1">
                                <Avatar src={imgPerfil} alt={`${nombre} perfil`} />
                            </div>
                            <div className="seccion_2">
                                <div id="usuario">
                                    <div id="usuario-info">
                                        <p id="p-nombre">{nombre} - {tiempo}</p>
                                        <p id="p-id">@{nombre.split(" ")[0].toLowerCase()}</p>
                                    </div>
                                    <div id="usuario-btn">
                                        <MenuListComposition />
                                    </div>
                                </div>
                                <div onClick={() => cambiarRenderizado(key)} style={{ cursor: 'pointer', position: 'sticky' }}>
                                    <div id="usuario-texto">
                                        <TextoConVerMas texto={texto} maxLength={200} />
                                    </div>
                                    <div id="usuario-media">
                                        <ImageGallery images={imgPubli} />
                                    </div>
                                </div>
                                <div id="btn-reacciones">
                                    <div id="btn_1">
                                        <Reacciones Icon={TbMusicHeart} tipe='like' />
                                        <Reacciones Icon={TiMessages} tipe='comentarios' funcion={() => cambiarRenderizado(key)} />
                                        <Reacciones Icon={CiRead} tipe='vistas' />
                                    </div>
                                    <div id="btn_2">
                                        <Reacciones Icon={VscShare} tipe='compartir' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
            ) : (
                <>
                    <div className='btn-atras'>
                        <button onClick={cambiarRenderizado} id='pick'>
                            <FaArrowLeft /> Volver
                        </button>
                    </div>
                    {publicacionSeleccionada && (
                        <div className='Publicaciones'>
                            <div className="seccion_1">
                                <Avatar src={publicacionSeleccionada.imgPerfil} />
                            </div>
                            <div className="seccion_2">
                                <div id='usuario'>
                                    <div id="usuario-info">
                                        <p id='p-nombre'>{publicacionSeleccionada.nombre} - {publicacionSeleccionada.tiempo}</p>
                                        <p id='p-id'>@{publicacionSeleccionada.nombre.split(" ")[0].toLowerCase()}</p>
                                    </div>
                                    <div id='usuario-btn'>
                                        <MenuListComposition />
                                    </div>
                                </div>
                                <div id="usuario-texto">
                                    <TextoConVerMas texto={publicacionSeleccionada.texto} maxLength={200} />
                                </div>
                                <div className="galeria-de-imagenes">
                                    <GaleriaDeImagenes imagenes={publicacionSeleccionada.imgPubli} />
                                </div>
                                <div id='btn-reacciones'>
                                    <div id='btn_1'>
                                        <Reacciones Icon={TbMusicHeart} tipe='like' />
                                        <Reacciones Icon={TiMessages} tipe='comentarios' />
                                        <Reacciones Icon={CiRead} tipe='vistas' />
                                    </div>
                                    <div id='btn_2'>
                                        <Reacciones Icon={VscShare} tipe='compartir' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className='comentarios'>
                        <div className="mis-comentarios">
                            <Avatar src={img} />
                        </div>
                        <div className="messageBox">
                            <div className="fileUploadWrapper">
                                <label htmlFor="file">
                                    {/* Icono de subida */}
                                </label>
                                <input type="file" id="file" name="file" />
                            </div>
                            <input required placeholder="Message..." type="text" id="messageInput" />
                            <button id="sendButton">
                                {/* Icono de enviar */}
                            </button>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Publicaciones;
