import React, { useEffect } from 'react';
/* Css */
import './menu.css'
/* Iconos */
import { CiSearch } from "react-icons/ci";
import { IoPerson } from "react-icons/io5";
import { IoMdMusicalNote } from "react-icons/io";
import { PiVideoFill } from "react-icons/pi";
import { IoMdImage } from "react-icons/io";
import Avatar from '@mui/material/Avatar';
/* Componentes */
import Amigos from './Amigos';
import Carrusel from '../Anuncios/Ads';
/* Imágenes */
import avatari from '@assets/perfil_imagen.png'
import useObtenerUsuarios from '../../services/GetUsuarios';

const MenuDerecho = () => {
    const formatNumber = (number) => {
        if (number < 1000) return number;
        if (number < 1000000) return Math.floor(number / 1000) + 'k';
        return Math.floor(number / 1000000) + 'M';
    };

    const Tendencias = () => {
        const Post = {
            1: { titulo: 'Duki', views: 100 },
            2: { titulo: 'Emilia', views: 1000 },
            3: { titulo: 'Lit', views: 100000 },
            4: { titulo: 'Maseking', views: 10000000 },
            5: { titulo: 'Anuel', views: 10000000 }
        };

        return (
            <ul>
                {Object.keys(Post).map(key => (
                    <li key={key}>
                        {Post[key].titulo}
                        <div id='p'>
                            <p>{formatNumber(Post[key].views)}</p>
                            <IoMdImage id='icon' />
                        </div>
                    </li>
                ))}
            </ul>
        );
    };


    return (
        <div className="Contenedor-menu" id='Contenedor-menuu'>
            <label id='label'>
                <CiSearch id='icon' />
                <input type="search" placeholder='Buscar' />
            </label>

            <div className='tendencia'>
                <h4>Los Más Escuchados</h4>
                <Tendencias />
                <h4 id='btn-mas'>Más Tendencias <IoMdMusicalNote /></h4>
            </div>

            <Carrusel />
            <div className='seguir'>
                <h4>Quizás te interese...</h4>
                {/* {<Amigos />} */}
            </div>
        </div>
    );
}

export default MenuDerecho;
