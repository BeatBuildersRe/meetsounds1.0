import React from 'react';
import './ImageGallery.css';
import { GiDeathSkull } from "react-icons/gi";

import img1 from '@public/imgtest.png'
import img2 from '@public/imgtest2.png'
import img3 from '@public/imgtest3.png'
import img4 from '@public/imgtest4.png'
const ImageGallery = ({ images = [] }) => {
    const cantidadImagenes = images.length;
    return (
        <>
            <div className="container-w">
                <div className={`galeria-imagenes-${cantidadImagenes}`}>
                    {/* Asegúrate de que images es un array y contiene al menos un elemento */}
                    {Array.isArray(images) && cantidadImagenes > 0 && images.slice(0, 4).map((image, index) => (
                        <div key={index} className='imagen-contenedor' id={`img-${index}`}>
                            <img src={image} alt={`Imagen ${index}`} id='img' className={`img-${index}`} />
                        </div>
                    ))}

                    {/* Si hay más de 4 imágenes, muestra el mensaje */}
                    {cantidadImagenes > 4 && (
                        <h4 id='h4-mas'>
                            No me toquen el CSS de este componente o los <GiDeathSkull /> +{cantidadImagenes - 4}
                        </h4>
                    )}
                </div>
            </div>
        </>
    );
};

export default ImageGallery;
