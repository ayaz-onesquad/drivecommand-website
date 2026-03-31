# Codebase Structure

**Analysis Date:** 2026-03-31

## Directory Layout

```
/Users/ayazmohammed/
├── DriveCommand/                  # Main monorepo (fleet management SaaS)
│   ├── apps/                      # Application workspaces
│   │   ├── web/                   # Next.js web app (owner/driver/admin portal)
│   │   │   ├── src/
│   │   │   │   ├── app/           # Next.js App Router pages and API routes
│   │   │   │   ├── components/    # React components (domain-specific subdirs)
│   │   │   │   ├── lib/           # Core infrastructure and domain logic
│   │   │   │   ├── actions/       # Server actions (mutations)
│   │   │   │   ├── hooks/         # React hooks
│   │   │   │   └── middleware.ts  # Request middleware (auth, tenant resolution)
│   │   │   ├── prisma/            # Database schema and seed scripts
│   │   │   └── package.json
│   │   └── mobile/                # Expo React Native app
│   │       ├── app/               # Expo Router screens
│   │       ├── components/        # React Native components
│   │       ├── lib/               # Mobile-specific utilities
│   │       └── package.json
│   ├── packages/                  # Shared libraries
│   │   ├── types/                 # TypeScript types and interfaces
│   │   ├── validation/            # Zod schemas and validators
│   │   └── api-client/            # Fetch-based HTTP client for mobile
│   ├── .github/                   # GitHub Actions CI/CD
│   ├── package.json               # Monorepo root (Turbo)
│   └── tsconfig.json              # Shared TypeScript config
├── LineUp/                        # Separate SPA project (agency command center)
│   ├── src/
│   │   ├── pages/                 # Page components (file-based routing via Vite)
│   │   ├── components/            # React components (domain-specific subdirs)
│   │   ├── hooks/                 # React hooks
│   │   ├── lib/                   # Utilities and helpers
│   │   ├── stores/                # Zustand stores (client state)
│   │   ├── types/                 # TypeScript interfaces
│   │   └── utils/                 # General utilities
│   ├── package.json
│   └── vite.config.ts             # Vite bundler config
└── calculator.py                  # Simple calculator script (standalone)
```

## Directory Purposes

**apps/web/src/app:**
- Purpose: Next.js App Router directory with pages and API routes
- Contains: Page components (`page.tsx`), route handlers (`route.ts`), layouts (`layout.tsx`)
- Key files: `middleware.ts` (request processing), route groups for role-based access control
- Subdirectories: `(owner)`, `(driver)`, `(admin)`, `(auth)`, `api/`

**apps/web/src/components:**
- Purpose: Reusable React components organized by domain
- Contains: Domain-specific component directories (maps, loads, drivers, invoices, etc.)
- Key files: UI components in `ui/`, shared components in `shared/`
- Subdirectories: One per feature/domain (maps, loads, drivers, fuel, crm, etc.)

**apps/web/src/lib:**
- Purpose: Core infrastructure, utilities, and domain logic
- Contains: Database setup, authentication, integrations, calculations
- Key files: `db/prisma.ts` (DB client), `auth/permissions.ts` (RBAC), various domain folders
- Subdirectories: `auth/`, `db/`, `supabase/`, `integrations/`, `geo/`, `fuel/`, `finance/`, `maps/`, `email/`, `storage/`, `notifications/`, `validations/`, `utils/`

**apps/web/src/actions:**
- Purpose: Server actions (async functions that execute on server)
- Contains: Mutations, file operations, complex calculations
- Key files: `support-tickets.ts` (support ticket operations)

**apps/web/prisma:**
- Purpose: Prisma ORM schema and database migrations
- Contains: `schema.prisma` (database model definitions), seed scripts, migration history
- Key files: `schema.prisma`, `seed.ts` (dev data), `seeds/` (specialized seeds)

**apps/mobile/app:**
- Purpose: Expo Router screens for mobile app
- Contains: Screen components organized by user role
- Key files: Route screens, route groups matching web app roles
- Subdirectories: `(owner)/`, `(driver)/`, shared screens

