import React, { useState, useEffect } from 'react';  // Asegúrate de importar useEffect
import { useThemeContext } from '../../context/ThemeContext';
import imgFondo from '../../img/react.jpg';
import imgPerfil from '../../img/perfil_imagen.png';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import MenuListComposition from '../../components/mini-menu/minMenu';
import CrearPublicacion from '../../components/Crear-Publicacion/CrearPublicacion';
import SeguirDores from './components/seguir_dores';
import './CssPefilUsuario.css';
import MenuDerecho from '@c/Menu/Menu';
import { FcAudioFile, FcCamera, FcAlphabeticalSortingAz, FcFilmReel, FcGallery, FcMusic, FcPlus } from "react-icons/fc";
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

const PerfilUsuario = () => {
  const [userData, setUserData] = useState({
    nombre: '',
    apellido: '',
    c_seguidores: '',
    c_seguidos: '',
    descripcion: ''
  });  // Mueve el estado aquí, dentro del componente

  useEffect(() => {
    const alias = Cookies.get('alias');  // Obtener el alias de la cookie

    if (alias) {
      // Realizamos la consulta a la API de GraphQL para obtener los datos del usuario
      const fetchUserData = async () => {
        try {
          const response = await fetch("http://localhost:8080/graphql", {
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
          } else {
            console.error("Error al obtener datos del usuario");
          }
        } catch (error) {
          console.error("Error al conectar con el servidor", error);
        }
      };

      fetchUserData();
    } else {
      console.log("Alias no encontrado en las cookies.");
    }
  }, []);  // useEffect se ejecuta al montar el componente

  const { id } = useParams();  // Extrae el parámetro "id" de la URL
  const Usuarios = {
    1: {
      Nombre: userData.nombre + " " + userData.apellido,
      Descripcion: userData.descripcion,
      ImgFondo: imgFondo,
      ImgPerfil: imgPerfil,
      Seguidores: userData.c_seguidores,
      Seguidos: userData.c_seguidos,
      Amigo: true
    }
  };

  const { contextTheme } = useThemeContext();  // Usar el contexto de tema
  const [alignment, setAlignment] = useState('web');  // Estado para el ToggleButtonGroup
  const [isDivVisible, setIsDivVisible] = useState(false);  // Estado para la visibilidad del primer div
  const [isDivVisible2, setIsDivVisible2] = useState(false);  // Estado para la visibilidad del segundo div
  const [isDivVisible3, setIsDivVisible3] = useState(false);  // Estado para la visibilidad del segundo div

  // Maneja el cambio en el ToggleButtonGroup
  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  // Renderiza el componente basado en el valor seleccionado
  const renderComponent = () => {
    switch (alignment) {
      case 'web': return <h1>1</h1>;
      case 'android': return <h1>2</h1>;
      case 'ios': return <h1>3</h1>;
      default: return <h1>1.2</h1>;
    }
  };

  // Alterna la visibilidad del div
  const handleImageClick = () => setIsDivVisible(!isDivVisible);
  const handleImageClick2 = () => setIsDivVisible2(!isDivVisible2);
  const handleImageClick3 = () => setIsDivVisible3(!isDivVisible3);

  return (
    <div className="Contenedor-perfil-usuario">
      <div className="izquierda-perfil-usuario">
        {/* Componentes de fondo y perfil */}
        <CrearPublicacion condicion={isDivVisible3} funcion={handleImageClick3} />
        <div className='seccion-1'>
          <img
            id="img-fondo"
            onClick={handleImageClick}
            src={Usuarios[id].ImgFondo}
            alt="Imagen de fondo"
          />
          <img
            id="img-perfil"
            onClick={handleImageClick2}
            src={Usuarios[id].ImgPerfil}
            alt="Imagen de perfil"
          />
          <MenuListComposition />
          <p id="nombre">{Usuarios[id].Nombre}</p>
          <SeguirDores
            seguidores={Usuarios[id].Seguidores}
            seguidos={Usuarios[id].Seguidos}
            amigo={Usuarios[id].Amigo}
            condicion={false}
          />
        </div>
        <div className="seccion-2">
          <p>{Usuarios[id].Descripcion}</p>
        </div>
        <div className="seccion-3">
          <div className='btn-nueva-publicacion'>
            <FcAudioFile id='icon-i'></FcAudioFile>
            <FcFilmReel id='icon-i'></FcFilmReel>
            <FcCamera id='icon-i'></FcCamera>
            <button onClick={handleImageClick3} id="btn-crear">Nueva publicacion <FcPlus id="icon-x" /></button>
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
        {/* Aquí puedes poner contenido para la parte izquierda */}
        <MenuDerecho></MenuDerecho>
      </div>
    </div>
  );
};

export default PerfilUsuario;
