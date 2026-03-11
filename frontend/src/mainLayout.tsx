import { Outlet } from "react-router-dom"
import Navbar from "./pages/navBar"
import Buscador from "./pages/searcher"

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <Buscador />
      <Outlet />
    </>
  )
}