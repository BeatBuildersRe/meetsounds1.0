

import React, { useState, useEffect } from 'react'
import { CiCirclePlus } from 'react-icons/ci'
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
  input: {
    width: '100%',
    padding: '8px',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
  },
  textarea: {
    width: '100%',
    padding: '8px',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    minHeight: '100px',
  },
  locationInput: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  mapLink: {
    fontSize: '0.875rem',
    color: '#3b82f6',
    textDecoration: 'none',
  },
  button: {
    padding: '10px 15px',
    backgroundColor: '#0070f3',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
}

export default function PostModal({ 
  username = "usuario", 
  userAvatar = "/placeholder.svg?height=40&width=40",
  onPost = () => {}
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [files, setFiles] = useState([])
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')

  useEffect(() => {
    return () => files.forEach(file => URL.revokeObjectURL(file.preview))
  }, [files])

  const handleFileChange = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).slice(0, 5 - files.length)
      const newFilesWithPreview = newFiles.map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }))
      setFiles(prev => [...prev, ...newFilesWithPreview].slice(0, 5))
    }
  }

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handlePost = () => {
    onPost(files.map(f => f.file), description, location)
    handleClose()
  }

  const handleClose = () => {
    setFiles([])
    setDescription('')
    setLocation('')
    setIsOpen(false)
  }

  return (
    <>
      
        <button className='boton_crear_publicacion' onClick={() => setIsOpen(true)}>
          <div className="svg-wrapper-1">
            <div className="svg-wrapper">
              <CiCirclePlus/>
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
                  <img src={userAvatar} alt={username} style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                </div>
                <span style={{ fontWeight: 'bold' }}>{username}</span>
              </div>
              <div>
                {files.length > 0 ? (
                  <div style={modalStyles.fileGrid}>
                    {files.map((file, index) => (
                      <div key={index} style={modalStyles.filePreview}>
                        {file.file.type.startsWith('image/') ? (
                          <img 
                            src={file.preview} 
                            alt={`Preview ${index + 1}`} 
                            style={modalStyles.filePreviewImage}
                          />
                        ) : (
                          <video 
                            src={file.preview} 
                            style={modalStyles.filePreviewImage}
                          />
                        )}
                        <button
                          style={modalStyles.removeButton}
                          onClick={() => removeFile(index)}
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={modalStyles.dropzone}>
                    <label htmlFor="dropzone-file">
                      <div style={{ textAlign: 'center' }}>
                        <p style={{ marginBottom: '0.5rem' }}><span style={{ fontWeight: 'bold' }}>Haz clic para subir</span> o arrastra y suelta</p>
                        <p style={{ fontSize: '0.75rem' }}>SVG, PNG, JPG, GIF o MP4 (MAX. 5 archivos)</p>
                      </div>
                      <input 
                        id="dropzone-file" 
                        type="file" 
                        style={{ display: 'none' }}
                        accept="image/*,video/*"
                        onChange={handleFileChange}
                        multiple
                      />
                    </label>
                  </div>
                )}
              </div>
              <textarea
                style={modalStyles.textarea}
                placeholder="Escribe una descripción..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <div style={modalStyles.locationInput}>
                <span>📍</span>
                <input
                  style={modalStyles.input}
                  placeholder="Añade una ubicación"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              {location && (
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={modalStyles.mapLink}
                >
                  Ver en Google Maps
                </a>
              )}
              <button 
                style={modalStyles.button} 
                onClick={handlePost} 
                disabled={files.length === 0 || !description.trim()}
              >
                Publicar
              </button>
              <button style={{ ...modalStyles.button, backgroundColor: '#f0f0f0', color: '#333' }} onClick={handleClose}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}