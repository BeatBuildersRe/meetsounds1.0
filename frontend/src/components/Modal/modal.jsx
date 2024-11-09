import React, { useState, useEffect } from 'react';
import { CiCirclePlus } from 'react-icons/ci';
import './modal.css';
import { BASE_URL } from '../../config';

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '425px',
    width: '100%',
    maxHeight: '90vh',
    overflowY: 'auto',
  },
  container: {
    display: 'grid',
    gap: '1rem',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#e0e0e0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '0.5rem',
  },
  filePreview: {
    position: 'relative',
    width: '100%',
    height: '8rem',
  },
  filePreviewImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '0.375rem',
  },
  removeButton: {
    position: 'absolute',
    top: '0.25rem',
    right: '0.25rem',
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  dropzone: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '16rem',
    border: '2px dashed #d1d5db',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    backgroundColor: '#f3f4f6',
  },
  button: {
    padding: '10px 15px',
    backgroundColor: '#0070f3',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  errorMessage: {
    color: 'red',
    fontSize: '12px',
    marginTop: '5px',
  },
};

const aliasCookie = document.cookie
  .split('; ')
  .find(row => row.startsWith('alias='));

if (aliasCookie) {
  const alias = aliasCookie.split('=')[1];
  console.log('Alias encontrado:', alias);
} else {
  console.error('Alias no encontrado en las cookies');
}

export default function PostModal({ onPost = () => {} }) {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState({
    nombre: 'Usuario',
    apellido: '',
    fotoPerfilUrl: '/placeholder.svg?height=40&width=40',
  });
  const [files, setFiles] = useState([]);
  const [description, setDescription] = useState('');
  const [charCount, setCharCount] = useState(500);
  const [error, setError] = useState(''); // Estado para los errores de tipo de archivo

  useEffect(() => {
    const alias = document.cookie
      .split('; ')
      .find(row => row.startsWith('alias='))?.split('=')[1];

    if (alias) {
      fetch(`${BASE_URL}/graphql`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            query {
              buscarPorAlias(alias: "${alias}") {
                fotoPerfilUrl
                nombre
                apellido
              }
            }
          `,
        }),
      })
        .then(response => response.json())
        .then(data => {
          if (data?.data?.buscarPorAlias) {
            setUserData(data.data.buscarPorAlias);
          } else {
            console.error("Error en la consulta:", data.errors);
          }
        })
        .catch(error => {
          console.error("Error al hacer la solicitud:", error);
        });
    }
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).slice(0, 1); // Solo permite un archivo

      // Verificar el tipo de archivo
      const validTypes = ['image/png', 'image/jpg', 'image/jpeg'];
      const invalidFile = newFiles.find(file => !validTypes.includes(file.type));

      if (invalidFile) {
        setError('Solo se permiten archivos PNG o JPG');
        return;
      }

      setError(''); // Limpiar mensaje de error si el archivo es válido
      const newFilesWithPreview = newFiles.map(file => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setFiles(newFilesWithPreview);
    }
  };

  const handlePost = () => {
    console.log("Publicando...");
    const alias = document.cookie
      .split('; ')
      .find(row => row.startsWith('alias='))?.split('=')[1];

    if (alias) {
      const formData = new FormData();
      formData.append("idAlias", alias);
      formData.append("descripcion", description);

      // Si hay un archivo, agregarlo a la solicitud
      if (files.length > 0) {
        formData.append("file", files[0].file);
      }

      fetch(`${BASE_URL}/crearPublicacion`, {
        method: "POST",
        body: formData,
      })
        .then(response => {
          console.log(response);
          if (response.ok) {
            console.log("Publicación exitosa");
            onPost(files[0]?.file, description); // Llamada a la función onPost sin location
            window.location.reload();
          } else {
            console.error("Error al crear la publicación:", response.statusText);
          }
        })
        .catch(error => {
          console.error("Error al enviar la solicitud:", error);
        });
    } else {
      console.error("Alias no válido.");
    }
  };

  const handleClose = () => {
    setFiles([]);
    setDescription('');
    setCharCount(500);
    setIsOpen(false);
    setError(''); // Limpiar el mensaje de error al cerrar el modal
  };

  const handleDescriptionChange = (e) => {
    const newText = e.target.value;
    if (newText.length <= 500) {
      setDescription(newText);
      setCharCount(500 - newText.length);
    }
  };

  return (
    <>
      <button className="boton_crear_publicacion" onClick={() => setIsOpen(true)}>
        <div className="svg-wrapper-1">
          <div className="svg-wrapper">
            <CiCirclePlus />
          </div>
        </div>
        <span>Crear</span>
      </button>

      {isOpen && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.modal}>
            <h2 style={{ marginTop: 0 }}>Crear nueva publicación</h2>
            <div style={modalStyles.container}>
              <div style={modalStyles.userInfo}>
                <div style={modalStyles.avatar}>
                  <img src={userData.fotoPerfilUrl} alt={`${userData.nombre} ${userData.apellido}`} style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                </div>
                <span style={{ fontWeight: 'bold' }}>{`${userData.nombre} ${userData.apellido}`}</span>
              </div>
              <textarea
                style={modalStyles.textarea}
                placeholder="Escribe una descripción..."
                value={description}
                onChange={handleDescriptionChange}
              />
              <p>{charCount} caracteres restantes</p>
              <div>
                {files.length > 0 ? (
                  <div style={modalStyles.fileGrid}>
                    {files.map((file, index) => (
                      <div key={index} style={modalStyles.filePreview}>
                        <img 
                          src={file.preview} 
                          alt="Vista previa" 
                          style={modalStyles.filePreviewImage}
                        />
                        <button
                          style={modalStyles.removeButton}
                          onClick={() => setFiles([])}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div
                    style={modalStyles.dropzone}
                    onClick={() => document.getElementById('fileInput').click()}
                  >
                    <p>Haz click o arrastra para agregar una imagen (PNG o JPG)</p>
                  </div>
                )}
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: 'none' }}
                  accept="image/png, image/jpg, image/jpeg"
                  onChange={handleFileChange}
                />
                {error && <p style={modalStyles.errorMessage}>{error}</p>}
              </div>
              <button style={modalStyles.button} onClick={handlePost}>Publicar</button>
              <button style={{ ...modalStyles.button, backgroundColor: '#f3f4f6', color: '#333' }} onClick={handleClose}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
