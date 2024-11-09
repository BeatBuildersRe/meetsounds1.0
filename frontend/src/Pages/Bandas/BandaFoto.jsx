import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import MenuDerechoDiv from "@c/Menu/Derecha";
import  {BASE_URL} from "../../config"


function ActualizarFotoBanda() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [uploadSuccess, setUploadSuccess] = useState(null);

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('idBanda', data.idBanda);
        formData.append('file', data.file[0]);
    
        try {
            const response = await fetch(`${BASE_URL}/actualizarFotoBanda`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
    
            if (response.ok) {
                setUploadSuccess(true);
            } else {
                // Si la respuesta no es correcta, capturamos el mensaje de error
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error desconocido al actualizar la foto');
            }
        } catch (error) {
            console.error("Error:", error.message);
            setUploadSuccess(false);
            // Mostrar el mensaje de error al usuario
            setErrorMessage(error.message);  // Suponiendo que has definido un estado para mostrar el error
        }
    };
    
    
    return (
        <>
            <div className="Contenedor">
                <div className="contenedor2">
                    <div className="izquierda-bandas">
                    <h3>Mis Bandas</h3>
                    
                    <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>ID de la Banda:</label>
                    <input
                        type="text"
                        {...register("idBanda", { required: "El ID de la banda es obligatorio" })}
                    />
                    {errors.idBanda && <p>{errors.idBanda.message}</p>}
                </div>
                <div>
                    <label>Subir Foto:</label>
                    <input
                        type="file"
                        {...register("file", { required: "Debe seleccionar una foto" })}
                        accept="image/*"
                    />
                    {errors.file && <p>{errors.file.message}</p>}
                </div>
                <button type="submit">Actualizar Foto</button>
            </form>

                    </div>
                    <MenuDerechoDiv></MenuDerechoDiv>
                </div>
            </div>
            <div />
        </>

    )
}

export default ActualizarFotoBanda;
