
import React, { useState, useEffect } from 'react';



const App = () => {
  // Estado para controlar cuál div está visible
  const [activeDiv, setActiveDiv] = useState('div1'); // 'div1' es el div que se muestra por defecto

  const [isVisible, setIsVisible] = useState(true);
  let lastScrollTop = 0;

  const handleScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
      setIsVisible(false); // Oculta el div cuando se desplaza hacia abajo
    } else {
      setIsVisible(true); // Muestra el div cuando se desplaza hacia arriba
    }

    lastScrollTop = scrollTop;
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Limpieza al desmontar el componente
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  return (
    <>
      <div id='mi-div' className={`mi-div ${isVisible ? "visible" : "hidden"}`} >

        <button className='btn_div' onClick={() => setActiveDiv('div1')}>Para mi</button>
        <button className='btn_div' onClick={() => setActiveDiv('div2')}>Explorar</button>

      </div>

      <div className='Contenedor'>
        


        
        <div className='Div_1' style={{ display: activeDiv === 'div1' ? 'block' : 'none' }}>
          <h1>holaa</h1>  
          
        </div>

        <div className='Div_1' style={{ display: activeDiv === 'div2' ? 'block' : 'none' }}>
           
          
          
        </div> 
      </div>
    </>

  );
};

export default App;
