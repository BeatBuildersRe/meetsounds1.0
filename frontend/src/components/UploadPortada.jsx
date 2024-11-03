import React, { useState } from 'react';
import Avatars from '@c/avatar/AvatarV2';
import Avatar from 'react-avatar-edit';
import BotonPlus from '@c/botones/BotonPlus';

const UploadPortada = ({ btn_cancelar, onImageSave, Imagen, Portada, alias }) => {
    const [preview, setPreview] = useState(Portada || ''); // Asegúrate de tener un valor por defecto

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



// import { useState, useCallback, useEffect, useRef } from 'react'
// import Cropper from 'react-easy-crop'
// import { AiOutlineLeft } from 'react-icons/ai'
// import styles from '@css/ImageUpload.module.css'

// // Función utilitaria para crear una vista previa del recorte
// const createImage = (url) =>
//   new Promise((resolve, reject) => {
//     const image = new Image()
//     image.addEventListener('load', () => resolve(image))
//     image.addEventListener('error', (error) => reject(error))
//     image.src = url
//   })

// async function getCroppedImg(imageSrc, pixelCrop) {
//   const image = await createImage(imageSrc)
//   const canvas = document.createElement('canvas')
//   const ctx = canvas.getContext('2d')

//   canvas.width = pixelCrop.width
//   canvas.height = pixelCrop.height

//   ctx.drawImage(
//     image,
//     pixelCrop.x,
//     pixelCrop.y,
//     pixelCrop.width,
//     pixelCrop.height,
//     0,
//     0,
//     pixelCrop.width,
//     pixelCrop.height
//   )

//   return new Promise((resolve) => {
//     canvas.toBlob((blob) => {
//       resolve(URL.createObjectURL(blob))
//     }, 'image/jpeg')
//   })
// }

// export default function ImageUpload({ onImageSave }) {
//   const [isModalOpen, setIsModalOpen] = useState(false)
//   const [imageSrc, setImageSrc] = useState(null)
//   const [crop, setCrop] = useState({ x: 0, y: 0 })
//   const [zoom, setZoom] = useState(1)
//   const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

//   const fileInputRef = useRef(null)

//   useEffect(() => {
//     fileInputRef.current.click()
//   }, [])

//   const handleFileSelect = (e) => {
//     if (e.target.files && e.target.files.length > 0) {
//       const reader = new FileReader()
//       reader.addEventListener('load', () => {
//         setImageSrc(reader.result)
//         setIsModalOpen(true)
//       })
//       reader.readAsDataURL(e.target.files[0])
//     }
//   }

//   const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
//     setCroppedAreaPixels(croppedAreaPixels)
//   }, [])

//   const handleSave = async () => {
//     try {
//       const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
//       onImageSave(croppedImage); // Asegúrate de que esto se llame con la imagen recortada.
//       setIsModalOpen(false);
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   return (
//     <div className={styles.imageUpload}>
//       <input
//         type="file"
//         onChange={handleFileSelect}
//         accept="image/*"
//         className={styles.fileInput}
//         ref={fileInputRef}
//         style={{ display: 'none' ,}}
//       />

//       {isModalOpen && (
//         <div className={styles.modal}>
//           <div className={styles.modalContent}>
//             <div className={styles.modalHeader}>
//               <AiOutlineLeft 
//                 className={styles.backButton} 
//                 onClick={() => setIsModalOpen(false)} // Cierra el modal al hacer clic
//                 aria-label="Cerrar"
//               />
//               <h2>Editar Imagen</h2>
//             </div>
            
//             <div className={styles.cropperContainer}>
//               <Cropper
//                 image={imageSrc}
//                 crop={crop}
//                 zoom={zoom}
//                 aspect={16/9}
//                 onCropChange={setCrop}
//                 onZoomChange={setZoom}
//                 onCropComplete={onCropComplete}
//               />
//             </div>
            
//             <div className={styles.modalFooter}>
//               <input
//                 type="range"
//                 value={zoom}
//                 min={1}
//                 max={3}
//                 step={0.1}
//                 aria-label="Zoom"
//                 onChange={(e) => setZoom(Number(e.target.value))}
//                 className={styles.zoomSlider}
//               />
              
//               <div className={styles.buttonGroup}>
//                 <button
//                 type="button" // Agrega esta línea para evitar que el botón envíe el formulario
//                   onClick={handleSave}
//                   className={styles.applyButton}
//                 >
//                   Aplicar
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }
