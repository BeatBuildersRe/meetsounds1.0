import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import './StepFour.css';

const StepFour = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null); // Imagen recortada
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [description, setDescription] = useState(''); // Estado para la descripción
  const maxDescriptionLength = 400; // Longitud máxima de la descripción

  // Función para manejar la selección de imagen
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl); // Mostrar imagen en el modal
      setCroppedImage(null); // Restablecer la imagen recortada al abrir de nuevo
      setIsModalOpen(true); // Abrir el modal
    }
  };

  // Función para abrir el modal al hacer clic en la imagen actual
  const handleImageClick = () => {
    if (profileImage) {
      setIsModalOpen(true); // Reabrir el modal de recorte si ya hay una imagen
    }
  };

  // Guardar el área recortada
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  // Procesar y guardar la imagen recortada
  const finishCropping = async () => {
    if (profileImage && croppedAreaPixels) {
      const canvas = document.createElement('canvas');
      const image = new Image();
      image.src = profileImage;
      await image.decode(); // Espera a que la imagen cargue completamente
      const ctx = canvas.getContext('2d');

      const { width, height } = croppedAreaPixels;
      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        width,
        height,
        0,
        0,
        width,
        height
      );

      const croppedImageUrl = canvas.toDataURL('image/jpeg'); // Crear la URL de la imagen recortada
      setCroppedImage(croppedImageUrl); // Guardar la imagen recortada
      setIsModalOpen(false); // Cerrar el modal
    }
  };

  // Función para descartar la imagen seleccionada
  const discardImage = () => {
    setProfileImage(null);
    setCroppedImage(null);
  };

  // Función para manejar el cambio en el campo de descripción
  const handleDescriptionChange = (event) => {
    if (event.target.value.length <= maxDescriptionLength) {
      setDescription(event.target.value);
    }
  };

  return (
    <div className="onboarding-step">
      <h3>Sube tu foto de perfil y agrega una breve descripción (Opcional)</h3>

      <div className="profile-upload-container">
        {croppedImage ? (
          <>
            <img 
              src={croppedImage} 
              alt="Imagen recortada" 
              className="profile-image-preview" 
              onClick={handleImageClick} // Reabrir el modal al hacer clic
            />
            <button className="discard-button" onClick={discardImage}>✕</button>
          </>
        ) : (
          <label htmlFor="profile-image" className="upload-placeholder">
            {profileImage ? (
              <img 
                src={profileImage} 
                alt="Vista previa del perfil" 
                className="profile-image-preview" 
                onClick={handleImageClick} // Reabrir el modal al hacer clic
              />
            ) : (
              <div>Haz clic para subir tu foto</div>
            )}
          </label>
        )}
        <input
          type="file"
          id="profile-image"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
          onClick={(e) => e.target.value = null} // Permitir seleccionar la misma imagen de nuevo
        />
      </div>

      {/* Área para la descripción */}
      <div className="description-container">
        <textarea
          className="description-input"
          placeholder="Cuéntanos sobre ti..."
          value={description}
          onChange={handleDescriptionChange}
          rows="4"
        />
        <div className="description-counter">
          {description.length}/{maxDescriptionLength} caracteres
        </div>
      </div>

      {/* Modal personalizado para recortar la imagen */}
      {isModalOpen && (
        <div className="custom-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="custom-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Recorta tu imagen</h3>
            <div className="crop-container">
              <Cropper
                image={profileImage}
                crop={crop}
                zoom={zoom}
                aspect={1} // Relación de aspecto cuadrada para recorte circular
                cropShape="round"
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
            <button onClick={finishCropping} className="crop-button">Recortar y Guardar</button>
            <button onClick={() => setIsModalOpen(false)} className="crop-cancel-button">Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StepFour;
