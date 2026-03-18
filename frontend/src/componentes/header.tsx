import { Box, Heading, Text, VStack } from "@chakra-ui/react"

export default function HeroTuSala() {
  return (
    <Box textAlign="center" mt={12} mb={6} px={4}>
      <VStack gap={2}>
        
        <Heading size="2xl" fontWeight="bold">
          tuSala
          <Box as="span" color="blue.500">
            WEB
          </Box>
        </Heading>

        <Text fontSize="lg" color="gray.600" maxW="500px">
          Encontrá salas de ensayo con referencias reales y organizá tu próxima zapada sin vueltas.
        </Text>

      </VStack>
    </Box>
  )
}