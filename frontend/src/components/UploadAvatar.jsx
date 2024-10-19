import React, { useEffect, useState } from 'react';
import Avatars from '@c/avatar/AvatarV2';

import Avatar from 'react-avatar-edit';
import foto from '@public/perfill.png';
import '@css/UploadAvatar.css';
import BotonPlus from '@c/botones/BotonPlus';
const UploadAvatar = ({ btn_cancelar, onImageSave, Imagen, Portada }) => {
    const [src, setSrc] = useState(null);
    const [preview, setPreview] = useState(Imagen);
    const [savedImage, setSavedImage] = useState(null); // Imagen guardada

    const onClose = () => {
        setPreview(foto); // Restaurar la imagen por defecto si se cierra el editor
    };

    const onCrop = (view) => {
        setPreview(view); // Actualizar la vista previa con la imagen recortada
    };

    useEffect(() => {
    }, [preview]);

    const handleSave = () => {
        setSavedImage(preview); // Guarda la imagen recortada localmente
        onImageSave(preview); // Enviar la imagen recortada al componente padre
    };

    return (
        <div className='UploadAvatar'>
            <div className='Up'>
                <div className='media'>
                    <div className="Portada">
                        <img id="Portada" src={Portada} alt="" />
                        {preview && <Avatars class='Perfil' imagen={preview} width={100} height={100} />}
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


                />
            </div>

            <div className='botones'>
                <BotonPlus text='Guardar' color='green'/>
                <BotonPlus text='Salir' color='red'/>
                
                
                {/* <button id="btn-guardar" onClick={() => { handleSave(); btn_cancelar(); }}>Guardar Imagen</button> */}
                {/* <button id="btn-cerrar" onClick={btn_cancelar}>cerrar</button> */}
            </div>
        </div>

    );
};

export default UploadAvatar;
