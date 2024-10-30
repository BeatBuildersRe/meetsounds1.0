import React, { useEffect, useState } from 'react';

const ChatComponent = ({ idChat }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const socketUrl = `ws://localhost:8080/ws-chat`;
  let socket;

  useEffect(() => {
    socket = new WebSocket(socketUrl);

    socket.onopen = () => {
      console.log('Conectado al WebSocket');
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.onclose = () => {
      console.log('Desconectado del WebSocket');
    };

    return () => {
      socket.close(); // Cierra la conexión al desmontar el componente
    };
  }, []);

  const sendMessage = () => {
    const message = {
      contenido: inputMessage,
      idChat: idChat,
    };
    socket.send(JSON.stringify(message));
    setInputMessage(''); // Limpia el input después de enviar
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg.contenido}</p>
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
