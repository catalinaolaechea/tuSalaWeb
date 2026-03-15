import { Outlet } from "react-router-dom"
import Buscador from "./pages/searcher"

export default function LayoutConBuscador() {
  return (
    <>
      <Buscador />
      <Outlet />
    </>
  )
}