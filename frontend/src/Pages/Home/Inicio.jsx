import React, { useState, useEffect } from 'react';
import '../../css/Home.css'
import Foto from '../../assets/Img-Card-Seg.png';
const Inicio = () => {
  const [activeDiv, setActiveDiv] = useState('div1');
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
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      

      <div className="Contenedor">
      

        <div className="izquierda">
          <div className="tab-container">
            <input type="radio" name="tab" id="tab1" className="tab tab--1"onClick={() => setActiveDiv('div1')} />
            <label className="tab_label" htmlFor="tab1">Para Ti</label>

            <input type="radio" name="tab" id="tab2" className="tab tab--2" onClick={() => setActiveDiv('div2')}/>
            <label className="tab_label" htmlFor="tab2">Explorar</label>

            <div className="indicator"></div>
          </div>
        {/* <div id="mi-div" className={`mi-div ${isVisible ? 'visible' : 'hidden'}`}>
        <button className="btn_div" onClick={() => setActiveDiv('div1')}>Para ti</button>
        <button className="btn_div" onClick={() => setActiveDiv('div2')}><svg class="svgIcon" viewBox="0 0 512 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm50.7-186.9L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"></path></svg>Explorar</button>
      </div> */}
          <div className="Div_1" style={{ display: activeDiv === 'div1' ? 'block' : 'none' }}>
            <h1>Hola</h1>
            
            
          </div>
          <div className="Div_1" style={{ display: activeDiv === 'div2' ? 'block' : 'none' }}>
            <h1>Explorar contenido</h1>
          </div>
        </div>
        <div className="derecha">
          {/* Aquí puedes poner contenido para la parte izquierda */}
          <h2>Contenido Izquierda</h2>
        </div>
      </div>
    </>
  );
};

export default Inicio;
