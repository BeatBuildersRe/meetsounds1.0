import React, { useState } from 'react';
import { BASE_URL } from '../../../config'

const FotosPerfil = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  const handleProfileImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleCoverImageChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const uploadProfileImage = () => {
    if (!profileImage) {
      alert('Por favor selecciona una imagen de perfil primero.');
      return;
    }

    const formData = new FormData();
    formData.append('file', profileImage);
    formData.append('alias', getAlias());

    fetch('http://localhost:8080/actualizarFotoPerfil', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al subir la imagen de perfil.');
        }
        return response.text();
      })
      .then((result) => console.log(result))
      .catch((error) => console.error('Error al subir la imagen de perfil:', error));
  };

  const uploadCoverImage = () => {
    if (!coverImage) {
      alert('Por favor selecciona una imagen de portada primero.');
      return;
    }

    const formData = new FormData();
    formData.append('file', coverImage);
    formData.append('alias', getAlias());

    fetch('http://localhost:8080/actualizarFotoPortada', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al subir la imagen de portada.');
        }
        return response.text();
      })
      .then((result) => console.log(result))
      .catch((error) => console.error('Error al subir la imagen de portada:', error));
  };

  const getAlias = () => {
    const aliasCookie = document.cookie.split('alias=')[1]?.split(';')[0];
    if (!aliasCookie) {
      alert('Alias no encontrado en las cookies.');
      return null;
    }
    return aliasCookie;
  };

  return (
    <div className="fotos-perfil-page">
      <div className="fotos-perfil-container">
        <h2>Actualizar Foto de Perfil</h2>
        <input type="file" accept="image/*" onChange={handleProfileImageChange} />
        <div className="button-container">
          <button onClick={uploadProfileImage}>Subir Foto de Perfil</button>
        </div>

        <h2>Actualizar Foto de Portada</h2>
        <input type="file" accept="image/*" onChange={handleCoverImageChange} />
        <div className="button-container">
          <button onClick={uploadCoverImage}>Subir Foto de Portada</button>
        </div>
      </div>
    </div>
  );
};

export default FotosPerfil;
