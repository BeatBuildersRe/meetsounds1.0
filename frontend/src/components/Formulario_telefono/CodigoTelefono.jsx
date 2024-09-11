import React, { useState, useEffect } from 'react';
import { MuiTelInput } from 'mui-tel-input';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
const Formulario_telefono = ({ register, name, placeholder, errors, defaultValue }) => {
  const [value, setValue] = useState(defaultValue || '');
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
        {...register(name, {
          required: 'El número de teléfono es obligatorio',
          validate: () => isValid || 'El número de teléfono es inválido',
        })}
        sx={{
          '& .MuiOutlinedInput-root': {
            color: 'white',
            '& fieldset': {
              borderColor: 'white',
            },
          },
          '& .MuiInputLabel-root': {
            color: 'white',
          },
        }}
        color={!isValid && 'error'}
        placeholder={placeholder}
        label="Teléfono"
        value={value}
        onChange={handleChange}
        error={!!errors[name]}
        helperText={errors[name] ? errors[name].message : ''}
      />
    </>
  );
};
export default Formulario_telefono;
