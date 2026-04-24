import { Box, Flex, Heading, Button, HStack } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { MapPin , Search , Plus } from "lucide-react"
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
        display="flex"
        alignItems="center"
        fontWeight="bold"
      >
        tuSala
        <Box as="span" color="blue.500" ml="1">
          WEB
        </Box>
      </Heading>

        <HStack gap={2}>

          <Button
            variant="ghost"
            onClick={() => navigate("/buscar-punto-medio")}
          >
            <HStack gap={2}>
              <MapPin size={18} />
              <span>Punto medio</span>
            </HStack>
          </Button>

          <Button
            variant="ghost"
            onClick={() => navigate("/salas")}
          >
            <HStack gap={2}>
              <Search size={18} />
              <span>Explorar</span>
            </HStack>
          </Button>

          <Button
            colorPalette="blue"
            onClick={() => navigate("/cargar-sala")}
            borderRadius="full"
            px={5}
          >
            <HStack gap={2}>
              <Plus size={18} />
              <span>Publicar</span>
            </HStack>
          </Button>

        </HStack>
      </Flex>
    </Box>
  )
}