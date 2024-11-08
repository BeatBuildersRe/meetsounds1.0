import { FcBusinessman } from "react-icons/fc";
import { FcSafe } from "react-icons/fc";
import '../Card/card.css'
import { useThemeContext } from '../../context/ThemeContext';
import '@css/Apariencia.css'
import '@css/Colores.css'
const R_Card = (props) => {
    const style ={
      R_Contenedor_Card2 : {

        display: 'flex',
        justifyContent: 'center',
        borderRadius: '15px',
        fontSize: '1.2rem',
        width: '100%',
        padding: '5px',
        alignItems: 'center',
        marginBottom: '2%',
        cursor: 'pointer'

    },
    icon: {
        fontSize: '2.2rem',
        marginRight: '2%',
        display: 'flex'
    },
    textp : {
    },
    lista: {
      listStyle: 'none',
      display: 'flex',
      justifyContent: 'space-between', // Coloca los <li> en los extremos
      padding: 0,
      margin: 0,
      width: '100%', // Asegúrate de que el <ul> ocupe el ancho completo
    },
    item: {
      display: 'flex',             // Alinear el icono y el h5 horizontalmente
      alignItems: 'center',        // Centrar verticalmente los elementos
      gap: '8px',                  // Espacio entre el icono y el h5
      
    },
    
    }
    
    const { contextTheme, setContextTheme } = useThemeContext();

    // Función para manejar el cambio de tema
    const handleSwitch = () => {
      setContextTheme((prevTheme) => (prevTheme === "Light" ? "Dark" : "Light"));
    };
  
    return (
        <>
           
                <div className="R_Contenedor-Card2" style={style.R_Contenedor_Card2} onClick={props.click}>
                    <ul style={style.lista}>
                      <li style={style.item}>
                          <div style={style.icon}>
                            {props.icon}
                          </div>
                          <h5 style={style.textp}>{props.text}</h5>
                      </li>
                      <li>
                        <div className="toggle-switch">
                                  <label className="switch-label">
                                      <input
                                      type="checkbox"
                                      className="checkbox"
                                      onChange={handleSwitch}
                                      checked={contextTheme === "Light"} /* Activado en Light, desactivado en Dark */
                                      />
                                      <span className="slider"></span>
                                  </label>
                        </div>
                      </li>
                    </ul>
                            
                        
                </div>
           
        </>
    )

}
export default R_Card;
