/* Services */
import useUpdateImgPerfil from '@services/UpdatePerfil';
/* Css */
import '@css/Colores.css'
import '@css/UploadAvatar.css';
/* REact */
import React, { useState } from 'react';
import Avatar from 'react-avatar-edit';
/* Componentes */
import Avatars from '@c/avatar/AvatarV2';
import BotonPlus from '@c/botones/BotonPlus';

const UploadAvatar = ({ btn_cancelar, onImageSave, Imagen, Portada, alias }) => {
    const [preview, setPreview] = useState(Imagen);

    const onClose = () => {
        setPreview(Imagen); // Restaurar la imagen por defecto si se cierra el editor
    };

    const onCrop = (view) => {
        setPreview(view); // Actualizar la vista previa con la imagen recortada
    };

    const handleSave = () => {
        onImageSave(preview); // Enviar la imagen recortada al componente padre
        btn_cancelar(); // Cerrar el componente de carga
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
                    closeIconColor='red'
                    mimeTypes='.jpeg,.jpg,.png'
                    label='Toca para subir una imagen'
                />
            </div>

            <div className='botones'>
                <div id='Guardar' onClick={handleSave}>
                    <BotonPlus text='Guardar' color='green' />
                </div>
                <div id='Cancelar' onClick={btn_cancelar}>
                    <BotonPlus text='Salir' color='red' />
                </div>
            </div>
        </div>
    );
};

export default UploadAvatar;