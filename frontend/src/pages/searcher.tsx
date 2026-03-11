import {
  Box,
  Input,
  Button,
  HStack,
  InputGroup
} from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export default function Buscador() {

  const navigate = useNavigate()
  const [barrio, setBarrio] = useState("")

  const buscar = () => {
    const barrioLimpio = barrio.trim()

    if (!barrioLimpio) {
      navigate("/salas")
    } else {
      navigate(`/salas?barrio=${encodeURIComponent(barrioLimpio)}`)
    }
  }

  return (
    <Box
      maxW="900px"
      mx="auto"
      mt={10}
      px={6}
    >
      <HStack gap={3}>
        <InputGroup flex="1">
          <Input
            size="lg"
            placeholder="Buscar salas por barrio (ej: Palermo)"
            value={barrio}
            onChange={(e) => setBarrio(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") buscar()
            }}
            bg="white"
            boxShadow="sm"
          />
        </InputGroup>

        <Button
          size="lg"
          colorScheme="blue"
          px={8}
          onClick={buscar}
        >
          Buscar
        </Button>
      </HStack>
    </Box>
  )
}