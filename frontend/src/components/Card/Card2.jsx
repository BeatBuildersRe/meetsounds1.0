import { Link } from 'react-router-dom';
import { FcBusinessman } from "react-icons/fc";
import { FcSafe } from "react-icons/fc";
import '../Card/card.css'

const R_Card2 = (props) => {

    const R_Contenedor_Card2 = {

        display: 'flex',
        borderRadius: '15px',
        fontSize: '1.2rem',
        width: '100%',
        padding: '5px',
        alignItems: 'center',
        marginBottom: '2%',
        cursor: 'pointer'

    }
    const icon = {
        fontSize: '2.2rem',
        marginRight: '2%',
        display: 'flex'
    }
    const textp = {
    }

    return (
        <>
            <Link to={props.to} style={{ all: 'unset' }}>
                <div className="R_Contenedor-Card2" style={R_Contenedor_Card2}>
                    <div style={icon}>
                        {props.icon}
                    </div>


                    <h5 style={textp}>{props.text}</h5>
                </div>
            </Link>
        </>
    )

}
export default R_Card2;