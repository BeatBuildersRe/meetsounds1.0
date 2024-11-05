import React, { useState, useEffect } from "react";
import MenuDerechoDiv from "@c/Menu/Derecha";
import "@css/seguridad.css";
import GetAlias from "@services/GetAlias";
import useObtenerUsuario from "@services/GetUsuario";
import { useForm } from "react-hook-form";
import warning from "@public/warning.svg";
import useUpdateUsuario from "@services/UpdateUsuario";
import PhoneNumberValidation from "@c/Formulario_telefono/CodigoTelefono";
const Seguridad = () => {
  const Alias = GetAlias();
  const { usuario, cargando, error } = useObtenerUsuario(Alias);
  const {consulta,cargando: actualizando,error: problema,actualizarEmail,actualizarContraseña,actualizarTelefono} = useUpdateUsuario();
  
  // Validacion del telefono
  const [phone, setPhone] = useState('');
  const { validacion, numero, pais } = PhoneNumberValidation(phone);

  // Form email
  const {register,handleSubmit,setError,formState: { errors },} = useForm();
  // Form password
  const {register: registerPassword,handleSubmit: handleSubmitPassword,setError: setErrorPassword,formState: { errors: errorsPassword },} = useForm();
  // Form telefono
  const {register: registerTelefono,handleSubmit: handleSubmitTelefono,setError: setErrorTelefono,formState: { errors: errorsTelefono },} = useForm();
  //Fin

  const onSubmit = (data) => {
    if (data.email == usuario.email) {
      if (data.email_nuevo == data.email_repetido) {
        actualizarEmail({ id: usuario.id, email: data.email_nuevo });
      } else {
        setError("email_nuevo", {
          type: "manual",
          message: "Los email no coiciden estre si",
        });
      }
    } else {
      setError("email", {
        type: "manual",
        message: "El email no coincide con el email actual",
      });
    }
  };

  const onSubmitContraseña = (data) => {
    if (data.contraseña == usuario.contrasena) {
      if (data.contraseña_nuevo == data.contraseña_repetido) {
        actualizarContraseña({
          id: usuario.id,
          contrasena: data.contraseña_nuevo,
        });
      } else {
        setErrorPassword("contraseña_nuevo", {
          type: "manual",
          message: "Las contraseña no coiciden estre si",
        });
      }
    } else {
      setErrorPassword("contraseña", {
        type: "manual",
        message: "La contraseña no coincide con la actual",
      });
    }
  };

  const onSubmitTelefono = (data) => {
    if (data.telefono == usuario.telefono) {
      if (data.telefono_nuevo == data.telefono_repetido) {
        if (data.telefono_codigo == data.telefono_codigo2){
          const newNumero = data.telefono_codigo.concat(data.telefono_nuevo);
          setPhone(newNumero)
          console.log(validacion, numero, pais, 'newNumero:', newNumero)
            if (validacion){
              actualizarTelefono({id: usuario.id, telefono: newNumero});
              console.info('se actualizo')
            }else{
              console.error('numero no se actu');
              
              setErrorTelefono("telefono_repetido", {
                type: "manual",
                message: "Telefono invalido",
              });
            }
        }else{
          setErrorTelefono("telefono_codigo", {
            type: "manual",
            message: "Cod Telefono invalido",
          });
        }
      } else {
        setErrorTelefono("telefono_nuevo", {
          type: "manual",
          message: "Las telefono no coiciden estre si",
        });
      }
    } else {
      setErrorTelefono("telefono", {
        type: "manual",
        message: "La telefono no coincide con la actual",
      });
    }
  };
  return (
    <>
      <div className="Contenedor">
        <div className="contenedor2">
          <div className="izquierda-busqueda">
            <div className="seccion">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="botonesX">
                  <h4>Email</h4>
                  <label class="toggle-button" for="toggle">
                    Editar
                  </label>
                </div>
                <input type="checkbox" id="toggle" />
                <div className="box">
                  <div className="advertencia">
                    <img className="adventencia-icon" src={warning} alt="" />
                    <p> Recuerda mantener las configuraciones actualizadas </p>
                    <img className="adventencia-icon" src={warning} alt="" />
                  </div>
                  <div className="formulario-seguridad">
                    <div className="campo">
                      <label className="labels-seguridad"> Email actual:</label>
                      <input
                        {...register("email", {
                          required: "Email actual requerido",
                        })}
                        className="inputs-seguridad"
                        type="email"
                        placeholder=""
                      />
                      {errors.email && <p>{errors.email.message}</p>}
                    </div>
                    <div className="campo">
                      <label className="labels-seguridad"> Nuevo Email:</label>
                      <input
                        {...register("email_nuevo", {
                          required: "Nuevo email requerido",
                        })}
                        className="inputs-seguridad"
                        type="email"
                        placeholder="Nuevo Email"
                      />
                      {errors.email_nuevo && (
                        <p>{errors.email_nuevo.message}</p>
                      )}
                    </div>
                    <div className="campo">
                      <label className="labels-seguridad">Repetir Email:</label>
                      <input
                        {...register("email_repetido", {
                          required: "Email repetido requerido",
                        })}
                        className="inputs-seguridad"
                        type="email"
                        placeholder="Repetir Email"
                      />
                    </div>
                    <div className="botones-control">
                      <button className="btnCancelar-seguridad" type="submit">
                        Cancelar
                      </button>
                      <button className="btnGuardar-seguridad" type="submit">
                        Guardar
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="seccion">
              <form onSubmit={handleSubmitPassword(onSubmitContraseña)}>
                <div className="botonesX">
                  <h4>Contraseña</h4>
                  <label class="toggle-button-seguridad" for="toggle-seguridad">
                    Editar
                  </label>
                </div>
                <input type="checkbox" id="toggle-seguridad" />
                <div className="box-contraseña">
                  <div className="advertencia">
                    <img className="adventencia-icon" src={warning} alt="" />
                    <p> Recuerda mantener las configuraciones actualizadas </p>
                    <img className="adventencia-icon" src={warning} alt="" />
                  </div>
                  <div className="formulario-seguridad">
                    <div className="campo">
                      <label className="labels-seguridad">
                        {" "}
                        Contraseña actual:
                      </label>
                      <input
                        {...registerPassword("contraseña", {
                          required: "contraseña actual requerida",
                        })}
                        className="inputs-seguridad"
                        type="password"
                        placeholder="Contraseña"
                      />
                      {errorsPassword.contraseña && (
                        <p>{errorsPassword.contraseña.message}</p>
                      )}
                    </div>
                    <div className="campo">
                      <label className="labels-seguridad">
                        {" "}
                        Nueva contraseña:
                      </label>
                      <input
                        {...registerPassword("contraseña_nuevo", {
                          required: "nueva contraseña requerida",
                        })}
                        className="inputs-seguridad"
                        type="password"
                        placeholder="Nuevo Contraseña"
                      />
                      {errorsPassword.contraseña_nuevo && (
                        <p>{errorsPassword.contraseña_nuevo.message}</p>
                      )}
                    </div>
                    <div className="campo">
                      <label className="labels-seguridad">
                        Repetir contraseña:
                      </label>
                      <input
                        {...registerPassword("contraseña_repetido", {
                          required: "contraseña repetida requerida",
                        })}
                        className="inputs-seguridad"
                        type="password"
                        placeholder="Repetir Contraseña"
                      />
                    </div>
                    <div className="botones-control">
                      <button className="btnCancelar-seguridad" type="submit">
                        Cancelar
                      </button>
                      <button className="btnGuardar-seguridad" type="submit">
                        Guardar
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="seccion">
              <form onSubmit={handleSubmitTelefono(onSubmitTelefono)}>
                <div className="botonesX">
                  <h4>Telefono</h4>
                  <label class="toggle-button-telefono" for="toggle-telefono">
                    Editar
                  </label>
                </div>
                <input type="checkbox" id="toggle-telefono" />
                <div className="box-telefono">
                  <div className="advertencia">
                    <img className="adventencia-icon" src={warning} alt="" />
                    <p> Recuerda mantener las configuraciones actualizadas </p>
                    <img className="adventencia-icon" src={warning} alt="" />
                  </div>
                  <div className="formulario-seguridad">
                    <div className="campo">
                      <label className="labels-seguridad">
                        Telefono actual:
                      </label>
                      <input
                        {...registerTelefono("telefono", {
                          required: "Telefono requerido",
                        })}
                        className="inputs-seguridad"
                        type="text"
                        placeholder="Telefono"
                      />
                       {errorsTelefono.telefono && (
                        <p>{errorsTelefono.telefono.message}</p>
                      )}
                    </div>
                    <div className="campo">
                      <label className="labels-seguridad">
                        Nuevo telefono:
                      </label>
                      
                      <input
                      {...registerTelefono("telefono_codigo", {
                        required: "Cod telefono requerido",
                      })}
                        className="inputs-seguridad-cod"
                        
                        type="text"
                        placeholder="Cod"
                      />
                      <input
                      {...registerTelefono("telefono_nuevo", {
                        required: "Nuevo telefono requerido",
                      })}
                        className="inputs-seguridad"
                        type="text"
                        placeholder="Nuevo Telefono"
                      />
                     
                      {errorsTelefono.telefono_nuevo && (
                        <p>{errorsTelefono.telefono_nuevo.message}</p>
                      )}
                    </div>
                    <div className="campo">
                      <label className="labels-seguridad">
                        Repetir telefono:
                      </label>
                      <input
                      {...registerTelefono("telefono_codigo2", {
                        required: "Cod telefono requerido",
                      })}
                        className="inputs-seguridad-cod"
                        
                        type="text"
                        placeholder="Cod"
                      />
                      <input
                      {...registerTelefono("telefono_repetido", {
                        required: "Telefono repetido requerido",
                      })}
                        className="inputs-seguridad"
                        type="text"
                        placeholder="Repetir Telefono"
                      />
                      {errorsTelefono.telefono_repetido && (
                        <p>{errorsTelefono.telefono_repetido.message}</p>
                      )}
                      {errorsTelefono.telefono_codigo && (
                        <p>{errorsTelefono.telefono_codigo.message}</p>
                      )}
                    </div>
                    <div className="botones-control">
                      <button className="btnCancelar-seguridad" type="submit">
                        Cancelar
                      </button>
                      <button className="btnGuardar-seguridad" type="submit">
                        Guardar
                      </button>
                      
                    </div>
                  </div>
                </div>
                
              </form>
            </div>

          </div>

          <MenuDerechoDiv></MenuDerechoDiv>
        </div>
      </div>
    </>
  );
};

export default Seguridad;
