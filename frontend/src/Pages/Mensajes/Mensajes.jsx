import * as React from 'react';
import { useState } from 'react';
import Switch from "react-switch";


const Mensajes = () => {
    const [checked, setChecked] = useState(false)
    const handleSwicth = (nextChecked) => {
        setChecked(nextChecked)
        console.log(nextChecked)
    }

    return (

        <div className="Contenedor">
            

        </div>

    )
}
export default Mensajes;