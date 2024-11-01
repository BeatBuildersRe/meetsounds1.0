/* css */
import '@ccs/Perfil.css';
/* React */
import React, { useState,useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";
import { useParams } from 'react-router-dom';
/* Services */
import useObtenerUsuario from '@services/GetUsuario';
/* Componentes */
import UploadAvatar from '@c/UploadAvatar';
import R_Input from '@c/input/R_input';
import MenuDerechoDiv from '@c/Menu/Derecha';
import { useThemeContext } from '@contex/ThemeContext';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
/* iconos */
import { FiUpload, FiAlertCircle } from "react-icons/fi";
import { TiSocialFacebookCircular } from "react-icons/ti";
import { TiSocialTwitter } from "react-icons/ti";
import { TiSocialInstagram } from "react-icons/ti";
import { TiSocialYoutube } from "react-icons/ti";
import { MdEmail } from "react-icons/md";
import { FaMusic } from "react-icons/fa6";
import { TbEdit } from "react-icons/tb";
/* imagenes */
import imagen_de_perfil from '@public/perfil_imagen.png';
import imagen_de_fondo from '@public/ract.jpg';
import perfilimg from '@public/perfill.png'
import PerfilDefault from '@public/perfill.png'


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
            <label htmlFor={id} className="custom-file-upload" >
                <FiUpload size={24} />
            </label>
        </>
    );
}

function Perfil() {
    const { alias } = useParams();  // Extrae el alias de la URL
    const {usuario, cargando, error} = useObtenerUsuario(alias)
    
    
    const {id, nombre, apellido, fotoPerfilUrl, fotoPortadaUrl, edad, descripcion } = usuario ;
    
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

    const [EditarImagen, setEditarImagen] = useState(false); // Estado para mostrar/ocultar el componente
    
    const [imagenRecortada, setImagenRecortada] = useState(); // Estado para la imagen recortada

    // Función para alternar la visibilidad del componente UploadAvatar
    const MostrarEditarImg = () => {
        setEditarImagen(!EditarImagen);
    };

    // Función para manejar la imagen recortada que viene del componente hijo
    const handleImageSave = (imagen) => {
        setImagenRecortada(imagen); // Guardar la imagen recortada en el estado del padre
    };

    // Lógica para enviar el formulario
    const onSubmit = (data) => {
        // Si hay una imagen recortada, la añadimos al formulario antes de enviarlo
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
        });

        // Si hay una imagen recortada, la añadimos al formData
        if (imagenRecortada) {
            const imagenBlob = dataURLtoBlob(imagenRecortada); // Convertimos el dataURL a un blob
            formData.append('image', imagenBlob, 'imagenRecortada.png'); // Añadimos la imagen recortada
        }

        console.log('Formulario enviado con los siguientes datos:', formData);
        // Aquí podrías hacer una petición para enviar formData a un servidor.
        for (const [key, value] of formData.entries()) {
            console.log(`${key}:`, value); // Muestra cada clave y valor en la consola
        }
    };

    // Función para convertir dataURL (la imagen recortada) a Blob
    const dataURLtoBlob = (dataURL) => {
        const arr = dataURL.split(','), mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    };


    return (
        <>
            {console.log(nombre)}
            <div className="Contenedor">
                <div className="contenedor2">
                    <div className="izquierda-perfil">
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
                            <div className='imagenperfil'>
                                <img
                                    id="img_perfil"
                                    src={imagenRecortada? imagenRecortada:fotoPerfilUrl  }
                                    /* src={imagenPerfil ? imagenPerfil : imagen_de_perfil} */
                                    alt="Imagen de perfil"
                                />
                                <div className='edit'>

                                    <button id='btn-editar' onClick={MostrarEditarImg}>


                                        {EditarImagen ? <TbEdit id='icon-edit' /> : <TbEdit id='icon-edit' />}
                                    </button>
                                    {EditarImagen && <UploadAvatar btn_cancelar={MostrarEditarImg} onImageSave={handleImageSave} />}


                                </div>
                            </div>
                        </div>
                        <div className="seccion_3">
                            <div className='descripcion'>
                                <h4>Descripcion</h4>
                                <textarea
                                    defaultValue={descripcion}
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

                                {/* input de la imagen */}

                                <div className="formulario_inputs">
                                    <div className='NombreyApellido'>
                                        {/* Campo de Nombre */}
                                        <R_Input form={register} nombre='Nombre' type='text' defaultValue={(nombre)} errores={errors.Nombre} />
                                        {/* Campo de Apellido */}
                                        <R_Input form={register} nombre='Apellido' type='text' defaultValue={apellido} errores={errors.Apellido} />
                                    </div>
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
                                    />
                                </div>
                                <Button id="submit" type='submit' /* disabled={!isValid}  */ variant="outlined">Guardar</Button>
                                <Button id="cancel" type='' color='error' variant="outlined">Cancelar</Button>

                            </form>
                        </div>
                    </div>
                    <MenuDerechoDiv></MenuDerechoDiv>
                </div>
            </div>
            <div />
        </>
    );
}

export default Perfil;

