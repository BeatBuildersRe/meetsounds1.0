import React, { useMemo } from 'react'
import '../../css/FondoLoginRegister.css';
import '../../css/Colores.css';
export default function FondoLoginRegister(){

  // Array de URLs de imágenes
  const imageUrls = [
    "https://img.freepik.com/foto-gratis/mujer-sonriente-tiro-completo-guitarra_23-2149154270.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar",
    "https://img.freepik.com/foto-gratis/musica-guitarra-al-aire-libre_23-2148078957.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar",
    "https://img.freepik.com/foto-gratis/musica-guitarra-al-aire-libre_23-2148079080.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar",
    "https://img.freepik.com/foto-gratis/vista-lateral-artista-masculino-tocando-saxofon_23-2148730881.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar",
    "https://img.freepik.com/foto-gratis/hombre-tocando-guitarra-electrica_23-2148680318.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar",
    "https://img.freepik.com/foto-gratis/hermosa-nina-toca-cello-pasion-ambiente-concreto_150588-147.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar",
    "https://img.freepik.com/foto-gratis/joven-tocando-instrumento-dia-internacional-jazz_23-2148927526.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar",
    "https://img.freepik.com/foto-gratis/bodegon-equipamiento-musica_23-2148201746.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar",
    "https://img.freepik.com/foto-gratis/mujer-tiro-completo-tocando-guitarra-al-aire-libre_23-2149223699.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar",
    "https://img.freepik.com/foto-gratis/hombre-lugar-roca_23-2151734251.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar",
    "https://img.freepik.com/foto-gratis/tiro-medio-hombre-mujer-guitarras_23-2149223645.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar",
    "https://img.freepik.com/foto-gratis/musica-guitarra-al-aire-libre_23-2148079068.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar",
    "https://img.freepik.com/foto-gratis/teclado-musical-guitarrista_23-2147624344.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar",
    "https://img.freepik.com/foto-gratis/musico-masculino-guapo-saxofon_23-2148730909.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar",
    "https://img.freepik.com/foto-gratis/vista-frontal-hombre-tocando-saxofon_23-2148207553.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar",
    "https://img.freepik.com/foto-gratis/fotografia-blanco-negro-mujer-elegante_250224-135.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" ,
    "https://img.freepik.com/foto-gratis/musico-escenario-su-guitarra-clasica_23-2148465318.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar",
    "https://img.freepik.com/foto-gratis/musico-veterano-tocando-trompeta_150588-93.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar",
    "https://img.freepik.com/foto-gratis/mujeres-tiro-medio-jugando-juntas_23-2149223633.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar",
    "https://img.freepik.com/foto-gratis/mujer_23-2147782054.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar",
    "https://img.freepik.com/foto-gratis/cool-tatuado-hombre-tocando-guitarra-estudio_53876-95866.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar",
    "https://img.freepik.com/foto-gratis/vista-frontal-musico-masculino_23-2148730861.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar",
    "https://img.freepik.com/foto-gratis/gente-tiro-completo-jugando-juntos_23-2149223625.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar",
    "https://img.freepik.com/foto-gratis/mujer-tiro-completo-posando-contrabajo_23-2149154309.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar",
    "https://img.freepik.com/foto-gratis/mujer-tiro-medio-cantando_23-2149163002.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar",
    "https://img.freepik.com/foto-gratis/plano-medio-mujer-talentosa-cantando_23-2151194038.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar",
    "https://img.freepik.com/foto-gratis/vista-cerca-guitara_23-2148201781.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar",
    "https://img.freepik.com/foto-gratis/concepto-minimalista-paredes-madera-guitarra-clasica_23-2148465319.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" ,
    "https://img.freepik.com/foto-gratis/instrumento-musical-tienda_23-2150608903.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" ,
    "https://img.freepik.com/foto-gratis/mujer-desconectando-digital-casa-tocando-piano_23-2150037462.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" ,
    "https://img.freepik.com/foto-gratis/instrumento-musical-tienda_23-2150608945.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar",
    "https://img.freepik.com/foto-gratis/instrumento-musical-tienda_23-2150608947.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" ,
    "https://img.freepik.com/foto-gratis/vista-superior-mujer-tocando-piano_23-2150060732.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar",
    "https://img.freepik.com/foto-gratis/majestuoso-piano-escenario-actuacion-generativa-ai_188544-7791.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar",
    "https://img.freepik.com/foto-gratis/alto-angulo-musico-masculino-tocando-corneta_23-2148680338.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" ,
    "https://img.freepik.com/foto-gratis/guitarras-electricas-cultivo_23-2147781745.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" ,
    "https://img.freepik.com/fotos-premium/vista-angulo-violines-colgados-contra-pared_1048944-15341634.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" ,
    "https://img.freepik.com/foto-gratis/hombre-talentoso-tiro-medio-tocando-saxofon_23-2149324272.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar",
    "https://img.freepik.com/foto-gratis/artista-creando-musica-pop-dormitorio-alternativa_23-2149736733.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar",
    "https://img.freepik.com/foto-gratis/adorable-nina-su-guitarra-parque-foto-alta-calidad_144627-74785.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar",
    "https://img.freepik.com/foto-gratis/manos-sujetando-trompeta_23-2147624317.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar",
    "https://img.freepik.com/foto-gratis/musico-celebrando-evento-dia-jazz_23-2148876980.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar",
    "https://img.freepik.com/foto-gratis/vida-muerta-guitarra-electrica_23-2151376255.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" ,
    "https://img.freepik.com/foto-gratis/musico-tiro-medio-sentado-tocando-saxo_23-2148207506.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" ,
    "https://img.freepik.com/foto-gratis/piano-colorido-ninos-sobre-fondo-naranja_23-2148201801.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" ,
    "https://img.freepik.com/foto-gratis/mujer-alto-angulo-tocando-piano_23-2150060730.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar",
    "https://img.freepik.com/foto-gratis/tambores-imagen-conceptual_1204-203.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" ,
    "https://img.freepik.com/foto-gratis/majestuoso-piano-escenario-actuacion-generativa-ai_188544-7791.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" ,
    "https://img.freepik.com/foto-gratis/primer-plano-parte-kit-bateria-sobre-fondo-borroso_169016-20614.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar",
    "https://img.freepik.com/foto-gratis/grafico-tiza-tambor-pizarra_1379-353.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar",
    "https://img.freepik.com/foto-gratis/musico-veterano-tocando-trompeta_150588-90.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" ,
    "https://img.freepik.com/foto-gratis/interpretacion-musica-country-cantando-al-aire-libre_23-2149498447.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar",
    "https://img.freepik.com/foto-gratis/cerrar-musico-tocando-saxofon_23-2149247196.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar" ,
    "https://img.freepik.com/foto-gratis/mujer-sonriente-tiro-medio-instrumento_23-2149154303.jpg?ga=GA1.1.812169105.1728709247&semt=ais_hybrid-rr-similar",
];

  // Función para mezclar el array
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Crear columnas mezcladas
  const shuffledColumns = useMemo(() => {
    return Array.from({ length: 5 }, () => shuffleArray(imageUrls));
  }, []);
    // Animación CSS
    const keyframes = `
    @keyframes scrollUp {
      0% { transform: translateY(0); }
      100% { transform: translateY(-100%); }
    }
  `;

    return (
        <div className='backgroundContainer'>
      
        <style>{keyframes}</style>
        <div className='backgroundFilter'></div>
        <div className='backgroundColumns'>
          {shuffledColumns.map((column, columnIndex) => (
            <div key={columnIndex} className='backgroundScroll' style={{ animationDelay: `${columnIndex * 5}s`}}>
              {column.map((url, imgIndex) => (
                <img
                  key={imgIndex}
                  src={url}
                  alt={`Imagen ${imgIndex + 1}`}
                  className='backgroundImage'
                />
              ))}
              {column.map((url, imgIndex) => (
                <img
                  key={`duplicate-${imgIndex}`}
                  src={url}
                  alt={`Imagen ${imgIndex + 1}`}
                  className='backgroundImage'
                />
              ))}
            </div>
          ))}
        </div>
        </div>

    )
  
}
