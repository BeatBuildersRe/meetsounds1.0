
import React, { useState, useEffect } from 'react'
import { Dialog } from '@headlessui/react'
import { CalendarIcon, CameraIcon } from 'lucide-react'
import { useParams, useNavigate } from 'react-router-dom'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { FcAudioFile, FcCamera, FcAlphabeticalSortingAz, FcFilmReel, FcGallery, FcMusic, FcPlus } from "react-icons/fc"
import MenuListComposition from '../../components/mini-menu/minMenu'
import CrearPublicacion from '@c/Crear-Publicacion/CrearPublicacion'
import SeguirDores from '@c/seguir_dores'
import MenuDerecho from '@c/Menu/Menu'
import { BASE_URL } from '../../config'
 /* Services */
 import GetAlias from '@services/GetAlias';
 import useObtenerUsuario from '@services/GetUsuario';
 import useUpdateUsuario from '@services/UpdateUsuario'; // Hook para actualizar el usuario
 /* Css */
 import '@css/Colores.css'
 import '@css/Perfil_Y_Portada.css';
 /* React */
 import { useForm } from 'react-hook-form';
 /* Componentes */
 import MenuDerechoDiv from "@c/Menu/Derecha";
 import UploadAvatar from '@c/UploadAvatar';
 import UploadPortada from '@c/UploadPortada';
 import UiverseEdit from '@c/botones/BotonEdit';
 import Avatars from '@c/avatar/AvatarV2';
 

const imgFondoDefault = 'https://imagedelivery.net/WS9ABFRS6TfdqDudkFOT3w/grrraphic/previews/j6RAX7eRw0pyywtdOXK38whWXLrEmjDWb7Z6l54u.jpeg/thumb?height=200&width=600' // Imagen de fondo predeterminada
const imgPerfilDefault = 'https://imagedelivery.net/WS9ABFRS6TfdqDudkFOT3w/grrraphic/previews/j6RAX7eRw0pyywtdOXK38whWXLrEmjDWb7Z6l54u.jpeg/thumb?height=400&width=400' // Imagen de perfil predeterminada

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#1a202c',
    color: 'white',
    marginLeft:'18vw',
    width:'100%'
  },
  header: {
    padding: '1rem',
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid #2d3748',
  },
  backButton: {
    marginRight: '1rem',
    background: 'none',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
  },
  headerTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
  },
  profileInfo: {
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: '20rem',
    objectFit: 'cover',
    imageRendering: 'auto', /* Otras opciones: 'crisp-edges', 'pixelated' */
  },
  profileImage: {
    position: 'absolute',
    left: '1rem',
    bottom: '-4rem',
    width: '8rem',
    height: '8rem',
    borderRadius: '50%',
    border: '4px solid #1a202c',
  },
  profileContent: {
    marginTop: '5rem',
    padding: '0 1rem',
  },
  editButton: {
    padding: '0.5rem 1rem',
    border: '1px solid #4a5568',
    borderRadius: '9999px',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    color: 'white',
    cursor: 'pointer',
  },
  profileName: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginTop: '1rem',
  },
  profileUsername: {
    color: '#a0aec0',
  },
  joinDate: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '0.5rem',
    color: '#a0aec0',
  },
  followInfo: {
    display: 'flex',
    marginTop: '1rem',
    gap: '1rem',
  },
  tabs: {
    display: 'flex',
    borderBottom: '1px solid #2d3748',
    marginTop: '1rem',
  },
  tab: {
    flex: 1,
    textAlign: 'center',
    padding: '1rem 0',
    background: 'none',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
  },
  activeTab: {
    borderBottom: '2px solid #4299e1',
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 50,
  },
  modalContent: {
    backgroundColor: '#2d3748',
    padding: '1.5rem',
    borderRadius: '0.5rem',
    width: '100%',
    maxWidth: '28rem',
  },
  modalTitle: {
    fontSize: '1.25rem',
    fontWeight: 'medium',
    marginBottom: '1rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontSize: '0.875rem',
    color: '#a0aec0',
  },
  input: {
    padding: '0.5rem',
    backgroundColor: '#4a5568',
    border: '1px solid #2d3748',
    borderRadius: '0.25rem',
    color: 'white',
  },
  fileUpload: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '1rem',
    border: '2px dashed #4a5568',
    borderRadius: '0.25rem',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '0.5rem',
    marginTop: '1rem',
  },
  button: {
    padding: '0.5rem 1rem',
    borderRadius: '0.25rem',
    fontWeight: 'medium',
    cursor: 'pointer',
  },
  cancelButton: {
    backgroundColor: '#4a5568',
    color: 'white',
    border: 'none',
  },
  saveButton: {
    backgroundColor: '#4299e1',
    color: 'white',
    border: 'none',
  },
  newPostButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.5rem 1rem',
    backgroundColor: '#4299e1',
    color: 'white',
    border: 'none',
    borderRadius: '0.25rem',
    cursor: 'pointer',
  },
  icon: {
    marginRight: '0.5rem',
  },
  toggleButtonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '1rem',
  },
  toggleButton: {
    flex: 1,
    padding: '0.5rem',
    border: '1px solid #4a5568',
    backgroundColor: '#2d3748',
    color: 'white',
    cursor: 'pointer',
  },
  acomodar:{
    display: 'flex',
    gap:'1%',
    marginLeft:'1%',
  }
  
}

