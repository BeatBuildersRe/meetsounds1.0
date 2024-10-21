import React, { useEffect, useState } from 'react';
import Avatars from '@c/avatar/AvatarV2';
import useUpdateImgPerfil from '@services/UpdatePerfil';

import Avatar from 'react-avatar-edit';
import foto from '@public/perfill.png';
import '@css/UploadAvatar.css';
import BotonPlus from '@c/botones/BotonPlus';
const UploadPortada = ({ btn_cancelar, onImageSave, Imagen, Portada, alias }) => {
    const [src, setSrc] = useState(null);
    const [preview, setPreview] = useState(Portada);
    const [savedImage, setSavedImage] = useState(null); // Imagen guardada

    const onClose = () => {
        setPreview(Portada); // Restaurar la imagen por defecto si se cierra el editor
    };

    const onCrop = (view) => {
        setPreview(view); // Actualizar la vista previa con la imagen recortada
    };

    useEffect(() => {
    }, [preview]);

    const handleSave = () => {
        setSavedImage(preview); // Guarda la imagen recortada localmente
        onImageSave(preview); // Enviar la imagen recortada al componente padre
        useUpdateImgPerfil(preview,alias,2) // envia a la bd
    };


    return (
        <div className='UploadAvatar'>
            
            <div className='Up'>
                <div className='media'>
                    <div className="Portada">
                        {preview &&  <img id="Portada" src={preview} alt="" />}
                        <Avatars class='Perfil' imagen={Imagen} width={100} height={100} />
                    </div>
                </div>

            </div>

            <div className='avatar'>
                <Avatar
                    height={300}
                    width={440}
                    onCrop={onCrop}
                    onClose={onClose}
                    labelStyle={{ color: 'red' }}
                    src={src}
                    closeIconColor='red'
                    mimeTypes='.jpeg,.jpg,.png'
                    label='Toca para subir una imagen'
                    exportAsSquare={true}

                />
            </div>

            <div className='botones'>
                <div id='Guardar' onClick={handleSave}>
                    <BotonPlus text='Guardar' color='green' />
                </div>
                <div id='Cancelar' onClick={btn_cancelar}>
                    <BotonPlus text='Salir' color='red' />
                </div>


                {/* <button id="btn-guardar" onClick={() => { handleSave(); btn_cancelar(); }}>Guardar Imagen</button> */}
                {/* <button id="btn-cerrar" onClick={btn_cancelar}>cerrar</button> */}
            </div>
        </div>

    );
};

export default UploadPortada;
