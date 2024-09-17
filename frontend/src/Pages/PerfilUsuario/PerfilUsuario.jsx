import React, { useState } from 'react';
import { useThemeContext } from '../../context/ThemeContext';
import imgFondo from '../../img/ract.jpg';
import imgPerfil from '../../img/perfil_imagen.png';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import MenuListComposition from '../../components/mini-menu/minMenu';
import UseToggle from '../../components/Boton-seguir/btnSegui';
import ImgFondo from '../../components/imagen-de-fondo/Imagen_de_fondo';
import ImgPerfil from '../../components/imagen-de-fondo/imagen_de_perfil';
import SeguirDores from './components/seguir_dores';
import './CssPefilUsuario.css';
import CrearPublicacion from '../../components/Crear publicacion/CrearPublicacion';
const PerfilUsuario = () => {
    const { contextTheme } = useThemeContext(); // Usar el contexto de tema
    const [alignment, setAlignment] = useState('web'); // Estado para el ToggleButtonGroup
    const [isDivVisible, setIsDivVisible] = useState(false); // Estado para la visibilidad del primer div
    const [isDivVisible2, setIsDivVisible2] = useState(false); // Estado para la visibilidad del segundo div

    // Maneja el cambio en el ToggleButtonGroup
    const handleChange = (event, newAlignment) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment);
        }
    };

    // Renderiza el componente basado en el valor seleccionado
    const renderComponent = () => {
        switch (alignment) {
            case 'web': return <CrearPublicacion></CrearPublicacion>;
            case 'android': return <h1>2</h1>;
            case 'ios': return <h1>3</h1>;
            default: return <h1>1.2</h1>;
        }
    };

    // Alterna la visibilidad del div
    const handleImageClick = () => setIsDivVisible(!isDivVisible);
    const handleImageClick2 = () => setIsDivVisible2(!isDivVisible2);

    return (
        <div className={`contenedor-cuenta ${contextTheme === 'Dark' ? 'dark-theme' : 'light-theme'}`}>
            {/* Componentes de fondo y perfil */}
            <ImgFondo condicion={isDivVisible} funcion={handleImageClick} img={imgFondo} />
            <ImgPerfil condicion={isDivVisible2} funcion={handleImageClick2} img={imgPerfil} />

            <div className='seccion-1'>
                <img
                    id="img-fondo"
                    onClick={handleImageClick}
                    src={imgFondo}
                    alt="Imagen de fondo"
                />
                <img
                    id="img-perfil"
                    onClick={handleImageClick2}
                    src={imgPerfil}
                    alt="Imagen de perfil"
                />
                <MenuListComposition />
                <p id="nombre">Mauro Berni</p>
                <SeguirDores />
            </div>

            <div className="seccion-2">
                <p>Descripción del usuario</p>
            </div>
            <div className="seccion">
                
            </div>
            <div className="seccion-3">
                <ToggleButtonGroup
                    color="success"
                    value={alignment}
                    exclusive
                    onChange={handleChange}
                    aria-label="Plataforma"
                    fullWidth
                >
                    <ToggleButton id="btn-ui" value="web">Publicaciones</ToggleButton>
                    <ToggleButton id="btn-ui" value="android">Multimedia</ToggleButton>
                    <ToggleButton id="btn-ui" value="ios">Información</ToggleButton>
                </ToggleButtonGroup>
                <div id="componentes">
                    {renderComponent()}
                </div>
            </div>
        </div>
    );
}

export default PerfilUsuario;
