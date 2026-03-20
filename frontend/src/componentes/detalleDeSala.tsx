import {
  VStack,
  HStack,
  DialogRoot,
  DialogBackdrop,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogCloseTrigger,
  DialogPositioner
} from "@chakra-ui/react"
import { Text , Link } from "@chakra-ui/react"
import type { Props } from "../types/sala"
import { MapPin, Instagram, Phone, CircleDollarSign, Award } from "lucide-react"
import { Stars } from "../utils/starsRender"
export default function SalaDetalleDialog({ open, onClose, sala }: Props) {
  return (
    <DialogRoot
      open={open}
      onOpenChange={(details) => {
        if (!details.open) onClose()
      }}
    >
      <DialogBackdrop />

      <DialogPositioner>
        <DialogContent bg="white" p={6} borderRadius="xl" boxShadow="xl">
          <DialogHeader fontSize="xl" fontWeight="bold">
            {sala?.nombre}
          </DialogHeader>

          <DialogCloseTrigger />

          <DialogBody>
            {sala && (
              <VStack align="start" gap={4} mt={2}>
                <HStack gap={2}>
                  <MapPin size={18} color="#666"/>
                  <Text color="gray.600">
                    {sala.direccion}, {sala.barrio}
                  </Text>
                </HStack>

                {sala.instagram && (
                  <HStack gap={2}>
                    <Instagram size={18} color="#E1306C"/>
                    <Link
                      href={`https://instagram.com/${sala.instagram}`}
                      target="_blank"
                      fontWeight="medium"
                    >
                      @{sala.instagram}
                    </Link>  
                  </HStack>
                  
                )}

                {sala.telefono_whatsapp && (
                  <HStack gap={2}>
                    <Phone size={18} color="green"/>
                    <Link
                      href={`https://wa.me/${sala.telefono_whatsapp}`}
                      target="_blank"
                    >
                      {sala.telefono_whatsapp}
                    </Link>
                  </HStack>
                
                )}

                {sala.calificacion && (
                  <HStack justify="space-between" w="100%">
                    <HStack gap={2}>
                      <Award size={18} color="grey"/>
                      <Text fontWeight="medium">Calificación</Text>
                    </HStack>
                    <HStack>
                      <Stars calificacion={sala.calificacion} />
                      <Text color="gray.500">
                        ({sala.calificacion}/5)
                      </Text>
                    </HStack>
                  </HStack>
                  
                )}

                {sala.precio && (
                  <HStack justify="space-between" w="100%">
                    <HStack gap={2}>
                      <CircleDollarSign size={18} color="gold"/> 
                      <Text fontWeight="medium">Precio</Text>
                    </HStack>
                    <HStack>
                      <Text fontWeight="bold">
                        {Array.from({ length: sala.precio }).map(() => "$").join(" ")}
                      </Text>
                    </HStack>
                  </HStack>
                )}
              </VStack>
            )}
          </DialogBody>
        </DialogContent>
      </DialogPositioner>
    </DialogRoot>
  )
}