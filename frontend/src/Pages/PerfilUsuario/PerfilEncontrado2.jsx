
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
import Posts from '@c/Perfil/Publicaciones';
import Replies from '@c/Perfil/Publicaciones';
import Highlights from '@c/Perfil/Publicaciones';

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
const PerfilEncontrado = () => {
  const { alias } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    nombre: '',
    apellido: '',
    alias: '',
    fotoPerfilUrl: '',
    fotoPortadaUrl: '',
    c_seguidores: '',
    c_seguidos: '',
    descripcion: '',
  });
  const [isFollowing, setIsFollowing] = useState(false);
  const [chatVisible, setChatVisible] = useState(false); // Estado para manejar visibilidad del chat
  const { contextTheme } = useThemeContext();
  const [alignment, setAlignment] = useState('web'); // Control del toggle

  useEffect(() => {
    const aliasVisitante = Cookies.get('alias');
    if (alias && aliasVisitante) fetchUserData(alias, aliasVisitante);
    else navigate('/404');
  }, [alias, navigate]);

  const fetchUserData = async (alias, aliasVisitante) => {
    try {
      const response = await fetch(`${BASE_URL}/graphql`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            query {
              buscarPorAlias(alias: "${alias}") {
                nombre
                apellido
                alias
                fotoPerfilUrl
                fotoPortadaUrl
                c_seguidores
                c_seguidos
                descripcion
              }
            }
          `,
        }),
      });
      const result = await response.json();
      if (result.data?.buscarPorAlias) {
        setUserData(result.data.buscarPorAlias);

        // Verificar seguimiento
        const followResponse = await fetch(`${BASE_URL}/graphql`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: `query { verificaSiSigue(aliasVisitante: "${aliasVisitante}", aliasPerfil: "${alias}") }`,
          }),
        });
        const followResult = await followResponse.json();
        setIsFollowing(!!followResult.data?.verificaSiSigue);
      } else navigate('/404');
    } catch (error) {
      console.error('Error al conectar:', error);
      navigate('/404');
    }
  };

  const handleSendFriendRequest = async () => {
    const aliasVisitante = Cookies.get('alias');
    const mutationQuery = isFollowing
      ? `mutation { dejarDeSeguirUsuario(aliasSeguidor: "${aliasVisitante}", aliasSeguido: "${userData.alias}") }`
      : `mutation { seguirUsuario(aliasSeguidor: "${aliasVisitante}", aliasSeguido: "${userData.alias}") }`;

    try {
      await fetch(`${BASE_URL}/graphql`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutationQuery }),
      });
      setUserData((prev) => ({
        ...prev,
        c_seguidores: isFollowing ? prev.c_seguidores - 1 : prev.c_seguidores + 1,
      }));
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error('Error al enviar solicitud:', error);
    }
  };

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) setAlignment(newAlignment);
  };

  const handleChatToggle = () => setChatVisible(!chatVisible); // Alternar visibilidad del chat

    // Esto es para los botones de las publicaciones en el perfil
      // Esto dice cuál está activo en predeterminado
      const [activeTab, setActiveTab] = useState('Todo');
      // Esto dice que se muestra un componente según cuál está activo(ahora muestran el mismo)
  const renderContent = () => {
    switch (activeTab) {
      case 'Todo':
        return <Posts />;
      case 'Publicaciones':
        return <Replies />;
      case 'Posteos':
        return <Highlights />;
      default:
        return null;
    }

    
  };
  

  const handleVolver = () => {
    navigate('/busqueda'); // Especifica la ruta a la que quieres volver
  };

  return (
    <div className="Contenedor-perfil-usuario">
      <div className="izquierda-perfil-usuario">
        {/* Header */}
      <header style={styles.header} >
        
        <button style={styles.backButton} onClick={handleVolver}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          
        </button>
        
        
        
        <p style={styles.profileUsername}>@{userData.alias} </p>
        
      </header>
        <div className="seccion-1">
        <div style={styles.profileInfo}>
        <img
            src={userData.fotoPortadaUrl || imgFondoDefault}
            alt="Cover"
            style={styles.coverImage}
          />
          <img
            src={userData.fotoPerfilUrl || imgPerfilDefault}
            alt="Profile"
            style={styles.profileImage}
          />
        </div>
        <div style={styles.profileContent}>
          <div style={styles.acomodar}>
            <h2 style={styles.profileName}>{userData.nombre} {userData.apellido}</h2>
            <div style={styles.followInfo}>
              <span><strong>{userData.c_seguidores}</strong>  Seguidores</span>
              <span><strong>{userData.c_seguidos}</strong>  Seguidos</span>
            </div>
          </div>
          
          <div className="seccion-2">
          <p>{userData.descripcion}</p> 
          <div style={styles.acomodar}>
                    <IniciarChatButton 
                            aliasOtroUsuario={userData.alias} 
                            onChatIniciado={handleChatToggle} 
                    />
                    <button onClick={handleSendFriendRequest} style={styles.editButton}>
                    {isFollowing ? 'Siguiendo' : 'Seguir'}
                    </button>
                </div>
        </div>
        <nav style={styles.tabs}>
        {['Todo','Publicaciones','Posteos'].map((tab) => (
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
      </div>
          
          
        </div>
      </div>
      <div className="derecha-perfil-usuario">
        <MenuDerecho />
      </div>
      {chatVisible && (
        <ChatComponent chat={{ id: userData.alias, idUsuario1: Cookies.get('alias'), idUsuario2: userData.alias }} />
      )}
    </div>
  );
};

export default PerfilEncontrado;
