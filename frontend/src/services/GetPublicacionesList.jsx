import React, { useEffect, useState } from 'react';
import {BASE_URL} from '../config'
const GetPublicaciones = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [pagina, setPagina] = useState(0); // Estado para la página actual
  const TAMANO_PAGINA = 10;
  
  const fetchPublicaciones = async (paginaActual) => {
    setCargando(true);
    try {
      const response = await fetch(`${BASE_URL}/listarPublicaciones?page=${paginaActual}&size=${TAMANO_PAGINA}`);
      if (!response.ok) {
        throw new Error('Error al obtener publicaciones');
      }
      const result = await response.json();
      setPublicaciones((prev) => [...prev, ...result.content]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    fetchPublicaciones(pagina);
  }, [pagina]);

  // Opcional: Función para cargar más publicaciones
  const cargarMasPublicaciones = () => {
    setPagina((prevPagina) => prevPagina + 1);
  };

  return { cargando, publicaciones, cargarMasPublicaciones };
};

export default GetPublicaciones;
