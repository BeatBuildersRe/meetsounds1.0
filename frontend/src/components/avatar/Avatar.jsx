import '@css/Colores.css'
import './Avatar.css';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Cookies from 'js-cookie';
import { BASE_URL } from '../../config'
import Avatars from './AvatarV2';
export default function SizeAvatars() {
	const theme = useTheme();
	const isSmallScreen = useMediaQuery(theme.breakpoints.down('lg')); // lg = 1200px
	const [userData, setUserData] = React.useState({
	  nombre: '',
	  apellido: '',
	  alias: '',
	});
  
	React.useEffect(() => {
	  const alias = Cookies.get('alias'); // Obtener el alias de la cookie
  
	  if (alias) {
		// Realizamos la consulta a la API de GraphQL para obtener los datos del usuario
		const fetchUserData = async () => {
		  try {
			const response = await fetch(`${BASE_URL}/graphql`, {
			  method: "POST",
			  headers: {
				"Content-Type": "application/json",
			  },
			  body: JSON.stringify({
				query: `
				  query {
					buscarPorAlias(alias: "${alias}") {
					  nombre
					  apellido
					  alias
					  fotoPerfilUrl
					}
				  }
				`,
			  }),
			});
  
			const result = await response.json();
			if (result.data && result.data.buscarPorAlias) {
			  setUserData(result.data.buscarPorAlias);
			} else {
			  console.error("Error al obtener datos del usuario");
			}
		  } catch (error) {
			console.error("Error al conectar con el servidor", error);
		  }
		};
  
		fetchUserData();
	  } else {
		console.log("Alias no encontrado en las cookies.");
	  }
	}, []); // La dependencia vacía asegura que esto se ejecute solo al montar el componente
  
	return (
	  <div id="btn-message" className="button-message">
		<div className="content-avatar">
	
			<Avatars imagen={userData.fotoPerfilUrl} width={40} height={40}/>
		
		</div>
		<div className="notice-content">
		  <div className="username">
			{userData.nombre} {userData.apellido}
		  </div>
		  <div className="lable-message">{userData.alias}</div>
		  <div className="user-id">@{userData.alias}</div>
		</div>
	  </div>
	);
  }
