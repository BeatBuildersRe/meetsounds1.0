import { useForm } from "react-hook-form";
import './seguridad.css'
import img from '../../../img/seguridad.jpg'
import img2 from '../../../img/seguridad2.jpg'
import Stack from '@mui/material/Stack';
import Formulario_telefono from "../../../components/Formulario_telefono/CodigoTelefono";
import React, { useState, useEffect } from 'react';
import { MuiTelInput } from 'mui-tel-input';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { TextField, Button } from '@mui/material';
import { Link } from 'react-router-dom';


export default function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  const password = watch("Contraseña");
  const email = watch("Email");

  // Datos anteriores del usuario, incluyendo el teléfono
  let U = {
    Usuario: {
      nombre: 'Mauro',
      apellido: 'Berni',
      contraseña: '123456789',
      email: 'mauroberni002@gmail.com',
      telefono: '+541123456789' // Teléfono anterior
    },
  };

  return (
    <>
      <div className="Contenedor-seguridad">
        <h2 id='titulo'>Seguridad</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="card">
            <div className="form-section">
              <TextField className="textfield"
                {...register("Contraseña", {
                  required: "La contraseña es obligatoria",
                  maxLength: {
                    value: 20,
                    message: "La contraseña no puede tener más de 20 caracteres"
                  },
                  minLength: {
                    value: 8,
                    message: "Mínimo de 8 caracteres"
                  }
                })}
                id="standard-password-input-1"
                label="Contraseña"
                type="password"
                autoComplete="current-password"
                variant="standard"
                error={!!errors.Contraseña}
                helperText={errors.Contraseña ? errors.Contraseña.message : ""}
                defaultValue={U.Usuario.contraseña}
              />

              <TextField className="textfield"
                {...register("Repetir_Contraseña", {
                  required: "Debe repetir la contraseña",
                  maxLength: {
                    value: 20,
                    message: "La contraseña no puede tener más de 20 caracteres"
                  },
                  validate: (value) =>
                    value === password || "Las contraseñas no coinciden"
                })}
                id="standard-password-input-2"
                label="Repetir Contraseña"
                type="password"
                autoComplete="current-password"
                variant="standard"
                error={!!errors.Repetir_Contraseña}
                helperText={errors.Repetir_Contraseña ? errors.Repetir_Contraseña.message : ""}
                defaultValue={U.Usuario.contraseña}
              />
            </div>
          </div>

          {/* Card Email */}
          <div className="card">
            <div className="image_section"></div>
            <div className="form-section">
              <TextField className="textfield"
                {...register("Email", {
                  required: "El email es obligatorio",
                  minLength: {
                    value: 8,
                    message: "Mínimo de 8 caracteres"
                  }
                })}
                id="standard-password-input-3"
                label="Email"
                type="email"
                autoComplete="email"
                variant="standard"
                error={!!errors.Email}
                helperText={errors.Email ? errors.Email.message : ""}
                defaultValue={U.Usuario.email}
              />

              <TextField className="textfield"
                {...register("Repetir_Email", {
                  required: "Debe repetir el email",
                  validate: (value) =>
                    value === email || "Los emails no coinciden"
                })}
                id="standard-password-input-4"
                label="Repetir Email"
                type="email"
                autoComplete="email"
                variant="standard"
                error={!!errors.Repetir_Email}
                helperText={errors.Repetir_Email ? errors.Repetir_Email.message : ""}
                defaultValue={U.Usuario.email}
              />
            </div>
          </div>

          {/* Teléfono */}
          <div className="card">
            <div className="form-section">
              <Formulario_telefono
                register={register}
                name="Telefono"
                placeholder="Ingrese su teléfono"
                errors={errors}
                defaultValue={U.Usuario.telefono} // Valor previo del teléfono
              />
            </div>
          </div>

          <div className="buttons">
            <Link to="/configuracion">
              <Button type="submit" id="btn-1" variant="outlined" color="error">
                Cancelar
              </Button>
            </Link>
            <Button type="submit" id="btn-2" variant="outlined" color="success">
              Guardar
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
