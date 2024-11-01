 /* Services */
import GetAlias from '@services/GetAlias';
import useObtenerUsuario from '@services/GetUsuario';
import useUpdateUsuario from '@services/UpdateUsuario'; // Hook para actualizar el usuario
/* Css */
import '@css/Colores.css'
import '@css/Perfil_Y_Portada.css';
/* React */
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
/* Componentes */
import MenuDerechoDiv from "@c/Menu/Derecha";
import UploadAvatar from '@c/UploadAvatar';
import UploadPortada from '@c/UploadPortada';
import UiverseEdit from '@c/botones/BotonEdit';
import Avatars from '@c/avatar/AvatarV2';

const Perfil_Y_Portada = () => {
    const user = GetAlias();
    const { usuario, cargando, error } = useObtenerUsuario(user); // Manejo de carga y errores
    const { actualizarUsuario, cargando: actualizando, error: errorActualizando } = useUpdateUsuario(); // Hook de actualización

    const [estadoEdicion, setEstadoEdicion] = useState({ perfil: false, portada: false });
    const [imagenes, setImagenes] = useState({
        perfil: '',
        portada: ''
    });

    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    useEffect(() => {
        if (usuario && !cargando) {
            setImagenes({
                perfil: usuario.fotoPerfilUrl || '',
                portada: usuario.fotoPortadaUrl || ''
            });

            // Establecer valores en el formulario
            setValue("Nombre", usuario.nombre);
            setValue("Apellido", usuario.apellido);
            setValue("Edad", usuario.edad);
            setValue("Fecha", usuario.fechaNacimiento);
            setValue("Genero", usuario.genero);
        }
    }, [usuario, cargando, setValue]);

    const toggleEdicion = (tipo) => {
        setEstadoEdicion(prev => ({ ...prev, [tipo]: !prev[tipo] }));
    };

    const guardarImagen = (tipo, imagen) => {
        setImagenes(prev => ({ ...prev, [tipo]: imagen }));
    };

    const onSubmit = (data) => {
        const alias = user;
        const nombre = data.Nombre;
        const apellido = data.Apellido;
        actualizarUsuario({ alias, nombre, apellido });
    };

/*     if (cargando) return <p>Cargando datos...</p>;
/*     if (actualizando) return <p>Actualizando datos...</p>;
 */    

    return (
        <div className="Contenedor">
            <div className="contenedor2">
                <div className="izquierda-Perfil-Y-Portada">
                    <div className='titulo-portada'>
                        <h2>Perfil Y Portada</h2>
                    </div>
                    <div className='media'>
                        <div className="Portada">
                            <img id="Portada" src={imagenes.portada} alt="Portada" />
                            <Avatars class='Perfil' imagen={imagenes.perfil} width={100} height={100} />

                            {/* Botones para editar perfil o portada */}
                            {!estadoEdicion.perfil && !estadoEdicion.portada && (
                                <>
                                    <button id='editar-perfil' onClick={() => toggleEdicion('perfil')}>
                                        <UiverseEdit />
                                    </button>
                                    <button id='editar-portada' onClick={() => toggleEdicion('portada')}>
                                        <UiverseEdit />
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Editar perfil */}
                    {estadoEdicion.perfil && (
                        <UploadAvatar
                            btn_cancelar={() => toggleEdicion('perfil')}
                            onImageSave={(imagen) => guardarImagen('perfil', imagen)}
                            Imagen={imagenes.perfil}
                            Portada={imagenes.portada}
                            alias={user}
                        />
                    )}

                    {/* Editar portada */}
                    {estadoEdicion.portada && (
                        <UploadPortada
                            btn_cancelar={() => toggleEdicion('portada')}
                            onImageSave={(imagen) => guardarImagen('portada', imagen)}
                            Imagen={imagenes.perfil}
                            Portada={imagenes.portada}
                            alias={user}
                        />
                    )}

                    <div className='titulo-datos-personales'>
                        <h3>Datos Personales</h3>
                    </div>

                    <form className='Formulario-Datos-Personales' onSubmit={handleSubmit(onSubmit)}>
                        <div className='NombreYApellido'>
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
                            <p>Género</p>
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
                            <span className="transition"></span>
                            <span className="gradient"></span>
                            <span className="label">Guardar</span>
                        </button>
                    </form>


                </div>
                <MenuDerechoDiv />
            </div>
        </div>
    );
};

export default Perfil_Y_Portada;
