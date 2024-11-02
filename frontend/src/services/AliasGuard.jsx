// AliasGuard.js 
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

const AliasGuard = () => {
  const navigate = useNavigate();
  const { alias } = useParams(); // Obtener el alias de los parámetros de la URL
  const localAlias = Cookies.get('alias'); // Obtener el alias de la cookie

  useEffect(() => {
    if (localAlias) {
      // Si el alias de la URL es el mismo que el de la cookie
      if (alias === localAlias) {
        navigate(`/cuenta2/${alias}`); // Redirigir a la cuenta del usuario
      } else {
        // Si intentan acceder a su propia cuenta desde el perfil encontrado
        navigate(`/perfil-encontrado/${alias}`);
      }
    }
  }, [alias, localAlias, navigate]);

  return null; // Este componente no renderiza nada, solo se encarga de la redirección
};

export default AliasGuard;
