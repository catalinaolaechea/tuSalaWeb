import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
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

function SalasPorBarrio() {
  const [searchParams] = useSearchParams();
  const barrio = searchParams.get("barrio");

  const [salas, setSalas] = useState<Sala[]>([]);
  const [centro, setCentro] = useState<LatLngExpression>([-34.6037, -58.3816]); // default CABA

  useEffect(() => {
    axios
      .get<RespuestaAPI>(`http://localhost:8000/salas-por-barrio/?barrio=${barrio}`)
      .then((res) => {
        setSalas(res.data.salas);

        if (res.data.centro) {
          setCentro([res.data.centro.lat, res.data.centro.lng]);
        }
      });
  }, [barrio]);

  return (
    <div>
      <h1>Salas en {barrio}</h1>

      <MapContainer center={centro} zoom={13} style={{ height: "400px" }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {salas.map((sala) => (
          <Marker key={sala.id} position={[sala.latitud, sala.longitud]}>
            <Popup>
              <strong>{sala.nombre}</strong>
              <p>{sala.direccion}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {salas.map((sala) => (
        <div key={sala.id}>
          <p>{sala.nombre}</p>
          <p>{sala.direccion}</p>
        </div>
      ))}
    </div>
  );
}

export default SalasPorBarrio;