import { Box, Heading, Input, Button, VStack , Text } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

export default function Home() {
  const navigate = useNavigate()

  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
      <VStack gap={6} maxW="500px" w="100%" px={4}>
        
        <Heading textAlign="center" size="2xl">
          Tu sala de ensayo
        </Heading>

        <Input
          placeholder="Buscar por barrio (ej: Palermo)"
          size="lg"
        />
        <Text fontWeight="bold">ó</Text>
        <Button
          colorPalette="blue"
          size="lg"
          w="100%"
          onClick={() => navigate("/cargar-sala")}
        >
          Quiero cargar mi sala
        </Button>

      </VStack>
    </Box>
  )
}
