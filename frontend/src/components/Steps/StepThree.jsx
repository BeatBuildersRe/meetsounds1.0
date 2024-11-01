// StepThree.jsx
import React, { useState } from 'react';
import './StepThree.css';
import MusicoIcon from '../../assets/icons/musico.svg'; // Icono temporal para todas las tarjetas

const StepThree = () => {
  const [selectedGenres, setSelectedGenres] = useState([]);

  const genres = [
    "Rock", "Pop", "Jazz", "Blues", "Electrónica", 
    "Rap/Hip-Hop", "Reggae", "Metal", "Clásica", 
    "Country", "Indie", "Música Experimental", "Folklore/Étnica"
  ];

  const handleGenreClick = (genre) => {
    if (selectedGenres.includes(genre)) {
      // Si ya está seleccionado, lo quitamos
      setSelectedGenres(selectedGenres.filter(item => item !== genre));
    } else {
      // Si no está seleccionado, lo agregamos
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  return (
    <div className="onboarding-step">
      <h3>¿Qué géneros musicales te apasionan?</h3>
      <div className="option-grid">
        {genres.map((genre) => (
          <div
            key={genre}
            className={`option-square ${selectedGenres.includes(genre) ? "selected" : ""}`}
            onClick={() => handleGenreClick(genre)}
          >
            <img src={MusicoIcon} alt={genre} className="option-icon" />
            <span>{genre}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepThree;
