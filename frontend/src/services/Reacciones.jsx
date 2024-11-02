import GetAlias from "./GetAlias";
import { BASE_URL } from "../config";

const Reacciones = () => {
  const alias_usuario = GetAlias();

  const ReaccionarLike = async ({ id_publicacion }) => {
    console.log(alias_usuario);
    console.log(id_publicacion);

    try {
      const response = await fetch(`${BASE_URL}/graphql`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            mutation MeGusta($idPublicacion: String!, $usuarioAlias: String!) {
              meGusta(idPublicacion: $idPublicacion, usuarioAlias: $usuarioAlias)
            }
          `,
          variables: {
            idPublicacion: id_publicacion,
            usuarioAlias: alias_usuario,
          },
        }),
      });

      const result = await response.json();
      console.log("Resultado de la mutación:", result);
    } catch (error) {
      console.error(
        "Error al conectar con el servidor (en reacciones.jsx):",
        error
      );
    }
  };

  return { ReaccionarLike };
};

export default Reacciones;
