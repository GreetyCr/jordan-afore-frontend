# JORDAN AFORE – Frontend

Frontend moderno y responsivo para el sistema JORDAN de consulta AFORE. SPA con React, TypeScript, Tailwind CSS y Clerk. Diseñado para conectarse a un **backend en Python**; la integración se realiza mediante el contrato de API documentado en este repositorio.

**Documentación para el cliente:** [docs/ENTREGA-CLIENTE.md](./docs/ENTREGA-CLIENTE.md)

## Stack

- **React 18** + **Vite** + **TypeScript** (strict)
- **Tailwind CSS 3** (tema dark, variables CSS)
- **Clerk** (autenticación y roles)
- **React Router v6**, **Lucide React**, **react-hot-toast**
- **pnpm** como gestor de paquetes
- **Vercel** para despliegue

## Requisitos

- Node.js 18+
- pnpm (`npm i -g pnpm`)

## Instalación

```bash
pnpm install
```

## Variables de entorno

Copia el ejemplo y configura las variables:

```bash
cp .env.example .env.local
```

Edita `.env.local`:

| Variable | Descripción |
|----------|-------------|
| `VITE_DISABLE_CLERK` | Si es `true`, la app se muestra **sin autenticación** (vista previa/demo para cliente). No hace falta configurar Clerk. Para activar auth después, quita esta variable o ponla en `false`. |
| `VITE_CLERK_PUBLISHABLE_KEY` | Clave pública de Clerk (solo cuando `VITE_DISABLE_CLERK` no es `true`). Obtener en [dashboard.clerk.com](https://dashboard.clerk.com). |
| `VITE_API_URL` | URL base del backend Python (ej. `http://localhost:8000`). Sin backend, las consultas y el panel admin fallarán por red. |

Opcionales: `VITE_ENABLE_ANALYTICS`, `VITE_ENABLE_DEBUG`.

**Importante:** No subas `.env` ni `.env.local` al repositorio. Solo `.env.example` está versionado.

## Desarrollo

```bash
pnpm dev
```

Abre [http://localhost:5173](http://localhost:5173).

## Build

```bash
pnpm run build
```

Salida en `dist/`.

## Preview del build

```bash
pnpm preview
```

## Integración con el backend (Python)

Este proyecto es solo frontend. El backend en Python debe exponer la API descrita en:

- **[docs/api-contract.md](./docs/api-contract.md)** – Endpoints, métodos, request/response y uso del token Clerk.

Resumen de endpoints que el frontend consume:

- `POST /api/consulta-afore` – Consulta AFORE (CURP, NSS opcional).
- `GET /api/admin/stats` – Estadísticas (admin).
- `GET /api/admin/users` – Lista de usuarios (admin).
- `POST /api/admin/update-credits` – Actualizar créditos de un usuario (admin).
- `GET` / `PATCH /api/admin/control` – Estado y activación del sistema de consultas (admin).

El backend debe validar el JWT de Clerk y el rol (`admin`/`user`) para las rutas de administración.

## Estructura del proyecto

```
src/
├── components/   # ui, layout, consulta, admin, auth, shared
├── hooks/        # useConsultaAfore, useAdmin, useCredits, etc.
├── lib/          # validations, formatters, api, clerk
├── types/        # consulta, user, admin
├── utils/        # cn, constants
├── pages/        # ConsultaPage, AdminDashboardPage
├── styles/       # globals.css
├── App.tsx
└── main.tsx
docs/
├── api-contract.md   # Contrato para el backend Python
└── adr/              # Decisiones arquitectónicas
```

## Documentación de decisiones (ADR)

- [docs/adr/0001-stack-y-estructura.md](./docs/adr/0001-stack-y-estructura.md) – Stack y estructura.
- [docs/adr/0002-seguridad-env-clerk.md](./docs/adr/0002-seguridad-env-clerk.md) – Seguridad, env y Clerk.

## Despliegue en Vercel (vista previa sin auth)

1. Conectar el repositorio a Vercel.
2. En el proyecto de Vercel → Settings → Environment Variables, añadir:
   - `VITE_DISABLE_CLERK` = `true` (para mostrar la app sin configurar Clerk).
3. Build command: `pnpm run build`; output: `dist`.
4. Cuando quieras activar auth, quita `VITE_DISABLE_CLERK` o ponla en `false` y configura `VITE_CLERK_PUBLISHABLE_KEY`.

La configuración base está en `vercel.json` (rewrites SPA y cabeceras de caché para assets).

## Licencia

Privado / uso interno según corresponda.
