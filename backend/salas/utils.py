
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