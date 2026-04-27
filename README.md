
# 🎵 tuSalaWEB: música y tecnología
## Sobre el Proyecto:

**TuSalaWeb** es una plataforma web pensada para ayudar a músicos a descubrir, compartir y difundir salas de ensayo.

La aplicación busca crear una **comunidad colaborativa**, donde los usuarios puedan encontrar salas según su ubicación y también aportar nuevas salas que aún no son conocidas.

El sistema incluye un proceso de validación por parte de un administrador antes de que una sala sea publicada, asegurando calidad y confiabilidad en la información.

## Cómo surgio la idea?

La idea nació de algo muy simple: una charla con un compañero músico que no sabía dónde encontrar buenas recomendaciones de salas de ensayo. Ahí fue cuando pensé que podía ser una buena oportunidad para crear una solución y, al mismo tiempo, empezar a construir comunidad.

---

## 🔄 Funcionalidades principales

### 🗺️ Mapa interactivo (Leaflet)
- Visualización de salas de ensayo en un mapa interactivo
- Navegación y exploración por ubicación
- Mejor experiencia visual para encontrar salas cercanas

### 📍 Punto medio entre artistas
- Cálculo del punto medio entre varios músicos
- Sugerencia del barrio más conveniente para todos
- Visualización de salas disponibles en esa zona

### 🔎 Búsqueda de salas
- Buscador de salas por barrio
- Exploración rápida de salas según ubicación
- Descubrimiento de nuevas salas de ensayo

### 🏠 Publicación de salas
- Los usuarios pueden cargar nuevas salas
- Sistema de revisión por administrador antes de publicar
- Validación de información para mantener calidad

---

## 🧰 Tecnologías utilizadas

### Backend
- Python
- Django
- Django Admin

### Frontend
- React
- TypeScript
- Vite
- Chakra UI (componentes UI)
- Framer Motion (animaciones)
- Axios (consumo de API)
- Leaflet + React-Leaflet (mapa interactivo)
- Lucide React (iconos)

### Otros
- Git & GitHub

---

## ⚙️ Cómo levantar el proyecto

### 1️⃣ Clonar repositorio

```bash
git clone https://github.com/catalinaolaechea/tuSalaWeb.git
cd tuSalaWeb
```

Backend (Django):
```bash
cd backend
npm install
python manage.py runserver
```

Frontend (React + Vite):
```bash
cd frontend
npm install
npm run dev
```

## Panel de administración:
Acceso al admin de Django:
[Accedé acá](http://localhost:8000/admin)

crear nuevo user admin:
```bash
python manage.py createsuperuser
```

---

## 🚧 Futuras mejoras

El proyecto continuará evolucionando con nuevas funcionalidades orientadas a la comunidad y a la puesta en producción.

### 🚀 Deploy e infraestructura
- Deploy del sistema en producción
- Configuración de variables de entorno
- Preparación para base de datos en producción
- Optimización de performance general

### 👤 Gestión de usuarios
- Registro e inicio de sesión de usuarios
- Creación de panel de usuario
- Gestión de perfil y salas cargadas por cada usuario

### 💬 Sistema de comentarios
- Incorporar comentarios y reseñas de salas
- Moderación y limitaciones para evitar contenido ofensivo o irrespetuoso
- Sistema de reportes y control de calidad de la comunidad

### 📅 Reserva de salas
- Posibilidad de reservar salas desde la web
- Integración con salas mediante acuerdos/contratos
- Gestión de disponibilidad y horarios

### 🗺️ Mejoras del mapa
- Optimización del rendimiento del mapa con Leaflet
- Cacheo de búsquedas de salas por zona
- Mejora de precisión y experiencia de navegación

---

## 🎥 Demo del proyecto
(https://canva.link/gmw6w50lqksdywe)
