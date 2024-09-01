import "./CssPefilUsuario.css"
import { IoMenu } from "react-icons/io5";
import { FiChevronLeft } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaGuitar } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaTwitter } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import { GiLoveSong } from "react-icons/gi";
import { FaPeopleGroup } from "react-icons/fa6";
import { RiUserHeartLine } from "react-icons/ri";
import { FaCalendarAlt } from "react-icons/fa";
import { FaBirthdayCake } from "react-icons/fa";
import { MdEmojiPeople } from "react-icons/md";
import { FiChevronDown } from "react-icons/fi";
import React, { useState } from 'react';

const img = "../../../public/ract.jpg"
const img2 = "../../../public/concierto1.jpeg"


const PerfilUsuario = () => {

    const [isExpanded, setIsExpanded] = useState(false);
    const [activeDiv, setActiveDiv] = useState('div1'); // 'div1' es el div que se muestra por defecto

  const [isVisible, setIsVisible] = useState(true);
  let lastScrollTop = 0;
    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (

        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Document</title>
            </head>
            <body className="body">
                <div className="">
                    <div className="perfil">
                        <img className="img-fondo" src={img} alt="" />
                        <img className="img-perfil" src={img2} alt="" />
                        <p className="user-nombre">Mauro Berni Goku</p>
                        <p className="user-arrova">@MauroB92</p>
                        <IoMenu className="boton-menu" style={{ color: "white", fontSize: '1.5em' }} />
                        <button className="boton-conectar">Conectar</button>
                        <p className="icon-seguidores"><RiUserHeartLine /> 1000</p>
                    </div>


                    <div>

                        <div
                            style={{

                                width: '100%',
                                height: isExpanded ? '320px' : '95px',


                                overflow: 'hidden',
                                transition: 'height 0.3s ease',
                            }}
                        >
                            <button className="boton-span" onClick={toggleExpand}>
                                {isExpanded ? <FiChevronDown /> : <FiChevronLeft />}
                            </button>
                            <div className="user-info">
                                <div className="info">
                                    <p>Una peruye trabajo, social a través de amistades, familia y compañeros de trabajo. Suele tener intereses como la música, el cine o el deporte, y dedica tiempo a actividades de ocio como leer, ver series o salir a pasear. Mantiene una vida equilibrada entre sus responsabilidades y su tiempo libre. Es alguien que valora la estabilidad y busca un equilibrio entre lo personal y lo profesional.</p>
                                </div>
                                <h3 style={{ textAlign: 'center', background: 'var(--negro_claro)', margin: '0.5rem' }}>Informacion</h3>
                                <div className="mas-info">
                                    <ul>

                                        <li className="item1" ><FaUser /> Mauro Berni</li >
                                        <li className="item2" ><FaBirthdayCake /> 07-07-2000</li >
                                        <li className="item3" ><MdEmojiPeople /> Hombre</li >
                                        <li className="item4" ><FaCalendarAlt /> 19 años</li >
                                        <li className="item5" ><FaLocationDot /> Argentina/Mendoza</li >
                                        <li className="item6" ><FaGuitar /> Bateria</li >
                                        <li className="item7" ><FaYoutube /> JuegaGerman</li >
                                        <li className="item8" ><MdEmail /> MeetSounds@012gmail.com</li >
                                        <li className="item9" ><FaTwitter /> @MeetSounds12</li >
                                        <li className="item10" ><BsFillTelephoneFill /> 2618496032</li >
                                        <li className="item11" ><GiLoveSong /> Rock, Rap</li >
                                        <li className="item12" ><FaPeopleGroup /> Sin Banda</li >


                                    </ul>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
                

                <div className="boton">
                    <button className='boton-publicacion' onClick={() => setActiveDiv('div1')}>Para mi</button>
                    <button className='boton-publicacion' onClick={() => setActiveDiv('div2')}>Explorar</button>
                    <button className='boton-publicacion' onClick={() => setActiveDiv('div3')}>mas</button>
                
                </div>    
                <div className='user-publicacion'>
                    <div  style={{ display: activeDiv === 'div1' ? 'block' : 'none' }}>
                        <h1>hola</h1>
                    </div>
                    <div  style={{ display: activeDiv === 'div2' ? 'block' : 'none' }}>
                    </div>
                    <div  style={{ display: activeDiv === 'div3' ? 'block' : 'none' }}>
                            <h1>div 3</h1>
                    </div>
                </div>
            </body>
        </html>
    )
}

export default PerfilUsuario;