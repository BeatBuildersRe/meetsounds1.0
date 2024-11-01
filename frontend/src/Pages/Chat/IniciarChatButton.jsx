// src/components/IniciarChatButton.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../config'
const IniciarChatButton = ({ aliasOtroUsuario }) => {
  const [idUsuarioLocal, setIdUsuarioLocal] = useState(null);
  const [idOtroUsuario, setIdOtroUsuario] = useState(null);
  const navigate = useNavigate();

  // Al cargar el componente, busca el alias del usuario local en las cookies y obtiene su ID
  useEffect(() => {
    const aliasLocal = getCookie("alias");
    if (aliasLocal) buscarUsuarioPorAlias(aliasLocal, setIdUsuarioLocal);
    if (aliasOtroUsuario) buscarUsuarioPorAlias(aliasOtroUsuario, setIdOtroUsuario);
  }, [aliasOtroUsuario]);

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  const buscarUsuarioPorAlias = async (alias, setIdUsuario) => {
    try {
      const response = await fetch(`${BASE_URL}/graphql`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `query { buscarPorAlias(alias: "${alias}") { id } }`,
        }),
      });

      const data = await response.json();
      const usuario = data.data.buscarPorAlias;
      if (usuario) setIdUsuario(usuario.id);
    } catch (error) {
      console.error('Error al buscar usuario:', error);
    }
  };

  const iniciarChat = async () => {
    if (!idUsuarioLocal || !idOtroUsuario) {
      return console.error('No se encontraron los usuarios');
    }
  
    try {
      const response = await fetch(
        `${BASE_URL}/iniciarChat?usuario1=${idUsuarioLocal}&usuario2=${idOtroUsuario}`, 
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        }
      );
  
      if (!response.ok) throw new Error('Error al iniciar el chat');
  
      const chat = await response.json();
      navigate(`/chat/${chat.id}`); // Redirige al chat con la ID recibida
    } catch (error) {
      console.error('Error al iniciar el chat:', error);
    }
  };

  return <button onClick={iniciarChat}>Iniciar Chat</button>;
};

export default IniciarChatButton;