**apps/mobile/components:**
- Purpose: React Native components specific to mobile
- Contains: UI components, domain-specific component groups
- Subdirectories: `ui/`, `owner/`, `driver/`, `shared/`, `skeletons/`

**packages/types:**
- Purpose: Shared TypeScript type definitions
- Contains: `index.ts` with interfaces for domain models (Truck, Driver, User, Load, Invoice, etc.)
- Used by: All apps and packages
- Build output: `dist/` directory (compiled JS)

**packages/validation:**
- Purpose: Shared Zod validation schemas
- Contains: Validators for user input, API requests
- Used by: Web app server actions and API routes, mobile app
- Build output: `dist/` directory

**packages/api-client:**
- Purpose: HTTP client for mobile app
- Contains: Fetch-based functions for API communication
- Used by: Mobile app for data fetching
- Build output: `dist/` directory

**apps/web/src/lib/db:**
- Purpose: Database layer with tenant isolation
- Contains: Prisma client setup, repositories, RLS extension
- Key files: `prisma.ts` (DB client singleton), `extensions/tenant-rls.ts` (RLS enforcer)
- Subdirectories: `repositories/` (data access classes)

**apps/web/src/lib/auth:**
- Purpose: Authentication and authorization
- Contains: Auth context, permission system, guards, server auth helpers
- Key files: `permissions.ts` (RBAC definition), `session.ts` (session helpers), `guards.tsx` (route guards)
- Subdirectories: None, flat structure

**apps/web/src/lib/supabase:**
- Purpose: Supabase client initialization and middleware setup
- Contains: Server-side and client-side Supabase client factories
- Key files: `server.ts` (server client), `middleware.ts` (middleware client)

**apps/web/src/lib/integrations:**
- Purpose: Third-party service integrations
- Contains: Samsara, Motive GPS sync, webhook handlers
- Key files: `samsara.ts`, `motive.ts`

## Key File Locations

**Entry Points:**

- `apps/web/src/app/page.tsx`: Web app root page (redirects based on role)
- `apps/web/src/app/layout.tsx`: Root layout with providers
- `apps/web/src/app/(owner)/dashboard/page.tsx`: Owner dashboard
- `apps/mobile/app/index.tsx`: Mobile app entry screen
- `apps/web/src/middleware.ts`: Request middleware (auth, tenant resolution)

**Configuration:**

- `/Users/ayazmohammed/DriveCommand/package.json`: Monorepo root with Turbo
- `/Users/ayazmohammed/DriveCommand/tsconfig.json`: Shared TypeScript config
- `apps/web/package.json`: Web app dependencies and scripts
- `apps/mobile/package.json`: Mobile app dependencies
- `apps/mobile/app.json`: Expo app configuration

**Core Logic:**

- `apps/web/src/lib/db/prisma.ts`: Prisma client singleton with connection pooling
- `apps/web/src/lib/db/extensions/tenant-rls.ts`: RLS enforcement for all queries
- `apps/web/src/lib/auth/permissions.ts`: RBAC permission definitions
- `apps/web/src/lib/supabase/server.ts`: Server-side Supabase client
- `apps/web/prisma/schema.prisma`: Database schema (all models)

**Testing:**

- `apps/web/vitest.config.ts`: Unit test configuration
- `apps/web/playwright.config.ts`: E2E test configuration
- `apps/web/tests/`: Unit test files
- `apps/web/e2e/`: E2E test files

**Database:**

- `apps/web/prisma/schema.prisma`: Prisma schema with all models and relations
- `apps/web/src/generated/prisma/`: Generated Prisma client (compiled, not edited)

## Naming Conventions

**Files:**

- Pages: `page.tsx` (Next.js App Router convention)
- Layouts: `layout.tsx`
- Route handlers: `route.ts`
- Middleware: `middleware.ts` in root or feature folder
- Components: PascalCase (e.g., `DriverCard.tsx`, `LoadsList.tsx`)
- Utilities: camelCase with `.ts` (e.g., `formatAddress.ts`, `calculateMileage.ts`)
- Server actions: camelCase with `.ts` (e.g., `createLoad.ts`)
- Hooks: `use*.ts` or `use*.tsx` (e.g., `useTenant.ts`, `useMobileDetect.tsx`)

