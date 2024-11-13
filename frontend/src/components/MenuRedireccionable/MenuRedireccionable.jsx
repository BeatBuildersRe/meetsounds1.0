import React from 'react';
import Meetsounds from '@c/logotipo/Logo';
import '../../css/Colores.css'; // Variables globales de colores
import '../../css/MenuRedireccionable.css';
import { CiLogin, CiCirclePlus } from "react-icons/ci";

export default function MenuRedireccionable({ handleToggleWelcome, handleShowSecondModal }) {
  return (
    
      <div className='Contenedor_Menu_Redireccionable'>
        <Meetsounds />
        <h1>Bienvenido a MeetSounds</h1>
        <div className='contenedor_botones_redirecionantes'>
          <button onClick={handleShowSecondModal} className='boton_login'>
            <CiLogin size={30} style={{ marginRight: '10px' }} />
            <p>Iniciar Sesión</p>
          </button>
          <a href="/registro" className='boton_a_link'>
            
              <CiCirclePlus size={30} style={{ marginRight: '10px' }} />
              <p>Registrarte</p>
            
          </a>
        </div>
      </div>
    
  );
}

   
// import React, { useState } from 'react';
// import '../../css/Colores.css'; // Variables globales de colores
// import '../../css/MenuRedireccionable.css';
// import { CiLogin, CiCirclePlus } from "react-icons/ci";
// import Meetsounds from '@c/logotipo/Logo';

// export default function MenuRedireccionable() {
//   // Definimos el estado para manejar la visibilidad
//   const [showWelcome, setShowWelcome] = useState(true);

//   const handleToggle = () => setShowWelcome(!showWelcome);

//   return (
//     <div>
//       {showWelcome ? (
//         <div className='modal'>
//           <Meetsounds />
//           <h1 style={{
//             fontFamily: "Montserrat, sans-serif",
//             fontWeight: 400,
//             fontStyle: "italic",
//             fontSize: "25px",
//             margin: "25px"
//           }}>
//             Bienvenido a MeetSounds
//           </h1>
//           <div style={{ display: "flex", flexDirection: "column", width: "80%" }}>
//             <button onClick={handleToggle} className='button'>
//               <CiLogin size={30} style={{ marginRight: '10px' }} />
//               <p>Iniciar Sesión</p>
//             </button>
//             <a href="/registro" className='button' style={{ backgroundColor: "#181717", marginTop: "10px" }}>
//               <CiCirclePlus size={30} style={{ marginRight: '10px' }} />
//               <p>Registrarte</p>
//             </a>
//           </div>
//         </div>
//       ) : (
//         <div className='modal'></div>
//       )}
//     </div>
//   );
// }

   
   