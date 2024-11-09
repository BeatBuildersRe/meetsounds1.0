import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Onboarding() {
  const [rol, setRol] = useState("");
  const [instrumentos, setInstrumentos] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [descripcion, setDescripcion] = useState("");
  const [fotoPerfil, setFotoPerfil] = useState(null);

  const graphqlEndpoint = "http://localhost:8080/graphql";
  const navigate = useNavigate();

  const handleSubmit = async () => {
    // Recuperar el alias o id del usuario desde las cookies o contexto
    const userId = "USER_ID_FROM_CONTEXT_OR_COOKIE"; // Reemplazar con tu lógica

    // Mutaciones para enviar los datos del onboarding
    const queries = [
      {
        query: `
          mutation {
            actualizarRolUsuario(userId: "${userId}", rol: "${rol}") {
              id
            }
          }
        `,
      },
      {
        query: `
          mutation {
            actualizarInstrumentosUsuario(userId: "${userId}", instrumentoIds: ${JSON.stringify(
          instrumentos
        )}) {
              id
            }
          }
        `,
      },
      {
        query: `
          mutation {
            actualizarGenerosUsuario(userId: "${userId}", generoIds: ${JSON.stringify(
          generos
        )}) {
              id
            }
          }
        `,
      },
      {
        query: `
          mutation {
            actualizarDescripcionUsuario(userId: "${userId}", descripcion: "${descripcion}") {
              id
            }
          }
        `,
      },
    ];

    // Ejecutar las mutaciones
    for (const { query } of queries) {
      try {
        await fetch(graphqlEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query }),
        });
      } catch (error) {
        console.error("Error en la mutación:", error);
      }
    }

    // Navegar al home después del onboarding
    navigate("/");
  };

  return (
    <div>
      <h1>Onboarding</h1>
      <div>
        <label>Selecciona tu rol:</label>
        <select value={rol} onChange={(e) => setRol(e.target.value)}>
          <option value="">Selecciona</option>
          <option value="musico">Músico</option>
          <option value="vocalista">Vocalista</option>
          <option value="productor">Productor</option>
          <option value="compositor">Compositor</option>
          <option value="aficionado">Aficionado</option>
          <option value="dj">DJ</option>
        </select>
      </div>

      <div>
        <label>Selecciona tus instrumentos:</label>
        <input
          type="text"
          placeholder="Ejemplo: Guitarra, Piano"
          value={instrumentos}
          onChange={(e) => setInstrumentos(e.target.value.split(","))}
        />
      </div>

      <div>
        <label>Selecciona tus géneros musicales:</label>
        <input
          type="text"
          placeholder="Ejemplo: Rock, Pop"
          value={generos}
          onChange={(e) => setGeneros(e.target.value.split(","))}
        />
      </div>

      <div>
        <label>Descripción del perfil:</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </div>

      <div>
        <label>Foto de perfil:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFotoPerfil(e.target.files[0])}
        />
      </div>

      <button onClick={handleSubmit}>Finalizar</button>
    </div>
  );
}

export default Onboarding;
