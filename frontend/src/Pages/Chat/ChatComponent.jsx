import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { BASE_URL, BASE_URL_SOCKET } from '../../config';
import '../../css/ChatComponent.css';

const ChatComponent = ({ chatId, mensajesChat, enviarMensaje, mensajeTexto, setMensajeTexto }) => {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [userCache, setUserCache] = useState({});
  const messagesEndRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchChat = async () => {
      try {
        const response = await fetch(`${BASE_URL}/buscarChatPorId?idChat=${chatId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const chatData = await response.json();
        const chatMessages = chatData.mensajes || [];

        const messagesWithNames = await Promise.all(chatMessages.map(async (msg) => {
          return await attachUserName(msg);
        }));

        setMessages(messagesWithNames);
      } catch (error) {
        console.error('Error al recuperar el chat:', error);
      }
    };

    fetchChat();

    const ws = new WebSocket(`${BASE_URL_SOCKET}/ws-chat`);
    setSocket(ws);

    ws.onopen = () => {
      console.log('Conectado al WebSocket');
    };

    ws.onmessage = async (event) => {
      const message = JSON.parse(event.data);
      const messageWithName = await attachUserName(message);
      setMessages((prevMessages) => [...prevMessages, messageWithName]);
    };

    ws.onclose = () => {
      console.log('Desconectado del WebSocket');
    };

    return () => {
      ws.close();
    };
  }, [chatId]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const attachUserName = async (message) => {
    const { idEmisor } = message;
    if (userCache[idEmisor]) {
      return { ...message, nombre: userCache[idEmisor] };
    } else {
      try {
        const userQuery = `query {
          buscarUsuarioPorId(id: "${idEmisor}") {
            nombre
          }
        }`;
        const userResponse = await fetch(`${BASE_URL}/graphql`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: userQuery }),
        });
        const userData = await userResponse.json();
        const nombre = userData.data.buscarUsuarioPorId.nombre;

        setUserCache((prevCache) => ({ ...prevCache, [idEmisor]: nombre }));
        return { ...message, nombre };
      } catch (error) {
        console.error('Error al obtener el nombre del usuario:', error);
        return message;
      }
    }
  };

  const sendMessage = async () => {
    if (!mensajeTexto.trim()) {
      return;
    }

    const alias = Cookies.get('alias');
    try {
      const query = `query {
        buscarPorAlias(alias: "${alias}") {
          id
          nombre
        }
      }`;
      const response = await fetch(`${BASE_URL}/graphql`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      const idEmisor = data.data.buscarPorAlias.id;
      const nombreEmisor = data.data.buscarPorAlias.nombre;

      const message = {
        contenido: mensajeTexto,
        idChat: chatId,
        idEmisor,
        fechaEnvio: new Date().toISOString().slice(0, -1),
      };

      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));
        setMensajeTexto('');  // Limpiar el campo de mensaje
      } else {
        console.error('WebSocket no está conectado');
      }
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
    }
  };

  // Esta función maneja el evento de tecla presionada
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && mensajeTexto.trim()) {
      sendMessage(); // Enviar mensaje si se presiona Enter y hay texto
    }
  };

  return (
    <div className="chat-component">
      <div className="messages">
        {messages.map((message) => (
          <div key={message.id}>
            <p><strong>{message.nombre}</strong>: {message.contenido}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="mensajesyenviar">
        <input
          type="text"
          value={mensajeTexto}
          onChange={(e) => setMensajeTexto(e.target.value)}
          onKeyDown={handleKeyDown}  // Llamar a la función cuando se presiona una tecla
          placeholder="Escribe un mensaje..."
          className="input-mensaje"
        />
        <button onClick={sendMessage} className="boton-enviar">Enviar</button>
      </div>
    </div>
  );
};

export default ChatComponent;
