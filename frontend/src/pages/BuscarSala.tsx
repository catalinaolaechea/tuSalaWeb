import Salas from "../componentes/salasPorBarrio"
import Buscador from "../componentes/searcher"
import { useTitle } from "../hooks/useTitle"

export default function BuscarSala() {
  useTitle("TuSala | Buscar Sala")
  return (
    <>
        <Buscador />
        <Salas />
    </>
  )
}