import ObtenerPublicacionPorId from "@services/GetPublicacionesID";
import img from "@public/perfill.png";
import ComentarPublicacion from "@services/UpdateComentar";
import GetAlias from "../../services/GetAlias";
import React from "react";
import { useForm } from "react-hook-form";
import useObtenerUsuarioID from "@services/GetUsuarioID";
import useUpdateComentario from "@services/UpdateComentar";
const Comentarios = ({ id_publicacion }) => {
    const {comentar} = useUpdateComentario()
    const alias = GetAlias()
    const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    comentar({ publicacion:publicacion.id ,usuario: alias, comentario: data.comentario})
  };

  // Llamada a la función con el `id`
  const { publicacion, loading, error } =
    ObtenerPublicacionPorId(id_publicacion);

  if (loading) return <p>Cargando publicación...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!publicacion) return <p>No se encontró la publicación.</p>;



  return (
    <>
      <button >atras</button>
      <h1>cometarios</h1>

      <div className="publicacion">
        <div className="imagen-perfil">
          <img
            src={publicacion.usuario.fotoPerfilUrl ?? img}
            style={{
              maxWidth: "100px",
              maxHeight: "100px",
              borderRadius: "50%",
            }}
          />
        </div>
        <div className="usuario">
          <p>
            {publicacion.usuario.nombre} {publicacion.usuario.apellido}
          </p>
          <p>@{publicacion.usuario.alias}</p>
        </div>
        <div className="descripcion">
          <p>{publicacion.descripcion ? publicacion.descripcion : ""}</p>
        </div>
        <div className="media">
          <img src={publicacion.mediaUrl ? publicacion.mediaUrl : ""} alt="" />
        </div>

        <div className="botones">
          <button onClick={() => toggleLike(publicacion.id)}>like</button>

          <p>{publicacion.count_likes}</p>
          <button disabled onClick={() => comentar(publicacion.id)}>
            comentar
          </button>
          <p>{publicacion.count_coment}</p>
        </div>
      </div>

      <div className="Caja_de_comentarios">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>comentar</label>
          <input
            type="text"
            {...register("comentario", { required: "campo obli..." })}
          />
          <button type="submit">comentar</button>
        </form>
      </div>

      
      <div>
       
      </div>
    </>
  );
};
export default Comentarios;
