
import Cookies from 'js-cookie';
import IniciarChatButton from '../Chat/IniciarChatButton';
import ChatComponent from '../Chat/ChatComponent';  // Componente del chat
import { useThemeContext } from '../../context/ThemeContext';
import imgFondo from '@img/react.jpg';
import imgPerfil from '@img/perfil_imagen.png';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import MenuListComposition from '@c/mini-menu/minMenu';
import SeguirDores from '@c/seguir_dores';
import { useLocation } from "react-router-dom";
import ServiceBandas from "../../services/ServiceBandas";
import { FcSettings } from "react-icons/fc";

import '@css/CssPefilUsuario.css';
import MenuDerecho from '@c/Menu/Menu';
// Import
/* React */
import React, { useState, useEffect } from 'react'

import { useForm } from 'react-hook-form';

import { useParams, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../config'
 /* Services */
 import GetAlias from '@services/GetAlias';
 import useObtenerUsuario from '@services/GetUsuario';
 import useUpdateUsuarioConImagen from '@services/Update-Datos-Imagenes-Perfil'; 
 /* Css */
 import '@css/Colores.css'
 import '@css/Perfil_Y_Portada.css';
 import 'react-toastify/dist/ReactToastify.css';
 
 /* Componentes */
import UploadAvatar from '@c/UploadAvatar';
import UploadPortada from '@c/UploadPortada';
import { toast, ToastContainer } from 'react-toastify';
import Posts from '@c/Publicaciones/PublicacionesPerfilUsuario/Todo/PublicacionesListTodo';
import Replies from '@c/Publicaciones/PublicacionesPerfilUsuario/Multimedia/PublicacionesListMultimedia';
import Highlights from '@c/Publicaciones/PublicacionesPerfilUsuario/Posteos/PublicacionesListPosteos';
import useObtenerUsuarioLogeado from "@services/GetUsuarioLogeado";
// Iconos
import { CameraIcon } from 'lucide-react'
// Imágenes
const imgFondoDefault = 'https://wallpaperaccess.com/full/4600330.jpg' // Imagen de fondo predeterminada
const imgPerfilDefault = 'https://static.vecteezy.com/system/resources/previews/022/644/544/non_2x/profile-icon-user-sign-vector.jpg' // Imagen de perfil predeterminada
// Estilos
const styles = {
    containerPerfil: {
      minHeight: '100vh',
      backgroundColor: 'var(--color-fondo)',
      color: 'white',
      marginLeft:'18vw',
      width:'100%',
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
      color: 'var(--color-texto-normal)',
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
      height: '25rem',
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
      borderRadius: '100px',
      fontWeight: 'bold',
      backgroundColor: 'transparent',
      color: 'var(--color-texto-normal)',
      cursor: 'pointer',
    },
    profileName: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      marginTop: '1rem',
      color:'var(--color-texto-normal)',
    },
    profileUsername: {
      color: 'var(--color-texto-secundario)',
    },
    
    followInfo: {
      display: 'flex',
      marginTop: '1rem',
      gap: '1rem',
      color:'var(--color-texto-normal)',
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
      color: 'var(--color-texto-normal)',
      cursor: 'pointer',
    },
    activeTab: {
      borderBottom: '2px solid var(--color-principal)',
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
    inputDisabled: {
      cursor: 'not-allowed',
      opacity: 0.5, // Opacidad para un efecto deshabilitado
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
    buttonDisabled: {
      backgroundColor: '#a5d6a7', // Color cuando está deshabilitado
      color: '#b0bec5', // Color de texto más claro
      cursor: 'not-allowed',
      opacity: 0.7, // Opacidad para un efecto deshabilitado
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
const BandaConfiguracion = () => {
    const { cargando: cargando2, error, CrearBanda, banda } = ServiceBandas();
    const { usuario, cargando, error: errUsuario } = useObtenerUsuarioLogeado();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [previewImage, setPreviewImage] = useState(imgFondoDefault);
    const location = useLocation(); // Mueve esta declaración al inicio
    const navigate = useNavigate();
    
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          setPreviewImage(URL.createObjectURL(file)); // Actualizar la vista previa
        }
      };
    
    const onSubmit = async (data) => {
        const idUsuario = usuario?.id || '6724d794e7a89c7dc3dc9ae1'; // Usa el ID del usuario logeado o un ID fijo
        const { nombre, descripcion } = data;
    
        await CrearBanda({ idUsuario, nombre, descripcion });
      };
  
  const volverPaginaAnterior = () => {
    navigate(-1);
  };


  return (
    <div className="Contenedor-perfil-usuario">
      <div className="izquierda-perfil-usuario">
        {/* Header */}
      <header style={styles.header} >
        
        <button style={styles.backButton} onClick={()=>volverPaginaAnterior()}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          
        </button>
        
        
        
        <p style={styles.profileUsername}>Crear Banda </p>

        
      </header>
        <div className="seccion-1">
        <div style={styles.profileInfo}>
        <img
            src={previewImage}
            alt="Cover"
            style={styles.coverImage}
          />
          
        </div>
        


          <form onSubmit={handleSubmit(onSubmit)}>
          <input
                type="file"
                {...register("portada", { required: true })} // Registrar el input en react-hook-form
                onChange={handleImageChange} // Actualizar la vista previa al seleccionar una imagen
                accept="image/*" // Limitar a archivos de imagen
              />
        <div style={styles.profileContent}>
          <div style={styles.acomodar}>
          <input 
              type="text" 
              placeholder='Nombre'
              style={{padding:'1%', borderRadius:'15px'}}
              {...register("Nombre", { required: "Este campo es obligatorio" })} 
            />
            <div style={styles.followInfo}>
              <span><strong>10K</strong>  Seguidores</span>
              <span><strong>10K</strong>  Seguidos</span>
              <span><strong>10K</strong>  Publicaciones</span>
            </div>
          </div>
          
          <div className="seccion-2">
          <input 
              type="text" 
              placeholder='Descripcion'
              style={{padding:'1%', borderRadius:'15px'}}
              {...register("descripcion", { required: "Este campo es obligatorio" })} 
            />
         
        </div>
       
      
      </div>
      </form>
          
          
        </div>
        <button type='submit' style={{backgroundColor:'green', color:'white', fontWeight:'bold', margin:'1%', padding:'1%', borderRadius:'15px'}}>guardar</button>
      </div>
      <div className="derecha-perfil-usuario">
        <MenuDerecho />
      </div>
      
    </div>
  );
};

export default BandaConfiguracion;
