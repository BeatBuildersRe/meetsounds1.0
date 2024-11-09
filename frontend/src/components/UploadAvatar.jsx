// /* Services */
// import useUpdateImgPerfil from '@services/UpdatePerfil';
// /* Css */
// import '@css/Colores.css'
// import '@css/UploadAvatar.css';
// /* REact */
// import React, { useState } from 'react';
// import Avatar from 'react-avatar-edit';
// /* Componentes */
// import Avatars from '@c/avatar/AvatarV2';
// import BotonPlus from '@c/botones/BotonPlus';

// const UploadAvatar = ({ btn_cancelar, onImageSave, Imagen, Portada, alias }) => {
//     const [preview, setPreview] = useState(Imagen);

//     const onClose = () => {
//         setPreview(Imagen); // Restaurar la imagen por defecto si se cierra el editor
//     };

//     const onCrop = (view) => {
//         setPreview(view); // Actualizar la vista previa con la imagen recortada
//     };

//     const handleSave = () => {
//         onImageSave(preview); // Enviar la imagen recortada al componente padre
//         btn_cancelar(); // Cerrar el componente de carga
//     };

//     return (
//         <div className='UploadAvatar'>
//             <div className='Up'>
//                 <div className='media'>
//                     <div className="Portada">
//                         <img id="Portada" src={Portada} alt="" />
//                         {preview && <Avatars class='Perfil' imagen={preview} width={100} height={100} />}
//                     </div>
//                 </div>
//             </div>

//             <div className='avatar'>
//                 <Avatar
//                     height={300}
//                     width={440}
//                     onCrop={onCrop}
//                     onClose={onClose}
//                     labelStyle={{ color: 'red' }}
//                     closeIconColor='red'
//                     mimeTypes='.jpeg,.jpg,.png'
//                     label='Toca para subir una imagen'
//                 />
//             </div>

//             <div className='botones'>
//                 <div id='Guardar' onClick={handleSave}>
//                     <BotonPlus text='Guardar' color='green' />
//                 </div>
//                 <div id='Cancelar' onClick={btn_cancelar}>
//                     <BotonPlus text='Salir' color='red' />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default UploadAvatar;


import { useState, useCallback, useEffect, useRef } from 'react';
import Cropper from 'react-easy-crop';
import { AiOutlineLeft } from 'react-icons/ai';
import styles from '@css/ImageUpload.module.css';

// Función utilitaria para crear una vista previa del recorte
const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.src = url;
  });

async function getCroppedImg(imageSrc, pixelCrop) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // Ajusta el ancho y la altura del canvas para que sea cuadrado
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // Redondea las esquinas del canvas para un efecto circular
  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  // Devolver un Data URL
  return new Promise((resolve) => {
    const dataUrl = canvas.toDataURL('image/jpeg');
    resolve(dataUrl);
  });
}

export default function ImageUpload({ onImageSave }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const fileInputRef = useRef(null);

  useEffect(() => {
    fileInputRef.current.click();
  }, []);

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImageSrc(reader.result);
        setIsModalOpen(true);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSave = async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      onImageSave(croppedImage); // Ahora se pasa una URL de datos.
      setIsModalOpen(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={styles.imageUpload}>
      <input
        type="file"
        onChange={handleFileSelect}
        accept="image/*"
        className={styles.fileInput}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />

      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeaderperfil}>
              <AiOutlineLeft
                className={styles.backButton}
                onClick={() => setIsModalOpen(false)} // Cierra el modal al hacer clic
                aria-label="Cerrar"
              />
              <h2>Editar Imagen de Perfil</h2>
            </div>
            
            <div className={styles.cropperContainer}>
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                cropShape="round" // This is the key change
              />
            </div>

            
            <div className={styles.modalFooter}>
              <input
                type="range"
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-label="Zoom"
                onChange={(e) => setZoom(Number(e.target.value))}
                className={styles.zoomSlider}
              />
              
              <div className={styles.buttonGroup}>
                <button
                  type="button" // Evita que el botón envíe el formulario
                  onClick={handleSave}
                  className={styles.applyButton}
                >
                  Aplicar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
