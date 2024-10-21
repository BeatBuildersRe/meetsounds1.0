import '@css/Colores.css'
import '@css/BotonPlus.css'
const BotonPlus = ({text,color}) => {
    
    return (
        /* Usado en Perfil y Portada */
        
        <button className="btnPlus"  >
            <span class="circle1"style={{ backgroundColor: 'var(--color-fondo)' }}></span>
            <span class="circle2"style={{ backgroundColor: 'var(--color-fondo)' }}></span>
            <span class="circle3"style={{ backgroundColor: 'var(--color-fondo)' }}></span>
            <span class="circle4"style={{ backgroundColor: color }}></span>
            <span class="circle5"style={{ backgroundColor: color }}></span>
            
            <span class="text">{text}</span>
        </button>
    );
}

export default BotonPlus;