import React from 'react';
import './Logo.css';
import logotipo from '../../assets/Logo7.png';
import logotipo2 from '../../assets/Logo3.png';
const Isologo = () => {
  return (
    <div className="logotipo">
      <img id='dibujo' src={logotipo} alt="Logo" />
      <img id='texto' src={logotipo2} alt="Logo" />
    </div>
  );
};

export default Isologo;