
from geopy.geocoders import Nominatim

def obtener_coordenadas_barrio(barrio):
    geolocator = Nominatim(user_agent="tuSalaWeb")

    location = geolocator.geocode(f"{barrio}, Buenos Aires, Argentina")

    if location:
        return {
            "lat": location.latitude,
            "lng": location.longitude
        }
    
    return None

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