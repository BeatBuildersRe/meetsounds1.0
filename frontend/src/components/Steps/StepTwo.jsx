// StepTwo.jsx
import React, { useState } from 'react';
import './StepTwo.css';
import MusicoIcon from '../../assets/icons/musico.svg'; // Icono temporal para todas las tarjetas

const StepTwo = () => {
  const [selectedInstruments, setSelectedInstruments] = useState([]);

  const instruments = [
    "Guitarra", "Batería", "Piano", "Bajo", "Teclado",
    "Saxofón", "Trompeta", "Violín", "Viola", "Violonchelo",
    "Flauta", "Sintetizador"
  ];

  const handleInstrumentClick = (instrument) => {
    if (selectedInstruments.includes(instrument)) {
      // Si ya está seleccionado, lo quitamos
      setSelectedInstruments(selectedInstruments.filter(item => item !== instrument));
    } else {
      // Si no está seleccionado, lo agregamos
      setSelectedInstruments([...selectedInstruments, instrument]);
    }
  };

  return (
    <div className="onboarding-step">
      <h3>¿Qué instrumentos te interesan?</h3>
      <div className="option-grid">
        {instruments.map((instrument) => (
          <div
            key={instrument}
            className={`option-square ${selectedInstruments.includes(instrument) ? "selected" : ""}`}
            onClick={() => handleInstrumentClick(instrument)}
          >
            <img src={MusicoIcon} alt={instrument} className="option-icon" />
            <span>{instrument}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepTwo;
