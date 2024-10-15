import { TbMusicHeart } from "react-icons/tb";
import React,{useState} from 'react';
import './reacciones.css'

const Reacciones = ({Icon,tipe,funcion, key=0}) => {
    const [click, setClick] = useState(false)
    
    const color = click ? 'icon-activado-'+tipe : 'icon-desactivado-'+tipe

    const handleClick =() =>{
        setClick(!click)
    }

    return ( 
        <>
            <button id="btns" onClick={() => { handleClick(); funcion(); }}>
                <Icon id={color} />  <p>10</p>  
            </button>
        </>
     );
}
 
export default Reacciones;