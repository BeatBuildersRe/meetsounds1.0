import img from '../../img/seguridad6.jpg'
import {Link} from 'react-router-dom';

const R_Card = (props) => {
  return (
    <>
      <div className="R_Contenedor-Card">
        <Link to={props.to} style={{all: 'unset'}}>
        <div className="R_Card">
          <img id="R-img-card" src={props.img} alt="" />
          
          
          <div className="R-form-section">
            <h3>{props.titulo}</h3>
            
            <p id='p_long'>{props.descripcion}</p>
            <p id='p_short'>{props.descripcion_short}</p>
          </div>
        </div>
        </Link>
      </div>
    </>
  )

}
export default R_Card;

