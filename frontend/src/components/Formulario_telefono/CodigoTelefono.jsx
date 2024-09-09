import React, { useState, useEffect } from 'react';
import { MuiTelInput } from 'mui-tel-input';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

const Formulario_telefono = ({ register, name, placeholder, errors }) => {
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleChange = (newValue) => {
    setValue(newValue);

    const phoneNumber = parsePhoneNumberFromString(newValue);
    if (phoneNumber) {
      setIsValid(phoneNumber.isValid());
    } else {
      setIsValid(false);
    }
  };

  useEffect(() => {
    if (isValid) {
      console.log('Número de teléfono ingresado:', value);
    } else {
      console.log('Número de teléfono inválido');
    }
  }, [value, isValid]);

  return (
    <>
      <MuiTelInput
        {...register(name)} // Registra el campo con react-hook-form
        sx={{
          '& .MuiOutlinedInput-root': {
            color: 'white',
            '& fieldset': {
              borderColor: isValid ? 'white' : 'red',
            },
          },
          '& .MuiInputLabel-root': {
            color: 'white',
          },
        }}
        color={errors}
        placeholder={placeholder}
        label="Telefono"
        value={value}
        onChange={handleChange}
      />
  
    </>
  );
};

export default Formulario_telefono;
