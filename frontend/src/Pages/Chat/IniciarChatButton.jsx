import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../config';

const styles = {
  editButton: {
    padding: '0.5rem 1rem',
    border: '1px solid #4a5568',
    borderRadius: '100px',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    color: 'var(--color-texto-normal)',
    cursor: 'pointer',
  },
};

const IniciarChatButton = ({ aliasOtroUsuario }) => {
  const [idUsuarioLocal, setIdUsuarioLocal] = useState(null);
  const [idOtroUsuario, setIdOtroUsuario] = useState(null);
  const [chatId, setChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chatAbierto, setChatAbierto] = useState(false);

  // Al cargar el componente, busca el alias del usuario local en las cookies y obtiene su ID
  useEffect(() => {
    const aliasLocal = getCookie('alias');
    if (aliasLocal) buscarUsuarioPorAlias(aliasLocal, setIdUsuarioLocal);
    if (aliasOtroUsuario) buscarUsuarioPorAlias(aliasOtroUsuario, setIdOtroUsuario);
  }, [aliasOtroUsuario]);

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  const buscarUsuarioPorAlias = async (alias, setIdUsuario) => {
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
      if (usuario) setIdUsuario(usuario.id);
    } catch (error) {
      console.error('Error al buscar usuario:', error);
    }
  };

  const iniciarChat = async () => {
    if (!idUsuarioLocal || !idOtroUsuario) {
      return console.error('No se encontraron los usuarios');
    }

    try {
      const response = await fetch(
        `${BASE_URL}/iniciarChat?usuario1=${idUsuarioLocal}&usuario2=${idOtroUsuario}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (!response.ok) throw new Error('Error al iniciar el chat');

      const chat = await response.json();
      setChatId(chat.id);
      setChatAbierto(true);

      // Envía el mensaje de bienvenida
      enviarMensajeBienvenida(chat.id);
    } catch (error) {
      console.error('Error al iniciar el chat:', error);
    }
  };

  const enviarMensajeBienvenida = async (chatId) => {
    const mensajeBienvenida = {
      contenido: `Bienvenidos al chat entre ${idUsuarioLocal} y ${idOtroUsuario}`,
      idChat: chatId,
      idEmisor: idUsuarioLocal,
      fechaEnvio: new Date().toISOString().slice(0, -1),
    };

    try {
      const response = await fetch(`${BASE_URL}/enviarMensaje`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mensajeBienvenida),
      });

      if (!response.ok) throw new Error('Error al enviar el mensaje de bienvenida');

      setMessages([mensajeBienvenida]);  // Solo establece el mensaje de bienvenida en la lista de mensajes
    } catch (error) {
      console.error('Error al enviar mensaje de bienvenida:', error);
    }
  };

  return (
    <div>
      {!chatAbierto ? (
        <button onClick={iniciarChat} style={styles.editButton}>
          Iniciar Chat
        </button>
      ) : (
        // Aquí ya no está el ChatComponent
        <div>
          <p>Chat Iniciado, Revisa Mensajes</p>
        </div>
      )}
    </div>
  );
};

export default IniciarChatButton;
