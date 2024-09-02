import * as React from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function ActionAreaCard({ text, img, descripcion, onClick }) {
  return (
    <Card 
      sx={{ maxWidth: 150, maxHeight: '165px', borderRadius: '10%', padding: '0', margin: '1%' }}
      onClick={onClick} // Aquí pasamos la función onClick
    >
      <CardActionArea>
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
}
