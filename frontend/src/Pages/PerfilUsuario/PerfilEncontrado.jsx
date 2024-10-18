import React, { useState, useEffect } from 'react';
import { useThemeContext } from '../../context/ThemeContext';
import imgFondo from '../../img/react.jpg';  // Imagen de fondo predeterminada
import imgPerfil from '../../img/perfil_imagen.png';  // Imagen de perfil predeterminada
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import MenuListComposition from '../../components/mini-menu/minMenu';
import SeguirDores from './components/seguir_dores';
import './CssPefilUsuario.css';
import MenuDerecho from '@c/Menu/Menu';
import { useParams, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../config'

const PerfilEncontrado = () => {
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

  const handleSendFriendRequest = () => {
    // Lógica para enviar solicitud de amistad
    console.log("Solicitud de amistad enviada");
  };

  return (
    <div className="Contenedor-perfil-usuario">
      <div className="izquierda-perfil-usuario">
        <div className='seccion-1'>
          <img
            id="img-fondo"
            src={userData.fotoPortadaUrl || imgFondo}  // Usa la imagen de portada o la predeterminada
            alt="Imagen de fondo"
          />
          <img
            id="img-perfil"
            src={userData.fotoPerfilUrl || imgPerfil}  // Usa la imagen de perfil o la predeterminada
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
        <button onClick={handleSendFriendRequest}>Enviar solicitud de amistad</button>
      </div>
      <div className="derecha-perfil-usuario">
        <MenuDerecho />
      </div>
    </div>
  );
};

export default PerfilEncontrado;
