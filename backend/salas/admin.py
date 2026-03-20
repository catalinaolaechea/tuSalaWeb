from django.contrib import admin
from .models import Sala

@admin.register(Sala)
class SalaAdmin(admin.ModelAdmin):

    def save_model(self, request, obj, form, change):
        if obj.estado == "aprobada" and not obj.barrio:
            raise ValueError("Debes completar el barrio antes de aprobar la sala")

        super().save_model(request, obj, form, change)

