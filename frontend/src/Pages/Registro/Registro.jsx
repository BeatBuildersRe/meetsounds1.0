import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { AuthContext } from '../../js/otro/AuthContext';
import FondoLoginRegister from '@c/FondoLoginRegister/FondoLoginRegister';
import '@css/Registro.css';
import { BASE_URL } from '../../config'
import { CiLock, CiUser,CiMail } from "react-icons/ci";

function Registro() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [genero, setGenero] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const graphqlEndpoint = `${BASE_URL}/graphql`;
  const { setIsAuthenticated } = useContext(AuthContext);

  const validatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[\W_]/.test(password)) strength++;

    switch (strength) {
      case 5:
        return 'Fuerte';
      case 4:
        return 'Normal';
      case 3:
        return 'Débil';
      default:
        return 'Muy débil';
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordStrength(validatePasswordStrength(value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    const user = {
      email,
      username,
      password,
      nombre,
      apellido,
      fechaNacimiento,
      genero,
    };

    const query = `
      mutation {
        guardarUsuario(user: {
          nombre: "${user.nombre}",
          apellido: "${user.apellido}",
          genero: "${user.genero}",
          alias: "${user.username}",
          email: "${user.email}",
          fechaNacimiento: "${user.fechaNacimiento}",
          contrasena: "${user.password}"
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
        // Almacenar el alias del usuario en una cookie para mantener la sesión
        Cookies.set('alias', username, { expires: 7 });
        setIsAuthenticated(true);  // Actualizar el estado de autenticación
        navigate('/onboarding');  // Redirigir al inicio
      } else if (result.errors) {
        alert(`Error: ${result.errors[0].message}`);
      }
    } catch (error) {
      alert('Hubo un error al enviar los datos. Inténtalo de nuevo más tarde.');
    }

    if (result.data && result.data.guardarUsuario) {
      // Guardar alias en cookies
      Cookies.set('alias', username, { expires: 7 });
    
      // Verificar que la cookie se configuró correctamente
      const savedAlias = Cookies.get("alias");
      if (!savedAlias) {
        alert("Hubo un problema configurando tu sesión. Inténtalo de nuevo.");
        return;
      }
    
      setIsAuthenticated(true);  // Actualizar el estado de autenticación
      navigate('/onboarding');  // Redirigir al onboarding
    }
    

  };

  return (
    <div className="registro-body">
      <FondoLoginRegister />
      <div className="nuevo-registro-container">
        <h1>Registrate</h1>
        <form onSubmit={handleSubmit} className="nuevo-registro-form">
          <div className="form-group">
          <div className='contenedor_inputs'>
                    <input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required placeholder="" className='input'/>
                    <span className='text_inputs'>
                        <CiUser size={20} style={{ marginRight: '10px' }} />
                        Nombre
                    </span>
                </div>
          </div>
          <div className="form-group">
          <div className='contenedor_inputs'>
                    <input type="text" id="apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} required placeholder="" className='input'/>
                    <span className='text_inputs'>
                        <CiUser size={20} style={{ marginRight: '10px' }} />
                        Apellido
                    </span>
                </div>
          </div>
          <div className="form-group">
          <div className='contenedor_inputs'>
                    <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="" className='input' />
                    <span className='text_inputs'>
                        <CiMail size={20} style={{ marginRight: '10px' }} />
                        Correo Electrónico
                    </span>
                </div>
          </div>
          <div className="form-group">
          <div className='contenedor_inputs'>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required placeholder="" className='input'/>
                    <span className='text_inputs'>
                        <CiUser size={20} style={{ marginRight: '10px' }} />
                        Nombre de Usuario
                    </span>
                </div>
          </div>
         
          {/* <div className="form-group">
            <label className='palabras' htmlFor="nombre">Nombre</label>
            <input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          </div> */}
          {/* <div className="form-group">
            <label className='palabras' htmlFor="apellido">Apellido</label>
            <input type="text" id="apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
          </div> */}
          {/* <div className="form-group">
            <label className='palabras' htmlFor="email">Correo Electrónico</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div> */}
          {/* <div className="form-group">
            <label className='palabras' htmlFor="username">Nombre de Usuario</label>
            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div> */}
          <div className="Debilidad-Contra">
              <span>
              {passwordStrength && (
                        <span className={`password-strength ${passwordStrength.toLowerCase()}`}>
                          {passwordStrength}
                        </span>
                              )}
              </span>
          </div>
          <div className="form-group">
            <div className='contenedor_inputs'>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                required
                placeholder=""
                className='input'
                variant="outlined"
              />    
              <span className='text_inputs'>
                <CiLock size={20} style={{ marginRight: '10px' }} />
                Contraseña 
              </span>  
              {/* <button
                type="button"
                className="toggle-visibility"
                onClick={() => setShowPassword(!showPassword)}
                >
                {showPassword ? "Ocultar" : "Mostrar"}
              </button> */}
            </div>    
          </div>
          
          {/* <div className="form-group">
            <label className='palabras' htmlFor="password">
              Contraseña {passwordStrength && <span className={`password-strength ${passwordStrength.toLowerCase()}`}>({passwordStrength})</span>}
            </label>
            <div className="input-with-button">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <button
                type="button"
                className="toggle-visibility"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>
          </div> */}
          <div className="form-group">
          <div className='contenedor_inputs'>
              <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
                placeholder=""
                className='input'
              />    
              <span className='text_inputs'>
                <CiLock size={20} style={{ marginRight: '10px' }} />
                Repita la Contraseña
              </span>
              {/* <button
                type="button"
                className="toggle-visibility"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "Ocultar" : "Mostrar"}
              </button> */}
            </div>
          </div>
          {/* <div className="form-group">
            <label className='palabras' htmlFor="confirmPassword">Repite la Contraseña</label>
            <div className="input-with-button">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-visibility"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>
          </div> */}


          <div className="form-group">
            <label className='palabras' htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
            <input type="date" id="fechaNacimiento" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} required />
          </div>
          <div className="form-group">
            <label className='palabras'>Género</label>
            <select value={genero} onChange={(e) => setGenero(e.target.value)} required>
              <option value="">Selecciona tu género</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="otro">Otro</option>
            </select>
          </div>
          <div className="link_registro">
            <button  type="submit" className='boton_mandar_al_registro'>
              Crear cuenta nueva
              <div className="arrow-wrapper">
                  <div className="arrow"></div>
              </div>
            </button>
          </div>
          {/* <button type="submit" className="btn-registro">Registrarse</button> */}
        </form>
      </div>
    </div>
  );
}

export default Registro;
