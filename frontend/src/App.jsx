
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import Home from './Pages/Home/Home'
import Busqueda from './Pages/Busqueda/Busqueda'
import Notificaciones from './Pages/Notificaciones/Notificaciones'
import Mensajes from './Pages/Mensajes/Mensajes'
import Bandas from './Pages/Bandas/Bandas' 
import Configuracion from './Pages/Configuracion/Configuracion'

import PerfilUsuario from './Pages/PerfilUsuario/PerfilUsuario'



function App () {
  return (
    <div>
    
      <Routes>
        
        <Route path="/" element={<Layout/>}>
          <Route  path="busqueda" element={<Busqueda/>}/>
          <Route  path="/" element= {<Home/>} />
          <Route  path="notificaciones" element={<Notificaciones/>}/>
          <Route  path="Mensajes" element={<Mensajes/>}/>
          <Route  path="Bandas" element={<Bandas/>}/>
          <Route  path="Configuracion" element={<Configuracion/>}/>
          <Route  path="/PerfilUsuario" element={<PerfilUsuario/>}/>
          
          
        </Route>
      </Routes>      
    </div>
    
  )
}

export default App;

