import React, { useEffect, useState } from 'react';
import { Avatar } from '@mui/material';
import { IoPerson } from 'react-icons/io5';
import useObtenerUsuarios from '@services/GetUsuarios';
import { useNavigate } from 'react-router-dom';

const Amigos = React.memo(() => {
    const { usuarios, cargando, error } = useObtenerUsuarios(); // Obtener los usuarios usando el hook
    const navigate = useNavigate();
    const [usuariosMostrados, setUsuariosMostrados] = useState([]);

    // Para que el componente solo obtenga usuarios una vez
    useEffect(() => {
        if (usuarios.length > 0) {
            setUsuariosMostrados(usuarios.slice(0, 4));
        }
    }, [usuarios]); // Solo se actualizará si `usuarios` cambia.

    const VerPerfil = (alias) => {
        if (alias) {
            navigate('/perfil-encontrado/' + alias);
        } else {
            console.error('Alias is undefined, cannot navigate.');
        }
    };

    if (cargando) {
        return <p>Cargando usuarios...</p>;
    }

    if (error) {
        return <p>Error al cargar usuarios. Por favor intenta nuevamente.</p>;
    }

    if (usuariosMostrados.length === 0) {
        return <p>No hay usuarios para mostrar.</p>;
    }

    return (
        <>
            {usuariosMostrados.map((usuario) => {
                const { nombre, apellido, alias, fotoPerfilUrl, c_seguidores } = usuario;

                return (
                    <div key={alias} id='avatar' onClick={() => VerPerfil(alias)}>
                        <Avatar className='avatari' alt="Remy Sharp" src={fotoPerfilUrl} />
                        <div id='info'>
                            <h5>{nombre} {apellido}</h5>
                            <p>{c_seguidores} <IoPerson /></p>
                        </div>
                        <button id='btn'>Seguir</button>
                    </div>
                );
            })}
        </>
    );
});

export default Amigos;
