import React, { useState } from 'react';
import { FcPicture } from "react-icons/fc";
import { AiFillMinusCircle } from "react-icons/ai";

function CargadorImagenes({ pasarValorAlPadre }) {
  const [imagenes, setImagenes] = useState([]);

  const manejarCargaDeImagenes = (e) => {
    const archivos = Array.from(e.target.files);
    const vistasPrevias = archivos
      .filter(archivo => archivo.type.startsWith('image/')) // Filtra solo archivos de imagen
      .map((archivo) => ({
        archivo,
        vistaPrevia: URL.createObjectURL(archivo), // Crea una URL temporal para la vista previa
      }));
    
    setImagenes((imagenesPrevias) => {
      const nuevasImagenes = [...imagenesPrevias, ...vistasPrevias];
      pasarValorAlPadre(nuevasImagenes); // Llama a la función pasada desde el padre con el nuevo valor
      return nuevasImagenes; // Actualiza el estado
    });
  };

  const eliminarImagen = (indiceAEliminar) => {
    setImagenes((imagenesPrevias) => {
      const imagenesActualizadas = imagenesPrevias.filter((_, indice) => indice !== indiceAEliminar); // Filtra y elimina la imagen seleccionada
      pasarValorAlPadre(imagenesActualizadas); // Actualiza al padre con las imágenes restantes
      return imagenesActualizadas; // Actualiza el estado
    });
  };

  return (
    <>
      <h4>Subir imagen</h4>
      <label htmlFor="UpImg">
        <FcPicture style={{ fontSize: '2rem', cursor: 'pointer' }} />
      </label>
      <input id='UpImg' type="file" multiple onChange={manejarCargaDeImagenes} hidden accept="image/*" /> {/* Solo permite archivos de imagen -- input oculto */}
        <h4>Imágenes seleccionadas:</h4>
      <div id="imagenes-preview">
        
          {imagenes.map((imagen, indice) => (
            <div id="div-img-preview" key={indice}>
              <img
                id='img-preview'
                src={imagen.vistaPrevia}
                alt={`Vista previa ${indice}`}
                style={{ width: '140px', height: '140px', objectFit: 'cover' }}
              />
              <button id='img-delete' onClick={() => eliminarImagen(indice)}><AiFillMinusCircle />
              </button> {/* Botón para eliminar */}
            </div>
          ))}
        
      </div>
    </>
  );
}

export default CargadorImagenes;
