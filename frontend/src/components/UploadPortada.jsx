import React, { useState } from 'react';
import Avatars from '@c/avatar/AvatarV2';
import Avatar from 'react-avatar-edit';
import BotonPlus from '@c/botones/BotonPlus';

const UploadPortada = ({ btn_cancelar, onImageSave, Imagen, Portada, alias }) => {
    const [preview, setPreview] = useState(Portada);

    const onClose = () => {
        setPreview(Portada);
    };

    const onCrop = (view) => {
        setPreview(view);
    };

    const handleSave = () => {
        onImageSave(preview); // Only pass the preview to the parent component
        btn_cancelar(); // Close the upload component
    };

    return (
        <div className='UploadAvatar'>
            <div className='Up'>
                <div className='media'>
                    <div className="Portada">
                        {preview && <img id="Portada" src={preview} alt="" />}
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
            </div>
        </div>
    );
};

export default UploadPortada;