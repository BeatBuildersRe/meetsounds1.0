
import UploadAvatar from './UploadAvatar'
import React, { useState } from 'react';

const App = () => {
  const [EditarImagen, setEditarImagen] = useState(false); // Estado para mostrar/ocultar el componente

  const MostrarEditarImg = () => {
    setEditarImagen(!EditarImagen); // Cambiar el estado al hacer clic
  };

  return (
    <>
      <button onClick={MostrarEditarImg}>
        {EditarImagen ? 'Ocultar Componente' : 'editar'}
      </button>
      {EditarImagen && <UploadAvatar btn_cancelar={MostrarEditarImg}/>}
    </>
  );
}
export default App;