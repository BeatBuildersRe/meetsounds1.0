import React from 'react';
import './ImageGallery.css';
import { GiDeathSkull } from "react-icons/gi";

import img1 from '@public/imgtest.png'
import img2 from '@public/imgtest2.png'
import img3 from '@public/imgtest3.png'
import img4 from '@public/imgtest4.png'
const ImageGallery = () => {
    const maxImagesToShow = 4;
    const images = [img1, img2,img3]
    return (
        <>
            <div className="container-w">
                <div className={`galeria-imagenes-${images.length}`}>
                    {images.slice(0, maxImagesToShow).map((image, index) => (
                        <div key={index} className='imagen-contenedor' id={`img-${index}`}>
                            <img src={image} alt="" id='img' className={`img-${index}`} />
                            {images.length > 4 && (
                                <h4 id='h4-mas'> No me toquen el CSS de este componente o los <GiDeathSkull/>+ {images.length - 4}</h4>
                            )}
                        </div>

                    ))}
                </div>
            </div>
        </>
    );
};

export default ImageGallery;
