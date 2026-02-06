# JORDAN AFORE – Documentación para el cliente

Este documento describe lo que se entrega y cómo usarlo.

---

## ¿Qué es este proyecto?

**Frontend** de la aplicación JORDAN para consulta de AFORE. Es una interfaz web moderna (una sola página) que incluye:

- **Página de consulta**: formulario para consultar AFORE con CURP y NSS (opcional), con validaciones en tiempo real.
- **Panel de administración**: estadísticas, control del sistema, gestión de usuarios y créditos.
- **Autenticación**: preparado para integrar Clerk (actualmente se puede ver en modo “vista previa” sin login).

El backend (API en Python) es aparte. Este repositorio incluye la documentación del contrato de API para que el backend se acople correctamente.

---

## Cómo ver la aplicación (vista previa)

### Opción 1: En tu computadora

1. Instalar [Node.js](https://nodejs.org/) (v18 o superior) y [pnpm](https://pnpm.io/) (`npm install -g pnpm`).
2. En la carpeta del proyecto:
   ```bash
   pnpm install
   pnpm dev
   ```
3. Abrir en el navegador: **http://localhost:5173**
4. Podrás ver:
   - **Consulta**: formulario CURP/NSS.
   - **Administración**: en el menú superior, entrar a “Administración” para ver el panel (estadísticas, usuarios, etc.). En vista previa no hay backend, así que los datos aparecerán en cero o vacíos.

### Opción 2: Desplegada en Vercel

Si el proyecto está conectado a [Vercel](https://vercel.com):

1. Cada push a la rama principal puede generar una URL de vista previa (ej. `https://jordan-afore.vercel.app`).
2. Para que funcione la vista previa sin configurar login, en Vercel → **Settings** → **Environment Variables** debe existir:
   - `VITE_DISABLE_CLERK` = `true`

Con eso la app se muestra igual que en local (consulta + administración, sin login).

---

## Variables de entorno (resumen)

| Variable | Uso |
|----------|-----|
| `VITE_DISABLE_CLERK=true` | Vista previa sin autenticación. Ideal para revisar diseño y flujos. |
| `VITE_CLERK_PUBLISHABLE_KEY` | Cuando vayas a activar el login con Clerk. |
| `VITE_API_URL` | URL base del backend en Python (ej. `https://api.tudominio.com`). |

Ejemplo de archivo local (no subir a Git): crear `.env.local` con las variables que necesites. Puedes basarte en `.env.example`.

---

## Integración con el backend (Python)

Este frontend espera un backend que exponga una API REST. Toda la especificación está en:

- **[Contrato de API](./api-contract.md)** (`docs/api-contract.md`)

Ahí se definen:

- Endpoints (consulta AFORE, estadísticas, usuarios, créditos, control del sistema).
- Métodos HTTP, request y response.
- Uso del token de Clerk cuando la autenticación esté activa.

El equipo que desarrolle o mantenga el backend en Python debe seguir ese contrato para que la aplicación funcione de punta a punta.

---

## Activar autenticación (Clerk) más adelante

Hoy la app puede mostrarse con `VITE_DISABLE_CLERK=true` (sin login). Para activar Clerk:

1. Crear una aplicación en [Clerk](https://dashboard.clerk.com) y obtener la **Publishable Key**.
2. En entorno local: en `.env.local` poner `VITE_CLERK_PUBLISHABLE_KEY=pk_...` y quitar `VITE_DISABLE_CLERK` o ponerla en `false`.
3. En Vercel: en **Environment Variables** añadir `VITE_CLERK_PUBLISHABLE_KEY` y quitar o cambiar `VITE_DISABLE_CLERK` a `false`.
4. Reiniciar o redesplegar.

Los roles (admin / usuario) y los créditos se gestionan desde Clerk (metadata) y/o desde el backend según lo definido en el contrato de API.

---

## Estructura de documentación en el repo

| Documento | Contenido |
|-----------|-----------|
| **README.md** | Instalación, desarrollo, build, despliegue, estructura del código. |
| **docs/ENTREGA-CLIENTE.md** | Este archivo: resumen para el cliente. |
| **docs/api-contract.md** | Contrato de API para el backend Python. |
| **docs/adr/** | Decisiones técnicas (stack, seguridad, etc.). |
| **.env.example** | Ejemplo de variables de entorno. |

---

## Soporte técnico

Para dudas sobre el frontend, integración con el backend o despliegue, usar el canal acordado con el equipo de desarrollo.
