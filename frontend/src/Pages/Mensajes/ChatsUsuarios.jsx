import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import { BASE_URL } from '../../config';

const ChatsUsuario = () => {
  const [chats, setChats] = useState([]);
  const [usuarioLocalId, setUsuarioLocalId] = useState(null);
  const [usuarioDetalles, setUsuarioDetalles] = useState({}); // Cambiado a un objeto para almacenar nombre, apellido y foto
  const navigate = useNavigate(); // Inicializar useNavigate

  useEffect(() => {
    const aliasLocal = getCookie("alias");
    if (aliasLocal) {
      buscarUsuarioPorAlias(aliasLocal);
    }
  }, []);

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  const buscarUsuarioPorAlias = async (alias) => {
    try {
      const response = await fetch(`${BASE_URL}/graphql`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `query { buscarPorAlias(alias: "${alias}") { id } }`,
        }),
      });
      const data = await response.json();
      const usuario = data.data.buscarPorAlias;
      if (usuario) {
        setUsuarioLocalId(usuario.id);
        fetchChats(usuario.id);
      }
    } catch (error) {
      console.error('Error al buscar usuario:', error);
    }
  };

  const fetchChats = async (idUsuario) => {
    try {
      const response = await fetch(`${BASE_URL}/traerTodosLosChatsxIdUsuario?idUsuario=${idUsuario}`);
      const chatsData = await response.json();
      
      // Ordenar los chats por la fecha del mensaje más reciente dentro de cada lista de mensajes
      const chatsOrdenados = chatsData.sort((a, b) => {
        const fechaUltimoMensajeA = a.mensajes.length > 0 ? new Date(Math.max(...a.mensajes.map(m => new Date(m.fechaEnvio)))) : 0;
        const fechaUltimoMensajeB = b.mensajes.length > 0 ? new Date(Math.max(...b.mensajes.map(m => new Date(m.fechaEnvio)))) : 0;
        return fechaUltimoMensajeB - fechaUltimoMensajeA; // Ordenar de más reciente a más antiguo
      });

      setChats(chatsOrdenados);
      await fetchDetallesUsuarios(chatsOrdenados);
    } catch (error) {
      console.error('Error al obtener chats:', error);
    }
  };

  const fetchDetallesUsuarios = async (chatsData) => {
    const ids = [...new Set(chatsData.flatMap(chat => [chat.idUsuario1, chat.idUsuario2]))];
    
    const detallesPromises = ids.map(id => 
      fetch(`${BASE_URL}/graphql`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `query { buscarUsuarioPorId(id: "${id}") { nombre, apellido, fotoPerfilUrl } }`,
        }),
      }).then(response => response.json())
    );

    const detallesResultados = await Promise.all(detallesPromises);
    
    const detalles = {};
    detallesResultados.forEach((resultado, index) => {
      const id = ids[index];
      if (resultado.data.buscarUsuarioPorId) {
        detalles[id] = resultado.data.buscarUsuarioPorId;
      }
    });

    setUsuarioDetalles(detalles);
  };

  const determinarUsuarioConElQueHabla = (chat) => {
    if (chat.idUsuario1 === usuarioLocalId) {
      return usuarioDetalles[chat.idUsuario2]; // Detalles del otro usuario
    } else {
      return usuarioDetalles[chat.idUsuario1]; // Detalles del otro usuario
    }
  };

  const abrirChat = (chatId) => {
    navigate(`/chat/${chatId}`); // Navegar a la página del chat
  };

  return (
    <div>
      <h1>Chats</h1>
      <ul>
        {chats.map(chat => {
          // Verifica si el chat tiene mensajes
          if (chat.mensajes.length === 0) {
            return null; // Si no tiene mensajes, no lo muestra
          }

          const usuarioConElQueHabla = determinarUsuarioConElQueHabla(chat);
          return (
            <li key={chat.id} onClick={() => abrirChat(chat.id)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              {usuarioConElQueHabla && (
                <>
                  {usuarioConElQueHabla.fotoPerfilUrl && (
                    <img 
                      src={usuarioConElQueHabla.fotoPerfilUrl} 
                      alt={`${usuarioConElQueHabla.nombre} ${usuarioConElQueHabla.apellido}`} 
                      style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }} 
                    />
                  )}
                  <span>{`${usuarioConElQueHabla.nombre} ${usuarioConElQueHabla.apellido}`}</span>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ChatsUsuario;
