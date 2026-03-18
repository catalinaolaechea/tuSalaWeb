export type CrearSala = {
  nombre: string
  direccion: string
  telefono_whatsapp: string | null
  instagram: string | null
  precio: number | null
  calificacion: number | null
}

export type RespuestaAPI = {
  centro: {
    lat: number
    lng: number
  } | null
  salas: Sala[]
}

export type Sala = {
  id: number
  nombre: string
  direccion: string
  barrio: string | null

  telefono_whatsapp: string | null
  instagram: string | null

  precio: number | null
  calificacion: number | null

  latitud: number | null
  longitud: number | null
}

export type Props = {
  open: boolean
  onClose: () => void
  sala: Sala | null
}

export type Mensaje = {
  texto: string
  autor: string
  tipo: "yo" | "otro"
  color?: string
}
