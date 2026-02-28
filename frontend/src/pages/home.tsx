import { Box, Heading, Input, Button, VStack , Text } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export default function Home() {
  const navigate = useNavigate();
  const [barrio, setBarrio] = useState(""); // 👈 estado

  const buscar = () => {
    navigate(`/salas?barrio=${barrio}`);
  };

  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
      <VStack gap={6} maxW="500px" w="100%" px={4}>
        
        <Heading textAlign="center" size="2xl">
          Tu sala de ensayo
        </Heading>

        <Input
          placeholder="Buscar por barrio (ej: Palermo)"
          size="lg"
          value={barrio}
          onChange={(e) => setBarrio(e.target.value)} 
        />

        <Button onClick={buscar}>Buscar</Button>

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