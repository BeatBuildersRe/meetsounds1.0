// StepTwo.jsx
import React, { useState } from 'react';
import './StepTwo.css';
import MusicoIcon from '../../assets/icons/musico.svg';
/* import axios from 'axios';
 */
const StepTwo = ({ userId, onComplete }) => {
  const [selectedInstruments, setSelectedInstruments] = useState([]);

  const instruments = [
    { id: "1", nombre: "Guitarra" },
    { id: "2", nombre: "Batería" },
    { id: "3", nombre: "Piano" },
    { id: "4", nombre: "Bajo" },
    { id: "5", nombre: "Teclado" },
    // Agrega el resto de los instrumentos con sus IDs reales
  ];

  const handleInstrumentClick = (instrument) => {
    if (selectedInstruments.includes(instrument.id)) {
      setSelectedInstruments(selectedInstruments.filter(item => item !== instrument.id));
    } else {
      setSelectedInstruments([...selectedInstruments, instrument.id]);
    }
  };

  const saveInstruments = async () => {
    try {
      await axios.post('/graphql', {
        query: `
          mutation {
            actualizarInstrumentosUsuario(userId: "${userId}", instrumentoIds: ${JSON.stringify(selectedInstruments)}) {
              id
              misInstru {
                id
                nombre
              }
            }
          }
        `,
      });
      onComplete();  // Avanzar al siguiente paso después de guardar los instrumentos
    } catch (error) {
      console.error("Error al guardar instrumentos", error);
    }
  };

  return (
    <div className="onboarding-step">
      <h3>¿Qué instrumentos te interesan?</h3>
      <div className="option-grid">
        {instruments.map((instrument) => (
          <div
            key={instrument.id}
            className={`option-square ${selectedInstruments.includes(instrument.id) ? "selected" : ""}`}
            onClick={() => handleInstrumentClick(instrument)}
          >
            <img src={MusicoIcon} alt={instrument.nombre} className="option-icon" />
            <span>{instrument.nombre}</span>
          </div>
        ))}
      </div>
      <button onClick={saveInstruments} disabled={selectedInstruments.length === 0}>Guardar y Continuar</button>
    </div>
  );
};

export default StepTwo;
