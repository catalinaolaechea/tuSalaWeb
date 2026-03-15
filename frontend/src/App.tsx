import { Routes, Route } from "react-router-dom"
import Home from "./pages/home"
import CargarSala from "./pages/nuevaSala"
import SalasPorBarrio from "./pages/salasPorBarrio"
import Outlet1 from "./Outlet1"
import Outlet2 from "./Outlet2"

export default function App() {
  return (
    <Routes>
      <Route element={<Outlet1/>}>
      {/* Páginas con navbar + buscador */}
        <Route element={<Outlet2/>}>
          <Route path="/" element={<Home />} />
          <Route path="/salas" element={<SalasPorBarrio />} />
        </Route>

        {/* Página sin buscador */}
        <Route path="/cargar-sala" element={<CargarSala />} />
      </Route>
    </Routes>
  )
}

