import React, { useState, useEffect } from 'react';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

function PhoneNumberValidation(phone) {
  const [valid, setValid] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const parsedPhoneNumber = parsePhoneNumberFromString('+' + phone);

    if (parsedPhoneNumber && parsedPhoneNumber.isValid()) {
      setValid(true);
      setPhoneNumber(parsedPhoneNumber);  // Guarda el número formateado
      setCountry(parsedPhoneNumber.country);  // Guarda el país del número
      console.log('Número válido:', parsedPhoneNumber.number);
    } else {
      setValid(false);
      setPhoneNumber(null);
      setCountry(null);  // Resetea el valor del país si el número no es válido
      console.log('Número no válido');
    }
  }, [phone]);

  return { validacion: valid, numero: phoneNumber, pais: country };
}

export default PhoneNumberValidation;
