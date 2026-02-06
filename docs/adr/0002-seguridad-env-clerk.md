# ADR 0002: Seguridad – variables de entorno y Clerk

## Estado

Aceptado.

## Contexto

El frontend debe evitar exponer secretos y facilitar despliegues seguros. La autenticación y autorización se delegan a Clerk.

## Decisiones

1. **Secretos y configuración**
   - Nunca commitear `.env` ni `.env.local`. Solo `.env.example` con claves de ejemplo (placeholders).
   - Usar `VITE_*` para variables que el frontend puede leer (p. ej. `VITE_CLERK_PUBLISHABLE_KEY`, `VITE_API_URL`).
   - Documentar en README y en `.env.example` qué variables son obligatorias.

2. **Clerk**
   - Solo la **publishable key** se expone en el frontend; la secret key queda en el backend o en el dashboard de Clerk.
   - Roles (`admin` / `user`) en `user.publicMetadata.role`; créditos en `user.publicMetadata.credits`.
   - Rutas protegidas con componente `ProtectedRoute` que comprueba sesión y rol.
   - El backend debe validar el JWT de Clerk y el rol para endpoints de admin.

3. **API**
   - Todas las llamadas al backend usan la base URL de `VITE_API_URL`.
   - El frontend enviará el token de Clerk en `Authorization: Bearer <token>` cuando el backend lo requiera (documentado en el contrato de API).

## Consecuencias

- Secretos fuera del código y del repositorio.
- Un solo punto de configuración (env) para API y Clerk.
- Responsabilidad de autorización compartida: Clerk + backend validando token y rol.
