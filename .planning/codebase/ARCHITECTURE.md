# Architecture

**Analysis Date:** 2026-03-31

## Pattern Overview

**Overall:** Multi-tenant monorepo with layered backend (API + database) and two client applications (web SPA + mobile native). Uses serverless functions (Next.js API routes), server actions, and persistent state management.

**Key Characteristics:**
- Multi-tenant isolation via PostgreSQL Row-Level Security (RLS) + Prisma extensions
- Shared package layer for types and validation across apps
- Next.js-based web app with server-side rendering and API routes
- Expo + React Native mobile app with REST API client
- Turbo monorepo for build orchestration
- Supabase for authentication and database

## Layers

**Presentation (Web):**
- Purpose: Browser-based UI for owners, managers, drivers, and system admins
- Location: `apps/web/src/app`, `apps/web/src/components`
- Contains: Next.js App Router pages, React components, layouts
- Depends on: Server actions, API routes, types package
- Used by: End users (owners, managers, drivers)

**Presentation (Mobile):**
- Purpose: Native iOS/Android app for drivers and owners
- Location: `apps/mobile/app`, `apps/mobile/components`
- Contains: Expo Router screens, React Native components, navigation stacks
- Depends on: API client package, types, context providers
- Used by: Mobile app users

**Server Actions & API Layer:**
- Purpose: Server-side logic for mutations, file uploads, webhooks
- Location: `apps/web/src/actions`, `apps/web/src/app/api`
- Contains: Next.js server actions (async functions), API routes (handlers), middleware
- Depends on: Database layer, auth, external integrations
- Used by: Presentation layers

**Database Abstraction (Repositories):**
- Purpose: Encapsulate data access with tenant isolation and RLS
- Location: `apps/web/src/lib/db/repositories`
- Contains: Base repository with Prisma extension, specific repositories (documents, trucks, tenants)
- Depends on: Prisma client, RLS extension
- Used by: Server actions and API routes

**Core Infrastructure:**
- Purpose: Configuration for authentication, database, file storage, rate limiting
- Location: `apps/web/src/lib/auth`, `apps/web/src/lib/db`, `apps/web/src/lib/supabase`, `apps/web/src/lib/storage`
- Contains: Auth guards, session management, DB pool setup, S3 integration, rate limiters
- Depends on: Supabase, AWS SDK, external services
- Used by: All layers

**Domain Logic:**
- Purpose: Business logic for specific features (geofencing, fuel calculations, integrations)
- Location: `apps/web/src/lib/{domain}` (fuel, finance, geo, integrations, maps, etc.)
- Contains: Utility functions, calculation engines, external API wrappers
- Depends on: Core infrastructure
- Used by: Server actions and API routes

**Shared Packages:**
- Purpose: Reusable types, validation schemas, API client
- Location: `packages/types`, `packages/validation`, `packages/api-client`
- Contains: TypeScript interfaces, Zod validators, fetch-based HTTP client
- Depends on: Nothing (foundation layer)
- Used by: All apps

## Data Flow

**Web Page Load:**

1. Browser requests page (e.g., `/dashboard`)
2. Next.js middleware (`src/middleware.ts`) resolves tenant context from Supabase session
3. Injects `x-tenant-id` header into request
4. Page component renders, fetches data via server actions or direct API calls
5. Tenant context available via context provider or request header

**Authentication:**

1. User submits credentials to `POST /api/auth/login`
2. API route calls `supabase.auth.signInWithPassword()`
3. Supabase creates session, sets secure HTTP-only cookie
4. Client redirected to dashboard or onboarding
5. Subsequent requests include session cookie, middleware resolves tenant
6. Unauthorized users redirected to sign-in

**Database Query with RLS:**

1. Server action or API route creates repository with `tenantId`
2. Repository wraps Prisma client with `withTenantRLS(tenantId)` extension
3. Extension intercepts all queries, wrapping in sequential transaction
4. Transaction executes `SET app.current_tenant_id = tenantId` (local to transaction)
5. Query executes on same database connection as set_config
6. PostgreSQL RLS policies check `current_tenant_id()` session variable
7. Only rows matching tenant are returned or modified

**File Upload:**

