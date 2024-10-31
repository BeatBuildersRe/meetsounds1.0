import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

const ChatComponent = () => {
  const { chatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [userCache, setUserCache] = useState({}); // Estado para caché de nombres de usuario
  const socketUrl = `ws://localhost:8080/ws-chat`;

  useEffect(() => {
    const fetchChat = async () => {
      try {
        const response = await fetch(`http://localhost:8080/buscarChatPorId?idChat=${chatId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const chatData = await response.json();
        const chatMessages = chatData.mensajes || [];

        // Procesa mensajes para incluir el nombre del usuario usando la caché
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
      const messageWithName = await attachUserName(message); // Adjunta el nombre en tiempo real
      setMessages((prevMessages) => [...prevMessages, messageWithName]);
    };

    ws.onclose = () => {
      console.log('Desconectado del WebSocket');
    };

    return () => {
      ws.close();
    };
  }, [chatId]);

  // Función para obtener el nombre de usuario desde la caché o consultar si no está
  const attachUserName = async (message) => {
    const { idEmisor } = message;
    if (userCache[idEmisor]) {
      // Si el nombre ya está en caché, lo usa
      return { ...message, nombre: userCache[idEmisor] };
    } else {
      // Si el nombre no está en caché, consulta el nombre
      try {
        const userQuery = `query {
          buscarUsuarioPorId(id: "${idEmisor}") {
            nombre
          }
        }`;
        const userResponse = await fetch('http://localhost:8080/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: userQuery }),
        });
        const userData = await userResponse.json();
        const nombre = userData.data.buscarUsuarioPorId.nombre;

        // Actualiza caché y mensaje con el nombre
        setUserCache((prevCache) => ({ ...prevCache, [idEmisor]: nombre }));
        return { ...message, nombre };
      } catch (error) {
        console.error('Error al obtener el nombre del usuario:', error);
        return message; // Devuelve el mensaje sin nombre si falla
      }
    }
  };

  const sendMessage = async () => {
    const alias = Cookies.get('alias');
  
    try {
      const query = `query {
        buscarPorAlias(alias: "${alias}") {
          id
          nombre
        }
      }`;
      const response = await fetch('http://localhost:8080/graphql', {
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
        // Envía el mensaje solo a través del WebSocket
        socket.send(JSON.stringify(message));
        setInputMessage(''); // Limpia el campo de entrada
      } else {
        console.error('WebSocket no está conectado');
      }
    } catch (error) {
      console.error('Error al obtener el ID del emisor o enviar mensaje:', error);
    }
  };
  

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.nombre}: </strong> {msg.contenido}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Enviar</button>
    </div>
  );
};

export default ChatComponent;
