import React from 'react';
import './Logo.css';
import logotipo from '../../assets/Logo7.png';

const Isologo = () => {
  return (
    <div className="logotipo">
      <img id='dibujo' src={logotipo} alt="Logo" />
      
    </div>
  );
};

export default Isologo;