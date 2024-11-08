import React, { useState, useEffect } from 'react';
import { CiCirclePlus } from 'react-icons/ci';
import './modal.css';

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

  useEffect(() => {
    const alias = document.cookie
      .split('; ')
      .find(row => row.startsWith('alias='))?.split('=')[1];

    if (alias) {
      fetch("http://localhost:8080/graphql", {
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
      const newFilesWithPreview = newFiles.map(file => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setFiles(newFilesWithPreview);
    }
  };

  const handlePost = () => {
    console.log("Publicando..."); // Verificar si se ejecuta esta línea
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

      fetch("http://localhost:8080/crearPublicacion", {
        method: "POST",
        body: formData,
      })
        .then(response => {
          console.log(response); // Verificar la respuesta de la API
          if (response.ok) {
            console.log("Publicación exitosa");
            onPost(files[0]?.file, description); // Llamada a la función onPost sin location
            handleClose(); // Cierra el modal después de publicar
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
                          alt={`Preview ${index + 1}`} 
                          style={modalStyles.filePreviewImage}
                        />
                        <button
                          style={modalStyles.removeButton}
                          onClick={() => setFiles([])} // Limpiar los archivos seleccionados
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <label style={modalStyles.dropzone}>
                    Arrastra y suelta una imagen o haz clic para seleccionar
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                    />
                  </label>
                )}
              </div>
              <button
                style={modalStyles.button}
                onClick={handlePost}
                disabled={description.trim() === '' && files.length === 0} // Habilitar si hay texto o archivo
              >
                Publicar
              </button>
              <button onClick={handleClose}>Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
