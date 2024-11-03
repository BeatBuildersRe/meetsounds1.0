import * as React from "react";
import "@css/Colores.css";
import "@css/Mensajes.css";
import BadgeAvatars from "@c/avatar/AvatarActives";
import MenuDerechoDiv from "@c/Menu/Derecha";
import useObtenerUsuarios from "@services/GetUsuarios";
import AvatarActive from "@c/avatar/AvatarActive";
import ChatComponent from "../Chat/ChatComponent"; // Importa el componente ChatComponent

const Mensajes = () => {
  const { usuarios, cargando, error } = useObtenerUsuarios();
  const [selectedUserId, setSelectedUserId] = React.useState(null); // Estado para el usuario seleccionado

  if (cargando) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar los usuarios</p>;

  // Maneja el clic en el usuario
  const handleUserClick = (userId) => {
    console.log("Usuario seleccionado:", userId);
    setSelectedUserId(userId); // Establece el ID del usuario seleccionado
  };

  return (
    <div className="Contenedor">
      <div className="contenedor2">
        <div className="izquierda-mensajes">
          <div className="usuarios">
            <BadgeAvatars opcion={1} />
          </div>
          <div className="mensajes-usuario">
            {usuarios && usuarios.length > 0 ? (
              usuarios.map((user) => (
                <div className="UsuarioKey" key={user.id}>
                  <div
                    className="perfiles_mensajes"
                    role="button" // Mejora de accesibilidad
                    tabIndex="0" // Mejora de accesibilidad
                    onClick={() => handleUserClick(user.id)}
                  >
                    <div className="top_mensajes">
                      <AvatarActive imagen={user.fotoPerfilUrl} />
                      <p>
                        {user.nombre} {user.apellido}
                      </p>
                    </div>
                    <div className="bottom_mensajes">
                      <p>{user.ultimoMensaje || "No hay mensajes recientes."}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No hay usuarios disponibles.</p>
            )}
          </div>
        </div>
        <MenuDerechoDiv />
      </div>

      {/* Renderiza ChatComponent si hay un usuario seleccionado */}
      {selectedUserId && <ChatComponent chatId={selectedUserId} />}
    </div>
  );
};

export default Mensajes;
