import React, { useState, useEffect } from "react";
import "@css/Home.css";
import Foto from "@assets/ads.png";
import Comentarios from "@c/Publicaciones/Comentarios";
//import Publicaciones from "@c/Publicaciones/Publicaciones";
import MenuDerechoDiv from "@c/Menu/Derecha";
import PublicacionesList from "../../components/Publicaciones/PublicacionesList";
const Inicio = () => {
  const [activeDiv, setActiveDiv] = useState("div1");
  const [isVisible, setIsVisible] = useState(true);
  const [showBar, setShowBar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    // Si el scroll es hacia abajo, oculta la barra, si es hacia arriba, muéstrala
    if (currentScrollY > lastScrollY) {
      setShowBar(false);
    } else {
      setShowBar(true);
    }
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  window.addEventListener("scroll", function () {
    const scrollY = window.scrollY; // Obtiene la posición de scroll
    const miDiv = document.getElementById("Contenedor2");
  
    if (miDiv) { // Verificar si miDiv existe
      const maxLimit = 300; // Máximo desplazamiento hacia abajo en píxeles
      const minLimit = 0; // Mínimo desplazamiento (0 = posición original)
      const slowFactor = 0.15; // Factor de despacio (ajustable)
  
      // Calcula la nueva posición, asegurando que no sobrepase los límites
      const newPosition = Math.max(
        minLimit,
        Math.min(maxLimit, scrollY * slowFactor)
      );
  
      // Aplica el desplazamiento limitado al div
      miDiv.style.transform = `translateY(-${newPosition}px)`; // Mover hacia abajo
    }
  });

  return (
    <>
      <div className="Contenedor">
        <div className="contenedor2">
          <div className="izquierda">
            <div className={`isla ${showBar ? "visible" : "oculta"}`}>
              <div className="tab-container">
                <input
                  type="radio"
                  name="tab"
                  id="tab1"
                  className="tab tab--1"
                  onClick={() => setActiveDiv("div1")}
                />
                <label className="tab_label" htmlFor="tab1">
                  Para tí
                </label>

                <input
                  type="radio"
                  name="tab"
                  id="tab2"
                  className="tab tab--2"
                  onClick={() => setActiveDiv("div2")}
                />
                <label className="tab_label" htmlFor="tab2">
                  Explorar
                </label>

                <div className="indicator"></div>
              </div>
            </div>

            <div
              className="Div_1"
              style={{ display: activeDiv === "div1" ? "block" : "none",marginTop:'50px' }}
            >
              <PublicacionesList></PublicacionesList>
            </div>
            <div
              className="Div_2"
              style={{ display: activeDiv === "div2" ? "block" : "none" }}
            >
              <h1>Explorar contenido</h1>
              <p>Todo bien por acá(imagenes para que el mauro vea que si se esconde la barra y que el texto no se va para arriba y que es responsive)</p>
              <img src="https://th.bing.com/th/id/OIP.zdsrcd-logrMBd4Y08LJXQHaH2?rs=1&pid=ImgDetMain" alt="" />
              <img src="https://th.bing.com/th/id/OIP.zdsrcd-logrMBd4Y08LJXQHaH2?rs=1&pid=ImgDetMain" alt="" />
              <img src="https://th.bing.com/th/id/OIP.zdsrcd-logrMBd4Y08LJXQHaH2?rs=1&pid=ImgDetMain" alt="" />
              <img src="https://th.bing.com/th/id/OIP.zdsrcd-logrMBd4Y08LJXQHaH2?rs=1&pid=ImgDetMain" alt="" />
              <img src="https://th.bing.com/th/id/OIP.zdsrcd-logrMBd4Y08LJXQHaH2?rs=1&pid=ImgDetMain" alt="" />
              <img src="https://th.bing.com/th/id/OIP.zdsrcd-logrMBd4Y08LJXQHaH2?rs=1&pid=ImgDetMain" alt="" />
              <img src="https://th.bing.com/th/id/OIP.zdsrcd-logrMBd4Y08LJXQHaH2?rs=1&pid=ImgDetMain" alt="" />
            </div>
          </div>

          <MenuDerechoDiv></MenuDerechoDiv>
        </div>
      </div>
    </>
  );
};

export default Inicio;
