import axios from "axios"
import type {CrearSala, RespuestaAPI} from "../types/sala"

export function getSalas(barrio?: string | null) {
  const url = barrio
    ? `http://localhost:8000/salas/?barrio=${encodeURIComponent(barrio.trim())}`
    : "http://localhost:8000/salas/"

  return axios.get<RespuestaAPI>(url)
}

export function crearSala(data: CrearSala) {
  return axios.post("http://127.0.0.1:8000/api/salas/", data)
}

export const getBarrios = async (query: string): Promise<string[]> => {
  const res = await axios.get(
    `http://localhost:8000/barrios/?q=${query}`
  )
  return res.data
}