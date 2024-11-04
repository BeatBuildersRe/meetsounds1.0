import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Importa useNavigate
import Cookies from 'js-cookie';
import { BASE_URL, BASE_URL_SOCKET } from '../../config';
import '../../css/ChatComponent.css';

const ChatComponent = () => {
  const { chatId } = useParams();
  const navigate = useNavigate(); // Inicializa useNavigate
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [userCache, setUserCache] = useState({});
  const socketUrl = `${BASE_URL_SOCKET}/ws-chat`;
  const messagesEndRef = useRef(null);

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

    const ws = new WebSocket(socketUrl);
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
    if (!inputMessage.trim()) {
      alert('Por favor, ingresa un mensaje.');
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
        contenido: inputMessage,
        idChat: chatId,
        idEmisor,
        fechaEnvio: new Date().toISOString().slice(0, -1),
      };

      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));
        setInputMessage('');
      } else {
        console.error('WebSocket no está conectado');
      }
    } catch (error) {
      console.error('Error al obtener el ID del emisor o enviar mensaje:', error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const handleExit = () => {
    navigate('/mensajes'); 
  };

  return (
    <div className='fondo-chat'>
      <button onClick={handleExit} className='boton-salir'>Volver</button>
      <div className='mensajes scrollbar-enlarged'>
        {messages.map((msg, index) => (
          <p key={index} className='mensaje'>
            <strong>{msg.nombre}:</strong> {msg.contenido}
          </p>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className='input-mensaje'>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className='campo-input'
          placeholder='Escribe un mensaje...'
        />
        <button onClick={sendMessage} className='boton-enviar'>Enviar</button>
      </div>
    </div>
  );
};

export default ChatComponent;
