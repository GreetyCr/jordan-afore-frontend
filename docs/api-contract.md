# Contrato de API – JORDAN AFORE (Frontend ↔ Backend Python)

Este documento describe los endpoints que el **frontend** espera que el **backend en Python** exponga. El backend debe implementar esta API para que la aplicación funcione correctamente.

## Base URL

- Desarrollo: `VITE_API_URL` (ej. `http://localhost:8000`)
- Producción: configurar la misma variable en el entorno de despliegue.

Todas las rutas siguientes son relativas a esa base.

---

## Autenticación

Las peticiones que requieran usuario autenticado deben enviar el token de Clerk en el header:

```
Authorization: Bearer <token>
```

El frontend obtiene el token con `getToken()` de `@clerk/clerk-react` y lo envía en las llamadas que lo requieran. El backend debe validar el token con Clerk (JWT verification).

---

## 1. Consulta AFORE

**POST** `/api/consulta-afore`

Realiza una consulta AFORE con CURP y opcionalmente NSS.

### Request

```json
{
  "curp": "AAAA000000HAAAAA00",
  "nss": "12345678901"
}
```

- `curp` (string, requerido): 18 caracteres, formato CURP válido.
- `nss` (string, opcional): 11 dígitos, sin guiones.

### Response 200

```json
{
  "curp": "AAAA000000HAAAAA00",
  "nss": "12345678901",
  "afore": "Nombre AFORE",
  "...": "otros campos que devuelva el servicio real"
}
```

El frontend muestra la respuesta como JSON en la UI. Puedes extender el objeto con los campos que necesites.

### Errores

- **400**: CURP/NSS inválido o error de validación. Body: `{ "message": "descripción" }`.
- **401**: No autenticado.
- **402 / 403**: Sin créditos o sin permiso. Body: `{ "message": "..." }`.
- **500**: Error del servidor. Body: `{ "message": "..." }`.

---

## 2. Admin – Estadísticas

**GET** `/api/admin/stats`

Solo usuarios con rol `admin` (metadata de Clerk). Debe validar el token y el rol.

### Response 200

```json
{
  "totalUsers": 42,
  "totalConsultas": 150,
  "exitos": 148,
  "creditosAsignados": 500
}
```

---

## 3. Admin – Listado de usuarios

**GET** `/api/admin/users`

Lista usuarios para gestión de créditos y roles.

### Response 200

```json
[
  {
    "id": "user_xxx",
    "email": "usuario@ejemplo.com",
    "role": "user",
    "credits": 10,
    "totalConsultas": 5,
    "lastConsulta": "2025-02-06T12:00:00Z"
  }
]
```

- `id`: ID de usuario (Clerk `user.id` o ID interno).
- `role`: `"admin"` | `"user"`.
- `credits`: créditos disponibles.
- `totalConsultas`, `lastConsulta`: opcionales.

---

## 4. Admin – Actualizar créditos

**POST** `/api/admin/update-credits`

Actualiza los créditos de un usuario. Solo admin.

### Request

```json
{
  "userId": "user_xxx",
  "credits": 25
}
```

### Response 200

```json
{
  "ok": true,
  "credits": 25
}
```

O cualquier body que indique éxito. El frontend actualiza la lista local tras una respuesta 2xx.

### Errores

- **400**: `userId` o `credits` inválidos. Body: `{ "message": "..." }`.
- **401/403**: No autenticado o no admin.

---

## 5. Admin – Control del sistema (consultas activas)

**GET** `/api/admin/control`

Devuelve el estado actual del sistema (consultas habilitadas o no).

### Response 200

```json
{
  "consultasEnabled": true
}
```

**PATCH** `/api/admin/control`

Activa o desactiva las consultas para todos los usuarios.

### Request

```json
{
  "consultasEnabled": false
}
```

### Response 200

```json
{
  "consultasEnabled": false
}
```

---

## Resumen de endpoints

| Método | Ruta                         | Descripción              | Auth   |
|--------|------------------------------|--------------------------|--------|
| POST   | `/api/consulta-afore`         | Consulta AFORE           | Usuario |
| GET    | `/api/admin/stats`            | Estadísticas admin       | Admin  |
| GET    | `/api/admin/users`            | Lista usuarios           | Admin  |
| POST   | `/api/admin/update-credits`   | Actualizar créditos      | Admin  |
| GET    | `/api/admin/control`          | Estado consultas         | Admin  |
| PATCH  | `/api/admin/control`          | Activar/desactivar       | Admin  |

---

## Roles en Clerk

El frontend usa `user.publicMetadata.role` en Clerk:

- `"user"`: puede hacer consultas (si tiene créditos) y ver su propia información.
- `"admin"`: además puede acceder a `/admin` y a todos los endpoints `/api/admin/*`.

El backend debe sincronizar o leer este rol (p. ej. via webhooks de Clerk o validando el JWT y el claim de metadata) para autorizar las rutas de admin.

---

## CORS

El backend debe permitir el origen del frontend (ej. `https://tu-app.vercel.app` y `http://localhost:5173` en desarrollo) en las cabeceras CORS.
