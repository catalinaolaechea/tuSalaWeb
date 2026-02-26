from django.urls import path
from .views import lista_salas, detalle_sala

urlpatterns = [
    path('api/salas/', lista_salas, name='lista_salas'),
    path('api/salas/<int:id>/', detalle_sala, name='detalle_sala'),
]