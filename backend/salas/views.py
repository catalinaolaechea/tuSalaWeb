from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from django.db.models import Avg
from .serializers import SalaSerializer
from .utils import (obtener_coordenadas_barrio, obtener_coordenadas_barrios, calcular_centro , obtener_barrio_desde_coordenadas)
from .models import Sala

CENTRO_CABA = {
    "lat": -34.6037,
    "lng": -58.3816
}

## en la pagina los usuarios solo pueden ver las salas aprobadas por el administrador
@api_view(['GET', 'POST'])
def lista_salas(request):
    if request.method == 'GET':
        salas = Sala.objects.filter(activa=True)

        barrio = request.GET.get('barrio')
        precio = request.GET.get('precio')
        calificacion = request.GET.get('calificacion')

        ## filtros
        if barrio:
            salas = salas.filter(barrio__iexact=barrio)

        if precio:
            salas = salas.filter(precio=precio)

        if calificacion:
            salas = salas.filter(calificacion=calificacion)

        # ORDENAMIENTO
        ordering = request.GET.get('ordering')
        if ordering:
            salas = salas.order_by(ordering)

        # PAGINACIÓN
        paginator = PageNumberPagination()
        paginator.page_size = 5
        result_page = paginator.paginate_queryset(salas, request)

        serializer = SalaSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)

    elif request.method == 'POST':
        serializer = SalaSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(estado="pendiente")
            return Response(serializer.data, status=201)
            # 201 created --> (POST exitoso)
        return Response(serializer.errors, status=400)
             # 400 bad rqst --> invalid 

@api_view(['GET'])
def detalle_sala(request, id):
    sala = get_object_or_404(
        Sala,
        id=id,
        estado="aprobada",
        activa=True
    )

    serializer = SalaSerializer(sala)
    return Response(serializer.data)

## GET http://localhost:8000/salas-por-barrio/?barrio=barrio
## barrio= Palermo || barrio = Monserrat || etc
@api_view(['GET'])
def salas_por_barrio(request):

    barrio = request.GET.get("barrio")

    # si el usuario completa un barrio
    if barrio:
        barrio = barrio.strip()

        salas = Sala.objects.filter(
            barrio__iexact=barrio,
            estado="aprobada",
            activa=True
        )

        # si existen salas en ese barrio -> centro promedio
        if salas.exists():
            centro = salas.aggregate(
                lat=Avg("latitud"),
                lng=Avg("longitud")
            )

        # si no existen salas -> centro del barrio
        else:
            coords = obtener_coordenadas_barrio(barrio)

            if coords:
                centro = coords
            else:
                centro = CENTRO_CABA

    # si el usuario no puso barrio
    else:

        salas = Sala.objects.filter(
            estado="aprobada",
            activa=True
        ).order_by("?")[:10]

        centro = CENTRO_CABA

    serializer = SalaSerializer(salas, many=True)

    return Response({
        "centro": centro,
        "salas": serializer.data
    })

@api_view(['GET'])
def sugerencias_barrios(request):

    q = request.GET.get("q", "").strip()

    if not q:
        return Response([])

    barrios = (
        Sala.objects
        .filter(barrio__icontains=q)
        .values_list("barrio", flat=True)
        .distinct()
    )

    return Response(list(barrios))

@api_view(['POST'])
def punto_medio(request):

    barrios = request.data.get("barrios", [])

    if not barrios:
        return Response({"error": "Debe enviar al menos un barrio"}, status=400)

    coordenadas = obtener_coordenadas_barrios(barrios)

    if not coordenadas:
        return Response({"error": "No se pudieron obtener coordenadas"}, status=400)

    centro = calcular_centro(coordenadas)

    barrio = None
    if centro:
        barrio = obtener_barrio_desde_coordenadas(
            centro["lat"],
            centro["lng"]
        )

    return Response({
        "centro": centro,
        "barrio": barrio
    })