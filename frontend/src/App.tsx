import { Routes, Route } from "react-router-dom"
import Home from "./pages/home"
import CargarSala from "./pages/nuevaSala"
import SalasPorBarrio from "./pages/salasPorBarrio"
import MainLayout from "./mainLayout"

export default function App() {
  return (
    <Routes>

      {/* Páginas con navbar + buscador */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/salas" element={<SalasPorBarrio />} />
      </Route>

      {/* Página sin buscador */}
      <Route path="/cargar-sala" element={<CargarSala />} />

    </Routes>
  )
}

