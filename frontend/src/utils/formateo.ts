export function formatearBarrio(nombre: string) {
  return nombre
    .toLowerCase()
    .split(" ")
    .map(p => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ")
}