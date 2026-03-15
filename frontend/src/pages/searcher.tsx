import {
  Box,
  Input,
  HStack,
  InputGroup
} from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"

export default function Buscador() {

  const navigate = useNavigate()

  const [barrio, setBarrio] = useState("")
  const [sugerencias, setSugerencias] = useState<string[]>([])

  const buscar = () => {
    const barrioLimpio = barrio.trim()

    if (!barrioLimpio) {
      navigate("/salas")
    } else {
      navigate(`/salas?barrio=${encodeURIComponent(barrioLimpio)}`)
    }
  }

  useEffect(() => {

    const barrioLimpio = barrio.trim()

    if (!barrioLimpio) return

    axios
      .get(`http://localhost:8000/barrios/?q=${barrioLimpio}`)
      .then(res => setSugerencias(res.data))
      .catch(err => console.error(err))

  }, [barrio])

  return (
    <Box
      maxW="900px"
      mx="auto"
      mt={10}
      px={6}
      position="relative"
    >

      <HStack gap={3}>
        <InputGroup flex="1">
          <Input
            size="lg"
            placeholder="Buscar salas por barrio (ej: Palermo)"
            value={barrio}
            onChange={(e) => {
              const value = e.target.value
              setBarrio(value)

              if (!value.trim()) {
                setSugerencias([])
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") buscar()
            }}
            bg="white"
            boxShadow="sm"
          />
        </InputGroup>
      </HStack>

      {sugerencias.length > 0 && (
        <Box
          bg="white"
          mt={2}
          boxShadow="md"
          borderRadius="md"
          overflow="hidden"
        >
          {sugerencias.map((s) => (
            <Box
              key={s}
              px={4}
              py={2}
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              onClick={() => {
                setBarrio(s)
                setSugerencias([])
                navigate(`/salas?barrio=${encodeURIComponent(s)}`)
              }}
            >
              {s}
            </Box>
          ))}
        </Box>
      )}

    </Box>
  )
}