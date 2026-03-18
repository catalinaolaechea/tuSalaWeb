import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import CargarSala from "./pages/nuevaSala"
import SalasPorBarrio from "./pages/BuscarSala"
import Outlet1 from "./Outlet1"

export default function App() {
  return (
    <Routes>
      <Route element={<Outlet1/>}>
        <Route path="/" element={<Home />} />
        <Route path="/salas" element={<SalasPorBarrio />} />
        <Route path="/cargar-sala" element={<CargarSala />} />
      </Route>
    </Routes>
  )
}

