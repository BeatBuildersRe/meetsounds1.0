import { useThemeContext } from '../../context/ThemeContext';
import React from 'react';
import img_fondo from '../../img/ract.jpg'
import img_perfil from '../../img/perfil_imagen.png'
import './CssPefilUsuario.css'
import { IoHeartCircle, IoHeartCircleOutline } from "react-icons/io5";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import MenuListComposition from '../../components/mini-menu/minMenu';
import UseToggle from '../../components/Boton-seguir/btnSegui';
const PerfilUsuario = () => {
    const { contextTheme, setContextTheme } = useThemeContext();

    // Función para alternar entre Light y Dark
    const [alignment, setAlignment] = React.useState('web');
    const handleChange = (event, newAlignment) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment);
        }
    };
    // Función para renderizar el componente basado en el valor seleccionado
    const renderComponent = () => {
        switch (alignment) {
            case 'web':
                return <h1>1</h1>;
            case 'android':
                return <h1>2</h1>;
            case 'ios':
                return <h1>3</h1>;
            default:
                return <h1>1.2</h1>;
        }
    };
    return (
        <div className={`contenedor-cuenta ${contextTheme === 'Dark' ? 'dark-theme' : 'light-theme'}`}>
            <div className='seccion-1'>
                <img id="img-fondo" src={img_fondo} alt="" />
                <img id="img-perfil" src={img_perfil} alt="" />
                <MenuListComposition />
                <p id="nombre">Mauro Berni</p>
                <div id="icons">
                    <IoHeartCircle id="icon" />
                    <p>10k</p>
                    <IoHeartCircleOutline id="icon" />
                    <p>24k</p>
                </div>
            </div>
            <div className="seccion-2">
                <p>Hola soy mauro, soy programador de tu corazon XD, mi novia me dejo por un bug jajaja, pvto el que lo lea</p>
            </div>
            <div className="seccion-3">
                <ToggleButtonGroup
                    color="success"
                    value={alignment}
                    exclusive
                    onChange={handleChange}
                    aria-label="Platform"
                    fullWidth
                >
                    <ToggleButton id="btn-ui" value="web">Publicaciones</ToggleButton>
                    <ToggleButton id="btn-ui" value="android">Multimedia</ToggleButton>
                    <ToggleButton id="btn-ui" value="ios">Informacion</ToggleButton>
                </ToggleButtonGroup>
                <div id="componentes">
                    {renderComponent()}
                </div>
                <div>
                    <UseToggle></UseToggle>
                </div>

            </div>
        </div>
    );
}
export default PerfilUsuario;