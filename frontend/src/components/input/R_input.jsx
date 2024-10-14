import TextField from '@mui/material/TextField'; // Material UI
import React from 'react';


const R_Input = (props ) => {
    const name = props.nombre
    /* 
        De esta forma crea los "parametros"  
        para el elemento de Material UI
    */
    const atri = (props.errores && 'error')
    /* Si no quieres usasr uno de los campos usa esta variable vacia */
    const atri2 = ""

    /* Aqui crea las validaciones para el campo */
    const MaxLength = {maxLength: 20}
    return (
        <TextField 
            className='textfiel'
            {...props.form(name, MaxLength)}
            label={name}
            type={props.type}

            color={atri}
            defaultValue={props.defaultValue}
            /* sx={{
                '& .MuiOutlinedInput-root': {
                    color: 'white',
                    '& fieldset': {
                        borderColor: 'white',
                    },
                },
                '& .MuiInputLabel-root': {
                    color: 'white',
                },
            }} */
        />
    )
}
export default R_Input;