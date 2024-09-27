import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import ComponenteTexto from "./components/P_text";
import CargadorImagenes from './components/P_imagen';
import './CrearPublicacion.css';
import { FcPicture } from "react-icons/fc";
import Button from '@mui/material/Button';

import { FcPlus } from "react-icons/fc";

export default function CrearPublicacion(props) {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [imagenesSeleccionadas, setImagenesSeleccionadas] = useState([]);

  const onSubmit = (datos) => {
    // Maneja el envío del formulario aquí
    console.log(datos); // Para verificar que se envían las imágenes correctamente
  };

  const manejarImagenesDesdeHijo = (imagenes) => {
    setImagenesSeleccionadas(imagenes);
  };

  useEffect(() => {
    // Cuando imagenesSeleccionadas cambia, actualiza el campo 'imagenes' en el formulario
    if (imagenesSeleccionadas.length > 0) {
      setValue('imagenes', imagenesSeleccionadas); // Establece el valor en el formulario
    }
  }, [imagenesSeleccionadas, setValue]);

  const manejarCancelar = () => {
    // Resetea los valores del formulario
    reset();
    // Limpia el estado de las imágenes seleccionadas
    setImagenesSeleccionadas([]);
  };

  return (
    <>
      {props.condicion && (
        <div className='new-publicacion'>

          <div className="Form-new-publicacion">
            <Button variant="text" id='btn-subir' color="success" type="submit">Subir</Button>
            <Button variant="text" id='btn-cancelar' color='error' type="button" onClick={() => { manejarCancelar(); props.funcion() }}>Cancelar</Button>
            
            {/* Botón de cancelar */}
            
            {console.log(imagenesSeleccionadas)}
            <form id='form' onSubmit={handleSubmit(onSubmit)}>
              <h3>Nueva Publicacion</h3>
              <ComponenteTexto {...register("texto")} />
              <br />
              <CargadorImagenes pasarValorAlPadre={manejarImagenesDesdeHijo} />
              <br />
              <input type="file" {...register('imagenes')} multiple hidden /> {/* input oculto */}
              



            </form>
          </div>
        </div>
      )}
    </>
  );
}
