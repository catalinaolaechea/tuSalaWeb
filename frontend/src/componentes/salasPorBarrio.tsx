import { useSearchParams } from "react-router-dom"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { 
  Box, 
  Heading, 
  Text, 
  VStack,
  useDisclosure
} from "@chakra-ui/react"
import "leaflet/dist/leaflet.css"
import { useState } from "react"

import DetalleDeLaSala from "./detalleDeSala"
import type { Sala } from "../types/sala"
import { formatearBarrio } from "../utils/formateo"
import { useSalas } from "../hooks/useSalas"

export default function SalasPorBarrio() {
  const { open , onOpen, onClose } = useDisclosure()
  const [salaSeleccionada, setSalaSeleccionada] = useState<Sala | null>(null)

  const [searchParams] = useSearchParams()
  const barrio = searchParams.get("barrio")

  const { salas, centro, loading } = useSalas(barrio)

  function tieneCoords(sala: Sala): sala is Sala & {
    latitud: number
    longitud: number
  } {
    return (
      typeof sala.latitud === "number" &&
      typeof sala.longitud === "number"
    )
  }
  const salasConCoords = salas.filter(tieneCoords)

  return (
    <Box maxW="1100px" mx="auto" mt={10} px={6}>

      {/* TITLE */}
      <Heading mb={6}>
        {barrio 
          ? `Salas en ${formatearBarrio(barrio)}`
          : "Salas de ensayo en CABA"}
      </Heading>

      {/* LOADING */}
      {loading && <Text>Cargando salas...</Text>}

      {/* MAPA */}
      {!loading && (
        <Box borderRadius="lg" overflow="hidden" boxShadow="md" mb={8}>
          <MapContainer
            center={centro}
            zoom={12}
            style={{ height: "420px", width: "100%" }}
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* MARCADORES */}
            {salasConCoords.map((sala) => (
              <Marker key={sala.id} position={[sala.latitud, sala.longitud]}>
                <Popup>
                  <strong>{sala.nombre}</strong>
                  <p>{sala.direccion}</p>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </Box>
      )}

      {/* CARDS */}
      <VStack gap={4} align="stretch">

        {!loading && salas.length === 0 && (
          <Box p={6} bg="gray.50" borderRadius="md" textAlign="center">
            No se encontraron salas en este barrio.
          </Box>
        )}

        {salas.map((sala) => (
          <Box
            key={sala.id}
            p={5}
            bg="white"
            borderRadius="md"
            boxShadow="sm"
            cursor="pointer"
            _hover={{ boxShadow: "md", transform: "scale(1.01)" }}
            onClick={() => {
              setSalaSeleccionada(sala)
              onOpen()
            }}
          >
            <Heading size="md">{sala.nombre}</Heading>

            <Text color="gray.600">
              {sala.direccion}, {sala.barrio}
            </Text>
          </Box>
        ))}

      </VStack>

      <DetalleDeLaSala
        open={open}
        onClose={onClose}
        sala={salaSeleccionada}
      />
    </Box>
  )
}