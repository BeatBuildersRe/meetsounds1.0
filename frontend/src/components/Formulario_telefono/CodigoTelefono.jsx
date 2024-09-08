import React from 'react'
import { MuiTelInput } from 'mui-tel-input'

const Formulario_telefono = () => {
  const [value, setValue] = React.useState('')

  const handleChange = (newValue) => {
    setValue(newValue)
  }

  return <MuiTelInput sx={{
                          '& .MuiOutlinedInput-root': {
                              color:'white',
                              '& fieldset': {
                                borderColor: 'white',
                              },
                          },
                          '& .MuiInputLabel-root': {
                              color: 'white', // Cambia 'blue' por el color deseado
                          },
  }} value={value} onChange={handleChange} />
}

export default Formulario_telefono;