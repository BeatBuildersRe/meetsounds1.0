// Perfil.js
import React, { useState } from 'react';
import { FiUpload, FiAlertCircle } from "react-icons/fi"; // Iconos
import TextField from '@mui/material/TextField'; // Material UI
import Button from '@mui/material/Button'; // Botón de Material UI
import { useForm, Controller } from "react-hook-form"; // Formulario
import imagen_de_perfil from '../../../../public/perfil_imagen.png'; // Imagen de perfil por defecto
import imagen_de_fondo from '../../../../public/ract.jpg'; // Imagen de fondo por defecto
import './Perfil.css'; // Estilos personalizados
import { TiSocialFacebookCircular } from "react-icons/ti";
import { TiSocialTwitter } from "react-icons/ti";
import { TiSocialInstagram } from "react-icons/ti";
import { TiSocialYoutube } from "react-icons/ti";
import { MdEmail } from "react-icons/md";
import { FaMusic } from "react-icons/fa6";
import R_Input from '../../../components/input/R_input';
// Componente para subir imagen
function SubirImagen({ id, setImagen }) {
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagen(URL.createObjectURL(file)); // Guardar la imagen seleccionada
        }
    };

    return (
        <>
            <div>
                <input
                    id={id}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                />
            </div>
            <label htmlFor={id} className="custom-file-upload">
                <FiUpload size={24} />
            </label>
        </>
    );
}

function Perfil() {
    // Estado para almacenar imágenes
    const [imagenPerfil, setImagenPerfil] = useState(null);
    const [imagenFondo, setImagenFondo] = useState(null);

    const texto = "En esta página puedes actualizar la información de tu perfil. Los campos que decidas modificar serán actualizados en tu cuenta, mientras que la información que no edites se mantendrá sin cambios. Asegúrate de revisar cuidadosamente todos los detalles antes de guardar los cambios.";
    const texto2 = "pre essco formar parte de una banda o colaborar con músicos que necesiten un guitarrista. ¡Siempre dispuesto a compartir y hablar sobre las mejores canciones y artistas del momento!"
    // Datos de usuario por defecto (simulando conexión a base de datos)
    let UsuarioXDefecto = {
        Usuario: {
            nombre: 'Mauro',
            apellido: 'Berni',
            edad: 18,
            telefono: "+54 2612496079",
            gmail: 'mauro@gmail.com',
            imagen_de_fondo: '/frontend/public/concierto1.jpeg',
            imagen_de_perfil: '/frontend/public/ract.jpg',
        },
    };

    // Hook del formulario
    const { control, register, formState: { errors }, handleSubmit } = useForm();

    const onSubmit = (data) => {
        // Lógica para enviar la información a la base de datos
        console.log(data);

    };

    return (
        <html lang="en">
            <body>
                <div className="ContenedorPerfil2">
                    <h2 id="h2">Perfil</h2>

                    {/* Sección de advertencia */}
                    <div className='seccion_1'>
                        <div className='advertencia'>
                            <FiAlertCircle id='icon' />
                            <p id='p'>{texto}</p>
                        </div>
                    </div>

                    {/* Sección de imágenes (perfil y fondo) */}
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
                        <div className='descripcion'>
                            <h4>Descripcion</h4>
                            <textarea
                                defaultValue={texto}
                                name="Descripcion"
                                maxLength="350"
                                id="interes_musical"
                                {...register('descripcion')}

                            ></textarea>
                        </div>
                    </div>
                    <div className="seccion_4">
                        <div className='social_media'>
                            <h4>Contacto</h4>
                            <div className='inputs_social'>

                                <div className="social">
                                    <TiSocialFacebookCircular id='input_icon' />
                                    <input id='input_social' type="text" defaultValue="Facebook"   {...register('facebook')} />
                                </div>
                                <div className="social">
                                    <TiSocialTwitter id='input_icon' />
                                    <input id='input_social' type="text" defaultValue="twiter"  {...register('twitter')} />

                                </div>
                                <div className="social">
                                    <TiSocialInstagram id='input_icon' />
                                    <input id='input_social' type="text" defaultValue="Instagra"  {...register('instagram')} />

                                </div>
                                <div className="social">
                                    <TiSocialYoutube id='input_icon' />
                                    <input id='input_social' type="text" defaultValue="Youtube"  {...register('youtube')} />

                                </div>
                                <div className="social">
                                    <MdEmail id='input_icon' />
                                    <input id='input_social' type="text" defaultValue="email" {...register('email')} />

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="seccion_5">
                        <div className='descripcion'>
                            <h4>Interes Musical <FaMusic /> </h4>
                            <textarea
                                defaultValue={texto2}
                                name="interes_musical"
                                maxLength="250"
                                id="interes_musical"
                                {...register('interes_musical')}
                            ></textarea>
                        </div>
                    </div>
                    {/* Formulario para actualizar datos */}
                    <div className="seccion_6">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="formulario_inputs">
                                <div className='NombreyApellido'>
                                    {/* Campo de Nombre */}
                                    <R_Input form={register} nombre='Nombre' type='text' defaultValue="variable" errores={errors.Nombre} />
                                    {/* Campo de Apellido */}
                                    <R_Input form={register} nombre='Apellido' type='text' defaultValue="variable" errores={errors.Apellido} />   
                                </div>
                                {/* Componente para el teléfono */}
                                {/* El telefono no tiene defaulValue habra que comprobrar si 
                                    el usuario edito el campo para asi cambiarlo, esto se puede
                                    hacer con un if(!campo) eso comprobara si la variable esta vacia
                                    o no 
                                */}
                               

                                {/* Campo de Edad */}
                                <TextField
                                    className='textfiel'
                                    {...register('Edad', {
                                        maxLength: 2,
                                        validate: value => value <= 99,
                                    })}
                                    defaultValue={UsuarioXDefecto.Usuario.edad}
                                    label='Edad'
                                    type="number"
                                    color={errors.Edad && 'error'}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            color: 'white',
                                            '& fieldset': {
                                                borderColor: 'white',
                                            },
                                        },
                                        '& .MuiInputLabel-root': {
                                            color: 'white',
                                        },
                                    }}
                                />
                               

                                {/* Botón para enviar el formulario */}
                            </div>
                            <Button id="submit" type='submit' /* disabled={!isValid}  */variant="outlined">Guardar</Button>
                            <Button id="cancel" type='' variant="outlined">Cancelar</Button>
                        </form>
                    </div>
                </div>
            </body>
        </html>
    );
}

