import Hero from "../componentes/header"
import Buscador from "../componentes/searcher"
import ChatAnimado from "../componentes/ChatAnimado"
import { useTitle } from "../hooks/useTitle"

export default function Home() {
  useTitle("TuSala | Home")
  return (
    <>
      <Hero />
      <Buscador />
      <ChatAnimado />
    </>
  )
}