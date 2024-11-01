import * as React from "react";
import "@css/Colores.css";
import "@css/Mensajes.css";
import BadgeAvatars from "@c/avatar/AvatarActives";
import MenuDerechoDiv from "@c/Menu/Derecha";
import useObtenerUsuarios from "@services/GetUsuarios";
import AvatarActive from "@c/avatar/AvatarActive";
import Chat from "./Chat";
const Mensajes = () => {
  const { usuarios, cargando, error } = useObtenerUsuarios();
  const [renderizado, setRenderizado] = React.useState(true); // Inicializamos el estado como true
  const [mensaje, setMensaje] = React.useState(""); // Estado para el mensaje

  if (cargando) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar los usuarios</p>;



  return (
        <div className="Contenedor">
        
          <div className="contenedor2">
            <div className="izquierda-mensajes">
              <div className="usuarios">
                <BadgeAvatars opcion={1} />
              </div>
              <div className="mensajes-usuario">
                {usuarios?.map((user, index) => (
                  <div
                    className="UsuarioKey"
                    key={index}
                   
                  >
                    <div className="imagen">
                      <AvatarActive imagen={user.fotoPerfilUrl} />
                    </div>
                    <div>
                      <p>
                        {user.nombre} {user.apellido}
                      </p>
                      <p>
                        tu: Saben que es rojo y malo ma los dientes?....Un
                        ladrillo
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <MenuDerechoDiv />
          </div>
        </div>
  );
};

export default Mensajes;

/*  <div className="Contenedor">
        <div className="contenedor2">
          <div className="izquierda-mensajes">
            <div className="usuarios">
              <BadgeAvatars opcion={1} />
            </div>
            <div className="mensajes-usuario">
              {usuarios?.map((user, index) => (
                <div key={index} className="imagen" // Usar función flecha para pasar el índice
                >
                  <div className="imagen">
                    <AvatarActive imagen={user.fotoPerfilUrl}/> 
                  </div>
                  <div>
                    <p>{user.nombre} {user.apellido}</p>
                    <p>tu: Saben que es rojo y malo ma los dientes?....Un ladrillo</p>
                  </div>
                </div>
                
               
                
              ))}
            </div>
          </div>
          <MenuDerechoDiv />
        </div>
      </div>
      <div /> */
