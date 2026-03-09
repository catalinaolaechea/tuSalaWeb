import {
  Box,
  Heading,
  Input,
  Button,
  VStack,
  HStack,
  Field,
} from "@chakra-ui/react"
import { useState } from "react"
import axios from "axios"

export default function CargarSala() {
  const [nombre, setNombre] = useState("")
  const [ubicacion, setUbicacion] = useState("")
  const [contacto, setContacto] = useState("")
  const [calificacion, setCalificacion] = useState<number | null>(null)
  const [precio, setPrecio] = useState<number | null>(null)

  const enviarSala = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/api/salas/", {
        nombre: nombre,
        direccion: ubicacion,
        contacto: contacto,
        precio: precio,
        calificacion: calificacion,
      })

      alert("Sala enviada para revisión")

    } catch (error) {
      console.error(error)
      alert("Error al enviar la sala")
    }
}

  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center" px={4}>
      <VStack gap={6} maxW="500px" w="100%">

        <Heading size="xl" textAlign="center">
          Cargar nueva sala
        </Heading>

        <Field.Root>
          <Field.Label>Nombre de la sala</Field.Label>
          <Input 
            placeholder="Ej: Sala Rock Palermo" 
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </Field.Root>

        <Field.Root>
          <Field.Label>Ubicación</Field.Label>
          <Input
            placeholder="Ej: Palermo"
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
          />
        </Field.Root>

        <Field.Root>
          <Field.Label>Red social / Contacto</Field.Label>
            <Input
              placeholder="Instagram o teléfono"
              value={contacto}
              onChange={(e) => setContacto(e.target.value)}
            />
        </Field.Root>

        <Field.Root>
          <Field.Label>Precio estimado</Field.Label>

          <HStack>
            {[1, 2, 3].map((p) => (
              <Button
                key={p}
                variant={precio === p ? "solid" : "outline"}
                onClick={() => setPrecio(p)}
              >
                {"$".repeat(p)}
              </Button>
            ))}
          </HStack>
        </Field.Root>

        <Field.Root>
          <Field.Label>Calificación</Field.Label>
          <select
            value={calificacion ?? ""}
            onChange={(e) => setCalificacion(Number(e.target.value))}
          >
            <option value="">Seleccionar</option>
            <option value="1">1 - Muy malo</option>
            <option value="2">2 - Malo</option>
            <option value="3">3 - Regular</option>
            <option value="4">4 - Bueno</option>
            <option value="5">5 - Excelente</option>
          </select>
        </Field.Root>

        <Button 
          colorPalette="blue" 
          w="100%"
          onClick={enviarSala}
        >
          Enviar
        </Button>

      </VStack>
    </Box>
  )
}