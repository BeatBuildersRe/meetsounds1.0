// Perfil.js
import * as React from 'react';
import TextField from '@mui/material/TextField';
import "./Perfil.css";
import Formulario_telefono from '../../../components/Formulario_telefono/CodigoTelefono';
import Button from '@mui/material/Button';
import { useForm } from "react-hook-form";
import { FiAlertCircle } from "react-icons/fi";
import imagen_de_perfil from '../../../../public/perfil_imagen.png'
import imagen_de_fondo from '../../../../public/ract.jpg'
import { MdModeEdit } from "react-icons/md";

function Perfil() {

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
        /* Aqui estaria la logica del formulario a la bd */
        console.log(data)
    }
    const items = [];

    // Llenar el array con números del 1 al 80 usando un for para la edad
    for (let i = 1; i <= 80; i++) {
        items.push(<option value={i} key={i}>{i}</option>);
    }
    return (
        <>
            {console.log("hola")}
            <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Document</title>
                </head>
                <body>
                    <div className='contenedor_perfil'>
                        <div className="informacion_perfil">
                            <h2 className='h2'>Editar Perfil</h2>
                            <div className='advertencia_perfil'>
                                <FiAlertCircle id="icon" />
                                <p id="p">Actualiza tu perfil con los datos más recientes. Los campos que no modifiques se conservarán tal y como están actualmente. Una vez guardes los cambios, tu perfil reflejará la información actualizada</p>
                            </div>
                        </div>
                        {console.log("hola")}

                        <div className='formulario_imagen'>
                            <div className='imagen_de_fondo'>
                                {/* <img className='imagen_de_fondo_img' src={imagen_de_fondo} alt="" />
                                <MdModeEdit className='btn_editar_fondo' /> */}
                                <img className='imagen_de_perfil_img' src={imagen_de_perfil} alt="" />


                            </div>
                            {/* <div className="imagen_de_perfil">
                                <img className='imagen_de_perfil_img' src={imagen_de_perfil} alt="" />
                                 <MdModeEdit className='btn_editar_perfil' /> 
                            </div> */}

                        </div>
                        <div className="formulario">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="formulario_inputs">
                                    <div className='NombreyApellido'>
                                        <TextField className='textfiel' {...register('Nombre', { required: 'campo requerido' })}
                                            id="outlined-password-input"
                                            label="Nombre"
                                            type="password"
                                            autoComplete="current-password"
                                            placeholder={UsuarioXDefecto.Usuario.nombre}
                                            Value={UsuarioXDefecto.Usuario.nombre}
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

                                        {errors.Nombre && <p>{errors.Nombre.message}</p>}


                                        <TextField className='textfiel' {...register('Apellido', { required: 'campo requerido' })}
                                            id="outlined-password-input"
                                            label="Apellido"
                                            type="password"
                                            autoComplete="current-password"
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
                                        {errors.Apellido && <p>{errors.Apellido.message}</p>}

                                    </div>
                                    <div className='telefono'>
                                        <label >Telefono</label>
                                        <Formulario_telefono />

                                    </div>


                                    <div className='edad'>
                                        <label >Edad</label>
                                        <select >
                                            {items}
                                        </select>
                                        {errors.Edad && <p>{errors.Edad.message}</p>}

                                    </div>
                                    <div>
                                        <TextField className='textfiel' {...register('Gmail', {
                                            required: 'campo requerido',
                                            pattern: {
                                                /* Vefifica que se haya ingresado un email */
                                                value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                                                message: 'Solo se permiten correos de Gmail'
                                            }
                                        })}
                                            id="outlined-password-input"
                                            label="Gmail"
                                            type="password"
                                            autoComplete="current-password"
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

                                        {errors.Gmail && <p style={{ color: 'red' }}>{errors.Gmail.message}</p>}

                                    </div>
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
