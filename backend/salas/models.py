from django.db import models
from django.contrib.auth.models import User
from geopy.geocoders import Nominatim

class Sala(models.Model):

    OPCIONES_CALIFICACION = [
        (1, "Muy malo"),
        (2, "Malo"),
        (3, "Regular"),
        (4, "Bueno"),
        (5, "Excelente"),
    ]

    OPCIONES_PRECIO = [
        (1, "$"),
        (2, "$$"),
        (3, "$$$"),
    ]

    ESTADO_OPCIONES = [
        ("pendiente", "Pendiente"),
        ("aprobada", "Aprobada"),
        ("rechazada", "Rechazada"),
    ]

    # DATOS BÁSICOS (usuario puede cargar solo esto)
    nombre = models.CharField(max_length=150)
    direccion = models.CharField(max_length=200)

    # DATOS QUE EL ADMIN PUEDE COMPLETAR
    barrio = models.CharField(max_length=100, null=True, blank=True)

    latitud = models.FloatField(null=True, blank=True)
    longitud = models.FloatField(null=True, blank=True)

    instagram = models.CharField(max_length=100, null=True, blank=True)
    telefono_whatsapp = models.CharField(max_length=20, null=True, blank=True)

    calificacion = models.IntegerField(
        choices=OPCIONES_CALIFICACION, 
        null=True, 
        blank=True
    )

    precio = models.IntegerField(
        choices=OPCIONES_PRECIO, 
        null=True, 
        blank=True
    )

    estado = models.CharField(
        max_length=10,
        choices=ESTADO_OPCIONES,
        default="pendiente",
        
    )
 
    # cada sala es creada por un ADMINISTRADOR
    creador = models.ForeignKey(
        User,
        on_delete=models.SET_NULL, #si el usuario e elimina, no la sala 
        null=True,
        blank=True
    )

    activa = models.BooleanField(default=True) #si el admin quiere desactivar temporalmente una sala aprobada
    creada_en = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if self.direccion and (self.latitud is None or self.longitud is None):
            geolocator = Nominatim(user_agent="tusalaweb")

            try:
                location = geolocator.geocode(f"{self.direccion}, Buenos Aires, Argentina")

                if location:
                    self.latitud = location.latitude
                    self.longitud = location.longitude
            except:
                pass
        super().save(*args, **kwargs)

    def __str__(self):
        return self.nombre