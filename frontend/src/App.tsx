import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/home"
import CargarSala from "./pages/nuevaSala"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cargar-sala" element={<CargarSala />} />
      </Routes>
    </BrowserRouter>
  )
}

