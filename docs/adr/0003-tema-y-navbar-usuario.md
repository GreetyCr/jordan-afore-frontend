# ADR 0003: Tema claro/oscuro y usuario en navbar

## Estado
Aceptado (2025-02)

## Contexto
- El usuario debe ver su correo o nombre de usuario en el navbar cuando está logueado.
- Se requiere un toggle para alternar entre tema oscuro y claro.

## Decisión
- **Usuario en navbar:** Se expone `username` en `AuthUser` y se rellena desde Clerk (`user.username`). En el Header se muestra `user?.username || user?.email` junto al `UserButton`, truncado en móvil (`max-w-[140px]` / `180px` en sm).
- **Tema:** Se implementa un `ThemeContext` con valor `'dark' | 'light'`, persistido en `localStorage` bajo la clave `jordan-afore-theme`. La clase `dark` se aplica a `document.documentElement` cuando el tema es oscuro. Tailwind usa `darkMode: 'class'`.
- **Sin parpadeo:** Un script inline en `index.html` lee el tema guardado y aplica la clase en el `<html>` antes de que se monte React.
- **Estilos:** El layout (Header, main, Footer, body) usa estilos por defecto para tema claro y variantes `dark:*` para tema oscuro.

## Consecuencias
- La preferencia de tema se mantiene entre sesiones.
- Las páginas internas (Consulta, Admin) siguen usando principalmente colores primary; si se desea coherencia total en modo claro, habría que añadir más variantes `dark:` en esos componentes.
