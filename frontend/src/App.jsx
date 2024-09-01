import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './Pages/Home/Home';
import Busqueda from './Pages/Busqueda/Busqueda';
import Notificaciones from './Pages/Notificaciones/Notificaciones';
import Mensajes from './Pages/Mensajes/Mensajes';
import Bandas from './Pages/Bandas/Bandas';
import Configuracion from './Pages/Configuracion/Configuracion';
import Login from './Pages/Login/LoginForm';

function App() {
  return (
    <Routes>
      {/* Rutas que usan el layout principal */}
      <Route path="/" element={<Layout />}>
        <Route path="busqueda" element={<Busqueda />} />
        <Route index element={<Home />} />
        <Route path="notificaciones" element={<Notificaciones />} />
        <Route path="mensajes" element={<Mensajes />} />
        <Route path="bandas" element={<Bandas />} />
        <Route path="configuracion" element={<Configuracion />} />
      </Route>

      {/* Ruta independiente para el login */}
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;