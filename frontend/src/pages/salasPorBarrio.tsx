import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap  } from "react-leaflet";
//import type { LatLngExpression } from "leaflet";
import { Box , Heading , Text, VStack} from "@chakra-ui/react";
import "leaflet/dist/leaflet.css";
import axios from "axios";

type Sala = {
  id: number;
  nombre: string;
  direccion: string;
  barrio: string | null
  precio: number;
  latitud: number;
  longitud: number;
};

type RespuestaAPI = {
  centro: {
    lat: number;
    lng: number;
  } | null;
  salas: Sala[];
};

function ControlMapa({ centro, barrio }: { centro: [number, number], barrio: string | null }) {
  
  const map = useMap();

  useEffect(() => {

    if (!centro || centro.length !== 2) return;

    let zoom = 12;

    if (barrio) {
      zoom = 14;
    }

    map.setView(centro, zoom);

  }, [centro, barrio, map]);

  return null;
}

function formatearBarrio(nombre: string) {
  return nombre
    .toLowerCase()
    .split(" ")
    .map(p => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
}

function SalasPorBarrio() {
  const [searchParams] = useSearchParams();
  const barrio = searchParams.get("barrio");

  const [salas, setSalas] = useState<Sala[]>([]);
  const [centro, setCentro] = useState<[number, number]>([-34.6037, -58.3816]);

  useEffect(() => {

    const url = barrio
    ? `http://localhost:8000/salas/?barrio=${encodeURIComponent(barrio.trim())}`
    : "http://localhost:8000/salas/";

    axios
    .get<RespuestaAPI>(url)
    .then((res) => {

      /*console.log("API:", res.data);*/

      setSalas(res.data.salas);

      if (res.data.centro) {
        setCentro([res.data.centro.lat, res.data.centro.lng]);
      }
    }).catch((err) => console.error(err));

  }, [barrio]);

  const salasConCoords = salas.filter(
    sala => typeof sala.latitud === "number" && typeof sala.longitud === "number"
  );

  return (
    <Box maxW="1100px" mx="auto" mt={10} px={6}>

      <Heading mb={6}>
        {barrio 
          ? `Salas en ${formatearBarrio(barrio)}` 
          : "Salas de ensayo en CABA"}
      </Heading>

      {/* MAPA */}
      {centro && (
        <Box
          borderRadius="lg"
          overflow="hidden"
          boxShadow="md"
          mb={8}
        >
          <MapContainer
            center={centro}
            zoom={12}
            style={{ height: "420px", width: "100%" }}
          >

            <ControlMapa centro={centro} barrio={barrio} />

            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {salasConCoords.map((sala) => (
              <Marker key={sala.id} position={[sala.latitud, sala.longitud]}>
                <Popup>
                  <strong>{sala.nombre}</strong>
                  <p>{sala.direccion}</p>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </Box>
      )}

        {/* LISTADO DE SALAS */}
      <VStack gap={4} align="stretch">

        {salas.length === 0 && (
          <Box
            p={6}
            bg="gray.50"
            borderRadius="md"
            textAlign="center"
          >
            No se encontraron salas en este barrio.
          </Box>
        )}

        {salas.map((sala) => (
          <Box
            key={sala.id}
            p={5}
            bg="white"
            borderRadius="md"
            boxShadow="sm"
            _hover={{ boxShadow: "md" }}
          >
            <Heading size="md">{sala.nombre}</Heading>

            <Text color="gray.600">
              {sala.direccion}, {sala.barrio}
            </Text>
          </Box>
        ))}

      </VStack>

    </Box>
  );
}

export default SalasPorBarrio;