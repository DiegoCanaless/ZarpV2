# Zarp!

Plataforma de alquileres temporales en Argentina. Propiedades verificadas, pagos seguros y chat directo con propietarios.

## 🧱 Stack

| Capa | Tecnología |
|---|---|
| Frontend | Next.js 16 + React 19 + Tailwind CSS v4 |
| Estado | Zustand + TanStack Query |
| Backend | Express + TypeScript + Socket.io |
| Base de datos | PostgreSQL (Neon Serverless) |
| ORM | Prisma |
| Cache / sesiones | Redis (Upstash) |
| Pagos | Stripe (modo test) |
| Validación | Zod |
| Iconos | Lucide + MorphIcons + React Icons |
| Monorepo | pnpm workspaces |
| CI/CD | GitHub Actions + Playwright |
| Deploy | Vercel |

## 📁 Estructura

```
ZarpV2/
├── apps/
│   ├── web/              # Next.js frontend (landing, dashboards)
│   │   ├── src/
│   │   │   ├── app/          # App Router (layout, page, icon)
│   │   │   └── components/
│   │   │       ├── ui/       # Componentes reutilizables (Button, CardProperty, StarsRating)
│   │   │       ├── landing/  # Secciones de la landing (Hero, FeaturedProperties, Process, Reviews)
│   │   │       └── layout/   # Navbar, Footer
│   │   └── public/           # Logo, fotos, assets estáticos
│   │
│   └── api/              # Express API REST + Socket.io
│       └── src/
│
├── packages/
│   ├── db/               # Prisma schema + migraciones
│   └── shared/           # Tipos y utilidades compartidas
│
└── pnpm-workspace.yaml
```

## ✅ Features

| Funcionalidad | Estado |
|---|---|
| Design system (colores, tipografía, tokens) | ✅ |
| Landing page (Hero, destacados, cómo funciona, reseñas) | ✅ |
| Navbar responsive + panel mobile | ✅ |
| Footer con links | ✅ |
| Botón reutilizable (primary, secondary, outline) | ✅ |
| StarsRating dinámico | ✅ |
| Autenticación + roles (CLIENTE/PROPIETARIO/ADMIN) | 🔜 |
| Catálogo de propiedades + búsqueda + filtros | 🔜 |
| Reservas + Stripe checkout | 🔜 |
| Chat y notificaciones en tiempo real | 🔜 |
| Panel admin | 🔜 |

## 🚀 Desarrollo

```bash
# Instalar dependencias
pnpm install

# Levantar todo (web + api)
pnpm dev

# Solo frontend
pnpm dev:web

# Solo backend
pnpm dev:api
```

| Puerto | Servicio |
|---|---|
| `3000` | Next.js (web) |
| `3001` | Express API |
| `3055` | Figma MCP bridge |

## 🎨 Design System

### Colores

| Token | Hex | Uso |
|---|---|---|
| `primary` | `#0F171C` | Fondos oscuros, navbar, footer |
| `secondary` | `#3D4A33` | Botones alternativos, stats |
| `accent` | `#CC2936` | CTAs, highlights, ancla |
| `cream` | `#E3DEC9` | Texto destacado sobre oscuro |
| `surface` | `#FFFFFF` | Cards, contenedores |
| `bg` | `#F4F4F4` | Fondo general |

### Tipografía

| Uso | Fuente |
|---|---|
| Headings (h1-h6) | Space Grotesk |
| Body, botones, labels | Inter |

## 🔐 Modelo de datos

- **User** → id, email, name, role (CLIENTE | PROPIETARIO | ADMIN | SUPERADMIN)
- Futuro: Property, Booking, Review, Message

## 📦 Stack futura

| Tecnología | Para qué |
|---|---|
| Zustand | Estado global (sesión, filtros) |
| TanStack Query | Fetch y cache de datos de la API |
| Prisma + Neon | ORM + PostgreSQL serverless |
| Upstash Redis | Sesiones, cache, rate limiting |
| Stripe | Checkout de reservas |
| Socket.io | Notificaciones y chat |
| Playwright | Tests end-to-end |

## 🗂️ Git Flow

```
main → develop → feature/xxx
```

Commits con convención: `feat:`, `fix:`, `chore:`, `docs:`, `style:`, `refactor:`, `test:`.

## 📄 Licencia

MIT
