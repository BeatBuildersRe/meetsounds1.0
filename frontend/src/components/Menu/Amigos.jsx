import React from 'react';
import { Avatar } from '@mui/material'; // Asegúrate de importar Avatar
import { IoPerson } from 'react-icons/io5'; // Importa los íconos que uses
import useObtenerUsuarios from '@services/GetUsuarios'; // Asegúrate de tener la ruta correcta
import { useNavigate} from 'react-router-dom';

const Amigos = () => {
    const { usuarios, cargando, error } = useObtenerUsuarios(); // Obtener los usuarios usando el hook
    const navigate = useNavigate();

    const VerPerfil = (alias) => {
        if (alias) {
            navigate('/cuenta/' + alias);
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

    if (usuarios.length === 0) {
        return <p>No hay usuarios para mostrar.</p>;
    }


    return (
        <>
            {usuarios.slice(0,4).map((usuario) => {
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
}

export default Amigos;
