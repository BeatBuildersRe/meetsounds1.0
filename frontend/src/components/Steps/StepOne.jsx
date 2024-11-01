// StepOne.jsx
import React, { useState } from 'react';
import './StepOne.css';

// Importa cada ícono individualmente
import MusicoIcon from '../../assets/icons/musico.svg';
import VocalistaIcon from '../../assets/icons/vocalista.svg';
import ProductorIcon from '../../assets/icons/productor.svg';
import CompositorIcon from '../../assets/icons/compositor.svg';
import AficionadoIcon from '../../assets/icons/aficionado.svg';
import DjIcon from '../../assets/icons/dj.svg';

const StepOne = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { label: "Músico", icon: MusicoIcon },
    { label: "Vocalista", icon: VocalistaIcon },
    { label: "Productor", icon: ProductorIcon },
    { label: "Compositor", icon: CompositorIcon },
    { label: "Aficionado", icon: AficionadoIcon },
    { label: "DJ", icon: DjIcon },
  ];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="onboarding-step">
      <h3>¿Qué rol tienes en la música?</h3>
      <div className="option-grid">
        {options.map((option) => (
          <div
            key={option.label}
            className={`option-square ${selectedOption === option.label ? "selected" : ""}`}
            onClick={() => handleOptionClick(option.label)}
          >
            <img src={option.icon} alt={option.label} className="option-icon" />
            <span>{option.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepOne;
