import React, { useState, useEffect } from 'react';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

function PhoneNumberValidation(phone) {
  const [valid, setValid] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);

  // Efecto para validar el número solo cuando cambia el número de teléfono
  useEffect(() => {
    const parsedPhoneNumber = parsePhoneNumberFromString('+' + phone);

    if (parsedPhoneNumber && parsedPhoneNumber.isValid()) {
      setValid(true);
      setPhoneNumber(parsedPhoneNumber);  // Guarda el número formateado
      console.log('Número válido:', parsedPhoneNumber.number);
    } else {
      setValid(false);
      setPhoneNumber(null);  // Resetea el valor si el número no es válido
      console.log('Número no válido');
    }
  }, [phone]);  // El efecto se ejecuta solo cuando 'phone' cambia

  return { validacion: valid, numero: phoneNumber };
}

export default PhoneNumberValidation;
