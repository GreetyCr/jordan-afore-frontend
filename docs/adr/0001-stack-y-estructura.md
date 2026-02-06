# ADR 0001: Stack tecnológico y estructura del proyecto

## Estado

Aceptado.

## Contexto

Se requiere un frontend moderno para el sistema JORDAN de consulta AFORE, reemplazando una UI anticuada. El backend será en Python y se acoplará después; el frontend se entrega con estructura y documentación para esa integración.

## Decisión

- **Framework**: React 18+ con Vite.
- **Lenguaje**: TypeScript en modo strict.
- **Estilos**: Tailwind CSS 3+ con tema dark y variables CSS propias.
- **Auth**: Clerk (SSO, JWT, roles en `publicMetadata`).
- **Routing**: React Router v6 (SPA con rutas `/`, `/admin`, `/sign-in`, `/sign-up`).
- **Package manager**: pnpm.
- **Deploy**: Vercel (SPA con rewrites a `index.html`).

Estructura de carpetas:

- `src/components`: ui, layout, consulta, admin, auth, shared.
- `src/hooks`: lógica reutilizable (consulta, créditos, admin, debounce).
- `src/lib`: validaciones, formatters, API client, Clerk helpers.
- `src/types`: tipos globales (consulta, user, admin).
- `src/utils`: cn, constants, helpers.
- `src/pages`: contenedores de ruta (Consulta, Admin).
- `docs/`: documentación; `docs/adr/`: decisiones arquitectónicas.

## Consecuencias

- Desarrollo rápido y tipado seguro.
- Un solo lugar para temas y estilos (Tailwind + CSS vars).
- Autenticación y roles delegados a Clerk; el backend solo debe validar JWT y rol.
- Contrato de API documentado en `docs/api-contract.md` para que el backend Python implemente los endpoints esperados.
