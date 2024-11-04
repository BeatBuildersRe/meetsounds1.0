import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { BASE_URL, BASE_URL_SOCKET } from '../../config';
import '../../css/ChatComponent.css';

const ChatComponent = () => {
  const { chatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [userCache, setUserCache] = useState({});
  const socketUrl = `${BASE_URL_SOCKET}/ws-chat`;
  const messagesEndRef = useRef(null); // Referencia para el final de los mensajes

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
    // Desplazar hacia abajo cada vez que se actualicen los mensajes
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]); // Este efecto se ejecuta cada vez que `messages` cambia

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
        return message; // Devuelve el mensaje sin nombre si falla
      }
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) { // Validación: comprobar si el mensaje no está vacío
      alert('Por favor, ingresa un mensaje.'); // Muestra la alerta
      return; // Salir de la función si no hay mensaje
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
        setInputMessage(''); // Limpia el campo de entrada
      } else {
        console.error('WebSocket no está conectado');
      }
    } catch (error) {
      console.error('Error al obtener el ID del emisor o enviar mensaje:', error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage(); // Llama a la función sendMessage si se presiona "Enter"
    }
  };

  return (
    <div className='fondo-chat'>
      <div className='mensajes scrollbar-enlarged'>
        {messages.map((msg, index) => (
          <p key={index} className='mensaje'>
            <strong>{msg.nombre}:</strong> {msg.contenido}
          </p>
        ))}
        <div ref={messagesEndRef} /> {/* Este div es para el desplazamiento */}
      </div>
      <div className='input-mensaje'>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyDown} // Agrega el manejador de eventos aquí
          className='campo-input'
          placeholder='Escribe un mensaje...'
        />
        <button onClick={sendMessage} className='boton-enviar'>Enviar</button>
      </div>
    </div>
  );
};

export default ChatComponent;
