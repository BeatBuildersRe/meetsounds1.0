import * as React from "react";
import "@css/Colores.css";
import "@css/Mensajes.css";
import BadgeAvatars from "@c/avatar/AvatarActives";
import MenuDerechoDiv from "@c/Menu/Derecha";
import ChatComponent from "../Chat/ChatComponent";
import { BASE_URL, BASE_URL_SOCKET } from '../../config';
import { useWebSocket } from "../../services/WebSocketProvider";

const Mensajes = ({ chatId }) => {  // Recibe el chatId como prop
  const [chats, setChats] = React.useState([]);
  const [usuarioLocalId, setUsuarioLocalId] = React.useState(null);
  const [usuarioDetalles, setUsuarioDetalles] = React.useState({});
  const [cargando, setCargando] = React.useState(true);
  const [mensajeTexto, setMensajeTexto] = React.useState("");
  const [mensajesChat, setMensajesChat] = React.useState([]);
  const [chatSeleccionado, setChatSeleccionado] = React.useState(chatId); // Usa el chatId de la prop

  const socket = useWebSocket();

  React.useEffect(() => {
    const aliasLocal = getCookie("alias");
    if (aliasLocal) {
      buscarUsuarioPorAlias(aliasLocal);
    }
  }, []);

  React.useEffect(() => {
    if (chatSeleccionado && socket) {
      const ws = new WebSocket(`${BASE_URL_SOCKET}/ws-chat?chatId=${chatSeleccionado}`);

      ws.onopen = () => {
        console.log(`Conectado al WebSocket para el chat ${chatSeleccionado}`);
      };

      ws.onmessage = (event) => {
        const nuevoMensaje = JSON.parse(event.data);
        setMensajesChat((prevMensajes) => [...prevMensajes, nuevoMensaje]);
      };

      ws.onclose = () => {
        console.log(`Conexión WebSocket cerrada para el chat ${chatSeleccionado}`);
      };

      return () => ws.close();
    }
  }, [chatSeleccionado, socket]);

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
      setCargando(false);
    }
  };

  const fetchChats = async (idUsuario) => {
    try {
      const response = await fetch(`${BASE_URL}/traerTodosLosChatsxIdUsuario?idUsuario=${idUsuario}`);
      const chatsData = await response.json();
      const chatsOrdenados = chatsData.sort((a, b) => {
        const fechaUltimoMensajeA = a.mensajes.length > 0 ? new Date(Math.max(...a.mensajes.map(m => new Date(m.fechaEnvio)))) : 0;
        const fechaUltimoMensajeB = b.mensajes.length > 0 ? new Date(Math.max(...b.mensajes.map(m => new Date(m.fechaEnvio)))) : 0;
        return fechaUltimoMensajeB - fechaUltimoMensajeA;
      });

      setChats(chatsOrdenados);
      await fetchDetallesUsuarios(chatsOrdenados);
    } catch (error) {
      console.error('Error al obtener chats:', error);
      setCargando(false);
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
    setCargando(false);
  };

  const determinarUsuarioConElQueHabla = (chat) => {
    if (chat.idUsuario1 === usuarioLocalId) {
      return usuarioDetalles[chat.idUsuario2];
    } else {
      return usuarioDetalles[chat.idUsuario1];
    }
  };

  const abrirChat = (chatId) => {
    setChatSeleccionado(chatId); 
  };

  const enviarMensaje = async (chatId) => {
    if (mensajeTexto.trim().length < 1) {
      alert("El mensaje debe tener al menos un carácter.");
      return;
    }

    const mensaje = {
      chatId: chatId,
      texto: mensajeTexto,
      idUsuario: usuarioLocalId
    };

    try {
      await fetch(`${BASE_URL}/enviarMensaje`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mensaje),
      });

      setMensajeTexto("");
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
    }
  };

  if (cargando) return <p>Cargando...</p>;

  return (
    <div className="Contenedor">
      <div className="contenedor2">
        <div className="izquierda-mensajes">
          {chatSeleccionado ? (
            <ChatComponent 
              chatId={chatSeleccionado} 
              mensajesChat={mensajesChat} 
              enviarMensaje={() => enviarMensaje(chatSeleccionado)} 
              mensajeTexto={mensajeTexto} 
              setMensajeTexto={setMensajeTexto} 
              setChatSeleccionado={setChatSeleccionado}
            />
          ) : (
            <div className="mensajes-usuario">
              {chats && chats.length > 0 ? (
                chats.map(chat => {
                  const usuarioConElQueHabla = determinarUsuarioConElQueHabla(chat);
                  const ultimoMensaje = chat.mensajes[chat.mensajes.length - 1];

                  return (
                    <div className="UsuarioKey" key={chat.id}>
                      <div 
                        className="perfiles_mensajes"
                        role="button"
                        tabIndex="0"
                        onClick={() => abrirChat(chat.id)}
                      >
                        <div className="top_mensajes">
                          {usuarioConElQueHabla && (
                            <>
                              {usuarioConElQueHabla.fotoPerfilUrl && (
                                <img 
                                  src={usuarioConElQueHabla.fotoPerfilUrl} 
                                  alt={`${usuarioConElQueHabla.nombre} ${usuarioConElQueHabla.apellido}`} 
                                  style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }} 
                                />
                              )}
                              <p>{usuarioConElQueHabla.nombre} {usuarioConElQueHabla.apellido}</p>
                            </>
                          )}
                          {ultimoMensaje && (
                            <div className="ultimo-mensaje">
                              <p>{ultimoMensaje.texto}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p>No tienes chats.</p>
              )}
            </div>
          )}
        </div>

        <MenuDerechoDiv />
      </div>
    </div>
  );
};

export default Mensajes;
