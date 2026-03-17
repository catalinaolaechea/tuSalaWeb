from django.db import models
from django.contrib.auth.models import User
from .utils import obtener_datos_direccion

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
        max_length=20,
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

        direccion_para_buscar = self.direccion

        # 1️⃣ Separar barrio si el usuario lo puso en la dirección
        if self.direccion and "," in self.direccion:
            partes = [p.strip() for p in self.direccion.split(",")]

            if len(partes) >= 2:
                self.direccion = partes[0]
                posible_barrio = partes[1]

                if not self.barrio:
                    self.barrio = posible_barrio

        # reconstruimos la dirección para el geocoder
        if self.barrio:
            direccion_para_buscar = f"{self.direccion}, {self.barrio}"

        # 2️⃣ Obtener coordenadas
        if self.direccion and (self.latitud is None or self.longitud is None):

            datos = obtener_datos_direccion(direccion_para_buscar)

            if datos:
                self.latitud = datos["lat"]
                self.longitud = datos["lng"]

                # solo completar barrio si todavía no existe
                if not self.barrio and datos["barrio"]:
                    self.barrio = datos["barrio"]

        super().save(*args, **kwargs)

    def __str__(self):
        return self.nombre