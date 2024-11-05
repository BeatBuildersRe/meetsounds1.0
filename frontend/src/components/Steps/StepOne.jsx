// StepOne.jsx
import React, { useState } from 'react';
import './StepOne.css';
import MusicoIcon from '../../assets/icons/musico.svg';
import VocalistaIcon from '../../assets/icons/vocalista.svg';
import ProductorIcon from '../../assets/icons/productor.svg';
import CompositorIcon from '../../assets/icons/compositor.svg';
import AficionadoIcon from '../../assets/icons/aficionado.svg';
import DjIcon from '../../assets/icons/dj.svg';
/* import axios from 'axios';
 */
const StepOne = ({ userId, onComplete }) => {
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
    setSelectedOption(option.label);
  };

  const saveRole = async () => {
    try {
      await axios.post('/graphql', {
        query: `
          mutation {
            actualizarRolUsuario(userId: "${userId}", rol: "${selectedOption}") {
              id
              rol
            }
          }
        `,
      });
      onComplete();  // Llamar a la siguiente función después de guardar el rol
    } catch (error) {
      console.error("Error al guardar el rol", error);
    }
  };

  return (
    <div className="onboarding-step">
      <h3>¿Qué rol tienes en la música?</h3>
      <div className="option-grid">
        {options.map((option) => (
          <div
            key={option.label}
            className={`option-square ${selectedOption === option.label ? "selected" : ""}`}
            onClick={() => handleOptionClick(option)}
          >
            <img src={option.icon} alt={option.label} className="option-icon" />
            <span>{option.label}</span>
          </div>
        ))}
      </div>
      <button onClick={saveRole} disabled={!selectedOption}>Guardar y Continuar</button>
    </div>
  );
};

export default StepOne;
