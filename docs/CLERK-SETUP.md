# Configuración de Clerk (login y administradores)

**Esta app usa React + Vite con `@clerk/clerk-react`.** Las instrucciones que muestra Clerk al crear una app son para **Next.js** (middleware, `@clerk/nextjs`, etc.). Aquí no hace falta: nosotros ya tenemos `ClerkProvider`, rutas `/sign-in` y `/sign-up`, y solo necesitas la **Publishable Key** en el frontend. La **CLERK_SECRET_KEY** es solo para backend (p. ej. Node/Next); no la pongas en `.env.local` del frontend.

---

## 1. Añadir las llaves

### Local (.env.local)

1. Copia `.env.example` a `.env.local`.
2. Pega tu **Publishable Key** de Clerk en `VITE_CLERK_PUBLISHABLE_KEY` (la que empieza por `pk_test_` o `pk_live_`).
3. Para activar login, deja `VITE_DISABLE_CLERK=false` (o quita la variable).

```bash
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
VITE_DISABLE_CLERK=false
```

No uses `CLERK_SECRET_KEY` en este proyecto frontend; solo se usa en servidores (Next.js API, etc.).

### Vercel

1. Proyecto → **Settings** → **Environment Variables**.
2. Añade `VITE_CLERK_PUBLISHABLE_KEY` con tu clave (Production y Preview).
3. Añade `VITE_DISABLE_CLERK` = `false` para que el login funcione en producción.

---

## 2. Dónde ver usuarios en el Dashboard (Development vs Production)

Tu clave `pk_test_...` es de una instancia **Development**. Los usuarios que se registren desde `http://localhost:5173` se crean en esa instancia.

