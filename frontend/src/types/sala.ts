export type CrearSala = {
  nombre: string
  direccion: string
  telefono_whatsapp: string | null
  instagram: string | null
  precio: number | null
  calificacion: number | null
}

export type Coordenadas = {
  lat: number
  lng: number
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

export type RespuestaAPI = {
  centro: Coordenadas | null
  salas: Sala[]
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

export type StarsProps = {
  calificacion: number
  onChange?: (value: number) => void
}

export type PuntoMedioResponse = {
  centro: Coordenadas
  barrio: string | null
}
