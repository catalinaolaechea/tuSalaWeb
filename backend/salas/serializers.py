from rest_framework import serializers
from .models import Sala

# Convertí el modelo Sala a JSON con todos sus campos

class SalaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sala
        fields = '__all__'
        read_only_fields = ['estado', 'creador', 'creada_en'] #seguridad para que el usuario no pueda completar