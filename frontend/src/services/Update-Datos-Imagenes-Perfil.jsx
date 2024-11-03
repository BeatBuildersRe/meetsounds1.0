import { useState } from 'react';
import { BASE_URL } from '../config';

const useUpdateUsuarioConImagen = () => {
    const [usuario, setUsuario] = useState(null);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);

    function dataURLtoBlob(dataURL) {
        const byteString = atob(dataURL.split(',')[1]);
        const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
    }

    const actualizarUsuarioConImagen = async ({ alias, nombre, apellido, imagenPerfil, imagenPortada }) => {
        setCargando(true);
        setError(null);

        try {
            // Actualizar nombre y apellido
            const response = await fetch(`${BASE_URL}/graphql`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    query: `
                    mutation {
                        actualizarNombreApellidoPorAlias(alias: "${alias}", nombre: "${nombre}", apellido: "${apellido}") {
                            nombre
                            apellido
                        }
                    }
                    `,
                }),
            });

            const result = await response.json();

            if (result.data && result.data.actualizarNombreApellidoPorAlias) {
                setUsuario(result.data.actualizarNombreApellidoPorAlias);

                // Subir la imagen de perfil
                if (imagenPerfil) {
                    await subirImagen({ alias, imagen: imagenPerfil, endpoint: 'actualizarFotoPerfil' });
                }

                // Subir la imagen de portada
                if (imagenPortada) {
                    await subirImagen({ alias, imagen: imagenPortada, endpoint: 'actualizarFotoPortada' });
                }
            } else {
                console.log('Falló la mutación de usuario');
            }
        } catch (error) {
            console.error("Error al conectar con el servidor", error);
            setError(error);
        } finally {
            setCargando(false);
        }
    };

    const subirImagen = async ({ alias, imagen, endpoint }) => {
        try {
            const formData = new FormData();
            const imagenBlob = dataURLtoBlob(imagen);
            formData.append('file', imagenBlob, 'imagenRecortada.png');
            formData.append('alias', alias);

            const imageResponse = await fetch(`${BASE_URL}/${endpoint}`, {
                method: 'POST',
                body: formData,
            });

            if (!imageResponse.ok) {
                throw new Error(`Error al subir la imagen de ${endpoint}.`);
            }

            const imageResult = await imageResponse.text();
            console.log(imageResult); // Manejar la respuesta de la subida de la imagen
        } catch (error) {
            console.error(`Error al subir la imagen de ${endpoint}`, error);
            setError(error);
        }
    };

    return { usuario, cargando, error, actualizarUsuarioConImagen };
};

export default useUpdateUsuarioConImagen;
