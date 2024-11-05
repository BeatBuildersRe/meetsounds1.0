// StepFour.jsx
import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import './StepFour.css';
/* import axios from 'axios';
 */
const StepFour = ({ userId, onComplete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null); // Imagen recortada
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [description, setDescription] = useState(''); // Estado para la descripción
  const maxDescriptionLength = 400; // Longitud máxima de la descripción

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl); 
      setCroppedImage(null); 
      setIsModalOpen(true);
    }
  };

  const handleImageClick = () => {
    if (profileImage) {
      setIsModalOpen(true);
    }
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const finishCropping = async () => {
    if (profileImage && croppedAreaPixels) {
      const canvas = document.createElement('canvas');
      const image = new Image();
      image.src = profileImage;
      await image.decode(); 
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

      const croppedImageUrl = canvas.toDataURL('image/jpeg'); 
      setCroppedImage(croppedImageUrl); 
      setIsModalOpen(false);
    }
  };

  const discardImage = () => {
    setProfileImage(null);
    setCroppedImage(null);
  };

  const handleDescriptionChange = (event) => {
    if (event.target.value.length <= maxDescriptionLength) {
      setDescription(event.target.value);
    }
  };

  const saveProfileImage = async () => {
    try {
      const formData = new FormData();
      formData.append("file", profileImage);
      formData.append("alias", userId); // O utiliza el alias del usuario si es necesario

      await axios.post("/api/usuario/actualizarFotoPerfil", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.error("Error al subir la foto de perfil", error);
    }
  };

  const saveDescription = async () => {
    try {
      await axios.post("/graphql", {
        query: `
          mutation {
            actualizarDescripcionUsuario(userId: "${userId}", descripcion: "${description}") {
              id
              descripcion
            }
          }
        `,
      });
    } catch (error) {
      console.error("Error al guardar la descripción", error);
    }
  };

  const handleSaveAndContinue = async () => {
    await saveProfileImage();
    await saveDescription();
    onComplete(); // Avanza al siguiente paso o finaliza el onboarding
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
              onClick={handleImageClick}
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
                onClick={handleImageClick}
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
          onClick={(e) => e.target.value = null} 
        />
      </div>

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

      {isModalOpen && (
        <div className="custom-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="custom-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Recorta tu imagen</h3>
            <div className="crop-container">
              <Cropper
                image={profileImage}
                crop={crop}
                zoom={zoom}
                aspect={1}
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
      
      <button onClick={handleSaveAndContinue} style={{ marginTop: '1em' }}>Guardar y Continuar</button>
    </div>
  );
};

export default StepFour;
