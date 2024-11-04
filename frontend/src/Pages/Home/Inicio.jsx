import React, { useState, useEffect } from "react";
import "@css/Home.css";
import Foto from "@assets/ads.png";
import Comentarios from "@c/Publicaciones/Comentarios";
//import Publicaciones from "@c/Publicaciones/Publicaciones";
import MenuDerechoDiv from "@c/Menu/Derecha";
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
    const miDiv = document.getElementById("Contenedor-menuu");

    const maxLimit = 300; // Máximo desplazamiento hacia abajo en píxeles
    const minLimit = 0; // Mínimo desplazamiento (0 = posición original)

    const slowFactor = 0.15; // Factor de despacio (puedes ajustarlo)

    // Calcula la nueva posición, asegurando que no sobrepase los límites
    const newPosition = Math.max(
      minLimit,
      Math.min(maxLimit, scrollY * slowFactor)
    );

    // Aplica el desplazamiento limitado al div
    miDiv.style.transform = `translateY(-${newPosition}px)`; // Mover hacia abajo
  });

  return (
    <>
      <div className="Contenedor">
        <div className="contenedor2">
          <div className="izquierda">
            <div className={`barra ${showBar ? "visible" : "oculta"}`}>
              <div className="tab-container">
                <input
                  type="radio"
                  name="tab"
                  id="tab1"
                  className="tab tab--1"
                  onClick={() => setActiveDiv("div1")}
                />
                <label className="tab_label" htmlFor="tab1">
                  Profile
                </label>

                <input
                  type="radio"
                  name="tab"
                  id="tab2"
                  className="tab tab--2"
                  onClick={() => setActiveDiv("div2")}
                />
                <label className="tab_label" htmlFor="tab2">
                  Settings
                </label>

                <div className="indicator"></div>
              </div>
            </div>

            <div
              className="Div_1"
              style={{ display: activeDiv === "div1" ? "block" : "none" }}
            >
              {/* {<Publicaciones />:} */}
            </div>
            <div
              className="Div_2"
              style={{ display: activeDiv === "div2" ? "block" : "none" }}
            >
              <h1>Explorar contenido</h1>
            </div>
          </div>

          <MenuDerechoDiv></MenuDerechoDiv>
        </div>
      </div>
    </>
  );
};

export default Inicio;
