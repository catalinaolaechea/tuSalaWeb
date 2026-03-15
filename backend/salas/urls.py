from django.urls import path
from .views import lista_salas, detalle_sala , salas_por_barrio , home, sugerencias_barrios


urlpatterns = [
    path("", home),
    path('api/salas/', lista_salas, name='lista_salas'),
    path('api/salas/<int:id>/', detalle_sala, name='detalle_sala'), #
    path("salas/", salas_por_barrio), ## salas/ lista todas las salas y salas/salas-por-barrio todas las del barrio
    path("barrios/", sugerencias_barrios),
]