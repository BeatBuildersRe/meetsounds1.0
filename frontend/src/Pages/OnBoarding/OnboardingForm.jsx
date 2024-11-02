// OnboardingForm.jsx
import React, { useState } from 'react';
import BackgroundSlider from '@c/BackgroundSlider/BackgroundSlider';
import StepOne from '@c/Steps/StepOne';
import StepTwo from '@c/Steps/StepTwo';
import StepThree from '@c/Steps/StepThree';
import StepFour from '@c/Steps/StepFour';

import './OnboardingForm.css';

const OnboardingForm = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <StepOne />;
      case 2:
        return <StepTwo />;
      case 3:
        return <StepThree />;
      case 4:
        return <StepFour />;
      default:
        return <StepOne />;
    }
  };

  return (
    <BackgroundSlider>
      <div className="onboarding-container">
        <h2>Bienvenido a MeetSounds</h2>
        {renderStep()}
        <div className="onboarding-buttons">
          {step > 1 && <button onClick={prevStep}>Anterior</button>}
          {step < 4 && <button onClick={nextStep}>Siguiente</button>}
        </div>
      </div>
    </BackgroundSlider>
  );
};

export default OnboardingForm;
