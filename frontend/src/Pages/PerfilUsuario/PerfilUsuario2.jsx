
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
 import { toast, ToastContainer } from 'react-toastify';
 import Posts from '@c/Perfil/Publicaciones';
import Replies from '@c/Perfil/Publicaciones';
import Highlights from '@c/Perfil/Publicaciones';
import 'react-toastify/dist/ReactToastify.css';

const imgFondoDefault = 'https://imagedelivery.net/WS9ABFRS6TfdqDudkFOT3w/grrraphic/previews/j6RAX7eRw0pyywtdOXK38whWXLrEmjDWb7Z6l54u.jpeg/thumb?height=200&width=600' // Imagen de fondo predeterminada
const imgPerfilDefault = 'https://imagedelivery.net/WS9ABFRS6TfdqDudkFOT3w/grrraphic/previews/j6RAX7eRw0pyywtdOXK38whWXLrEmjDWb7Z6l54u.jpeg/thumb?height=400&width=400' // Imagen de perfil predeterminada

const styles = {
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
    left: '3rem',
    bottom: '-4rem',
    width: '12rem',
    height: '12rem',
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
    maxHeight: '80vh', // Establece una altura máxima
  
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
  // toggleButtonGroup: {
  //   display: 'flex',
  //   justifyContent: 'space-between',
  //   marginTop: '1rem',
  // },
  // toggleButton: {
  //   flex: 1,
  //   padding: '0.5rem',
  //   border: '1px solid #4a5568',
  //   backgroundColor: '#2d3748',
  //   color: 'white',
  //   cursor: 'pointer',
  // },
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
    
    color: 'white',
    cursor: 'pointer',
  },
  activeTab: {
    borderBottom: '2px solid #4299e1',
  },
  acomodar:{
    display: 'flex',
    justifyContent:'space-Between',
    gap:'1%',
    marginLeft:'1%',
  },
  coverImageContainer: {
    position: 'relative',
    height: '200px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '10px',
    marginBottom:'15%',
  },
  profileImageContainer: {
    position: 'absolute',
    bottom: '-50px',
    left: '20px',
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    border: '4px solid #1a1a1a',
    overflow: 'hidden',
  },
  profileImageEdit: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  cameraIcon: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: '50%',
    padding: '0.5rem',
    cursor: 'pointer',
  },
  coverCameraIcon: {
    top: '10px',
    right: '10px',
  },
  profileCameraIcon: {
    bottom: '10px',
    right: '10px',
  },
  
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






  const [estadoEdicion, setEstadoEdicion] = useState({ perfil: false, portada: false });
  const [imagenes, setImagenes] = useState({
    perfil: '',
    portada: ''
  });
  const [tempImages, setTempImages] = useState({
    perfil: '',
    portada: ''
  });

  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const user = GetAlias();
  const { usuario, cargando, error } = useObtenerUsuario(user);
  const { actualizarUsuario, cargando: actualizando, error: errorActualizando } = useUpdateUsuario();

  // Definir fetchUserData fuera del useEffect para reutilizarlo
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
      });
      const result = await response.json();

      if (result.data && result.data.buscarPorAlias) {
        setUserData(result.data.buscarPorAlias);
        setImagenes({
          perfil: result.data.buscarPorAlias.fotoPerfilUrl,
          portada: result.data.buscarPorAlias.fotoPortadaUrl
        });
      } else {
        navigate('/404');
      }
    } catch (error) {
      console.error("Error al conectar con el servidor", error);
      navigate('/404');
    }
  };
// Llamar a fetchUserData cuando el alias cambie
useEffect(() => {
  if (alias) {
    fetchUserData();
  } else {
    console.log("Alias no encontrado en la URL.");
    navigate('/404');
  }
}, [alias, navigate]);