1. Client uploads file via server action `uploadSupportScreenshot(formData)`
2. Server action generates S3 presigned URL via AWS SDK
3. Returns URL to client for direct upload
4. Client uploads to S3 with presigned URL
5. S3 triggers event → webhook stored in database with tenant context

**Integration Sync (Samsara/Motive):**

1. API route receives sync request: `POST /api/integrations/samsara/sync`
2. Retrieves tenant's integration credentials from database
3. Calls external API (e.g., Samsara) with tenant's API key
4. Fetches GPS locations, transforms to internal format
5. Stores in database via tenant-scoped repository
6. Next sync scheduled via background task

**State Management:**

- **Server State:** Fetched via server actions, cached in component state or URL search params
- **Client State:** UI toggles (sidebar open/close) stored in Zustand store
- **Session:** Supabase session cookie persists across page reloads

## Key Abstractions

**TenantRepository:**
- Purpose: Base class ensuring all database queries are tenant-scoped
- Examples: `apps/web/src/lib/db/repositories/base.repository.ts`
- Pattern: Constructor accepts `tenantId`, extends Prisma with RLS, all queries automatically scoped

**withTenantRLS Extension:**
- Purpose: Prisma Client extension that wraps queries in transaction with session variable
- Examples: `apps/web/src/lib/db/extensions/tenant-rls.ts`
- Pattern: Uses sequential transaction form to ensure `set_config()` and query run on same connection

**UserPermissions System:**
- Purpose: RBAC for MANAGER role with per-tenant permission flags
- Examples: `apps/web/src/lib/auth/permissions.ts`
- Pattern: Default permission set, gating paths via middleware and guards

**Route Group-Based Access Control:**
- Purpose: Separate protected routes by role (owner, driver, admin)
- Examples: `apps/web/src/app/(owner)`, `apps/web/src/app/(driver)`, `apps/web/src/app/(admin)`
- Pattern: Middleware redirects users to correct portal based on role

**API Client Package:**
- Purpose: Type-safe HTTP client for mobile app
- Examples: `packages/api-client/src`
- Pattern: Fetch-based, uses shared types for request/response contracts

## Entry Points

**Web Application:**
- Location: `apps/web/src/app` (Next.js App Router)
- Triggers: Browser requests to `/`
- Responsibilities: Route matching, layout rendering, page composition

**Web Middleware:**
- Location: `apps/web/src/middleware.ts`
- Triggers: Every request (including API routes)
- Responsibilities: Auth check, tenant resolution, role-based routing, permission validation

**Mobile Application:**
- Location: `apps/mobile/app` (Expo Router)
- Triggers: App launch, deep links
- Responsibilities: Screen routing, native permission handling, location services

**API Routes:**
- Location: `apps/web/src/app/api/**/*.ts`
- Triggers: HTTP requests to `/api/**`
- Responsibilities: Request validation, external API integration, webhook handlers

**Server Actions:**
- Location: `apps/web/src/actions/`
- Triggers: Client-side form submissions
- Responsibilities: Database mutations, file operations, sensitive calculations

**Webhooks:**
- Location: `apps/web/src/app/api/webhooks`
- Triggers: External services (e.g., Stripe, Supabase)
- Responsibilities: Event processing, database updates

## Error Handling

**Strategy:** Try-catch in async functions, return error objects to clients, log to Sentry.

**Patterns:**

- Server actions return `{ error: string }` or `{ success: true, data: T }`
- API routes return `NextResponse.json({ error: string }, { status: 4xx/5xx })`
- Rate limit exceeded returns 429 with `Retry-After` header
- Auth errors (invalid session) return 401, trigger client logout
- Permission violations return 403 with descriptive message

## Cross-Cutting Concerns

**Logging:** Sentry integration via `@sentry/nextjs` in web app, `@sentry/react-native` in mobile

**Validation:** Zod schemas in `packages/validation`, applied in server actions and API routes before database operations

**Authentication:** Supabase Auth via session cookies (web) and session tokens (mobile), verified in middleware and guards

**Rate Limiting:** Upstash Redis-backed rate limiters for auth endpoints and public APIs, per-IP or per-tenant

**Multi-tenancy:** PostgreSQL RLS policies on all tables, enforced via Prisma extension, tenant_id injected in middleware

---

*Architecture analysis: 2026-03-31*
