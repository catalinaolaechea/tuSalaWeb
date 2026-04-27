# 🩺 TuSalaWeb

Aplicación web para la gestión de una sala médica: administración, profesionales, turnos y panel de gestión.

Proyecto fullstack compuesto por **Backend en Django** y **Frontend en React + Vite**.

---

## 📌 Descripción

**TuSalaWeb** permite administrar una sala médica desde un panel web.

El sistema incluye:

- Panel de administración con Django Admin  
- Gestión de médicos / profesionales  
- Gestión de turnos  
- Frontend moderno para interacción de usuarios  

Este proyecto fue desarrollado como práctica académica de desarrollo fullstack.

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

### Otros
- Git & GitHub

---

## 📂 Estructura del proyecto

## Cómo levantar el proyecto?


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


## 🚧 Futuras mejoras

El proyecto continuará evolucionando incorporando nuevas funcionalidades:

### 🗺️ Experiencia de usuario
- Mejorar la integración del mapa interactivo con **Leaflet**
- Mostrar ubicación de la sala médica y puntos de interés cercanos
- Mejoras generales de UI/UX

### 👤 Gestión de usuarios
- Implementar registro de nuevos usuarios
- Sistema de autenticación (login / logout)
- Gestión de perfiles de pacientes

### 📅 Turnos online para pacientes
- Acceso público a la web para solicitar turnos
- Selección de profesional y horario disponible
- Confirmación y cancelación de turnos por el paciente
- Notificaciones y validaciones de disponibilidad

### 🚀 Infraestructura
- Deploy del sistema en producción
- Configuración de variables de entorno
- Preparación para base de datos en producción

## 🎥 Demo del proyecto
[![Ver demo](https://img.youtube.com/vi/abc123/0.jpg)]
(https://canva.link/gmw6w50lqksdywe)
