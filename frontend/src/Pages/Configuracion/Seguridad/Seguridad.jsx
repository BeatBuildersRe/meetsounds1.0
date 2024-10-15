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
import MenuDerechoDiv from "../../Home/Derecha";

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
     
    </>
  );
}

