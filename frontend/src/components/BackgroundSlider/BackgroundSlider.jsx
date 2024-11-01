// BackgroundSlider.jsx
import React from 'react';
import './BackgroundSlider.css';

const BackgroundSlider = ({ children }) => {
  return (
    <div className="slider-container">
      <div className="background-image bg1"></div>
      <div className="background-image bg2"></div>
      <div className="background-image bg3"></div>
      <div className="color-overlay"></div> {/* Filtro rojo */}
      <div className="content-overlay">{children}</div>
    </div>
  );
};

export default BackgroundSlider;
