import { Box, VStack, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"

import type {Mensaje} from "../types/sala"

const mensajes: Mensaje[] = [
  {
    texto: "Chicxs hay que buscar sala para el viernes",
    autor: "Vos",
    tipo: "yo"
  },
  {
    texto: "sisi, busquemos por villa crespo que es nuestro punto medio",
    autor: "Juli guitarra",
    tipo: "otro",
    color: "purple.400"
  },
  {
    texto: "dale, yo puedo despues de las 16",
    autor: "Lau bata",
    tipo: "otro",
    color: "green.400"
  },
  {
    texto: "conocen alguna sala por la zona?",
    autor: "Juli guitarra",
    tipo: "otro",
    color: "purple.400"
  },
  {
    texto: "creo que conozco una pero sin referencias",
    autor: "Juan Bass",
    tipo: "otro",
    color: "orange.400"
  },
  {
    texto: "busquemos en tuSalaWEB, ahí hay referencias y salas por zona!",
    autor: "Lau bata",
    tipo: "otro",
    color: "green.400"
  }
]

function Bubble({ m }: { m: Mensaje }) {
  const soyYo = m.tipo === "yo"

  return (
    <Box
      alignSelf={soyYo ? "flex-end" : "flex-start"}
      position="relative"
      bg={soyYo ? "blue.500" : "gray.200"}
      color={soyYo ? "white" : "black"}
      px={4}
      py={2}
      borderRadius="20px"
      maxW="75%"
      boxShadow="md"
      _after={{
        content: '""',
        position: "absolute",
        bottom: "0",
        [soyYo ? "right" : "left"]: "-8px",
        width: "0",
        height: "0",
        borderTop: "8px solid transparent",
        borderBottom: "8px solid transparent",
        ...(soyYo
          ? { borderLeft: "10px solid", borderLeftColor: "blue.500" }
          : { borderRight: "10px solid", borderRightColor: "gray.200" })
      }}
    >

      {!soyYo && (
        <Text
          fontSize="xs"
          fontWeight="bold"
          color={m.color}
          mb={1}
        >
          {m.autor}
        </Text>
      )}

      <Text fontSize="sm">{m.texto}</Text>

    </Box>
  )
}

export default function ChatAnimado() {

  const [mensajeActual, setMensajeActual] = useState(0)
  const [textoMostrado, setTextoMostrado] = useState("")
  const [indiceLetra, setIndiceLetra] = useState(0)

  const mensaje = mensajes[mensajeActual]

  useEffect(() => {

    if (!mensaje) return

    if (indiceLetra < mensaje.texto.length) {

      const timer = setTimeout(() => {
        setTextoMostrado((prev) => prev + mensaje.texto[indiceLetra])
        setIndiceLetra((i) => i + 1)
      }, 30)

      return () => clearTimeout(timer)
    }

    const siguiente = setTimeout(() => {
      setMensajeActual((m) => m + 1)
      setTextoMostrado("")
      setIndiceLetra(0)
    }, 1100)

    return () => clearTimeout(siguiente)

  }, [indiceLetra, mensajeActual, mensaje])

  return (
    <VStack align="stretch" gap={3} maxW="420px" mx="auto" mt={10}>

      {mensajes.slice(0, mensajeActual).map((m, i) => (
        <Bubble key={i} m={m} />
      ))}

      {mensaje && (
        <Bubble
          m={{
            ...mensaje,
            texto: textoMostrado + "|"
          }}
        />
      )}

    </VStack>
  )
}