import '@css/DatosPersonales.css';
import { useForm } from "react-hook-form";
import React from 'react';
import MenuDerechoDiv from "../../../Home/Derecha";
import GetAlias from '@services/GetAlias';
import useObtenerUsuario from '@services/GetUsuario';
import useUpdateUsuario from '@services/UpdateUsuario'; // Hook para actualizar el usuario

const DatosPersonales = () => {
    const user = GetAlias();
    const { usuario, cargando, error } = useObtenerUsuario(user);
    const { actualizarUsuario, cargando: actualizando, error: errorActualizando } = useUpdateUsuario(); // Hook de actualización

    // useForm hook para manejar el formulario
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,  // Para establecer los valores de los campos manualmente
    } = useForm();

    // Establecer valores en el formulario cuando `usuario` tenga un valor
    React.useEffect(() => {
        if (usuario) {
            setValue("Nombre", usuario.nombre);
            setValue("Apellido", usuario.apellido);
            setValue("Edad", usuario.edad);
            setValue("Fecha", usuario.fechaNacimiento);
            setValue("Genero", usuario.genero);
        }
    }, [usuario, setValue]);

    const onSubmit = (data) => {
        // Aquí los datos del formulario son enviados
        console.log("Datos enviados: ", data);

        const alias = user;  // Alias del usuario (obtenido de GetAlias)
        const nombre = data.Nombre;  // Obtener el nombre del formulario
        const apellido = data.Apellido;  // Obtener el apellido del formulario

        // Llamar a la mutación para actualizar los datos del usuario
        actualizarUsuario({ alias, nombre, apellido });
    };

    // Manejo de carga y error para obtener los datos del usuario
    if (cargando) return <p>Cargando datos...</p>;
    if (error) return <p>Error al cargar los datos: {error.message}</p>;

    // Manejo de carga y error para la mutación de actualización
    if (actualizando) return <p>Actualizando datos...</p>;
    if (errorActualizando) return <p>Error al actualizar los datos: {errorActualizando.message}</p>;

    return (
        <>
            <div className="Contenedor">
                <div className="contenedor2">
                    <div className="izquierda-datos-personales">
                        <h2>Datos Personales</h2>
                        <h4>#Edita tu infomacion personal y recuerda que los campos no editados se mantendra igual</h4>
                        <form className='Formulario' onSubmit={handleSubmit(onSubmit)}>
                            <div style={{ display: 'flex', gap: '20px' }}>
                                <div className="input-div">
                                    <p>Nombre:</p>
                                    <input className='input'
                                        {...register("Nombre", { required: true })}
                                        placeholder="Nombre"
                                    />
                                    {errors.Nombre && <span>El nombre es obligatorio</span>}
                                </div>

                                <div className="input-div">
                                    <p>Apellido:</p>
                                    <input className='input'
                                        {...register("Apellido", { required: true })}
                                        placeholder="Apellido"
                                    />
                                    {errors.Apellido && <span>El apellido es obligatorio</span>}
                                </div>
                            </div>

                            <div className="input-div">
                                <p>Edad:</p>
                                <input className='input'
                                    {...register("Edad", { required: true, maxLength: 2 })}
                                    placeholder="Edad"
                                />
                                {errors.Edad && <span>La edad es obligatoria y debe tener un máximo de 2 dígitos</span>}
                            </div>

                            <div className="input-div">
                                <p>Fecha Nac:</p>
                                <input className='input'
                                    type="date"
                                    {...register("Fecha", { required: true })}
                                    placeholder="Fecha de Nacimiento"
                                />
                                {errors.Fecha && <span>La fecha de nacimiento es obligatoria</span>}

                            </div>
                            <div className="input-div">
                                <p>Genero</p>

                                <input className='input'
                                    {...register("Genero", { required: true })}
                                    list="generos"
                                    placeholder="Género"
                                />
                                <datalist id="generos">
                                    <option value="Masculino" />
                                    <option value="Femenino" />
                                    <option value="Otro" />
                                </datalist>
                                {errors.Genero && <span>El género es obligatorio</span>}
                            </div>
                            <button type='submit' className='iuverse'>
                                <span class="transition"></span>
                                <span class="gradient"></span>
                                <span class="label">Guardar</span>
                            </button>


                        </form>
                    </div>
                    <MenuDerechoDiv />
                </div>
            </div>
        </>
    );
};

export default DatosPersonales;
