import React from 'react';
import { useForm } from 'react-hook-form';
import MenuDerechoDiv from "@c/Menu/Derecha";
import ServiceBandas from "../../services/ServiceBandas";
import useObtenerUsuarioLogeado from "@services/GetUsuarioLogeado";
import '@css/Bandas.css';

const CrearBanda = () => {
  const { cargando: cargando2, error, CrearBanda, banda } = ServiceBandas();
  const { usuario, cargando, error: errUsuario } = useObtenerUsuarioLogeado();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const idUsuario = usuario?.id || '6724d794e7a89c7dc3dc9ae1'; // Usa el ID del usuario logeado o un ID fijo
    const { nombre, descripcion } = data;

    await CrearBanda({ idUsuario, nombre, descripcion });
  };

  return (
    <div className="Contenedor">
      <div className="contenedor2">
        <div className="izquierda-bandas">
          <h1>Crear Bandas</h1>
          
          {/* Mensaje de error */}
          {error && <p className="error-message">Error: {error}</p>}
          {errUsuario && <p className="error-message">Error usuario: {errUsuario}</p>}

          {/* Formulario para crear banda */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>Nombre:</label>
            <input 
              type="text" 
              {...register("nombre", { required: "Este campo es obligatorio" })} 
            />
            {errors.nombre && <span className="error-text">{errors.nombre.message}</span>}

            <label>Descripción:</label>
            <input 
              type="text" 
              {...register("descripcion", { required: "Este campo es obligatorio" })} 
            />
            {errors.descripcion && <span className="error-text">{errors.descripcion.message}</span>}

          </form>
            <button type="submit" disabled={cargando2}>Crear Banda</button>
        </div>

        {/* Componente de menú */}
        <MenuDerechoDiv />
      </div>
    </div>
  );
};

export default CrearBanda;
