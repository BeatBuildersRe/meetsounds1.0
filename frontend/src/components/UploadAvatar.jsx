import React, { useEffect, useState } from 'react';
import Avatar from 'react-avatar-edit';
import foto from '@public/perfill.png';
import '@css/UploadAvatar.css';

const UploadAvatar = ({ btn_cancelar, onImageSave }) => {
    const [src, setSrc] = useState(null);
    const [preview, setPreview] = useState(foto);
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
                <div className="preview">
                    <div className='avatar-preview'>
                        {preview && <img src={preview} alt="Preview" />}
                    </div>
                    <div className='avatar-preview1'>
                        {preview && <img src={preview} alt="Preview" />}
                    </div>
                    <div className='avatar-preview2'>
                        {preview && <img src={preview} alt="Preview" />}
                    </div>
                </div>

                <div className='avatar'>
                    <Avatar
                        height={300}
                        width={340}
                        onCrop={onCrop}
                        onClose={onClose}
                        labelStyle={{ color: 'red' }}
                        src={src}
                        closeIconColor='red'
                        mimeTypes='.jpeg,.jpg,.png'
                        label='Subir imagen'
                    />
                </div>

                <div className='botones'>
                    <button id="btn-guardar" onClick={() => { handleSave(); btn_cancelar(); }}>Guardar Imagen</button>
                    <button id="btn-cerrar" onClick={btn_cancelar}>cerrar</button>
                </div>
            </div>
        </div>
    );
};

export default UploadAvatar;
