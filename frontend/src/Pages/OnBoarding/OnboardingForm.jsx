import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./OnboardingForm.css";
import Fondo from '@c/FondoLoginRegister/FondoLoginRegister';
import {BASE_URL} from '../../config'

const OnboardingForm = () => {
  const navigate = useNavigate();

  // Estados para cada campo
  const [rol, setRol] = useState("");
  const [instrumentos, setInstrumentos] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [descripcion, setDescripcion] = useState("");

  // Colecciones de instrumentos y géneros
  const [instrumentosOpciones, setInstrumentosOpciones] = useState([]);
  const [generosOpciones, setGenerosOpciones] = useState([]);

  // Obtener el alias del usuario de las cookies
  const alias = Cookies.get("alias");

  // Validar que el alias está disponible
  useEffect(() => {
    if (!alias) {
      alert("No se encontró tu información de sesión. Por favor, regístrate de nuevo.");
      navigate("/registro");
    }
  }, [alias, navigate]);

  

  // Cargar datos estáticos para los instrumentos y géneros
  useEffect(() => {
 // Cargar instrumentos y géneros al iniciar
  // Cargar desde el backend 
  //NO BORRAR NINGUN COMENTARIO!!!!!!! ESTO ES PARA CARGAR LOS INSTRUMENTOS Y GENEROS DESDE EL BACKEND CUANDO TENGAMOS 
  //LOS ENDPOINTS PARA ELLO, POR AHORA MANTENEMOS LOS DATOS ESTATICOS Y LOS MANDAMOS DESDE ACÁ.
  //A FUTURO LO CAMBIAREMOS PARA QUE SE CARGUEN DESDE EL BACKEND.
  // const fetchOpciones = async () => {
  //   const instrumentosRes = await fetch("http://localhost:8080/graphql", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ query: "{ listarTodosLosInstrumentos { id nombre } }" }),
  //   });
  //   const generosRes = await fetch("http://localhost:8080/graphql", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ query: "{ listarTodosLosGeneros { id nombre } }" }),
  //   });

  //   const instrumentosData = await instrumentosRes.json();
  //   const generosData = await generosRes.json();

  //   setInstrumentosOpciones(instrumentosData.data.listarTodosLosInstrumentos);
  //   setGenerosOpciones(generosData.data.listarTodosLosGeneros);
  // };

  // fetchOpciones();

  // Usar datos estáticos si no hay backend para cargar dinámicamente

    setInstrumentosOpciones([
      { id: "672fc8c7dcf8d013012b20b0", nombre: "Piano" },
      { id: "672fc8d3dcf8d013012b20b1", nombre: "Guitarra Eléctrica" },
      { id: "672fc8dddcf8d013012b20b2", nombre: "Guitarra Clásica" },
      { id: "672fc8eedcf8d013012b20b3", nombre: "Batería" },
      { id: "672fc8f5dcf8d013012b20b4", nombre: "Flauta" },
      { id: "672fc8fadcf8d013012b20b5", nombre: "Violín" },
      { id: "672fc900dcf8d013012b20b6", nombre: "Acordeón" },
      { id: "672fc905dcf8d013012b20b7", nombre: "Percusión" },
      { id: "672fc90bdcf8d013012b20b8", nombre: "Saxo" },
      { id: "672fc910dcf8d013012b20b9", nombre: "Bajo eléctrico" },
      { id: "672fc917dcf8d013012b20ba", nombre: "Trompeta" },
      { id: "672fc91ddcf8d013012b20bb", nombre: "Sintetizador" },
    ]);

    setGenerosOpciones([
      { "id": "672fce9282148c6f5d8eb23d", "nombre": "Rock" },
  { "id": "672fcef782148c6f5d8eb23e", "nombre": "Cumbia" },
  { "id": "672fcf1a82148c6f5d8eb23f", "nombre": "Reggeaton" },
  { "id": "672fcf2482148c6f5d8eb240", "nombre": "Pop" },
  { "id": "672fcf4182148c6f5d8eb241", "nombre": "Folclore" },
  { "id": "672fcf7882148c6f5d8eb242", "nombre": "Rap" },
  { "id": "672fcf8082148c6f5d8eb243", "nombre": "Hip-Hop" },
  { "id": "672fcf8682148c6f5d8eb244", "nombre": "Trap" },
  { "id": "672fcf8e82148c6f5d8eb245", "nombre": "RKT" },
  { "id": "672fcf9982148c6f5d8eb246", "nombre": "Electrónica" },
  { "id": "672fcfa382148c6f5d8eb247", "nombre": "Tango" },
  { "id": "672fcfa782148c6f5d8eb248", "nombre": "Jazz" },
  { "id": "672fcfac82148c6f5d8eb249", "nombre": "Blues" },
  { "id": "672fcfc682148c6f5d8eb24a", "nombre": "Alternativo" },
  { "id": "672fcfcc82148c6f5d8eb24b", "nombre": "Experimental" }
    ]);
  }, []);

  // Manejar selección de opciones
  const toggleSelection = (value, setState, currentValues) => {
    if (currentValues.includes(value)) {
      setState(currentValues.filter((item) => item !== value));
    } else {
      setState([...currentValues, value]);
    }
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rol || instrumentos.length === 0 || generos.length === 0 || !descripcion) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    try {
      // Subir foto de perfil
      if (fotoPerfil) {
        const formData = new FormData();
        formData.append("file", fotoPerfil);
        formData.append("alias", alias);

        const fotoResponse = await fetch(`${BASE_URL}/actualizarFotoPerfil`, {
          method: "POST",
          body: formData,
        });

        if (!fotoResponse.ok) {
          throw new Error("Error al subir la foto de perfil.");
        }
      }


      // Enviar los datos restantes al backend
      const response = await fetch(`${BASE_URL}/graphql`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            mutation {
              actualizarRolUsuarioPorAlias(alias: "${alias}", rol: "${rol}") {
                alias
                rol
              }
              actualizarInstrumentosUsuarioPorAlias(
                alias: "${alias}",
                instrumentoIds: ${JSON.stringify(instrumentos)}
              ) {
                alias
                misInstru { id nombre }
              }
              actualizarGenerosUsuarioPorAlias(
                alias: "${alias}",
                generoIds: ${JSON.stringify(generos)}
              ) {
                alias
                misGeneros { id nombre }
              }
              actualizarDescripcionUsuarioPorAlias(
                alias: "${alias}",
                descripcion: """${descripcion}"""
              ) {
                alias
                descripcion
              }
            }
          `,
        }),
      });

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors.map((err) => err.message).join("\n"));
      }

      // Redirigir al dashboard u otra página
      navigate("/");
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <Fondo />
      <form className="onboarding-form-ob" onSubmit={handleSubmit}>
        <h1>Completa tu perfil</h1>
  
        <h2>¿Cuál es tu rol en MeetSounds?</h2>
        <div className="buttons-group-ob">
          {["Músico", "Vocalista", "Productor", "Compositor", "DJ"].map((r) => (
            <button
              key={r}
              type="button"
              className={`role-button-ob ${rol === r ? "selected-ob" : ""}`}
              onClick={() => setRol(r)}
            >
              {r}
            </button>
          ))}
        </div>
  
        <h2>¿Cuáles son tus instrumentos favoritos?</h2>
        <div className="buttons-group-ob">
          {instrumentosOpciones.map((instrumento) => (
            <button
              key={instrumento.id}
              type="button"
              className={`instrument-button-ob ${
                instrumentos.includes(instrumento.id) ? "selected-ob" : ""
              }`}
              onClick={() => toggleSelection(instrumento.id, setInstrumentos, instrumentos)}
            >
              {instrumento.nombre}
            </button>
          ))}
        </div>
  
        <h2>¿Cuáles son tus géneros musicales favoritos?</h2>
        <div className="buttons-group-ob">
          {generosOpciones.map((genero) => (
            <button
              key={genero.id}
              type="button"
              className={`genre-button-ob ${
                generos.includes(genero.id) ? "selected-ob" : ""
              }`}
              onClick={() => toggleSelection(genero.id, setGeneros, generos)}
            >
              {genero.nombre}
            </button>
          ))}
        </div>
  
        <h2>Sube una foto de perfil</h2>
        <input
          className="file-input-ob"
          type="file"
          onChange={(e) => setFotoPerfil(e.target.files[0])}
        />
  
        <h2>Cuéntanos sobre ti</h2>
        <textarea
  className="description-textarea-ob"
  value={descripcion}
  onChange={(e) => setDescripcion(e.target.value)}
  rows="4"
  cols="50"
  placeholder="Escribe algo sobre ti..."
></textarea>

  
        <button className="submit-button-ob" type="submit">
          Guardar y continuar
        </button>
      </form>
    </div>
  );
  
};

export default OnboardingForm;