useEffect(() => {
  if (usuario && !cargando) {
    setImagenes({
      perfil: usuario.fotoPerfilUrl || '',
      portada: usuario.fotoPortadaUrl || ''
    });

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

const guardarImagenTemp = (tipo, imagen) => {
  setTempImages(prev => ({ ...prev, [tipo]: imagen }));
};
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



  

  
  
  

  

  const onSubmit = async (data) => {
    try {
      const updatedData = {
        alias: user,
        nombre: data.Nombre,
        apellido: data.Apellido,
        fotoPerfilUrl: tempImages.perfil || imagenes.perfil,
        fotoPortadaUrl: tempImages.portada || imagenes.portada
      };

      await actualizarUsuario(updatedData);

      toast.success("Los cambios se guardaron correctamente", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });

      // Update the main imagenes state
      setImagenes({
        perfil: updatedData.fotoPerfilUrl,
        portada: updatedData.fotoPortadaUrl
      });

      // Update userData state
      setUserData(prevData => ({
        ...prevData,
        nombre: updatedData.nombre,
        apellido: updatedData.apellido,
        fotoPerfilUrl: updatedData.fotoPerfilUrl,
        fotoPortadaUrl: updatedData.fotoPortadaUrl
      }));

      setTimeout(() => {
        setIsModalOpen(false);
        setTempImages({ perfil: '', portada: '' });
      }, 2000);
      
    } catch (error) {
      console.error("Error al actualizar el usuario", error);
      toast.error("Error al guardar los cambios");
    }
  };
  const [activeTab, setActiveTab] = useState('Posts');
  const renderContent = () => {
    switch (activeTab) {
      case 'Posts':
        return <Posts />;
      case 'Replies':
        return <Replies />;
      case 'Highlights':
        return <Highlights />;
      default:
        return null;
    }

    
  };
  
 

  return (
    <div className="container">
      {/* Header */}
      <header style={styles.header}>
        <a href="/">
        <button style={styles.backButton}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          
        </button>
        
        </a>
        
        <p style={styles.profileUsername}>@{userData.alias} </p>
        
      </header>
      <div style={{ flex: 1 }}>
        
        <div style={styles.profileInfo}>
        <img
            src={imagenes.portada || imgFondoDefault}
            alt="Cover"
            style={styles.coverImage}
          />
          <img
            src={imagenes.perfil || imgPerfilDefault}
            alt="Profile"
            style={styles.profileImage}
          />
        </div>
         
        <div style={styles.profileContent}>
          <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <button onClick={() => setIsModalOpen(true)} style={styles.editButton}>
              Edit profile
            </button>
          </div>
          
          <div style={styles.acomodar}>
            <h2 style={styles.profileName}>{userData.nombre} {userData.apellido}</h2>
            <div style={styles.followInfo}>
              <span><strong>{userData.c_seguidores}</strong>  Seguidores</span>
              <span><strong>{userData.c_seguidos}</strong>  Seguidos</span>
            </div>
          </div>
          
          <div className="seccion-2">
          <p>{userData.descripcion}</p> 
          </div>

         
          

          
          <nav style={styles.tabs}>
        {['Posts', 'Replies', 'Highlights'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{ ...styles.tab, ...(tab === activeTab ? styles.activeTab : {}) }}
          >
            {tab}
          </button>
        ))}
      </nav>
      <div style={styles.content}>
        {renderContent()}
      </div>

          {/* <ToggleButtonGroup
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
          </ToggleButtonGroup> */}

        </div>
      </div>

      

      {/* Edit Profile Modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div style={styles.modal}>
          <Dialog.Panel className="modal-content">
            <Dialog.Title as="h3" style={styles.modalTitle}>
              Editar Perfil
            </Dialog.Title>
            <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>


            <div 
              style={{
                ...styles.coverImageContainer,
                backgroundImage: `url(${tempImages.portada || imagenes.portada})`,
              }}
            >
              {!estadoEdicion.perfil && !estadoEdicion.portada && (
                      <>
                       <label htmlFor="cover-upload" style={{...styles.cameraIcon, ...styles.coverCameraIcon}} onClick={() => toggleEdicion('portada')}>
                <CameraIcon color="white" size={24} />
              </label>
                      </>
                    )}
              
              {/* <input
                id="cover-upload"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0]
                  if (file) {
                    const reader = new FileReader()
                    reader.onload = (e) => guardarImagen('portada', e.target.result)
                    reader.readAsDataURL(file)
                  }
                }}
                style={{ display: 'none' }}
              /> */}
              <div style={styles.profileImageContainer}>
              <img 
                  src={tempImages.perfil || imagenes.perfil} 
                  alt="Profile" 
                  style={styles.profileImageEdit} 
                />
                {!estadoEdicion.perfil && !estadoEdicion.portada && (
                        <>
                          <label htmlFor="profile-upload" style={{...styles.cameraIcon, ...styles.profileCameraIcon}} onClick={() => toggleEdicion('perfil')}>
                  <CameraIcon color="white" size={24} />
                </label>
                        </>
                      )}
                      
                
                {/* <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0]
                    if (file) {
                      const reader = new FileReader()
                      reader.onload = (e) => guardarImagen('perfil', e.target.result)
                      reader.readAsDataURL(file)
                    }
                  }}
                  style={{ display: 'none' }}
                /> */}
              </div>
            </div>
                  
{/* Editar portada */}
{estadoEdicion.portada && (
                <UploadPortada
                  btn_cancelar={() => toggleEdicion('portada')}
                  onImageSave={(imagen) => guardarImagenTemp('portada', imagen)}
                  Imagen={tempImages.perfil || imagenes.perfil}
                  Portada={tempImages.portada || imagenes.portada}
                  alias={user}
                />
              )}

              {estadoEdicion.perfil && (
                <UploadAvatar
                  btn_cancelar={() => toggleEdicion('perfil')}
                  onImageSave={(imagen) => guardarImagenTemp('perfil', imagen)}
                  Imagen={tempImages.perfil || imagenes.perfil}
                  Portada={tempImages.portada || imagenes.portada}
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
                        <button 
                  type="button" 
                  onClick={() => {
                    setIsModalOpen(false);
                    setTempImages({ perfil: '', portada: '' });
                  }} 
                  style={{...styles.button, ...styles.cancelButton}}
                >
                  Cancel
                </button>
                          <button type="submit" style={{...styles.button, ...styles.saveButton}} >
                            Guardar
                          </button>
                        </div>
                        
                    </form>
          </Dialog.Panel>
        </div>
      </Dialog>
      <ToastContainer />
    </div>
  )
}