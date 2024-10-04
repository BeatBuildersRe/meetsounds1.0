import React from 'react';
import { CiSearch } from "react-icons/ci";
import { IoPerson } from "react-icons/io5";
import { IoMdMusicalNote } from "react-icons/io";
import { PiVideoFill } from "react-icons/pi";
import { IoMdImage } from "react-icons/io";
import Avatar from '@mui/material/Avatar';
import Carrusel from '../Anuncios/Ads';
import avatari from '@assets/perfil_imagen.png'
import './menu.css'
const MenuDerecho = () => {
    const formatNumber = (number) => {
        if (number < 1000) return number;
        if (number < 1000000) return Math.floor(number / 1000) + 'k';
        return Math.floor(number / 1000000) + 'M';
    };

    const Tendencias = () => {
        const Post = {
            1: {
                titulo: 'Duki',
                views: 100
            },
            2: {
                titulo: 'emilia',
                views: 1000
            },
            3: {
                titulo: 'Lit',
                views: 100000
            },
            4: {
                titulo: 'Maseking',
                views: 10000000
            },
            5: {
                titulo: 'Anuel',
                views: 10000000
            }
        }
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
        )
    }


    return (
        <div className="Contenedor-menu">
            <label id='label'>
                <CiSearch id='icon'></CiSearch>
                <input type="search" placeholder='Buscar' />
            </label>

            <div className='tendencia'>
                <h4>Los Mas Escuchado</h4>
                <Tendencias></Tendencias>
                <h4 id='btn-mas'>Mas Tendencias <IoMdMusicalNote /></h4>

            </div>

            <Carrusel></Carrusel>
            <div className='seguir'>
                <h4>Quizas te interese...</h4>
                <div id='avatar'>
                    <Avatar className='avatari' alt="Remy Sharp" src={avatari} />
                    <div id='info'>
                        <h5>Nombre</h5>
                        <p>12M <IoPerson /></p>
                    </div>
                    <button id='btn'>Seguir</button>
                </div>
                <div id='avatar'>
                    <Avatar className='avatari' alt="Remy Sharp" src={avatari} />
                    <div id='info'>
                        <h5>Nombre</h5>
                        <p>12M <IoPerson /></p>
                    </div>
                    <button id='btn'>Seguir</button>
                </div>
                <div id='avatar'>
                    <Avatar className='avatari' alt="Remy Sharp" src={avatari} />
                    <div id='info'>
                        <h5>Nombre</h5>
                        <p>12M <IoPerson /></p>
                    </div>
                    <button id='btn'>Seguir</button>
                </div>
            </div>


        </div>
    );
}

export default MenuDerecho;