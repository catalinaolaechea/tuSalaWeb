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
import { crearSala } from "../services/salas"

export default function CargarSala() {
  const [nombre, setNombre] = useState("")
  const [ubicacion, setUbicacion] = useState("")
  const [contacto, setContacto] = useState("")
  const [calificacion, setCalificacion] = useState<number | null>(null)
  const [precio, setPrecio] = useState<number | null>(null)
  const [enviado, setEnviado] = useState(false)

  const enviarSala = async () => {
    try {

      let telefono_whatsapp = null
      let instagram = null

      // si el texto tiene letras, asumimos que es Instagram
      const tieneLetras = /[a-zA-Z]/.test(contacto)

      if (tieneLetras) {
        instagram = contacto
      } else {
        telefono_whatsapp = contacto
      }

      await crearSala({
        nombre,
        direccion: ubicacion,
        telefono_whatsapp,
        instagram,
        precio,
        calificacion,
      })

      setEnviado(true)

    } catch (error) {
      console.error(error)
      alert("Error al enviar la sala")
    }
}

const resetForm = () => {
  setNombre("")
  setUbicacion("")
  setContacto("")
  setPrecio(null)
  setCalificacion(null)
  setEnviado(false)
}

if (enviado) {
  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center" px={4}>
      <Box
        bg="white"
        p={10}
        borderRadius="lg"
        boxShadow="md"
        textAlign="center"
        maxW="400px"
      >
        <Heading size="lg" mb={4}>
          ¡Gracias por tu aporte! 🎵
        </Heading>

        <Box mb={6}>
          La sala fue enviada para revisión.  
          Cuando sea aprobada aparecerá en el mapa.
        </Box>

        <Button colorPalette="blue" onClick={resetForm}>
          Enviar otra sala
        </Button>
      </Box>
    </Box>
  )
}


  return(
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