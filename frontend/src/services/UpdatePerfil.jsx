
import { BASE_URL } from '../config'

const useUpdateImgPerfil = (ImgPerfil, alias) => {

   
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

    const formData = new FormData();

    const imagenBlob = dataURLtoBlob(ImgPerfil); // Convertimos el dataURL a un blob
    formData.append('file', imagenBlob, 'imagenRecortada.png'); // Añadimos la imagen recortada
    formData.append('alias', alias);

    fetch(`${BASE_URL}/actualizarFotoPerfil`, {
        method: 'POST',
        body: formData,
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error al subir la imagen de perfil.');
            }
            return response.text();
        })
        .then((result) => console.log(result))
        .catch((error) => console.error('Error al subir la imagen de perfil:', error));
}

export default useUpdateImgPerfil;