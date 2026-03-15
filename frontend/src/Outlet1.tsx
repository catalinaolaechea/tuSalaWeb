import { Outlet } from "react-router-dom"
import Navbar from "./pages/navBar"

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}