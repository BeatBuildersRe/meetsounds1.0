import MenuDerechoDiv from "@c/Menu/Derecha";
import "@css/Chat.css";
import icon from "@public/emoji.svg";
import icon_media from "@public/media.svg";
import icon_send from "@public/send.svg";
import { CiSearch } from "react-icons/ci";
import useObtenerUsuario from "@services/GetUsuario";

import Avatars from "@c/avatar/AvatarV2";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";


const Chat = () => {
    const { alias } = useParams(); 

    const  { usuario, cargando, error } = useObtenerUsuario(alias)

    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); // Retrocede una página en el historial
    };

  return (
    <>
      <div className="Contenedor">
        <div className="contenedor2">
          <div className="izquierda-chat">
            <div className="Chat-user">
                <button onClick={handleBack}>atras</button>
                {/* <Avatars imagen={usuario.fotoPerfilUrl} /> */}
                {/* <p>{usuario.nombre} {usuario.apellido}</p> */}
            </div>
            <div className="Chat">

            </div>
              
          </div>
          <div className="Nav-chat">
                <img id="icon-svg" src={icon} alt=""  style={{width:'50px',height:'40px'}}/>
                <img id="icon-svg" src={icon_media} alt=""  style={{width:'50px',height:'40px'}}/>
                <label id="label">
                  <input type="search" placeholder="Escribe aqui" />
                  <img src={icon_send} alt="" style={{width:'50px',height:'40px'}} />
                </label>
              </div>
          <MenuDerechoDiv></MenuDerechoDiv>
        </div>
      </div>
      <div />
    </>
  );
};
export default Chat;
