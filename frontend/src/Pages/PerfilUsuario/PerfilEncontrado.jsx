import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../config';
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

  const renderComponent = () => {
    switch (alignment) {
      case 'web': return <h1>Publicaciones</h1>;
      case 'android': return <h1>Multimedia</h1>;
      case 'ios': return <h1>Información</h1>;
      default: return <h1>Publicaciones</h1>;
    }
  };

  return (
    <div className="Contenedor-perfil-usuario">
      <div className="izquierda-perfil-usuario">
        <div className="seccion-1">
          <img id="img-fondo" src={userData.fotoPortadaUrl || imgFondo} alt="Portada" />
          <img id="img-perfil" src={userData.fotoPerfilUrl || imgPerfil} alt="Perfil" />
          <MenuListComposition />
          <p id="nombre">{userData.nombre} {userData.apellido}</p>
          <SeguirDores
            seguidores={userData.c_seguidores}
            seguidos={userData.c_seguidos}
            amigo={true}
            condicion={false}
          />
          <IniciarChatButton 
            aliasOtroUsuario={userData.alias} 
            onChatIniciado={handleChatToggle} 
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
            fullWidth
          >
            <ToggleButton value="web">Publicaciones</ToggleButton>
            <ToggleButton value="android">Multimedia</ToggleButton>
            <ToggleButton value="ios">Información</ToggleButton>
          </ToggleButtonGroup>
          <div id="componentes">
            {renderComponent()}
          </div>
        </div>
        <button onClick={handleSendFriendRequest}>
          {isFollowing ? 'Siguiendo' : 'Seguir'}
        </button>
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