export default Perfil;

{/* <TextField
                                        className='textfiel'
                                        {...register('Nombre', { maxLength: 20 })}
                                        label='Nombre'
                                        type="text"
                                        color={errors.Nombre && 'error'}
                                        defaultValue={UsuarioXDefecto.Usuario.nombre}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                color: 'white',
                                                '& fieldset': {
                                                    borderColor: 'white',
                                                },
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: 'white',
                                            },
                                        }}
                                    /> */}


                                    {/* <TextField
                                        className='textfiel'
                                        {...register('Apellido', { maxLength: 20 })}
                                        label="Apellido"
                                        type="text"
                                        defaultValue={UsuarioXDefecto.Usuario.apellido}

                                        color={errors.Apellido && 'error'}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                color: 'white',
                                                '& fieldset': {
                                                    borderColor: 'white',
                                                },
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: 'white',
                                            },
                                        }}
                                    /> */}

                                     {/* Campo de Gmail */}
                                {/*  <TextField
                                    className='textfiel'
                                    {...register('Gmail', {
                                        maxLength: 20,
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                                            message: 'Solo se permiten correos de Gmail',
                                        },
                                    })}
                                    label="Gmail"
                                    type="email"
                                    color={errors.Gmail ? 'error' : ''}
                                    placeholder={UsuarioXDefecto.Usuario.gmail}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            color: 'white',
                                            '& fieldset': {
                                                borderColor: 'white',
                                            },
                                        },
                                        '& .MuiInputLabel-root': {
                                            color: 'white',
                                        },
                                    }}
                                /> */}