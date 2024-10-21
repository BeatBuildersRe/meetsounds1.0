import React, { useState, useEffect } from 'react';
import MenuDerechoDiv from "@c/Menu/Derecha";
import '@css/seguridad.css';
import UiverseEdit from '@c/botones/BotonEdit';
import GetAlias from '@services/GetAlias';
import useObtenerUsuario from '@services/GetUsuario';
import { useForm } from 'react-hook-form';

const Seguridad = () => {
  const Alias = GetAlias()
  const { usuario, cargando, error } = useObtenerUsuario(Alias); // Manejo de carga y errores

  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  useEffect(() => {
    if (usuario && !cargando) {


      // Establecer valores en el formulario
      setValue("Contraseña", usuario.contrasena);
      setValue("Email", usuario.email);

    }
  }, [usuario, cargando, setValue]);

  const onSubmit = (data) => {

  };

  /* Visibilidad de la COntraseña */
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const [emailVisible, setemailVisible] = useState(false);
  const toggleEmailVisibility = () => {
    setemailVisible(!emailVisible);
  };

  return (
    <>
      <div className="Contenedor">
        <div className="contenedor2">
          <div className="izquierda-seguridad">
            <div className='titulo-seguridad'>
              <h2>Seguridad</h2>
            </div>
            <div className="seguridad">
              <form className='Formulario-Seguridad' onSubmit={handleSubmit(onSubmit)}>
                <h4>Contraseña</h4>
                <div className="seguridad-contraseña">
                  <div id='Div1'>
                    <div className="input-container">
                      <input
                        {...register('Contraseña')}
                        type={passwordVisible ? "text" : "password"}
                        id="password"
                        placeholder='min. 8 caracteres'
                      />
                      <span
                        className="toggle-password"
                        onClick={togglePasswordVisibility} // Evento onClick de React
                        style={{ cursor: 'pointer' }}
                      >
                        {passwordVisible ? "🙈" : "👁️"} {/* Cambia el ícono según el estado */}
                      </span>
                    </div>
                    <input type="checkbox" id="toggle" className="toggle" />
                    <label id='btn-editar-contraseña' for="toggle" class="boton-expandir">
                      editar
                    </label>
                    {/* Div ocullto de contraseñas */}
                    <div className="miDiv">
                      <h5>Nueva Contraseña:</h5>
                      <div className="input-container">
                        <input
                          {...register('NuevaContraseña')}
                          type={passwordVisible ? "text" : "password"}
                          id="password"
                          placeholder='min. 8 caracteres'
                        />
                        <span
                          className="toggle-password"
                          onClick={togglePasswordVisibility} // Evento onClick de React
                          style={{ cursor: 'pointer' }}
                        >
                          {passwordVisible ? "🙈" : "👁️"} {/* Cambia el ícono según el estado */}
                        </span>
                      </div>
                      <br />
                      <h5>Repetir Contraseña</h5>
                      <div className="input-container">
                        <input
                          {...register('RepetirContraseña')}
                          type={passwordVisible ? "text" : "password"}
                          id="password"
                          placeholder='min. 8 caracteres'
                        />
                        <span
                          className="toggle-password"
                          onClick={togglePasswordVisibility} // Evento onClick de React
                          style={{ cursor: 'pointer' }}
                        >
                          {passwordVisible ? "🙈" : "👁️"} {/* Cambia el ícono según el estado */}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* ------------------------------------------------------------ */}
                <h4>Email</h4>
                <div className="seguridad-contraseña">
                  <div id='Div1'>
                    <div className="input-container">
                      <input
                        {...register('Email')}
                        type={emailVisible ? "text" : "password"}
                        id="password"
                        placeholder='min. 8 caracteres'
                      />
                      <span
                        className="toggle-password"
                        onClick={toggleEmailVisibility} // Evento onClick de React
                        style={{ cursor: 'pointer' }}
                      >
                        {emailVisible ? "🙈" : "👁️"} {/* Cambia el ícono según el estado */}
                      </span>
                    </div>
                    <input type="checkbox" id="toggle2" className="toggle2" />
                    <label id='btn-editar-contraseña2' for="toggle2" class="boton-expandir2">
                      editar
                    </label>
                    {/* Div ocullto de contraseñas */}
                    <div className="miDiv-email">
                      <h5>Nuevo Email:</h5>
                      <div className="input-container">
                        <input
                          {...register('NuevoEmail')}
                          type={emailVisible ? "text" : "password"}
                          id="password"
                          placeholder='min. 8 caracteres'
                        />
                        <span
                          className="toggle-password"
                          onClick={toggleEmailVisibility} // Evento onClick de React
                          style={{ cursor: 'pointer' }}
                        >
                          {emailVisible ? "🙈" : "👁️"} {/* Cambia el ícono según el estado */}
                        </span>
                      </div>
                      <br />
                      <h5>Repetir Email</h5>
                      <div className="input-container">
                        <input
                          {...register('RepetirEmail')}
                          type={emailVisible ? "text" : "password"}
                          id="password"
                          placeholder='min. 8 caracteres'
                        />
                        <span
                          className="toggle-password"
                          onClick={toggleEmailVisibility} // Evento onClick de React
                          style={{ cursor: 'pointer' }}
                        >
                          {emailVisible ? "🙈" : "👁️"} {/* Cambia el ícono según el estado */}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

              </form>
            </div>
          </div>

          <MenuDerechoDiv />
        </div>
      </div>
    </>
  );
};

export default Seguridad;
