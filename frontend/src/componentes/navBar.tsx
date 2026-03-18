import { Box, Flex, Heading, Button, HStack } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

export default function Navbar() {
  const navigate = useNavigate()

  return (
    <Box
      bg="white"
      borderBottom="1px"
      borderColor="gray.200"
      position="sticky"
      top="0"
      zIndex="1000"
    >
      <Flex
        maxW="1100px"
        mx="auto"
        px={6}
        py={4}
        align="center"
        justify="space-between"
      >
        <Heading
          size="md"
          cursor="pointer"
          onClick={() => navigate("/")}
        >
          🎵 TuSala
        </Heading>

        <HStack gap={3}>
          <Button
            variant="ghost"
            onClick={() => navigate("/salas")}
          >
            Explorar salas
          </Button>

          <Button
            colorScheme="blue"
            onClick={() => navigate("/cargar-sala")}
          >
            Publicar sala
          </Button>
        </HStack>
      </Flex>
    </Box>
  )
}