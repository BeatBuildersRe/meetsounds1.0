// Import
/* React */
import React, { useState, useEffect } from 'react'

import { useForm } from 'react-hook-form';
import { Dialog } from '@headlessui/react'
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
    borderBottom: '10px solid var(--color-principal)',
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
// Funciones
export default function ProfilePage() {
  const [contadorPubliaciones, setContadorPublicaciones] = useState(null);
  const { alias } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState({
      nombre: '',
      apellido: '',
      alias: '',
      fotoPerfilUrl: '',
      fotoPortadaUrl: '',
      c_seguidores: '',
      c_seguidos: '',
      descripcion: ''
  });
  
  const toggleEdicion = (tipo) => {
    setEstadoEdicion((prev) => ({ ...prev, [tipo]: !prev[tipo] }));
  };

  const contarPublicaciones = async (idAlias) => {
    try {
      const response = await fetch(`http://localhost:8080/contarPublicacionesUsuario?idAlias=${idAlias}`);
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
      const count = await response.json();
      setContadorPublicaciones(count);
    } catch (error) {
      console.error('Error al contar publicaciones:', error);
    }
  };

  const guardarImagenTemp = (tipo, imagen) => {
    setTempImages((prev) => ({
        ...prev,
        [tipo]: imagen // Actualiza la imagen correspondiente
    }));
    setIsChanged(true); // Marca que ha habido un cambio
};
  const [alignment, setAlignment] = useState('web');
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
  const { actualizarUsuarioConImagen, cargando: actualizando, error: errorActualizando } = useUpdateUsuarioConImagen(); // Usa el nuevo hook

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
  const calcularEdad = (fechaNacimiento) => {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mesDiff = hoy.getMonth() - nacimiento.getMonth();

    // Ajusta la edad si el cumpleaños aún no ha ocurrido este año
    if (mesDiff < 0 || (mesDiff === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    }

    return edad;
};
  useEffect(() => {
      if (alias) {
          fetchUserData();
          contarPublicaciones(alias);
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

        setValue("Nombre", usuario.nombre || '');
        setValue("Apellido", usuario.apellido || '');
        setValue("Descripcion", usuario.descripcion || '');
        const edadCalculada = calcularEdad(usuario.fechaNacimiento);
        setValue("Edad", edadCalculada || '');
        setValue("Fecha", usuario.fechaNacimiento || '');
        setValue("Genero", usuario.genero || '');
    }
}, [usuario, cargando, setValue]);

  const onSubmit = async (data) => {
    try {
        // Asegúrate de que las imágenes sean válidas
        const imagenPerfil = tempImages.perfil || '';
        const imagenPortada = tempImages.portada || '';

        // Llama al método que actualiza el usuario y sube las imágenes
        await actualizarUsuarioConImagen({
            alias: user,
            nombre: data.Nombre,
            apellido: data.Apellido,
            imagenPerfil, // Envío de la imagen de perfil
            imagenPortada // Envío de la imagen de portada
        });

        toast.success("Los cambios se guardaron correctamente", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
        });

        // Update userData state
        setUserData(prevData => ({
            ...prevData,
            nombre: data.Nombre,
            apellido: data.Apellido,
            fotoPerfilUrl: imagenPerfil || imagenes.perfil,
            fotoPortadaUrl: imagenPortada || imagenes.portada
        }));

        // Cerrar el modal y resetear imágenes
        setTimeout(() => {
            setIsModalOpen(false);
            setTempImages({ perfil: '', portada: '' });
        }, 2000);
        await fetchUserData(); // Asegúrate de que esta función esté disponible aquí
    } catch (error) {
        console.error("Error al actualizar el usuario", error);
        toast.error("Error al guardar los cambios");
    }
};


  

  const [isChanged, setIsChanged] = useState(false);
  const handleInputChange = (event) => {
    setValue(event.target.name, event.target.value); // Actualiza el valor en el formulario
    setIsChanged(true); // Marca que ha habido un cambio
};

  // Esto es para los botones de las publicaciones en el perfil
      // Esto dice cuál está activo en predeterminado
  const [activeTab, setActiveTab] = useState('Todo');
      // Esto dice que se muestra un componente según cuál está activo(ahora muestran el mismo)
  const renderContent = () => {
    switch (activeTab) {
      case 'Todo':
        return <Posts />;
      case 'Multimedia':
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
// Estructura
  return (
    <div style={styles.containerPerfil}>
      {/* Header */}
      <header style={styles.header} >
        
        <button style={styles.backButton} onClick={handleVolver}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          
        </button>
        
        
        
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
          
          
          <div style={styles.acomodar}>
            <h2 style={styles.profileName}>{userData.nombre} {userData.apellido}</h2>
            <div style={styles.followInfo}>
              <span><strong>{userData.c_seguidores}</strong>  Seguidores</span>
              <span><strong>{userData.c_seguidos}</strong>  Seguidos</span>
              <span><strong>{contadorPubliaciones}</strong>  Publicaciones</span>
            </div>
          </div>
          <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <button onClick={() => setIsModalOpen(true)} style={styles.editButton}>
              Editar Perfil
            </button>
          </div>
          
          <div className="seccion-2">
          <p>{userData.descripcion}</p> 
        </div>

         
          

          
          <nav style={styles.tabs}>
        {['Todo','Multimedia','Posteos'].map((tab) => (
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
            backgroundImage: `url(${tempImages.portada || imagenes.portada || imgFondoDefault})`,
          }}
        >
          {!estadoEdicion.portada && (
            <label htmlFor="cover-upload" style={{...styles.cameraIcon, ...styles.coverCameraIcon}} onClick={() => toggleEdicion('portada')}>
              <CameraIcon color="white" size={24} />
            </label>
          )}

          <div style={styles.profileImageContainer}>
            <img 
              src={tempImages.perfil || imagenes.perfil  || imgPerfilDefault} 
              alt="Profile" 
              style={styles.profileImageEdit} 
            />
            {!estadoEdicion.perfil && (
              <label htmlFor="profile-upload" style={{...styles.cameraIcon, ...styles.profileCameraIcon}} onClick={() => toggleEdicion('perfil')}>
                <CameraIcon color="white" size={24} />
              </label>
            )}
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

        <div style={styles.acomodar}>
          <div style={styles.formGroup}>
            <label htmlFor="name" style={styles.label}>Nombre</label>
            <input 
              {...register("Nombre", { required: true })} 
              placeholder="Nombre" 
              style={styles.input} 
              onChange={handleInputChange}
            />
            {errors.Nombre && <span>El nombre es obligatorio</span>}
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="surname" style={styles.label}>Apellido</label>
            <input 
              {...register("Apellido", { required: true })} 
              placeholder="Apellido" 
              style={styles.input}
              onChange={handleInputChange} 
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
              style={{...styles.input, ...styles.inputDisabled}}
              disabled
            />
          </div>
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="description" style={styles.label}>Descripción</label>
          <textarea 
            id="description" 
            name="description" 
            rows="4" 
            {...register("Descripcion")} 
            style={styles.input} 
            placeholder="Introduce aquí tu descripción..."
            onChange={handleInputChange}
          />
        </div>

        <div style={styles.acomodar}>
        <div style={styles.formGroup}>
            <label htmlFor="birthdate" style={styles.label}>Fecha de Nacimiento</label>
            <input 
              type="date" 
              {...register("Fecha", { required: true })}
              style={styles.input}
              onChange={handleInputChange}
            />
            {errors.Fecha && <span>La fecha de nacimiento es obligatoria</span>}
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="edad" style={styles.label}>Edad</label>
            <input 
              type="number"
              {...register("Edad", { required: true, maxLength: 2 })}
              placeholder="Edad"
              style={{...styles.input, ...styles.inputDisabled}}
              disabled
            />
            {errors.Edad && <span>La edad es obligatoria y debe tener un máximo de 2 dígitos</span>}
          </div>

          
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="gender" style={styles.label}>Género</label>
          <select id="gender" {...register("Genero")} style={styles.input}>
            <option value="">Seleccione...</option>
            <option value="Hombre">Hombre</option>
            <option value="Mujer">Mujer</option>
            <option value="Otro">Otro</option>
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
            Cancelar
          </button>
          <button type="submit" style={isChanged ? {...styles.button, ...styles.saveButton}: {...styles.button, ...styles.buttonDisabled}}  disabled={!isChanged}// Deshabilita el botón si no ha habido cambios
          >
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