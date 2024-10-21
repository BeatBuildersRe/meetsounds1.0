import React, { useState, useEffect } from 'react';
import MenuDerechoDiv from "@c/Menu/Derecha";
import '@css/seguridad.css';
import GetAlias from '@services/GetAlias';
import useObtenerUsuario from '@services/GetUsuario';
import { useForm } from 'react-hook-form';
import PhoneNumberValidation from '@c/Formulario_telefono/CodigoTelefono';
import { FcHighPriority } from "react-icons/fc";
import useUpdateContraseña from '../../../services/UpdateContraseña';
import { IoEyeSharp } from "react-icons/io5";

const Seguridad = () => {
  const Alias = GetAlias()
  const { usuario, cargando, error } = useObtenerUsuario(Alias); // Manejo de carga y errores
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // Estado para manejar si el botón está deshabilitado
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();
  const { actualizarContraseña, cargando: cargandoContraseña, error: errorActualizacion } = useUpdateContraseña(); // Desestructurar el hook
  const [errorContraseña, setErrorContraseña] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorTelefono, setErrorTelefono] = useState("");
  // Monitorear los valores del formulario
  const watchedEmail = watch("NuevoEmail");
  const watchedTelefono = watch("NuevoTelefono");
  const watchedContraseña = watch("NuevaContraseña");

  useEffect(() => {
    if (usuario && !cargando) {
      setValue("Email", usuario.email);
      setValue("Telefono", usuario.telefono);
      setValue("Contraseña", usuario.contrasena);
    }
  }, [usuario, cargando, setValue]);
  useEffect(() => {
    // Si hay cambios en cualquiera de los campos, habilitar el botón
    if (watchedEmail || watchedTelefono || watchedContraseña) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [watchedEmail, watchedTelefono, watchedContraseña]);


  useEffect(() => {
    if (usuario && !cargando) {


      // Establecer valores en el formulario (defect value)
      setValue("Email", usuario.email);
      setValue('Telefono', usuario.telefono)
      setValue("Contraseña", usuario.contrasena);



    }
  }, [usuario, cargando, setValue]);

  const onSubmit = (data) => {
    const contraseñaActual = data.Contraseña
    const contrasenaNueva = data.NuevaContraseña
    const contrasenaRepetida = data.RepetirContraseña
    const emailActual = data.Email
    const emailNueva = data.NuevoEmail
    const emailRepetida = data.RepetirEmail
    const TelefonoActual = data.Telefono
    const TelefonoNueva = data.NuevoTelefono
    const TelefonoRepetida = data.RepetirTelefono

    if (watchedContraseña) {
      if (contraseñaActual == usuario.contrasena) {
        if (contrasenaNueva == contrasenaRepetida) {
          setErrorContraseña(<p style={{ color: 'green' }}> Cargando...</p>)
          actualizarContraseña({ id: usuario.id, contrasena: contrasenaNueva }); 
        } else {
          setErrorContraseña('La nueva contraseña no coinciden')
        }
      } else {
        setErrorContraseña("ingresa la contraseña actual")
      }
    }
    if (watchedEmail) {
      if (emailActual == usuario.email) {
        if (emailNueva == emailRepetida) {
          setErrorEmail(<p style={{ color: 'green' }}> Cargando...</p>)

        } else {
          setErrorEmail('El nuevo email no coinciden')
        }
      } else {
        setErrorEmail("ingresa el email actual")
      }
    }
    if (watchedTelefono) {
      if (TelefonoActual == usuario.telefono) {
        if (TelefonoNueva == TelefonoRepetida) {
          /* Envio a la bd */
          setErrorTelefono(<p style={{ color: 'green' }}> Cargando...</p>)
        } else {
          setErrorTelefono('El nuevo Telefono no coinciden')
        }
      } else {
        setErrorTelefono("ingresa el Telefono actual")
      }
    }
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
  const [telefonoVisible, settelefonoVisible] = useState(false);
  const toggletelefonoVisibility = () => {
    settelefonoVisible(!telefonoVisible);
  };

  const { validacion, numero } = PhoneNumberValidation('542612496079')

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
                <h4>Email</h4>
                <div className="seguridad-contraseña">
                  <div id='Div1'>
                    <div className="input-container">
                      <input
                        {...register('Email')}
                        type={emailVisible ? "text" : "password"}
                        id="password"
                        disabled
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
                    {/* Div ocullto de Email */}
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
                    {errorEmail && <div className='errors'> <FcHighPriority /><p>{errorEmail}</p><FcHighPriority /></div>}

                  </div>
                </div>

                {/* ------------------------------------------------------------ */}
                <h4>Contraseña</h4>
                <div className="seguridad-contraseña">
                  <div id='Div1'>
                    <div className="input-container">
                      <input
                        {...register('Contraseña', {minLength:8})}
                        type={passwordVisible ? "text" : "password"}
                        id="password"
                        disabled
                        placeholder='min. 8 caracteres'
                      />
                      <span
                        className="toggle-password"
                        onClick={togglePasswordVisibility} // Evento onClick de React
                        style={{ cursor: 'pointer' }}
                      >
                        {passwordVisible ? "🙈" : "👁️"} {/* Cambia el ícono según el estado */}
                      </span>
                      {/* Div de error aqui */}
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
                          {...register('NuevaContraseña', {minLength:8})}
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
                          {...register('RepetirContraseña', {minLength:8})}
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
                    {errorContraseña && <div className='errors'> <FcHighPriority /><p>{errorContraseña}</p><FcHighPriority /></div>}

                  </div>
                </div>

                {/* -------------------------------------------------------------- */}
                <h4>Telefono</h4>
                <div className="seguridad-contraseña">
                  <div id='Div1'>
                    <div className="input-container">
                      <input
                        {...register('Telefono')}
                        type={telefonoVisible ? "text" : "password"}
                        id="password"
                        disabled
                        placeholder='+?? Number'
                      />
                      <span
                        className="toggle-password"
                        onClick={toggletelefonoVisibility} // Evento onClick de React
                        style={{ cursor: 'pointer' }}
                      >
                        {telefonoVisible ? "🙈" : "👁️"} {/* Cambia el ícono según el estado */}
                      </span>
                    </div>
                    <input type="checkbox" id="toggle3" className="toggle3" />
                    <label id='btn-editar-contraseña3' for="toggle3" class="boton-expandir3">
                      editar
                    </label>
                    {/* Div ocullto de contraseñas */}
                    <div className="miDiv-telefono">
                      <h5>Nuevo Telefono:</h5>
                      <div className="input-container">
                        <input
                          {...register('NuevoTelefono')}
                          type={telefonoVisible ? "text" : "password"}
                          id="password"
                          placeholder='+?? Number'

                        />
                        <span
                          className="toggle-password"
                          onClick={toggletelefonoVisibility} // Evento onClick de React
                          style={{ cursor: 'pointer' }}
                        >
                          {telefonoVisible ? "🙈" : "👁️"} {/* Cambia el ícono según el estado */}
                        </span>
                      </div>
                      <br />
                      <h5>Repetir Telefono</h5>
                      <div className="input-container">
                        <input
                          {...register('RepetirTelefono')}
                          type={telefonoVisible ? "text" : "password"}
                          id="password"
                          placeholder='+?? Number'

                        />
                        <span
                          className="toggle-password"
                          onClick={toggletelefonoVisibility} // Evento onClick de React
                          style={{ cursor: 'pointer' }}
                        >
                          {telefonoVisible ? "🙈" : "👁️"} {/* Cambia el ícono según el estado */}
                        </span>
                      </div>
                    </div>
                    {errorTelefono && <div className='errors'> <FcHighPriority /><p>{errorTelefono}</p><FcHighPriority /></div>}

                  </div>
                </div>
                <div className='guardar-seguridad'>
                  <button type='submit' className='iuverse' disabled={isButtonDisabled}>
                    <span className="transition"></span>
                    <span className="gradient"></span>
                    <span className="label">Guardar</span>
                  </button>
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
