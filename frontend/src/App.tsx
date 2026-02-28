import { Routes, Route } from "react-router-dom"
import Home from "./pages/home"
import CargarSala from "./pages/nuevaSala"
import SalasPorBarrio from "./pages/salasPorBarrio"

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cargar-sala" element={<CargarSala />} />
        <Route path="/salas" element={<SalasPorBarrio />} />
      </Routes>
  )
}

