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
import { useUserData } from '@services/UserContext';

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
    const { userData, loading } = useUserData(); // Asumiendo que usas un hook de contexto para obtener los datos

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
            {renderizado ? (
                userData.map((user, key) => { // userData es un array, entonces solo usamos map
                    const { id, nombre, alias, fotoPerfilUrl } = user; // Desestructuramos el usuario directamente

                    return (
                        <div key={key} className="Publicaciones">
                            <div className="seccion_1"/*  onClick={() => VerPerfil(alias)} */>
                                <Avatar src={fotoPerfilUrl || img} alt={`perfil`} />
                            </div>

                            <div className="seccion_2">
                                <div id="usuario">
                                    <div id="usuario-info">
                                        <p id="p-nombre">{nombre} - 10m</p>
                                        <p id="p-id">@{alias.split(" ")[0].toLowerCase()}</p>
                                    </div>
                                    <div id="usuario-btn">
                                        <MenuListComposition />
                                    </div>
                                </div>
                                <div onClick={() => cambiarRenderizado(key)} style={{ cursor: 'pointer', position: 'sticky' }}>
                                    <div id="usuario-texto">
                                        {/* Asumiendo que 'texto' es algún contenido dinámico */}
                                        <TextoConVerMas texto={texto} maxLength={200} />
                                    </div>
                                    <div id="usuario-media">
                                        <ImageGallery />
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
