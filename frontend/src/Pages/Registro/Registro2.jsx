import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/Registro2.css';
import { useForm } from "react-hook-form";


function App() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [genero, setGenero] = useState('');
  const [otroGenero, setOtroGenero] = useState('');
  const [pais, setPais] = useState('Argentina');
  const [provincia, setProvincia] = useState(''); 
  const [provincias, setProvincias] = useState([]); 

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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const generoFinal = genero === 'otro' ? otroGenero : genero;
    const validationErrors = validateForm({ nombre, apellido, telefono, generoFinal, provincia });

    if (Object.keys(validationErrors).length === 0) {
      console.log(`Nombre: ${nombre}, Apellido: ${apellido}, Teléfono: ${telefono}, Género: ${generoFinal}, País: ${pais}, Provincia: ${provincia}`);
    } else {
      alert(`Faltan los siguientes campos: ${Object.values(validationErrors).join(', ')}`);
    }
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.nombre) errors.nombre = 'Nombre';
    if (!data.apellido) errors.apellido = 'Apellido';
    if (!data.telefono) errors.telefono = 'Teléfono';
    if (!data.generoFinal) errors.genero = 'Género';
    if (!data.provincia) errors.provincia = 'Provincia';
    return errors;
  };

  const handleSelectGenero = (selectedGenero) => {
    setGenero(selectedGenero);
    if (selectedGenero !== 'otro') {
      setOtroGenero('');
    }
  };

  const OnSubmit = (data) => {
    console.log(data);
    navigate('/'); 
  };
   
  return (
    <div id="cuerpo2">
      <div className="login-container">
        <h1 className="titulo">Datos Personales</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label className="labelRegistro2" htmlFor="nombre">Nombre</label>
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
            <label className="labelRegistro2" htmlFor="apellido">Apellido</label>
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
          <div className="form-group">
            <label className="labelRegistro2" htmlFor="telefono">Teléfono</label>
            <input 
              className="formCampos"
              type="tel" 
              id="telefono" 
              value={telefono} 
              onChange={(e) => {
                const soloNumeros = e.target.value.replace(/[^0-9]/g, '');
                setTelefono(soloNumeros);
              }}
              placeholder="Ingresa tu teléfono"
            />
          </div>
          </div>

          {/* Barra de selección de género */}
          <div className="form-group">
            <label>Género</label>
            <div className="barra-genero">
              <div 
                className={`third ${genero === 'masculino' ? 'active-azul' : ''}`} 
                onClick={() => handleSelectGenero('masculino')}
              >
                Masculino
              </div>

              <div 
                className={`third ${genero === 'femenino' ? 'active-rosada' : ''}`} 
                onClick={() => handleSelectGenero('femenino')}
              >
                Femenino
              </div>

              <div 
                className={`third ${genero === 'otro' ? 'active-verde' : ''}`} 
                onClick={() => handleSelectGenero('otro')}
              >
                Otro
              </div>
            </div>
          </div>

          {/* Campo que se muestra al seleccionar 'otro' */}
          {genero === 'otro' && (
            <div className="form-group">
              <label className="labelRegistro2" htmlFor="otroGenero">Especifica tu género</label>
              <input 
                className="formCampos"
                type="text" 
                id="otroGenero" 
                value={otroGenero} 
                onChange={(e) => setOtroGenero(e.target.value)} 
                placeholder="Especifica tu género"
              />
            </div>
          )}

          {/* Selección de país */}
          <div className="form-group">
            <label className="labelRegistro2" htmlFor="pais">País</label>
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

          {/* Selección de provincia */}
          <div className="form-group">
            <label className="labelRegistro2" htmlFor="provincia">Provincia</label>
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

          <button className="siguiente" type="submit">Siguiente</button>
        </form>
      </div>
    </div>
  );
}

export default App;


