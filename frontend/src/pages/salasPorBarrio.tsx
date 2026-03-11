import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap  } from "react-leaflet";
//import type { LatLngExpression } from "leaflet";
import { Box } from "@chakra-ui/react";
import "leaflet/dist/leaflet.css";
import axios from "axios";

type Sala = {
  id: number;
  nombre: string;
  direccion: string;
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
    <div>
      <h1>
        {barrio ? `Salas en ${formatearBarrio(barrio)}`: "Salas de ensayo en CABA"}
      </h1>
      <Box maxW="900px" mx="auto" mt={10} px={4}>
        {centro && (
        <MapContainer
          center={centro}
          zoom={12}
          style={{ height: "400px" }}
        >

          <ControlMapa centro={centro} barrio={barrio} />

          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
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
        )}
          {salas.map((sala) => (
            <div key={sala.id}>
              <p>{sala.nombre}</p>
              <p>{sala.direccion}</p>
            </div>
          ))}
      </Box>
    </div>
  );
}

export default SalasPorBarrio;