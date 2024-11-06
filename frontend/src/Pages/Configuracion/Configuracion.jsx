import React, { useContext } from 'react';
import "@css/Configuracion.css";
import { useThemeContext } from '../../context/ThemeContext';
import R_Card2 from '@c/Card/Card2';
import MenuDerechoDiv from '@c/Menu/Derecha';
import GetAlias from '@services/GetAlias';
import { AuthContext } from '../../js/otro/AuthContext';
import { useNavigate } from 'react-router-dom';
import { CiLogout, CiUser, CiLock, CiLight } from "react-icons/ci";
import Seguridad from './Seguridad/Seguridad';

const Configuracion = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const alias = GetAlias();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handlePerfil = () => {
        navigate('perfil');
    };

    const handleSeguridad = () => {
        navigate('seguridad');
    };

    const handleApariencia = () => {
        navigate('apariencia');
    };

    return (
        <>
            <div className="Contenedor">
                <div className="contenedor2">
                    <div className="izquierda-configuracion">
                        <h2>Configuración</h2>
                        <R_Card2 click={handlePerfil} text="Perfil" icon={<CiUser />} />
                        <R_Card2 click={handleSeguridad} text="Seguridad" icon={<CiLock />} />
                        <R_Card2 click={handleApariencia} text="Apariencia" icon={<CiLight />} />

                        <button onClick={handleLogout} className="Btn_LogOut">
                            <div className="sign_Btn_LogOut">
                                <svg viewBox="0 0 512 512"><path d="..."></path></svg>
                            </div>
                            <div className="text_LogOut">Cerrar Sesión</div>
                        </button>
                    </div>

                    <MenuDerechoDiv></MenuDerechoDiv>
                </div>
            </div>

            <div />
        </>
    );
};

export default Configuracion;
