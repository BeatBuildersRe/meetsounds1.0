import React, { useState, useEffect } from 'react';
import { useThemeContext } from '../../context/ThemeContext';
import imgFondoDefault from '../../img/react.jpg'; // Imagen de fondo predeterminada
import imgPerfilDefault from '../../img/perfil_imagen.png'; // Imagen de perfil predeterminada
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import MenuListComposition from '../../components/mini-menu/minMenu';
import CrearPublicacion from '../../components/Crear-Publicacion/CrearPublicacion';
import SeguirDores from '@c/seguir_dores';
import '@css/CssPefilUsuario.css';
import MenuDerecho from '@c/Menu/Menu';
import { FcAudioFile, FcCamera, FcAlphabeticalSortingAz, FcFilmReel, FcGallery, FcMusic, FcPlus } from "react-icons/fc";
import { useParams, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../config'

const PerfilUsuario = () => {
  const { alias } = useParams();  // Extrae el alias de la URL
  const navigate = useNavigate();  // Para redirigir
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
          });

          const result = await response.json();

          // Verificamos si el usuario existe
          if (result.data && result.data.buscarPorAlias) {
            setUserData(result.data.buscarPorAlias);
          } else {
            // Si el usuario no existe, redirigir a la página 404
            navigate('/404');
          }
        } catch (error) {
          console.error("Error al conectar con el servidor", error);
          navigate('/404'); // Redirigir también en caso de error en la conexión
        }
      };

      fetchUserData();
    } else {
      console.log("Alias no encontrado en la URL.");
      navigate('/404'); // Redirigir si no hay alias
    }
  }, [alias, navigate]);

  const { contextTheme } = useThemeContext();  
  const [alignment, setAlignment] = useState('web');  
  const [isDivVisible, setIsDivVisible] = useState(false);  
  const [isDivVisible2, setIsDivVisible2] = useState(false);  
  const [isDivVisible3, setIsDivVisible3] = useState(false);  

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  const renderComponent = () => {
    switch (alignment) {
      case 'web': return <h1>1</h1>;
      case 'android': return <h1>2</h1>;
      case 'ios': return <h1>3</h1>;
      default: return <h1>1.2</h1>;
    }
  };

  const handleImageClick = () => setIsDivVisible(!isDivVisible);
  const handleImageClick2 = () => setIsDivVisible2(!isDivVisible2);
  const handleImageClick3 = () => setIsDivVisible3(!isDivVisible3);

  return (
    <div className="Contenedor-perfil-usuario">
      <div className="izquierda-perfil-usuario">
        <CrearPublicacion condicion={isDivVisible3} funcion={handleImageClick3} />
        <div className='seccion-1'>
          <img
            id="img-fondo"
            onClick={handleImageClick}
            src={userData.fotoPortadaUrl || imgFondoDefault}  // Usa la imagen de portada o la predeterminada
            alt="Imagen de fondo"
          />
          <img
            id="img-perfil"
            onClick={handleImageClick2}
            src={userData.fotoPerfilUrl || imgPerfilDefault}  // Usa la imagen de perfil o la predeterminada
            alt="Imagen de perfil"
          />
          <MenuListComposition />
          <p id="nombre">{userData.nombre} {userData.apellido}</p> 
          <SeguirDores
            seguidores={userData.c_seguidores}
            seguidos={userData.c_seguidos}
            amigo={true}  
            condicion={false}
          />
        </div>
        <div className="seccion-2">
          <p>{userData.descripcion}</p> 
        </div>
        <div className="seccion-3">
          <div className='btn-nueva-publicacion'>
            <FcAudioFile id='icon-i'></FcAudioFile>
            <FcFilmReel id='icon-i'></FcFilmReel>
            <FcCamera id='icon-i'></FcCamera>
            <button onClick={handleImageClick3} id="btn-crear">Nueva publicacion<FcPlus id="icon-x" /></button>
            <FcGallery id='icon-i'></FcGallery>
            <FcMusic id='icon-i'></FcMusic>
            <FcAlphabeticalSortingAz></FcAlphabeticalSortingAz>
          </div>
        </div>
        <div className="seccion-4">
          <ToggleButtonGroup
            color="success"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Plataforma"
            fullWidth
          >
            <ToggleButton id="btn-ui" value="web">Publicaciones</ToggleButton>
            <ToggleButton id="btn-ui" value="android">Multimedia</ToggleButton>
            <ToggleButton id="btn-ui" value="ios">Información</ToggleButton>
          </ToggleButtonGroup>
          <div id="componentes">
            {renderComponent()}
          </div>
        </div>
      </div>
      <div className="derecha-perfil-usuario">
        <MenuDerecho />
      </div>
    </div>
  );
};

export default PerfilUsuario;
