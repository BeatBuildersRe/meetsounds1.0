import React, { createContext, useContext, useEffect, useState } from 'react';

const WebSocketContext = createContext(null);
const BASE_URL = 'ws://localhost:8080/ws-chat'; // WebSocket utiliza ws:// o wss://

export const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket(BASE_URL);

    ws.onopen = () => {
      console.log('Conectado al WebSocket');
    };

    ws.onmessage = (event) => {
      console.log('Mensaje recibido:', event.data);
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
