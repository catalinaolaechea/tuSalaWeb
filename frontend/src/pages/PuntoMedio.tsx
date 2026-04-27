import {
  Box,
  Button,
  Input,
  VStack,
  HStack,
  Heading,
  IconButton,
  Text
} from "@chakra-ui/react"
import { Trash , Plus } from "lucide-react"
import { useState } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import type { Coordenadas } from "../types/sala"
import { getPuntoMedio } from "../services/salas"
import { useNavigate } from "react-router-dom"

import "leaflet/dist/leaflet.css"

export default function PuntoMedio(){
    const navigate = useNavigate()
    const [ubicaciones, setUbicaciones] = useState<string[]>([""])
    const [centro, setCentro] = useState<Coordenadas | null>(null)
    const [loading, setLoading] = useState(false)
    const [barrio, setBarrio] = useState<string | null>(null)

    // agregar input
    function agregarInput() {
        setUbicaciones([...ubicaciones, ""])
    }

    // eliminar input
    function eliminarInput(index: number) {
        const nuevas = ubicaciones.filter((_, i) => i !== index)
        setUbicaciones(nuevas)
    }

    // manejar cambios
    function handleChange(index: number, value: string) {
        const nuevas = [...ubicaciones]
        nuevas[index] = value
        setUbicaciones(nuevas)
    }

    // llamar backend
    async function calcularCentro() {
        const barriosFiltrados = ubicaciones
            .map(b => b.trim())
            .filter(b => b !== "")

        if (barriosFiltrados.length === 0) return

        setLoading(true)

        try {
            const data = await getPuntoMedio(barriosFiltrados)

            setCentro(data.centro)
            setBarrio(data.barrio)

            if (data.barrio) {
            navigate(`/buscar-sala?barrio=${encodeURIComponent(data.barrio)}`)
            }

        } catch (error) {
            console.error("Error calculando punto medio", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Box p={8} maxW="900px" mx="auto">

        <Heading mb={6}>Punto Medio</Heading>

        {/* INPUTS */}
        <VStack gap={4} align="stretch">

            {ubicaciones.map((ubicacion, index) => (
            <HStack key={index}>
                <Input
                placeholder={`Persona ${index + 1} (ej: Palermo)`}
                value={ubicacion}
                onChange={(e) => handleChange(index, e.target.value)}
                />

                {ubicaciones.length > 1 && (
                    <IconButton aria-label="Eliminar" onClick={() => eliminarInput(index)}>
                        <Trash size={18} />
                    </IconButton>
                )}
            </HStack>
            ))}

            <Button onClick={agregarInput} variant="outline">
                <HStack gap={2}>
                    <Plus size={18} />
                    <span>Agregar persona</span>
                </HStack>
            </Button>

            <Button
            colorScheme="teal"
            onClick={calcularCentro}
            loading={loading}
            >
                Calcular punto medio
            </Button>

        </VStack>

        {/* MAPA */}
        <Box mt={10} borderRadius="lg" overflow="hidden">

            <MapContainer
            center={[-34.6037, -58.3816]}
            zoom={12}
            style={{ height: "400px", width: "100%" }}
            >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Punto medio */}
            {centro && (
                <Marker position={[centro.lat, centro.lng]}>
                <Popup>Punto medio</Popup>
                </Marker>
            )}

            </MapContainer>

        </Box>

        {/* INFO */}
        {barrio && (
            <Box mt={4}>
                <Text fontWeight="medium">
                📍 Barrio sugerido: {barrio}
                </Text>
            </Box>
        )}

        </Box>
    )

}