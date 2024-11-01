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
                    /* borra esto */
                  >
                    <div className="imagen">
                      <AvatarActive imagen={user.fotoPerfilUrl} />
                    </div>
                    <MenuDerechoDiv></MenuDerechoDiv>
                </div>
            </div>
            <div />
        </>

    )
}
export default Bandas;