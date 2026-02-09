# Checklist – Pendientes frontend, auth y documentación

Lista de tareas opcionales o pendientes. Lo de **conectar API** y **Clerk en producción** lo hace el cliente tras la entrega del repositorio.

---

## Frontend

- [x] **Estados vacíos** – Mensajes claros cuando no hay usuarios (tabla admin), sin estadísticas (stats en 0) y pestaña “Ver Consultas” sin backend.
- [x] **Estados de carga** – Skeleton en stats y tabla de usuarios; spinner con `aria-busy`/`role="status"`; botón “Consultar AFORE” con “Consultando…”.
- [x] **Accesibilidad** – `aria-label` en botones de icono (tema, menú, créditos, switch consultas, Enviar notificación, Invitar usuario); tabs con `role="tablist"`/`tabpanel`; anillo de foco (`:focus-visible` y `focus:ring`); enlace “Saltar al contenido”.
- [x] **Responsive** – Revisado por el equipo; formulario, modal de créditos y tabla se usan correctamente en móvil.
- [ ] **Error boundary** – Opcional: componente global que capture errores de React y muestre pantalla de fallo.
- [ ] **Manejo de errores de red** – Toasts o mensajes cuando el API no responde o devuelve 4xx/5xx (consulta y admin).

**Fuera de alcance en esta entrega (cliente post-entrega):**

- **Conectar API real** – El cliente apunta `VITE_API_URL` al backend Python y prueba consulta AFORE, stats, usuarios y créditos.

---

## Auth (Clerk)

- [ ] **Flujo “¿Olvidaste la contraseña?”** – Comprobar que el enlace de reset desde Clerk redirige bien.
- [ ] **Sesión caducada** – Verificar que al expirar la sesión el usuario acabe en `/sign-in` sin estado inconsistente.
- [ ] **Rol admin desde backend** – Si en el futuro el rol viene del API, documentar y adaptar `ClerkAuthBridge`.
- [ ] **Producción (cliente)** – En deploy: usar instancia **Production** en Clerk, claves `pk_live_` y configurar dominios/redirect URLs de producción en el Dashboard.
- [ ] **Verificación por enlace** – Si se activa “Email verification link” en Clerk, comprobar que el enlace abre la app en la misma pestaña y la sesión se restaura.

---

## Documentación

*Completar después de cerrar los ítems de frontend anteriores.*

- [ ] **ENTREGA-CLIENTE.md** – Actualizar “Vista previa” para indicar que con Clerk activo hay que iniciar sesión; tabla de variables actualizada.
- [ ] **README.md** – Indicar que las rutas `/sign-in/*` y `/sign-up/*` son necesarias para el flujo de verificación por código de Clerk.
- [ ] **CLERK-SETUP.md** – Ya cubre llaves, paths, verificación y “usuario no aparece”. Opcional: capturas o enlaces al Dashboard.
- [ ] **Deploy con auth** – Guía breve: variables en Vercel, Clerk en Production, URLs permitidas y primer usuario admin.
- [ ] **ADR** – Opcional: “Rutas /sign-in/* y /sign-up/* para verificación Clerk” y “Protección de la ruta principal /”.
- [ ] **Changelog** – Opcional: CHANGELOG.md con cambios por versión.

---

## Resumen por prioridad

| Prioridad | Área          | Tareas clave |
|----------|----------------|--------------|
| Alta     | Documentación  | Actualizar ENTREGA-CLIENTE, README y deploy con auth |
| Media    | Frontend       | Error boundary, manejo de errores de red |
| Media    | Auth           | Producción y flujos (cliente post-entrega) |
| Cliente  | Post-entrega   | Conectar API real, Clerk en producción |
