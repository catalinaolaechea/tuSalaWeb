from django.urls import path
from .views import lista_salas, detalle_sala , salas_por_barrio , home


urlpatterns = [
    path("", home),
    path('api/salas/', lista_salas, name='lista_salas'),
    path('api/salas/<int:id>/', detalle_sala, name='detalle_sala'), #
    path("salas/", salas_por_barrio), ## salas/ lista todas las salas y salas/salas-por-barrio todas las del barrio
]