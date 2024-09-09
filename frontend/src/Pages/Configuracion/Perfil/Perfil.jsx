// Perfil.js
import * as React from 'react';
import { useState } from "react";
import { FiUpload } from "react-icons/fi"; // Ejemplo de icono de subida

import TextField from '@mui/material/TextField';
import "./Perfil.css";
import Formulario_telefono from '../../../components/Formulario_telefono/CodigoTelefono';
import Button from '@mui/material/Button';
import { useForm } from "react-hook-form";
import { FiAlertCircle } from "react-icons/fi";
import imagen_de_perfil from '../../../../public/perfil_imagen.png'
import imagen_de_fondo from '../../../../public/ract.jpg'
import { MdModeEdit } from "react-icons/md";
import Subir_Imagen from '../../../components/Subir Imagen/Subir_imagen';
import { styled } from '@mui/material';


// Componente para subir imagen
function SubirImagen({ id, setImagen }) {
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Almacenar la imagen seleccionada en la variable de estado
            setImagen(URL.createObjectURL(file));
        }
    };

    return (
        <>
            <div>
                <input id={id} type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} ></input>
            </div>
            <label htmlFor={id} className="custom-file-upload">
                <FiUpload size={24} />
            </label>
        </>
    );
}

function Perfil() {
    const [imagenPerfil, setImagenPerfil] = useState(null);
    const [imagenFondo, setImagenFondo] = useState(null);
    const texto = "En esta página puedes actualizar la información de tu perfil. Los campos que decidas modificar serán actualizados en tu cuenta, mientras que la información que no edites se mantendrá sin cambios. Asegúrate de revisar cuidadosamente todos los detalles antes de guardar los cambios.";



    /* una ves echa la conexion con la bd se puede borrar */
    let UsuarioXDefecto = {
        Usuario: {
            nombre: 'Mauro',
            apellido: 'Berni',
            edad: 18,
            telefono: '42342534',
            gmail: 'mauro@gmail.com',
            imagen_de_fondo: '/frontend/public/concierto1.jpeg',
            imagen_de_perfil: '/frontend/public/ract.jpg'

        }
    }
    const { register, formState: { errors }, handleSubmit } = useForm();

    const onSubmit = (data) => {
        /* aqui se envia/llega la info del formulario */
        /* Aqui estaria la logica del formulario a la bd */
    }
   

    return (
        <>
            <html lang="en">
                <body>
                    <div className="ContenedorPerfil2">

                        <h2 id="h2">Perfil</h2>
                        <div className='seccion_1'>
                            <div className='advertencia'>
                                < FiAlertCircle id='icon' />
                                <p id='p'>{texto}</p>
                            </div>
                        </div>
                        <div className='seccion_2'>
                            <SubirImagen id="fondo-input" setImagen={setImagenFondo} />
                            <img
                                id="img_fondo"
                                src={imagenFondo ? imagenFondo : imagen_de_fondo}
                                alt="Imagen de fondo"
                            />

                            <SubirImagen id="perfil-input" setImagen={setImagenPerfil} />
                            <img
                                id="img_perfil"
                                src={imagenPerfil ? imagenPerfil : imagen_de_perfil}
                                alt="Imagen de perfil"
                            />

                        </div>
                        <div className="seccion_3">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="formulario_inputs">
                                    <div className='NombreyApellido'>
                                        <TextField className='textfiel' {...register('Nombre', { maxLength:20 })}
                                            label='Nombre'
                                            type="text"
                                            /* 
                                                value="valor"

                                                Es el valor que tendra el campo por defecto si no se rellana, si el
                                                usuario tiene de nombre "Juan" y no ingresa un nuevo nombre se enviara
                                                "Juan" al formulario

                                                Pero si ingresa un nuevo nombre "Pedro" se enciara Pedro al formulario

                                                Recordar poder los demas (value="") a los otros campos al hacer la conexion
                                                a la bd
                                            */
                                            value={UsuarioXDefecto.Usuario.nombre}
                                            color={errors.Nombre && 'error'}
                                            placeholder={UsuarioXDefecto.Usuario.nombre}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    color: 'white',
                                                    '& fieldset': {
                                                        borderColor: 'white',
                                                    },
                                                },
                                                '& .MuiInputLabel-root': {
                                                    color: 'white', // Cambia 'blue' por el color deseado
                                                },
                                            }}
                                        />




                                        <TextField className='textfiel' {...register('Apellido', {maxLength:20 })}
                                            label="Apellido"
                                            type="text"
                                            placeholder={UsuarioXDefecto.Usuario.apellido}
                                            color={errors.Apellido ? 'error' : ""}

                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    color: 'white',
                                                    '& fieldset': {
                                                        borderColor: 'white',
                                                    },
                                                },
                                                '& .MuiInputLabel-root': {
                                                    color: 'white', // Cambia 'blue' por el color deseado
                                                },
                                            }}
                                        />

                                    </div>
                                    {/* La conexion a bd se tendra que hacer dentro del componente */}
                                    <div className='textfiel' >
                                        <Formulario_telefono placeholder={UsuarioXDefecto.Usuario.telefono} errors={errors ? "" : "error"} />

                                    </div>

                                    <TextField className='textfiel' {...register('Edad', { maxLength:2, validate: value => value <= 99  })}
                                            label='Edad'
                                            type="number"
                                            color={errors.Edad ? 'error' : ""}

                                            placeholder={UsuarioXDefecto.Usuario.edad}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    color: 'white',
                                                    '& fieldset': {
                                                        borderColor: 'white',
                                                    },
                                                },
                                                '& .MuiInputLabel-root': {
                                                    color: 'white', // Cambia 'blue' por el color deseado
                                                },
                                            }}
                                        />
                                  

                                    <TextField className='textfiel' {...register('Gmail', {
                                        maxLength: 20,
                                        pattern: {
                                            /* Vefifica que se haya ingresado un email */
                                            value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                                            message: 'Solo se permiten correos de Gmail'
                                        }
                                    })}
                                        label="Gmail"
                                        type="email"
                                        color={errors.Gmail ? 'error' : ""}

                                        placeholder={UsuarioXDefecto.Usuario.gmail}

                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                color: 'white',
                                                '& fieldset': {
                                                    borderColor: 'white',
                                                },
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: 'white', // Cambia 'blue' por el color deseado
                                            },
                                        }}

                                    />



                                    <Button type='submit' variant="outlined">Guardar</Button>

                                </div>
                            </form>
                        </div>
                    </div>

                </body>
            </html>
        </>
    )
}

export default Perfil;
