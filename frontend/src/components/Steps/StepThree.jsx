// StepThree.jsx
import React, { useState } from 'react';
import './StepThree.css';
import MusicoIcon from '../../assets/icons/musico.svg';  // Usando icono temporal
import axios from 'axios';

const StepThree = ({ userId, onComplete }) => {
  const [selectedGenres, setSelectedGenres] = useState([]);

  const genres = [
    { id: "1", nombre: "Rock" },
    { id: "2", nombre: "Pop" },
    { id: "3", nombre: "Cumbia" },
    { id: "4", nombre: "Cuarteto" },
    { id: "5", nombre: "Rap/Hip-Hop" },
    // Agrega el resto de los géneros con sus IDs reales
  ];

  const handleGenreClick = (genre) => {
    if (selectedGenres.includes(genre.id)) {
      setSelectedGenres(selectedGenres.filter(item => item !== genre.id));
    } else {
      setSelectedGenres([...selectedGenres, genre.id]);
    }
  };

  const saveGenres = async () => {
    try {
      await axios.post('/graphql', {
        query: `
          mutation {
            actualizarGenerosUsuario(userId: "${userId}", generoIds: ${JSON.stringify(selectedGenres)}) {
              id
              misGeneros {
                id
                nombre
              }
            }
          }
        `,
      });
      onComplete();  // Avanzar al siguiente paso después de guardar los géneros
    } catch (error) {
      console.error("Error al guardar géneros musicales", error);
    }
  };

  return (
    <div className="onboarding-step">
      <h3>¿Qué géneros musicales te apasionan?</h3>
      <div className="option-grid">
        {genres.map((genre) => (
          <div
            key={genre.id}
            className={`option-square ${selectedGenres.includes(genre.id) ? "selected" : ""}`}
            onClick={() => handleGenreClick(genre)}
          >
            <img src={MusicoIcon} alt={genre.nombre} className="option-icon" />
            <span>{genre.nombre}</span>
          </div>
        ))}
      </div>
      <button onClick={saveGenres} disabled={selectedGenres.length === 0}>Guardar y Continuar</button>
    </div>
  );
};

export default StepThree;
