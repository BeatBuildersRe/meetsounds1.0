import React from 'react';
import { Link } from 'react-router-dom';
import Boton from '../../components/input/input';
import '../../css/LoginForm.css';
import { CiUser, CiLock  } from "react-icons/ci";
import Meetsounds from '../../components/logotipo/Logo';
import Remember from '../../components/switch/Switch';
import BotonGoogle from '../../components/boton-google/ButtonGoogle'
import { FaGoogle, FaSpotify, FaInstagram } from 'react-icons/fa';
import Divider from '../../components/divider/Divider';
import BotonInicio from '../../components/boton-inicio/BotonInicio'
import BotonRegistro from '../../components/boton-registro/BotonRegistro'
// import SuffleHero from '../suffle-hero/SuffleHero'

const LoginForm = () => {
    
  return (
    
    <div className="contenedor1">
        
       <div className="contenedor-logo">
       <Meetsounds/>
       
       </div>
       <div className="contenedor-formulario-imagen">
       {/* <SuffleHero/> */}
        
       
          
            <div className='wrapper'>                
                <h1>Inicia Sesión
                </h1>
                <div className="contenedor-social">
                <div className="row">
                <BotonGoogle icon={FaSpotify}/>
                <BotonGoogle icon={FaInstagram}/>
                </div>
                <BotonGoogle icon={FaGoogle}/>
                </div>
                <Divider/>
                <div className="ingreso">
                <Boton  
                    label="Usuario" 
                    id="outlined-email-text" 
                    Icon={CiUser} 
                />
                <Boton  
                    label="Contraseña" 
                    id="outlined-email-password" 
                    Icon={CiLock}
                    type="password" 
                />
                </div>
                
                <div className="memoria">
                <Remember
                />
                <a href="#">¿Olvidaste algo?</a>
                </div>
                
                <div className="iniciar">
                <BotonInicio/> 
                </div>
                
                <div className="register-link">
                    <p>¿No tenés una cuenta?</p>
                    <BotonRegistro/>
                </div>
                <div className="terminos-condiciones">
                <p>Al iniciar sesión, usted acepta nuestros <a href="#">Términos y Condiciones</a> y <a href="#">Políticas de Privacidad</a></p>
                </div>
            </div>
       </div>
        
        
    </div>
    
    
    
    
    
  )
}

export default LoginForm