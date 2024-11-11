import { useLocation } from "react-router-dom";
import ServiceBandas from "../../services/ServiceBandas";
import "@css/CssPefilUsuario.css";
import MenuDerecho from "@c/Menu/Menu";
import '@css/CrearBanda.css';
import '@css/Colores.css';
import 'react-toastify/dist/ReactToastify.css';
import plus from '@public/plus2.svg';
import AgregarMiembros from "./AgregarMiembros";
import perfil from '@public/perfil_imagen.png'
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
/* Services */
/* Componentes */
import useObtenerUsuarioLogeado from "@services/GetUsuarioLogeado";
// Iconos
// Imágenes
const imgFondoDefault = "https://wallpaperaccess.com/full/4600330.jpg"; // Imagen de fondo predeterminada
// Estilos
const styles = {
  containerPerfil: {
    minHeight: "100vh",
    backgroundColor: "var(--color-fondo)",
    color: "white",
    marginLeft: "18vw",
    width: "100%",
  },
  header: {
    padding: "1rem",
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid #2d3748",
  },
  backButton: {
    marginRight: "1rem",
    background: "none",
    border: "none",
    color: "var(--color-texto-normal)",
    cursor: "pointer",
  },
  headerTitle: {
    fontSize: "1.25rem",
    fontWeight: "bold",
  },
  profileInfo: {
    position: "relative",
  },
  coverImage: {
    width: "100%",
    height: "25rem",
    objectFit: "cover",
    imageRendering: "auto" /* Otras opciones: 'crisp-edges', 'pixelated' */,
  },
  profileImage: {
    position: "absolute",
    left: "3rem",
    bottom: "-4rem",
    width: "12rem",
    height: "12rem",
    borderRadius: "50%",
    border: "4px solid #1a202c",
  },
  profileContent: {
    marginTop: "5rem",
    padding: "0 1rem",
  },
  editButton: {
    padding: "0.5rem 1rem",
    border: "1px solid #4a5568",
    borderRadius: "100px",
    fontWeight: "bold",
    backgroundColor: "transparent",
    color: "var(--color-texto-normal)",
    cursor: "pointer",
  },
  profileName: {
    fontSize: "1.25rem",
    fontWeight: "bold",
    marginTop: "1rem",
    color: "var(--color-texto-normal)",
  },
  profileUsername: {
    color: "var(--color-texto-secundario)",
  },

  followInfo: {
    display: "flex",
    marginTop: "1rem",
    gap: "1rem",
    color: "var(--color-texto-normal)",
  },
  tabs: {
    display: "flex",
    borderBottom: "1px solid #2d3748",
    marginTop: "1rem",
  },
  tab: {
    flex: 1,
    textAlign: "center",
    padding: "1rem 0",
    background: "none",
    border: "none",
    color: "var(--color-texto-normal)",
    cursor: "pointer",
  },
  activeTab: {
    borderBottom: "2px solid var(--color-principal)",
  },
  modal: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 50,
  },
  modalContent: {
    backgroundColor: "#2d3748",
    padding: "1.5rem",
    borderRadius: "0.5rem",
    width: "100%",
    maxWidth: "28rem",
    maxHeight: "80vh", // Establece una altura máxima
  },
  modalTitle: {
    fontSize: "1.25rem",
    fontWeight: "medium",
    marginBottom: "1rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  label: {
    fontSize: "0.875rem",
    color: "#a0aec0",
  },
  input: {
    padding: "0.5rem",
    backgroundColor: "#4a5568",
    border: "1px solid #2d3748",
    borderRadius: "0.25rem",
    color: "white",
  },
  inputDisabled: {
    cursor: "not-allowed",
    opacity: 0.5, // Opacidad para un efecto deshabilitado
  },
  fileUpload: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "1rem",
    border: "2px dashed #4a5568",
    borderRadius: "0.25rem",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "0.5rem",
    marginTop: "1rem",
  },
  button: {
    padding: "0.5rem 1rem",
    borderRadius: "0.25rem",
    fontWeight: "medium",
    cursor: "pointer",
  },
  cancelButton: {
    backgroundColor: "#4a5568",
    color: "white",
    border: "none",
  },
  saveButton: {
    backgroundColor: "#4299e1",
    color: "white",
    border: "none",
  },
  buttonDisabled: {
    backgroundColor: "#a5d6a7", // Color cuando está deshabilitado
    color: "#b0bec5", // Color de texto más claro
    cursor: "not-allowed",
    opacity: 0.7, // Opacidad para un efecto deshabilitado
  },
  newPostButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.5rem 1rem",
    backgroundColor: "#4299e1",
    color: "white",
    border: "none",
    borderRadius: "0.25rem",
    cursor: "pointer",
  },
  icon: {
    marginRight: "0.5rem",
  },

  acomodar: {
    display: "flex",
    justifyContent: "space-Between",
    gap: "1%",
    marginLeft: "1%",
  },
  coverImageContainer: {
    position: "relative",
    height: "200px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "10px",
    marginBottom: "15%",
  },
  profileImageContainer: {
    position: "absolute",
    bottom: "-50px",
    left: "20px",
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    border: "4px solid #1a1a1a",
    overflow: "hidden",
  },
  profileImageEdit: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  cameraIcon: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: "50%",
    padding: "0.5rem",
    cursor: "pointer",
  },
  coverCameraIcon: {
    top: "10px",
    right: "10px",
  },
  profileCameraIcon: {
    bottom: "10px",
    right: "10px",
  },
};
const CrearBanda = () => {
  const { cargando: cargando2, error, CrearBanda, banda } = ServiceBandas();
  const { usuario, cargando, error: errUsuario } = useObtenerUsuarioLogeado();
  const {register,handleSubmit,formState: { errors }, } = useForm();
  const [previewImage, setPreviewImage] = useState(imgFondoDefault);
  const location = useLocation(); // Mueve esta declaración al inicio
  const [mostrarAgregarMiembros, setAgregarMiembros] = useState(false);
  const [miembrosSeleccionados, setMiembrosSeleccionados] = useState([]);

  const handleMostrarComponente = () => {
    setAgregarMiembros(!mostrarAgregarMiembros); // Cambia el estado al hacer clic
  };
  const handleMiembrosSeleccionados = (miembros) => {
    setMiembrosSeleccionados(miembros);
  };
  useEffect(() => {
    console.log("seleccionados")
    console.log(miembrosSeleccionados)
}, [miembrosSeleccionados]);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      console.log("Formulario enviado con datos:", data);
      const idUsuario = usuario?.id ;
      const { nombre, descripcion } = data;
      const miembrosArray = [
        `"${idUsuario}"`,  // Primero el idUsuario
        ...miembrosSeleccionados.map(miembro => `"${miembro.id}"`)  // Luego los IDs de los miembros seleccionados
      ];
      await CrearBanda({ idUsuario, nombre, descripcion, miembrosArray});
      console.log("Banda creada con éxito");
    } catch (err) {
      console.error("Error al crear la banda:", err);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file)); // Actualizar la vista previa
    }
  };



  const volverPaginaAnterior = () => {
    navigate(-1);
  };

  return (
    <div className="Contenedor-perfil-usuario">
      <div className="izquierda-perfil-usuario">
        {/* Header */}
        <header style={styles.header}>
          <button
            style={styles.backButton}
            onClick={() => volverPaginaAnterior()}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>

          <p style={styles.profileUsername}>Crear Banda </p>
        </header>
        <div className="seccion-1">
          <div style={styles.profileInfo}>
            <img src={previewImage} alt="Cover" style={styles.coverImage} />
          </div>
          {/* <input
              type="file"
              {...register("portada")} // Registrar el input en react-hook-form
              onChange={handleImageChange} // Actualizar la vista previa al seleccionar una imagen
              accept="image/*" // Limitar a archivos de imagen
            /> */}
          <form onSubmit={handleSubmit(onSubmit)}>  
            <div className="formularioCrearBanda"> 
              <div className="izquierdo">
              <div className="inputLabels">
                <label style={{display:'none'}} >nombre</label>
              
                <label style={{display:'none'}}>descripcion</label>
                  <input
                    type="text"
                    className="inputZ"
                    placeholder="Nombre"
                   
                    {...register("nombre", {
                      required: "Este campo es obligatorio",
                    })}
                  />
              </div>
        
                <textarea
                  type="text"
                  className="inputZZ"
                  placeholder="descripcion"
                 
                  {...register("descripcion", {
                    required: "Este campo es obligatorio",
                  })}
                />
                <button className="Agregar_miembros" onClick={()=>handleMostrarComponente()}>  
                    Agregar Miembros
                      <img src={plus} alt="" />
                  </button>
              </div>
              <div className="derecho">
                <h4>Miembros</h4>
                <br />
                {miembrosSeleccionados?.map((miembros, index) =>(
                  <div key={index} className="card_user">
                  <img src={miembros.fotoPerfilUrl} alt="" />
                  <p>{miembros.nombre} {miembros.apellido}</p>
                </div>
                
                ))}
                
              </div>
            </div>
            <button
              type="submit"
              className="guardarBanda"
            >
              guardar
            </button>
          </form>
        </div>
        {mostrarAgregarMiembros && <AgregarMiembros cerrar={handleMostrarComponente} onMiembrosSeleccionados={handleMiembrosSeleccionados} />}
      </div>
      <div className="derecha-perfil-usuario">
        <MenuDerecho />
      </div>
    </div>
  );
};

export default CrearBanda;
