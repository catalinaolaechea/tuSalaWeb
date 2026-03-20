import { Star } from "lucide-react"
import type {StarsProps} from "../types/sala"

export function Stars({ calificacion, onChange }: StarsProps) {
  const max = 5

  return (
    <>
      {Array.from({ length: max }).map((_, i) => {
        const value = i + 1
        const isActive = calificacion >= value

        return (
          <Star
            key={value}
            size={20}
            fill={isActive ? "gold" : "none"}
            color={isActive ? "gold" : "#ccc"}
            style={{ cursor: onChange ? "pointer" : "default" }}
            onClick={() => onChange?.(value)}
          />
        )
      })}
    </>
  )
}
