import { border, borderRadius, color, fontSize, fontWeight, padding } from '@mui/system';
import { useState } from 'react';
import { AiOutlineUserAdd,AiOutlineUser } from "react-icons/ai";
import { AiFillMessage } from "react-icons/ai";


// Hook personalizado para alternar entre true y false
function UseToggle(initialValue = false) {
    const Div = {
        all: 'unset',
        display:'flex',
        flexDirection:'column',
    
     
        width:'fit-content',
        fontSize:'x-large',
        padding:'0.5%',
        background:'white',
        border:'1px gray solid',
        borderRadius:'10%',
        
    }
    const btn = {
        color:'rgb(37, 36, 36)',
        all: 'unset',
        padding:'3px'
    }


    const [state, setState] = useState(initialValue);
    const toggle = () => {
        setState((prevState) => !prevState);  // Cambiar el estado a su opuesto
        if(state){
            console.log("seguido") /* Logica para el boton seguir */
        }
        if(!state){
            console.log("NO seguido") /* Logica para el boton NO seguir */
        }
    };

    return (
        <div style={Div}>
            <button onClick={toggle} style={btn}>
                {state ? <AiOutlineUserAdd/> : <AiOutlineUser style={{color:'green'}} />
                }
            </button>
            <button  style={btn}>
                <AiFillMessage /> 
                
            </button>
         
        </div>

    );
}

export default UseToggle;
