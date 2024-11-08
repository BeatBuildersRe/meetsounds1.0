import React, { useContext } from 'react';
import "@css/Configuracion.css";
import '@css/Colores.css'
import R_Card2 from '@c/Card/Card2';
import R_Card from '@c/Card/Card';
import MenuDerechoDiv from '@c/Menu/Derecha';
import GetAlias from '@services/GetAlias';
import { AuthContext } from '../../js/otro/AuthContext';
import { useNavigate } from 'react-router-dom';
import { CiLogout, CiUser, CiLock, CiLight } from "react-icons/ci";


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
                        
                        <R_Card2 click={handlePerfil} text="Perfil" icon={<CiUser />} />
                        <R_Card2 click={handleSeguridad} text="Seguridad" icon={<CiLock />} />
                        
                        <R_Card   text="Apariencia" icon={<CiLight />}/>
                        
                            

                        <button onClick={handleLogout} className="Btn_LogOut">
                            <div className="sign_Btn_LogOut">
                            <svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                            </svg>
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