1. Entra a [Clerk Dashboard](https://dashboard.clerk.com) y abre tu aplicación.
2. Arriba verás un banner **"Development"** (no "Production"). Si no lo ves, cambia el selector de entorno a **Development**.
3. En el menú lateral: **Users**. Ahí deben aparecer quienes se registren desde la app.
4. Si solo ves la guía de Next.js al crear la app, ignórala: esta app es React + Vite; no usa `clerkMiddleware` ni `layout.tsx` de Next.

## 3. Paths en el Dashboard (Component paths y Application paths)

Para que el login y el registro ocurran en **tu app** (localhost:5173) y no en el Account Portal de Clerk, configura lo siguiente.

### Component paths

1. En el Dashboard → **Configure** → **Paths** (pestaña o sección **Component paths**).
2. **`<SignIn />`**: Elige **"Sign-in page on development host"** (no "Account Portal") y en la URL pon: `http://localhost:5173/sign-in`.
3. **`<SignUp />`**: Elige **"Sign-up page on development host"** y en la URL pon: `http://localhost:5173/sign-up`.
4. **Signing out**: Puedes dejarlo en Account Portal o poner **"Page on development host"** con `http://localhost:5173/sign-in`.
5. Guarda.

Así Clerk redirige a tu app para iniciar sesión y registrarse; la sesión y el usuario se mantienen en tu flujo y aparecen en **Users**.

### Application paths

- **Home URL**: Si tu home es la raíz (`http://localhost:5173/`), déjalo **vacío**. (Dice: "Leave blank if it sits on the host's root.")
- **Unauthorized sign in URL**: Opcional (Pro). Puedes dejarlo vacío.

---

## 4. URLs de redirección y verificación por correo

Si usas **verificación por código** (email code), Clerk redirige de vuelta a tu app tras completar la verificación. Si la URL no está permitida o se pierde el estado, la sesión no se guarda y puede parecer que “el usuario no se registra”.

1. En [Clerk Dashboard](https://dashboard.clerk.com) → tu app (en **Development**).
2. Busca en el menú **Configure** (o **Settings**) una sección tipo **Paths**, **Domains** o **Redirect URLs**.
3. Donde puedas indicar “Home URL”, “Allowed redirect URLs” o dominios permitidos, añade:
   - `http://localhost:5173`
   - `http://localhost:5173/`
4. Guarda.

En esta app ya están configurados `signInFallbackRedirectUrl="/"` y `signUpFallbackRedirectUrl="/"` en `ClerkProvider`, así que tras iniciar sesión o registrarse (incluida la verificación), Clerk redirige a la home.

- Completa el **código de verificación en la misma pestaña** donde tienes abierta la app. Si abres el enlace del correo en otra pestaña o en otro navegador, la sesión puede no guardarse.
- Tras la redirección, la URL puede llevar parámetros (p. ej. `?__clerk_db_jwt=...` en desarrollo). No recargues ni borres la URL hasta que la app cargue; Clerk usa eso para establecer la sesión.

---

## 5. Si el usuario no aparece tras registrarse

- **Revisa que estés en Development:** Arriba en el Dashboard debe decir "Development". Los usuarios de `pk_test_...` solo aparecen ahí.
- **Rutas de verificación:** La app usa rutas `/sign-in/*` y `/sign-up/*` para que Clerk pueda mostrar el paso de “verificación por código” (p. ej. `/sign-up/verify-email-address`) sin que React Router te mande a otra página. Si solo tuvieras `/sign-up`, al pedir el código Clerk cambiaría la URL y perderías el flujo.
- **Flujo completo en la misma pestaña:** Registro → correo con código → introducir el código **en la misma pestaña** → continuar. No abras el correo en otro navegador.
- **Consola del navegador:** F12 → pestaña Console. Si hay errores de red o de Clerk al enviar el código o al redirigir, aparecerán ahí.
- **Probar sin verificación (solo desarrollo):** En Clerk Dashboard → **User & authentication** → pestaña **Email** → desactiva **“Verify at sign-up”**. Así el registro termina sin pedir código; el usuario se crea y debería aparecer en **Users**. Cuando confirmes que el flujo funciona, puedes volver a activar la verificación.

## 6. Roles admin y user (solo estos dos tipos de usuario)

La app distingue **dos roles**, gestionados **solo desde Clerk**:

| Rol    | Dónde se asigna | Qué ve en la app |
|--------|------------------|-------------------|
| **user**  | Por defecto (o Public metadata `"role": "user"`) | Consulta AFORE, sus créditos, botón Comprar. **No** ve el enlace "Administración" ni puede entrar a `/admin`. |
| **admin** | Clerk Dashboard → Users → [usuario] → Public metadata → `"role": "admin"` | Todo lo anterior **y** el enlace "Administración", acceso al panel (estadísticas, control de consultas, gestionar usuarios/créditos). |

- **Quién es admin:** Solo los usuarios a los que tú les pongas `role: "admin"` en Clerk. El resto son `user` (por defecto).
- **No hay pantalla de “asignar roles” en la app:** Los roles se manejan únicamente en [Clerk Dashboard](https://dashboard.clerk.com) → **Users** → elegir usuario → **Public metadata**.

### Cómo dar rol admin a un usuario

1. Entra a [Clerk Dashboard](https://dashboard.clerk.com) → tu aplicación (modo **Development** o **Production**).
2. **Users** → elige el usuario.
3. En **Public metadata** (o "Metadata"), añade o edita:

```json
{
  "role": "admin",
  "credits": 0
}
```

4. Guarda. Tras recargar la app (o cerrar sesión y volver a entrar), ese usuario verá "Administración" y podrá entrar al panel.

- **role**: `"admin"` o `"user"`. Si no pones nada, la app trata al usuario como `"user"`.
- **credits**: número de créditos para consultas (opcional; por defecto la app usa 0 si no está definido).

---

## 7. Comportamiento de la app

| Con Clerk activo (key + VITE_DISABLE_CLERK=false) |
|---------------------------------------------------|
| **Navbar:** "Iniciar sesión" y "Registrarse" si no hay sesión; avatar + menú de Clerk si hay sesión. |
| **Consulta:** Solo usuarios autenticados pueden usar créditos; los no autenticados ven 0 créditos. |
| **Administración:** Solo visible y accesible para usuarios con `publicMetadata.role === "admin"`. |
| **Rutas:** `/sign-in` y `/sign-up` muestran los componentes de Clerk. |

Si intentas entrar a `/admin` sin ser admin, verás "Acceso denegado". Si no has iniciado sesión, se redirige a `/sign-in` y tras iniciar sesión vuelves a la página que intentabas abrir (si aplica).

---

## 8. Pruebas rápidas

1. Con las llaves en `.env.local` y `VITE_DISABLE_CLERK=false`: `pnpm dev`.
2. Registrarse desde "Registrarse" → deberías volver a la home con sesión iniciada y avatar en el navbar.
3. Cerrar sesión (avatar → Sign out) → deberían aparecer de nuevo "Iniciar sesión" y "Registrarse".
4. Sin rol admin: no debe aparecer "Administración"; entrar a `/admin` debe redirigir a sign-in o mostrar "Acceso denegado" si ya estás logueado.
5. En Clerk Dashboard, dar a un usuario `role: "admin"` → recargar la app → debe aparecer "Administración" y poder entrar a `/admin`.
