# PractiHub — Frontend

Frontend de **PractiHub**, una plataforma que conecta a estudiantes con empresas que ofrecen prácticas profesionales. Los estudiantes pueden explorar ofertas, inscribirse adjuntando su CV y hacer seguimiento de sus candidaturas; las empresas pueden publicar ofertas y gestionar a los candidatos que se inscriben.

Este repositorio contiene únicamente el frontend, construido en **React + Tailwind CSS**. Consume la API REST de PractiHub hecha en Laravel — necesitas tenerla corriendo para poder usar la aplicación.

## Tecnologías

- [React 19](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [React Router v7](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)

## Funcionalidades

**Estudiante**
- Explorar ofertas de prácticas, con filtro por categoría y ubicación
- Ver el detalle de una oferta e inscribirse adjuntando el CV (PDF)
- Panel con el listado de sus candidaturas y su estado (pendiente / en revisión / aceptada / rechazada)
- Retirar una candidatura durante los primeros 30 minutos tras enviarla
- Editar su perfil (nombre, email) y su CV general
- Consultar el ranking de empresas por tasa de aceptación

**Empresa**
- Publicar, editar, cerrar y eliminar ofertas de prácticas
- Panel con las ofertas propias y las candidaturas recibidas
- Ver el CV de cada candidato y aceptar o rechazar su candidatura
- Editar el perfil de la empresa

## Requisitos previos

- [Node.js](https://nodejs.org/) 18 o superior
- La API REST de PractiHub corriendo y accesible (por ejemplo, con [Laravel Herd](https://herd.laravel.com/))

## Instalación

```bash
git clone <url-de-este-repositorio>
cd practihub-frontend
npm install
```

Crea un archivo `.env` en la raíz del proyecto (puedes partir de `.env.example`) con la URL de la API:

```
VITE_API_URL=https://tu-api.test/api
```

## Scripts disponibles

```bash
npm run dev       # Levanta el servidor de desarrollo (por defecto en http://localhost:5173)
npm run build     # Genera la build de producción en /dist
npm run preview   # Sirve localmente la build de producción, para probarla
npm run lint      # Ejecuta ESLint sobre el proyecto
```

## Estructura del proyecto

```
src/
├── assets/            Logo e imágenes de la identidad visual de PractiHub
├── components/        Componentes reutilizables (Button, Card, Badge, Navbar, Layout...)
├── contexts/          Contexto de autenticación (AuthContext)
├── pages/             Una página por ruta (Home, Login, Register, OffersPage,
│                      OfferDetail, OfferForm, Dashboard, CompanyDashboard,
│                      Profile, RankingPage...)
├── services/          Cliente Axios configurado (api.js), con el token
│                      añadido automáticamente a cada petición
├── utils/             Funciones auxiliares (formateo de fechas, etc.)
├── App.jsx            Definición de rutas
└── main.jsx           Punto de entrada de la aplicación
```

## Autenticación

La sesión se gestiona con un token (Laravel Passport) que se guarda en `localStorage` tras el login o registro, y se añade automáticamente a las peticiones mediante un interceptor de Axios (`src/services/api.js`). Las rutas privadas están protegidas con el componente `ProtectedRoute`, que además distingue entre vistas exclusivas para estudiantes y para empresas.

## Identidad visual

El logotipo (`src/assets/logo-practihub.jpg`) y los colores de marca definidos en `tailwind.config.js` forman la identidad visual del proyecto y no deben modificarse sin más contexto.

## Notas conocidas

- El CV que un estudiante sube a su perfil general puede reemplazarse, pero actualmente la API no expone un endpoint para volver a descargarlo o visualizarlo una vez subido.
