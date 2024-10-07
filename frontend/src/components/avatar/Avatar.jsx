import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import './Avatar.css';
export default function SizeAvatars() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('lg')); // lg = 1200px

  return (
    <button id="btn-message" class="button-message">
	<div class="content-avatar">
		
		<div className="avatar">
			<svg className="user-img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,12.5c-3.04,0-5.5,1.73-5.5,3.5s2.46,3.5,5.5,3.5,5.5-1.73,5.5-3.5-2.46-3.5-5.5-3.5Zm0-.5c1.66,0,3-1.34,3-3s-1.34-3-3-3-3,1.34-3,3,1.34,3,3,3Z"></path></svg>
		</div>
	</div>
	<div className="notice-content">
		<div className="username">Jessica Sanders</div>
		<div className="lable-message">jessisanders</div>
		<div className="user-id">@jessisanders</div>
	</div>
</button>
  );
}