**Directories:**

- Feature domains: kebab-case (e.g., `load-management/`, `profit-predictor/`, `ai-documents/`)
- Route groups: Parentheses `(groupName)` for grouping without URL segment
- Page directories: kebab-case matching route (e.g., `/drivers` → `drivers/` directory)

**TypeScript Identifiers:**

- Types/Interfaces: PascalCase (e.g., `User`, `TruckStatus`, `RoutePayment`)
- Enums: PascalCase (e.g., `UserRole`, `DriverStatus`, `RouteStatus`)
- Functions: camelCase (e.g., `createUser()`, `fetchTrucks()`)
- Variables: camelCase (e.g., `currentTenant`, `routeId`)
- Constants: UPPER_SNAKE_CASE (e.g., `DEFAULT_TIMEOUT`, `MAX_FILE_SIZE`)

## Where to Add New Code

**New Feature (Web):**
- Primary code: Feature folder in `apps/web/src/app/(owner)/your-feature/` or similar role group
- Server logic: `apps/web/src/lib/your-feature/` for domain logic
- Database layer: Add repository to `apps/web/src/lib/db/repositories/` if needed
- Components: `apps/web/src/components/your-feature/`
- Server actions: `apps/web/src/actions/your-feature.ts` or similar
- Tests: `apps/web/tests/` with matching directory structure

**New Component/Module (Web):**
- UI component: `apps/web/src/components/ui/` or domain-specific folder
- Feature component: `apps/web/src/components/{feature}/`
- Utility function: `apps/web/src/lib/utils/` or domain folder like `apps/web/src/lib/{domain}/`

**Utilities:**
- Shared helpers: `apps/web/src/lib/utils/` (web app) or `apps/mobile/lib/` (mobile)
- Type definitions: `packages/types/src/index.ts`
- Validation schemas: `packages/validation/src/` with grouped files

**Mobile Feature:**
- Screen: `apps/mobile/app/(role)/` with role-specific routing
- Components: `apps/mobile/components/{feature}/`
- Hooks: `apps/mobile/hooks/`
- API calls: Via `packages/api-client` functions

**New API Route:**
- Location: `apps/web/src/app/api/{category}/{endpoint}/route.ts`
- Pattern: `export async function POST(req: NextRequest) { ... }`
- Tenancy: Extract tenant from middleware-injected header or session

**New Database Model:**
- Location: `apps/web/prisma/schema.prisma`
- Requirements: Include `id`, `tenantId`, `createdAt`, `updatedAt` fields; add RLS policy
- Generate: Run `npm run prisma generate` and `npx prisma migrate`

## Special Directories

**apps/web/.next:**
- Purpose: Next.js build output
- Generated: Yes (build process)
- Committed: No (.gitignore'd)

**apps/web/src/generated/prisma:**
- Purpose: Generated Prisma client code
- Generated: Yes (by `prisma generate`)
- Committed: Yes (part of version control for CI/CD)

**apps/web/node_modules:**
- Purpose: Installed dependencies
- Generated: Yes (npm install)
- Committed: No (.gitignore'd)

**apps/web/.turbo:**
- Purpose: Turbo build cache
- Generated: Yes (during build)
- Committed: No (.gitignore'd)

**apps/mobile/node_modules:**
- Purpose: Installed dependencies for mobile
- Generated: Yes (npm install)
- Committed: No (.gitignore'd)

**packages/*/dist:**
- Purpose: Compiled JavaScript output for shared packages
- Generated: Yes (during build)
- Committed: Yes (for faster CI builds)

**apps/web/prisma/migrations:**
- Purpose: Database schema migration history
- Generated: Yes (by `npx prisma migrate`)
- Committed: Yes (required for reproducible schema)

**.planning/codebase:**
- Purpose: Architecture and analysis documents
- Generated: Yes (by GSD mapper)
- Committed: Yes (reference docs for development)

---

*Structure analysis: 2026-03-31*
