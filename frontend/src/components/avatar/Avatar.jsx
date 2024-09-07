import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function SizeAvatars() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('lg')); // lg = 1200px

  return (
    <Box 
      display="flex" 
      alignItems="center" 
      position="relative"
      borderRadius="12px" 
      padding="10px"
    >
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" style={{ zIndex: 1 }} />
      {!isSmallScreen && (
        <Typography 
          variant="body1" 
          style={{  
            color: 'white',
            border:'1px solid #f2f2f2',
            
            padding: '0px 10px 0px 30px',
            borderRadius: '25px',
            marginLeft: '-20px', // Superpone sobre el avatar
            zIndex: 0 // Detrás del avatar
          }}
        >
          Remy Sharp
        </Typography>
      )}
    </Box>
  );
}
