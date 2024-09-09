import React, { useState } from "react";

function Subir_Imagen() {
  const [imagen, setImagen] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagen(file);  // Guardar el archivo en la variable de estado
    }
  };

  return (
    <div>
      <h2>Sube una imagen</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      
      {/* Mostrar una vista previa de la imagen seleccionada */}
      {imagen && (
        <div>
          <h3>Vista previa:</h3>
          <img src={URL.createObjectURL(imagen)} alt="Vista previa" style={{ width: "200px", height: "auto" }} />
        </div>
      )}
    </div>
  );
}

export default Subir_Imagen;
