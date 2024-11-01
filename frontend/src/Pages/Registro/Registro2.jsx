import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '@css/Registro2.css';

function Registro2() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [genero, setGenero] = useState('');
  const [pais, setPais] = useState('Argentina');
  const [provincia, setProvincia] = useState('');
  const [provincias, setProvincias] = useState([]);
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  const graphqlEndpoint = "http://localhost:8080/graphql"; // Cambia esto según tu backend

  const paisesConProvincias = {
    Argentina: ['Buenos Aires', 'Catamarca', 'Chaco', 'Chubut', 'Córdoba', 'Corrientes', 'Entre Ríos', 'Formosa', 'Jujuy', 'La Pampa', 'La Rioja', 'Mendoza', 'Misiones', 'Neuquen', 'Río Negro', 'Salta', 'San Juan', 'San Luís', 'Santa Cruz', 'Santa Fe', 'Santiago del Estero', 'Tierra del Fuego', 'Tucumán'],
    Chile: ['Santiago', 'Valparaíso', 'Concepción', 'La Serena', 'Antofagasta'],
    Brasil: ['São Paulo', 'Rio de Janeiro', 'Bahía', 'Minas Gerais', 'Amazonas'],
    Uruguay: ['Montevideo', 'Canelones', 'Maldonado', 'Salto', 'Paysandú']
  };

  // Actualizar las provincias según el país seleccionado
  useEffect(() => {
    setProvincias(paisesConProvincias[pais]);
    setProvincia('');
  }, [pais]);

  // Obtener los datos de registro1 y limpiar localStorage al montar el componente
  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    } else {
      console.log("No se encontró userData. Redirigiendo a Registro1.");
      navigate('/registro'); // Redirige al formulario de Registro1 si no hay userData
    }

    // Limpiar el localStorage al desmontar el componente
    return () => {
      localStorage.removeItem('userData');
    };
  }, [navigate]);

  // Función para enviar los datos del formulario a la mutación GraphQL
  const guardarUsuarioGraphQL = async (user) => {
    const query = `
      mutation {
        guardarUsuario(user: {
          nombre: "${user.nombre}",
          apellido: "${user.apellido}",
          genero: "${user.genero}",
          alias: "${user.alias}",
          email: "${user.email}",
          fechaNacimiento: "${user.fechaNacimiento}",
          contrasena: "${user.contrasena}"
        }) {
          nombre
        }
      }
    `;

    try {
      const response = await fetch(graphqlEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      const result = await response.json();
      if (result.data && result.data.guardarUsuario) {
        console.log('Usuario guardado:', result.data.guardarUsuario);
        // Aquí puedes redirigir o mostrar un mensaje de éxito
        navigate('/login');
      } else if (result.errors) {
        console.error('Errores al guardar usuario:', result.errors);
        alert(`Error: ${result.errors[0].message}`);
      }
    } catch (error) {
      console.error('Error al enviar la mutación:', error);
      alert('Hubo un error al enviar los datos. Inténtalo de nuevo más tarde.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm({ nombre, apellido, /* telefono, */ fechaNacimiento, genero, provincia });

    if (Object.keys(validationErrors).length === 0) {
      const user = {
        nombre,
        apellido,
        telefono,
        genero,
        fechaNacimiento,
        alias: userData.username, // Alias del userData
        email: userData.email,     // Email del userData
        contrasena: userData.password
      };

      guardarUsuarioGraphQL(user); // Llamar a la mutación para guardar el usuario
    } else {
      alert(`Faltan los siguientes campos: ${Object.values(validationErrors).join(', ')}`);
    }
  };

  const handleSelectGenero = (generoSeleccionado) => {
    setGenero(generoSeleccionado);
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.nombre) errors.nombre = 'Nombre';
    if (!data.apellido) errors.apellido = 'Apellido';
    // if (!data.telefono) errors.telefono = 'Teléfono';
    if (!data.fechaNacimiento) errors.fechaNacimiento = 'Fecha de Nacimiento';
    if (!data.genero) errors.genero = 'Género';
    // if (!data.provincia) errors.provincia = 'Provincia';
    return errors;
  };

  if (!userData) {
    return null; // O un loader si prefieres
  }

  return (
    <div id="cuerpo2">
      <div className="login-container">
        <h1 className="titulo">Datos Personales</h1>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input 
              className="formCampos"
              type="text" 
              id="nombre" 
              value={nombre} 
              onChange={(e) => setNombre(e.target.value)} 
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="apellido">Apellido</label>
            <input 
              className="formCampos"
              type="text" 
              id="apellido" 
              value={apellido} 
              onChange={(e) => setApellido(e.target.value)} 
              required
            />
          </div>

          {/* se guarda Telefono */}
          {/* <div className="form-group">
            <label htmlFor="telefono">Teléfono</label>
            <input 
              className="formCampos"
              type="tel" 
              id="telefono" 
              value={telefono} 
              onChange={(e) => {
                const soloNumeros = e.target.value.replace(/[^0-9]/g, '');
                setTelefono(soloNumeros);
              }}
              required
            />
          </div> */}
          <div className="form-group">
            <label htmlFor="fechaNacimiento">Fecha de nacimiento</label>
            <input 
              className="formCampos"
              type="date" 
              id="fechaNacimiento" 
              value={fechaNacimiento} 
              onChange={(e) => setFechaNacimiento(e.target.value)} 
              required
            />
          </div>

          {/* Barra de selección de género */}
          <div className="form-group">
            <label>Género</label>
            <div className="barra-genero">
              <div 
                className={`third1 ${genero === 'masculino' ? 'active-azul' : ''}`} 
                onClick={() => handleSelectGenero('masculino')}
              >
                Masculino
              </div>

              <div 
                className={`third2 ${genero === 'femenino' ? 'active-rosada' : ''}`} 
                onClick={() => handleSelectGenero('femenino')}
              >
                Femenino
              </div>

              <div 
                className={`third3 ${genero === 'otro' ? 'active-verde' : ''}`} 
                onClick={() => handleSelectGenero('otro')}
              >
                Otro
              </div>
            </div>
          </div>


         {/*  se guarda pais y provincia */}
          {/* <div className="form-group">
            <label htmlFor="pais">País</label>
            <select 
              className="formCampos" 
              id="pais" 
              value={pais} 
              onChange={(e) => setPais(e.target.value)} 
            >
              <option value="Argentina">Argentina</option>
              <option value="Chile">Chile</option>
              <option value="Brasil">Brasil</option>
              <option value="Uruguay">Uruguay</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="provincia">Provincia</label>
            <select 
              className="formCampos" 
              id="provincia" 
              value={provincia} 
              onChange={(e) => setProvincia(e.target.value)} 
              required
            >
              <option value="">Selecciona una provincia</option>
              {provincias.map((prov, index) => (
                <option key={index} value={prov}>{prov}</option>
              ))}
            </select>
          </div>
 */}
          <div className="contenedorRegistro">
            <button className="btnRegistro" type="submit">Siguiente</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registro2;
