import {
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

function renderStars(calificacion: number) {
  const max = 5
  return (
    <>
      {"⭐".repeat(calificacion)}
      {"☆".repeat(max - calificacion)}
    </>
  )
}

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
        <DialogContent bg="white" p={6} borderRadius="md">
          <DialogHeader>
            {sala?.nombre}
          </DialogHeader>

          <DialogCloseTrigger />

          <DialogBody>
            {sala && (
              <>
                <Text mb={2}>
                  📍 {sala.direccion}, {sala.barrio}
                </Text>

                {sala.instagram && (
                    <Link
                    href={`https://instagram.com/${sala.instagram}`}
                    target="_blank"
                    display="block"
                    color="pink.500"
                    fontWeight="medium"
                    mb={2}
                    >
                        📸 @{sala.instagram}
                    </Link>
                )}

                {sala.telefono_whatsapp && (
                    <Link
                        href={`https://wa.me/${sala.telefono_whatsapp}`}
                        target="_blank"
                    >
                        📱 WhatsApp: {sala.telefono_whatsapp}
                    </Link>
                )}

                {sala.calificacion && (
                  <Text mb={2}>
                    {renderStars(sala.calificacion)} ({sala.calificacion}/5)
                  </Text>
                )}

                {sala.precio && (
                  <Text mb={2}>
                    💰 {"$".repeat(sala.precio)}
                  </Text>
                )}
              </>
            )}
          </DialogBody>
        </DialogContent>
      </DialogPositioner>
    </DialogRoot>
  )
}