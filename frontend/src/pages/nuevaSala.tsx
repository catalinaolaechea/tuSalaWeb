import {
  Box,
  Heading,
  Input,
  Button,
  VStack,
  Field,
  NumberInput,
} from "@chakra-ui/react"

export default function CargarSala() {
  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center" px={4}>
      <VStack gap={6} maxW="500px" w="100%">

        <Heading size="xl" textAlign="center">
          Cargar nueva sala
        </Heading>

        <Field.Root>
          <Field.Label>Nombre de la sala</Field.Label>
          <Input placeholder="Ej: Sala Rock Palermo" />
        </Field.Root>

        <Field.Root>
          <Field.Label>Ubicación</Field.Label>
          <Input placeholder="Ej: Palermo" />
        </Field.Root>

        <Field.Root>
          <Field.Label>Red social / Contacto</Field.Label>
          <Input placeholder="Instagram o teléfono" />
        </Field.Root>

        <Field.Root>
          <Field.Label>Precio por hora</Field.Label>
          <NumberInput.Root>
            <NumberInput.Input placeholder="Ej: 15000" />
          </NumberInput.Root>
        </Field.Root>

        <Field.Root>
          <Field.Label>Calificación</Field.Label>
          <NumberInput.Root min={1} max={5}>
            <NumberInput.Input placeholder="1 a 5" />
          </NumberInput.Root>
        </Field.Root>

        <Button colorPalette="blue" w="100%">
          Enviar
        </Button>

      </VStack>
    </Box>
  )
}