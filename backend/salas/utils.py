
from geopy.geocoders import Nominatim

def separar_direccion_de_barrio(direccion):
    if not direccion or "," not in direccion:
        return direccion, None

    partes = [p.strip() for p in direccion.split(",")]

    if len(partes) >= 2:
        return partes[0], partes[1]

    return direccion, None

def construir_direccion(direccion, barrio):
    if barrio:
        return f"{direccion}, {barrio}"
    return direccion

## de un barrio
def obtener_coordenadas_barrio(barrio):
    geolocator = Nominatim(user_agent="tuSalaWeb")

    location = geolocator.geocode(f"{barrio}, Buenos Aires, Argentina")

    if location:
        return {
            "lat": location.latitude,
            "lng": location.longitude
        }
    
    return None

## de una dirección
def obtener_datos_direccion(direccion):
    geolocator = Nominatim(user_agent="tuSalaWeb")

    try:
        location = geolocator.geocode(
            f"{direccion}, Buenos Aires, Argentina",
            addressdetails=True
        )

        if location:
            address = location.raw.get("address", {})

            barrio = (
                address.get("suburb")
                or address.get("neighbourhood")
                or address.get("city_district")
            )

            return {
                "lat": location.latitude,
                "lng": location.longitude,
                "barrio": barrio
            }

    except:
        pass

    return None

## lista de barrios en lista de coordenadas
def obtener_coordenadas_barrios(barrios):
    coordenadas = []

    for barrio in barrios:
        coords = obtener_coordenadas_barrio(barrio.strip())

        if coords:
            coordenadas.append(coords)

    return coordenadas


def calcular_centro(coordenadas):
    if not coordenadas:
        return None

    lat_prom = sum(c["lat"] for c in coordenadas) / len(coordenadas)
    lng_prom = sum(c["lng"] for c in coordenadas) / len(coordenadas)

    return {
        "lat": lat_prom,
        "lng": lng_prom
    }

def obtener_barrio_desde_coordenadas(lat, lng):
    geolocator = Nominatim(user_agent="tuSalaWeb")

    try:
        location = geolocator.reverse(
            f"{lat}, {lng}",
            addressdetails=True
        )

        if not location:
            return None

        address = location.raw.get("address", {})

        barrio = (
            address.get("suburb")
            or address.get("neighbourhood")
            or address.get("city_district")
            or address.get("town")
            or address.get("village")
        )

        return barrio

    except Exception as e:
        print("Error obteniendo barrio:", e)
        return None