export default function ProfilePage() {
  const { alias } = useParams()
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [userData, setUserData] = useState({
    nombre: '',
    apellido: '',
    alias: '',
    fotoPerfilUrl: '',
    fotoPortadaUrl: '',
    c_seguidores: '',
    c_seguidos: '',
    descripcion: ''
  })
  const [alignment, setAlignment] = useState('web')
  const [isDivVisible, setIsDivVisible] = useState(false)
  const [isDivVisible2, setIsDivVisible2] = useState(false)
  const [isDivVisible3, setIsDivVisible3] = useState(false)

  useEffect(() => {
    if (alias) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(`${BASE_URL}/graphql`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              query: `
                query {
                  buscarPorAlias(alias: "${alias}") {
                    nombre
                    apellido
                    fotoPerfilUrl
                    fotoPortadaUrl
                    alias
                    c_seguidores
                    c_seguidos
                    descripcion
                  }
                }
              `,
            }),
          })

          const result = await response.json()

          if (result.data && result.data.buscarPorAlias) {
            setUserData(result.data.buscarPorAlias)
          } else {
            navigate('/404')
          }
        } catch (error) {
          console.error("Error al conectar con el servidor", error)
          navigate('/404')
        }
      }

      fetchUserData()
    } else {
      console.log("Alias no encontrado en la URL.")
      navigate('/404')
    }
  }, [alias, navigate])

  const handleEditProfile = (e) => {
    e.preventDefault()
    // Aquí iría la lógica para actualizar el perfil
    setIsModalOpen(false)
  }

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment)
    }
  }

  const renderComponent = () => {
    switch (alignment) {
      case 'web': return <h1>Publicaciones</h1>
      case 'android': return <h1>Multimedia</h1>
      case 'ios': return <h1>Información</h1>
      default: return <h1>Publicaciones</h1>
    }
  }

  const handleImageClick = () => setIsDivVisible(!isDivVisible)
  const handleImageClick2 = () => setIsDivVisible2(!isDivVisible2)
  const handleImageClick3 = () => setIsDivVisible3(!isDivVisible3)



  

  const user = GetAlias();
  const { usuario, cargando, error } = useObtenerUsuario(user); // Manejo de carga y errores
  const { actualizarUsuario, cargando: actualizando, error: errorActualizando } = useUpdateUsuario(); // Hook de actualización

  const [estadoEdicion, setEstadoEdicion] = useState({ perfil: false, portada: false });
  const [imagenes, setImagenes] = useState({
      perfil: '',
      portada: ''
  });

  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  useEffect(() => {
      if (usuario && !cargando) {
          setImagenes({
              perfil: usuario.fotoPerfilUrl || '',
              portada: usuario.fotoPortadaUrl || ''
          });

          // Establecer valores en el formulario
          setValue("Nombre", usuario.nombre);
          setValue("Apellido", usuario.apellido);
          setValue("Edad", usuario.edad);
          setValue("Fecha", usuario.fechaNacimiento);
          setValue("Genero", usuario.genero);
      }
  }, [usuario, cargando, setValue]);

  const toggleEdicion = (tipo) => {
      setEstadoEdicion(prev => ({ ...prev, [tipo]: !prev[tipo] }));
  };

  const guardarImagen = (tipo, imagen) => {
      setImagenes(prev => ({ ...prev, [tipo]: imagen }));
  };

  const onSubmit = (data) => {
      const alias = user;
      const nombre = data.Nombre;
      const apellido = data.Apellido;
      actualizarUsuario({ alias, nombre, apellido });
  };


  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <a href="/">
        <button style={styles.backButton}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          
        </button>
        
        </a>
        <h1 style={styles.headerTitle}>{userData.nombre} {userData.apellido} </h1>
        
      </header>
      <div style={{ flex: 1 }}>
        
        <div style={styles.profileInfo}>
          <img
            src={userData.fotoPortadaUrl || imgFondoDefault} // Usa la imagen de portada o la predeterminada
            alt="Cover"
            style={styles.coverImage}
            onClick={handleImageClick}
          />
          <img
            src={userData.fotoPerfilUrl || imgPerfilDefault}// Usa la imagen de perfil o la predeterminada
            alt="Profile"
            style={styles.profileImage}
            onClick={handleImageClick2}
          />
        </div>
        
        <div style={styles.profileContent}>
        
         <div style={{display: 'flex', justifyContent: 'flex-end'}}>
           <button onClick={() => setIsModalOpen(true)} style={styles.editButton}>
             Edit profile
           </button>
         </div>
          

          <h2 style={styles.profileName}>{userData.nombre} {userData.apellido}</h2>
          <p style={styles.profileUsername}>@{userData.alias}</p>

          <div style={styles.followInfo}>
          <span><strong>{userData.c_seguidores}</strong>  Seguidores</span>
          <span><strong>{userData.c_seguidos}</strong>  Seguidos</span>
          </div>
          <div className="seccion-2">
          <p>{userData.descripcion}</p> 
        </div>

         
          

          <p style={{marginTop: '1rem'}}>{userData.descripcion}</p>

          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
            style={styles.toggleButtonGroup}
          >
            <ToggleButton value="web" style={styles.toggleButton}>Publicaciones</ToggleButton>
            <ToggleButton value="android" style={styles.toggleButton}>Multimedia</ToggleButton>
            <ToggleButton value="ios" style={styles.toggleButton}>Información</ToggleButton>
          </ToggleButtonGroup>

          <div style={{marginTop: '1rem'}}>
            {renderComponent()}
          </div>
        </div>
      </div>

      

      {/* Edit Profile Modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div style={styles.modal}>
          <Dialog.Panel style={styles.modalContent}>
            <Dialog.Title as="h3" style={styles.modalTitle}>
              Editar Perfil
            </Dialog.Title>
            <form onSubmit={handleEditProfile} style={styles.form}>
              <div style={styles.formGroup}>
                  <label style={styles.label}>Foto de Perfil</label>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    <Avatars class='Perfil' imagen={imagenes.perfil} width={100} height={100} />
                    {/* Botones para editar perfil o portada */}
                    {!estadoEdicion.perfil && !estadoEdicion.portada && (
                      <>
                        <button id='editar-perfil'onClick={() => toggleEdicion('perfil')} type="button" style={{...styles.button, ...styles.cancelButton}}>
                          Editar
                        </button>
                      </>
                    )}  
                  </div> 
              </div>
              {/* Editar perfil */}
              {estadoEdicion.perfil && (
                <UploadAvatar
                    btn_cancelar={() => toggleEdicion('perfil')}
                    onImageSave={(imagen) => guardarImagen('perfil', imagen)}
                    Imagen={imagenes.perfil}
                    Portada={imagenes.portada}
                    alias={user}
                />
              )}     
              <div style={styles.formGroup}>
                <label style={styles.label}>Portada de Perfil</label>
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <img id="Portada" src={imagenes.portada}width={100} height={100} alt="Portada" />  
                  {!estadoEdicion.perfil && !estadoEdicion.portada && (
                    <>
                      <button id='editar-portada' onClick={() => toggleEdicion('portada')} type="button" style={{...styles.button, ...styles.cancelButton}}>
                        Editar
                      </button>
                    </>
                  )}
                </div>
              </div>
              {/* Editar portada */}
              {estadoEdicion.portada && (
                <UploadPortada
                    btn_cancelar={() => toggleEdicion('portada')}
                    onImageSave={(imagen) => guardarImagen('portada', imagen)}
                    Imagen={imagenes.perfil}
                    Portada={imagenes.portada}
                    alias={user}
                />
              )}

              

                   
            </form>
            <form  onSubmit={handleSubmit(onSubmit)}>
                        <div style={styles.acomodar}>
                            <div style={styles.formGroup}>
                            <label htmlFor="name" style={styles.label}>Nombre</label>
                            <input {...register("Nombre", { required: true })}
                                    placeholder="Nombre" style={styles.input}
                             />
                             {errors.Nombre && <span>El nombre es obligatorio</span>}
                            </div>

                            <div style={styles.formGroup}>
                            <label htmlFor="name" style={styles.label}>Apellido</label>
                            <input {...register("Apellido", { required: true })}
                                    placeholder="Apellido" style={styles.input}
                            />  
                            {errors.Apellido && <span>El apellido es obligatorio</span>}
                            </div>
                        </div>
                        <div style={styles.acomodar}>
                          <div style={styles.formGroup}>
                            <label htmlFor="username" style={styles.label}>Usuario</label>
                            <input
                              type="text"
                              id="username"
                              name="username"
                              defaultValue={userData.alias}
                              style={styles.input}
                              disabled
                            />
                          </div>
                        </div>
                        <div style={styles.formGroup}>
                          <label htmlFor="description" style={styles.label}>Description</label>
                          <textarea 
                            id="description" 
                            name="description" 
                            rows="4" 
                            style={styles.input} 
                            placeholder="Enter description here..."
                          />
                        </div>
                        <div style={styles.acomodar}>
                        <div style={styles.formGroup}>
                          <label htmlFor="edad" style={styles.label}>Edad</label>
                            <input style={styles.input}
                                {...register("Edad", { required: true, maxLength: 2 })}
                                placeholder="Edad"
                            />
                            {errors.Edad && <span>La edad es obligatoria y debe tener un máximo de 2 dígitos</span>}
                        </div>

                        <div style={styles.formGroup}>
                        <label htmlFor="birthdate" style={styles.label}>Fecha de Nacimiento</label>
                            <input className='input'
                                type="date" style={styles.input}
                                {...register("Fecha", { required: true })}
                                placeholder="Fecha de Nacimiento"
                            />
                            {errors.Fecha && <span>La fecha de nacimiento es obligatoria</span>}
                        </div>
                        </div>
                        <div style={styles.formGroup}>
                          <label htmlFor="gender" style={styles.label}>Género</label>
                          <select id="gender" name="gender" style={styles.input}>
                            <option>Hombre</option>
                            <option>Mujer</option>
                            
                          </select>
                        </div>
                        <div style={styles.buttonGroup}>
                          <button type="button" onClick={() => setIsModalOpen(false)} style={{...styles.button, ...styles.cancelButton}}>
                            Cancel
                          </button>
                          <button type="submit" style={{...styles.button, ...styles.saveButton}}>
                            Save
                          </button>
                        </div>
                        
                    </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  )
}