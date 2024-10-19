/* Css */
import '@css/Perfil_Y_Portada.css';
/* React */
import React, { useState, useEffect } from 'react';

import { useForm } from "react-hook-form";
/* Componentes */
import MenuDerechoDiv from "@c/Menu/Derecha";
import UploadAvatar from '@c/UploadAvatar';
import UploadPortada from '@c/UploadPortada'
import UiverseEdit from '@c/botones/BotonEdit';
import Avatars from '@c/avatar/AvatarV2';
/* Services */
import useUpdateImgPerfil from '@services/UpdatePerfil';
import useObtenerUsuario from '@services/GetUsuario';
import GetAlias from '@services/GetAlias';
import { BASE_URL } from '../../../../config'

/* imagenes */
import Portada from '@public/ract.jpg'
import Portada2 from '@public/portada.png'
import DefaultPerfil from '@public/perfill.png'
const Perfil_Y_Portada = () => {
    const user = GetAlias()
    const { usuario, cargando, error } = useObtenerUsuario(user); 

    const { fotoPerfilUrl, fotoPortadaUrl } = usuario


    const [EditarPerfil, setEditarPerfil] = useState(false); // Estado para mostrar/ocultar el componente
    const [EditarPortada, setEditarPortada] = useState(false); // Estado para mostrar/ocultar el componente

    const [imagenPerfil, setImagenPerfil] = useState(fotoPerfilUrl); // Estado para la imagen recortada
    const MostrarEditarPerfil = () => {
        setEditarPerfil(!EditarPerfil);
    };
    const MostrarEditarPortada = () => {
        setEditarPortada(!EditarPortada);
    };
    const ImageSavePerfil = (imagen) => {
        setImagenPerfil(imagen); // Guardar la imagen recortada en el estado del padre
    };
    const ImageSavePortada = (imagen) => {
        setImagenPortada(imagen); // Guardar la imagen recortada en el estado del padre
    };

    const onSubmit = () => {
        useUpdateImgPerfil(imagenPerfil,user)
    }
    return (
        <>
            <div className="Contenedor">
                <div className="contenedor2">
                    <div className="izquierda-Perfil-Y-Portada">
                        <div className='media'>
                            <div className="Portada">
                                <img id="Portada" src={Portada} alt="" />
                                <Avatars class='Perfil' imagen={imagenPerfil ? imagenPerfil : fotoPerfilUrl} width={100} height={100} />
                                {/* <img id='Perfil' src={imagenPerfil? imagenPerfil: fotoPerfilUrl} alt="" /> */}
                                <button id='editar-perfil' onClick={MostrarEditarPerfil}>
                                    {EditarPerfil ? '' : <UiverseEdit />}
                                </button>
                                <button id='editar-portada' onClick={MostrarEditarPerfil}>
                                    {EditarPerfil ? '' : <UiverseEdit />}
                                </button>
                            </div>
                        </div>

                        {EditarPerfil && <UploadAvatar btn_cancelar={MostrarEditarPerfil} onImageSave={ImageSavePerfil} Imagen={fotoPerfilUrl} Portada={Portada} />}
                        {EditarPortada && <UploadPortada btn_cancelar={MostrarEditarPortada} onImageSave={ImageSavePortada} />}
                        <button type='submit' onClick={onSubmit}>Guardar</button>
                    </div>
                    <MenuDerechoDiv />
                </div>
            </div>
        </>
    );
};

export default Perfil_Y_Portada;
