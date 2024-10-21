import GetAlias from "@services/GetAlias";
import useObtenerUsuario from "@services/GetUsuario";
import Avatars from "./AvatarV2";
const AvatarV3 = () => {
    const Alias = GetAlias()
    const usuario = useObtenerUsuario(Alias)


    return ( 
        <>
            <Avatars imagen={usuario.fotoPerfilUrl} width={300} height={300}/>
            <div className="Data-user">
                <p id="Nombre">{usuario.nombre}</p>
                <p id="Alias">{usuario.alias}</p>
            </div>
        </>
    );
}

export default AvatarV3;