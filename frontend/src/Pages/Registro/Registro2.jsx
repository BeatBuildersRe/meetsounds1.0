import React, { useState, useEffect } from 'react';
import '../../css/Registro2.css';

const registerUser = async (userData) => {
    const query = `
        mutation {
            guardarUsuario(user: {
                nombre: "${userData.nombre}",
                apellido: "${userData.apellido}",
                alias: "${userData.username}",
                email: "${userData.email}",
                genero: "${userData.genero}",
                contrasena: "${userData.password}",
                telefono: "${userData.telefono}",
                ubicacion:{
                  pais:{
                    nombre:"${userData.pais}"
                  }
                  estado:{
                    nombre:"${userData.provincia}"
                  }
                }
            }) {
                nombre
            }
        }
    `;

    try {
        const response = await fetch('http://localhost:8080/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query })
        });
    
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
    
        const result = await response.json();
        console.log('Respuesta del servidor:', result);
    } catch (error) {
        console.error('Error durante el registro:', error);
    }
};

function Registro2() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [genero, setGenero] = useState('');
  const [pais, setPais] = useState('Argentina');
  const [provincia, setProvincia] = useState('');
  const [provincias, setProvincias] = useState([]);
  const [userData, setUserData] = useState(null);

  const paisesConProvincias = {
    Argentina: ['Buenos Aires', 'Catamarca', 'Chaco', 'Chubut', 'Córdoba', 'Corrientes', 'Entre Ríos', 'Formosa', 'Jujuy', 'La Pampa', 'La Rioja', 'Mendoza', 'Misiones', 'Neuquen', 'Río Negro', 'Salta', 'San Juan', 'San Luís', 'Santa Cruz', 'Santa Fe', 'Santiago del Estero', 'Tierra del Fuego', 'Tucumán'],
    Chile: ['Santiago', 'Valparaíso', 'Concepción', 'La Serena', 'Antofagasta'],
    Brasil: ['São Paulo', 'Rio de Janeiro', 'Bahía', 'Minas Gerais', 'Amazonas'],
    Uruguay: ['Montevideo', 'Canelones', 'Maldonado', 'Salto', 'Paysandú']
  };

  useEffect(() => {
    setProvincias(paisesConProvincias[pais]);
    setProvincia('');
  }, [pais]);

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre || !apellido || !telefono || !genero || !provincia) {
      alert('Faltan campos obligatorios.');
      return;
    }

    const finalUserData = {
      nombre,
      apellido,
      telefono,
      genero,
      pais,
      provincia,
      ...userData // Incluye datos de Registro1 (email, username, password)
    };

    console.log('Datos a registrar:', finalUserData);
    registerUser(finalUserData);  // Enviar datos al servidor
  };

  const handleSelectGenero = (generoSeleccionado) => {
    setGenero(generoSeleccionado);
  };

  return (
    <div id="cuerpo2">
      <div className="login-container">
        <h1 className="titulo">Datos Personales</h1>
        <form onSubmit={handleSubmit} className="login-form">
          {/* Campos de Registro2 */}
          <div className="form-group">
            <input 
              className="formCampos"
              type="text" 
              id="nombre" 
              value={nombre} 
              onChange={(e) => setNombre(e.target.value)} 
              placeholder="Ingresa tu nombre"
            />
          </div>
          <div className="form-group">
            <input 
              className="formCampos"
              type="text" 
              id="apellido" 
              value={apellido} 
              onChange={(e) => setApellido(e.target.value)} 
              placeholder="Ingresa tu apellido"
            />
          </div>
          <div className="form-group">
            <input 
              className="formCampos"
              type="tel" 
              id="telefono" 
              value={telefono} 
              onChange={(e) => setTelefono(e.target.value)} 
              placeholder="Ingresa tu teléfono"
            />
          </div>
          
          <div className="form-group">
            <label>Género</label>
            <div className="barra-genero">
              <div className={`third ${genero === 'masculino' ? 'active-azul' : ''}`} onClick={() => handleSelectGenero('masculino')}>Masculino</div>
              <div className={`third ${genero === 'femenino' ? 'active-rosada' : ''}`} onClick={() => handleSelectGenero('femenino')}>Femenino</div>
              <div className={`third ${genero === 'otro' ? 'active-verde' : ''}`} onClick={() => handleSelectGenero('otro')}>Otro</div>
            </div>
          </div>

          <div className="form-group">
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
            <select 
              className="formCampos" 
              id="provincia" 
              value={provincia} 
              onChange={(e) => setProvincia(e.target.value)} 
            >
              <option value="">Selecciona una provincia</option>
              {provincias.map((prov, index) => (
                <option key={index} value={prov}>{prov}</option>
              ))}
            </select>
          </div>

          <div className="contenedorRegistro">
            <button className="btnRegistro" type="submit">Registrarse</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registro2;
