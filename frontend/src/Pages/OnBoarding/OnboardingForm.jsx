// OnboardingForm.jsx
import React, { useState } from 'react';
import StepOne from '@c/Steps/StepOne';
import StepTwo from '@c/Steps/StepTwo';
import StepThree from '@c/Steps/StepThree';
import StepFour from '@c/Steps/StepFour';
import FondoLoginRegister from '@c/FondoLoginRegister/FondoLoginRegister';

import './OnboardingForm.css';

const OnboardingForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    rol: '',
    instrumentos: [],
    generos: [],
    fotoPerfil: null,
    descripcion: ''
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <StepOne updateFormData={updateFormData} />;
      case 2:
        return <StepTwo updateFormData={updateFormData} />;
      case 3:
        return <StepThree updateFormData={updateFormData} />;
      case 4:
        return <StepFour updateFormData={updateFormData} handleFinish={() => alert('Finalizado')} />;
      default:
        return <StepOne updateFormData={updateFormData} />;
    }
  };

  return (
    <div className="onboarding-wrapper">
      <FondoLoginRegister />
      <div className="onboarding-container">
        <h2>Bienvenido a MeetSounds</h2>
        {renderStep()}
        <div className="onboarding-buttons">
          {step > 1 && <button onClick={prevStep}>Anterior</button>}
          {step < 4 && <button onClick={nextStep} style={{ marginLeft: 'auto' }}>Siguiente</button>}
          {step === 4 && <button onClick={() => alert('Finalizado')} style={{ marginLeft: 'auto' }}>Finalizar</button>}
        </div>
      </div>
    </div>
  );
};

export default OnboardingForm;
