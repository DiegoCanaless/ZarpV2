# 🏠 ZarpV2

Plataforma de alquileres temporarios para Argentina. Diseñada para competir con Airbnb en el mercado local.

## Stack Tecnológico

| Capa | Tecnología | Por qué |
|------|-----------|---------|
| Frontend | Next.js 15 + React 19 | SSR, App Router, deploy en Vercel |
| Estilos | Tailwind CSS v4 | Utility-first, rápido de desarrollar |
| Componentes | shadcn/ui | Accesibles, customizables, sin dependencia |
| Estado | Zustand + TanStack Query | Cliente (sesión) + servidor (cache) |
| Backend | Express + TypeScript | HTTP + WebSocket (Socket.io) |
| BD | PostgreSQL (Neon) | Relacional, confiable, free tier generoso |
| ORM | Prisma | Type-safe, migraciones, studio |
| Real-time | Socket.io + Redis (Upstash) | Chat 1:1 propietario↔inquilino |
| Pagos | Stripe | Checkout + webhooks, modo test |
| CI/CD | GitHub Actions + Playwright | Tests e2e + deploy automático |
| Deploy | Vercel + Upstash + Neon | Todo gratis para empezar |

## Estructura del Proyecto

```
ZarpV2/
├── apps/
│   ├── web/          → Frontend (Next.js 15)
│   └── api/          → Backend (Express + Socket.io)
├── packages/
│   ├── shared/       → Schemas Zod + tipos compartidos
│   └── db/           → Prisma schema + client
└── .github/workflows → CI/CD con Playwright
```

## Getting Started

```bash
# Instalar dependencias
pnpm install

# Ejecutar en desarrollo
pnpm dev:web     # Frontend en http://localhost:3000
pnpm dev:api     # Backend en http://localhost:3001

# Base de datos
cd packages/db
pnpm db:generate  # Generar cliente Prisma
pnpm db:push      # Sincronizar schema con BD
pnpm db:studio    # Abrir Prisma Studio (UI de la BD)
```

## Desarrollo

- **Branching:** usamos el flujo `feature/branch` → PR → review → merge
- **Commits:** convención de commits (feat, fix, chore, docs...)
- **Code Review:** todo PR necesita review antes de mergear

## Autor

**Diego Canales** — [GitHub](https://github.com/DiegoCanaless)

---

*Proyecto construido como portfolio para demostrar skills full-stack.*
