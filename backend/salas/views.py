from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Sala
from .serializers import SalaSerializer
from rest_framework.pagination import PageNumberPagination

## en la pagina los usuarios solo pueden ver las salas aprobadas por el administrador
@api_view(['GET', 'POST'])
def lista_salas(request):
    if request.method == 'GET':
        salas = Sala.objects.filter(
            estado="aprobada",
            activa=True
        )

        barrio = request.GET.get('barrio')
        precio = request.GET.get('precio')
        calificacion = request.GET.get('calificacion')

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

