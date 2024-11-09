import React from 'react';
import { useForm } from "react-hook-form";
import ComponenteTexto from "./components/P_text";
import './CrearPublicacion.css';
import Button from '@mui/material/Button';

export default function CrearPublicacion(props) {
  const { register, handleSubmit, reset } = useForm();

  // Función para manejar el envío del formulario
  const onSubmit = async (datos) => {
    if (!datos.texto) {
      alert("La descripción no puede estar vacía.");
      return;
    }

    // Crear FormData solo con idAlias y descripcion
    const formData = new FormData();
    formData.append("idAlias", "mi_alias");  // Reemplaza con el alias real
    formData.append("descripcion", datos.texto);

    // Enviar la solicitud con fetch
    try {
      const response = await fetch("http://localhost:8080/crearPublicacion", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Publicación creada con éxito");
        reset(); // Limpiar el formulario después de enviar
        props.funcion(); // Cerrar modal o realizar otra acción
      } else {
        const errorText = await response.text();
        console.error("Error en el servidor:", errorText);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <>
      {props.condicion && (
        <div className='new-publicacion'>
          <div className="Form-new-publicacion">
            <Button variant="text" id='btn-subir' color="success" type="button" onClick={handleSubmit(onSubmit)}>
              Publicar
            </Button>
            <Button variant="text" id='btn-cancelar' color='error' type="button" onClick={() => { reset(); props.funcion(); }}>
              Cancelar
            </Button>

            <form id='form'>
              <h3>Nueva Publicación</h3>
              <ComponenteTexto {...register("texto")} />
            </form>
          </div>
        </div>
      )}
    </>
  );
}
