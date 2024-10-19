import React, { useEffect, useState } from 'react';

import Avatar from 'react-avatar-edit';
import foto from '@public/perfill.png';
const UploadPortada = ({ btn_cancelar, onImageSave }) => {
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
        <div className='UploadAvatar2'>
            <div className='Up2'>
                <div className="preview2">
                    <div className='avatar-preview2'>
                        {preview && <img src={preview} alt="Preview" />}
                    </div>
                    
                </div>

                <div className='avatar2'>
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
                        exportAsSquare={true}
                    />
                </div>

                <div className='botones2'>
                    <button id="btn-guardar2" onClick={() => { handleSave(); btn_cancelar(); }}>Guardar Imagen</button>
                    <button id="btn-cerrar2" onClick={btn_cancelar}>cerrar</button>
                </div>
            </div>
        </div>
    );
};

export default UploadPortada;
