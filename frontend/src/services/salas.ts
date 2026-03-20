import { api } from "./api"
import type { CrearSala, RespuestaAPI, PuntoMedioResponse } from "../types/sala"

export function getSalas(barrio?: string | null) {
  return api.get<RespuestaAPI>("/salas/", {
    params: barrio ? { barrio: barrio.trim() } : {},
  })
}

export function crearSala(data: CrearSala) {
  return api.post("/api/salas/", data)
}

export async function getBarrios(query: string): Promise<string[]> {
  if (!query.trim()) return []

  const res = await api.get<string[]>("/barrios/", {
    params: { q: query }
  })

  return res.data
}

export async function getPuntoMedio(barrios: string[]): Promise<PuntoMedioResponse> {
  const res = await api.post<PuntoMedioResponse>("/punto-medio/", {
    barrios
  })

  return res.data
}