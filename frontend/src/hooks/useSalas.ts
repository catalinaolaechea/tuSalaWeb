import { useEffect, useState } from "react"
import { getSalas } from "../services/salas"
import type { Sala } from "../types/sala"

export function useSalas(barrio: string | null) {
  const [salas, setSalas] = useState<Sala[]>([])
  const [centro, setCentro] = useState<[number, number]>([-34.6037, -58.3816])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getSalas(barrio)

        setSalas(res.data.salas)

        if (res.data.centro) {
          setCentro([res.data.centro.lat, res.data.centro.lng])
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [barrio])

  return { salas, centro, loading }
}