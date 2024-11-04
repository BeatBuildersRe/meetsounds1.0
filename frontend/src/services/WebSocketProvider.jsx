import React, { createContext, useContext, useEffect, useState } from 'react';
import { BASE_URL, BASE_URL_SOCKET } from '../config'
const WebSocketContext = createContext(null);
const WSURL = `${BASE_URL_SOCKET}/ws-chat`; // WebSocket utiliza ws:// o wss://

export const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket(WSURL);

    ws.onopen = () => {
      console.log('Conectado al WebSocket');
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.idChat === chatSeleccionado) { // chatSeleccionado debe ser el ID del chat actual
        setMensajesChat((prevMensajes) => [...prevMensajes, message]);
      }
    };

    ws.onclose = () => {
      console.log('Conexión cerrada');
    };

    setSocket(ws);

    return () => {
      ws.close(); // Cerrar la conexión cuando el componente se desmonta
      console.log('WebSocket cerrado');
    };
  }, []);

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket debe ser usado dentro de un WebSocketProvider');
  }
  return context;
};
