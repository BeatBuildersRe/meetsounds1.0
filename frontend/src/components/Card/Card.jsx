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
































/* import * as React from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export default function ActionAreaCard({ text, img, descripcion, to}) {
  return (
    <Card 
      sx={{ maxWidth: 150, maxHeight: '165px', borderRadius: '10%', padding: '0', margin: '1%' }}
    
    >
      <CardActionArea component={Link} to={to}>
        <CardMedia
          component="img"
          height="100px"
          image={img}
          alt={text}
        />
        <CardContent sx={{ maxHeight: 'auto', margin: '7px', padding: '0' }}>
          <Typography sx={{ padding: '0px', margin: '0', maxHeight: '20px' }} component="div" >
            {text}
          </Typography>
          <Typography variant="body3" sx={{ paddingTop: '25px', marginTop: '25px', maxHeight: '30px', color: 'text.secondary' }}>
            {descripcion}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
} */
