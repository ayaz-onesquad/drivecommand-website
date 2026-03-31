# Technology Stack

**Analysis Date:** 2026-03-31

## Overview

This workspace contains two main projects:
1. **DriveCommand** - Monorepo with web (Next.js) and mobile (Expo) apps
2. **LineUp** - Agency command center (Vite + React SPA)

Both use TypeScript, React, Supabase, and Tailwind CSS. DriveCommand is production-focused with extensive database and external integrations.

## Languages

**Primary:**
- **TypeScript** 5.9.x / 5.x - All frontend and backend source code
- **JavaScript** - Build scripts, config files
- **Python** 3.x - Standalone utilities (`calculator.py`)

**Secondary:**
- **SQL** - Prisma migrations and Supabase Edge Functions

## Runtime

**Environment:**

**DriveCommand Web:**
- Node.js 18+ (Next.js 16.1.6)
- Runs on Vercel (production) or locally via `npm run dev`

**DriveCommand Mobile:**
- Node.js 18+ (Expo 55.0.8)
- Compiles to iOS/Android via EAS

**LineUp:**
- Node.js 18+ (Vite 7.2.4)
- Runs on localhost:5173 or deployed to Vercel

**Package Manager:**
- npm 11.6.2 (workspace-based: DriveCommand uses workspaces, LineUp is standalone)
- Lockfile: `package-lock.json` present (npm CI/install)

## Frameworks

**DriveCommand Web (`apps/web/`):**
- **Next.js** 16.1.6 - Full-stack app framework with API routes and server actions
- **React** 19.2.4 - UI library
- **Prisma** 7.4.0 - ORM for PostgreSQL with `@prisma/adapter-pg`
- **Supabase Auth** (@supabase/ssr 0.9.0, @supabase/supabase-js 2.100.0) - User authentication and admin client
- **Tailwind CSS** 3.4.1 - Utility-first styling
- **Radix UI** (multiple packages @radix-ui/*) - Unstyled, accessible components

**DriveCommand Mobile (`apps/mobile/`):**
- **Expo** 55.0.8 - Cross-platform (iOS/Android) via React Native
- **Expo Router** 55.0.7 - File-based routing (like Next.js)
- **React Native** 0.83.2 - Core framework
- **NativeWind** 4.2.3 - Tailwind CSS for React Native
- **Supabase** 2.100.0 - Backend client
- **TanStack React Query** 5.95.0 - Server state management

**LineUp (`/`):**
- **Vite** 7.2.4 - Frontend build tool and dev server
- **React** 19.2.0 - UI library
- **React Router DOM** 7.13.0 - Client-side routing
- **Supabase JS Client** 2.94.0 - Database and auth
- **TanStack React Query** 5.90.20 - Server state management
- **Tailwind CSS** 3.4.0 - Styling
- **Radix UI** (multiple packages) - Component primitives
- **Zustand** 5.0.11 - Client state (UI toggles, sessions)

## Testing

**DriveCommand Web:**
- **Vitest** 4.0.18 - Unit/integration tests (`npm run test`)
- **Playwright** 1.58.2 - E2E tests (`npm run test:e2e`)
  - Config: `apps/web/playwright.config.ts` (not present in example, but Playwright is installed)
  - Tests run against localhost:3000 (Next.js dev server)

**DriveCommand Mobile:**
- No test framework installed (Playwright could be added)
- Uses Expo testing capabilities during build

**LineUp:**
- **Playwright** 1.58.2 - E2E tests
  - Config: `tests/` directory with setup auth flow
  - Multi-role testing: admin, tenant user, legacy user
  - Base URL: localhost:5173
  - Screenshots on failure, traces on retry
  - Projects: setup, chromium-admin, chromium-tenant, security-tests, chromium (legacy), firefox, webkit

## Key Dependencies

**Critical (All Projects):**
- **TypeScript** - Type safety across codebase
- **React** 19.x - UI rendering
- **Supabase** (@supabase/supabase-js, @supabase/ssr) - Backend-as-a-Service (auth, database, storage, real-time)
- **Tailwind CSS** 3.4.x - Styling foundation

**DriveCommand Web (Backend/API):**
- **@prisma/client** 7.4.0 - PostgreSQL ORM with type generation
- **@prisma/adapter-pg** 7.4.0 - PostgreSQL driver for Prisma
- **pg** 8.18.0 - Direct PostgreSQL access for seed scripts
- **@anthropic-ai/sdk** 0.77.0 - Claude AI for document analysis
- **@aws-sdk/client-s3** 3.990.0 - S3/R2 file uploads
- **@aws-sdk/s3-request-presigner** 3.990.0 - Pre-signed URLs for secure uploads
- **Resend** 6.9.2 - Transactional email service
- **@sentry/nextjs** 10.46.0 - Error monitoring and performance tracking
- **@upstash/redis** 1.37.0 - Rate limiting with Redis
- **@upstash/ratelimit** 2.0.8 - Rate limit middleware

**DriveCommand Web (UI):**
- **react-leaflet** 5.0.0 - Interactive maps (fleet tracking)
- **recharts** 2.15.4 - Charting library
- **@react-pdf/renderer** 4.3.2 - PDF generation
- **@react-email/components** 1.0.7 - Email template components
- **html2canvas** 1.4.1 - DOM to image conversion
- **sonner** 2.0.7 - Toast notifications
- **decimal.js** 10.6.0 - Precise financial calculations

**DriveCommand Web (Utilities):**
- **zod** 4.3.6 - Runtime schema validation
- **class-variance-authority** 0.7.1 - Component variant management
- **date-fns** 4.1.0 - Date utilities
- **nanoid** 5.1.6 - Unique ID generation
- **clsx** / **tailwind-merge** - CSS class merging

**DriveCommand Mobile:**
- **@react-navigation/native** 7.1.33 - Native navigation
- **@shopify/flash-list** 2.3.0 - Virtualized list (performance)
- **@sentry/react-native** 7.11.0 - Error monitoring for mobile
- **expo-notifications** 55.0.13 - Push notifications
- **expo-location** 55.1.4 - Geolocation
- **expo-camera** 55.0.10 - Camera access
- **react-native-maps** 1.27.2 - Map display
- **react-native-mmkv** 3.3.3 - Local encrypted storage
- **react-native-reanimated** 4.2.1 - Smooth animations

**LineUp:**
- **@dnd-kit/core** 6.3.1 - Drag-and-drop library
- **@dnd-kit/sortable** 10.0.0 - Sortable lists
- **@hookform/resolvers** 3.9.1 - Form validation (Zod)
- **react-hook-form** 7.71.1 - Form state management
- **@tiptap/react** 3.19.0 - Rich text editor
- **recharts** 3.7.0 - Data visualization
- **@tanstack/react-table** 8.21.3 - Headless table component

**Build & Dev:**
- **Turbo** 2.0.0 (DriveCommand monorepo) - Monorepo build orchestration
- **Autoprefixer** - CSS vendor prefixes
- **PostCSS** - CSS processing
- **ESLint** 9.x - Linting
- **TypeScript ESLint** - TypeScript-aware linting
- **tsx** 4.21.0 - TypeScript executor for Node.js scripts
- **Prettier** (implicit via config) - Code formatting

## Configuration

**Environment (All Projects):**

**Required Variables:**
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key (public)
- `SUPABASE_SERVICE_ROLE_KEY` (server-side only) - Privileged Supabase operations

**DriveCommand Web (Additional):**
- `DATABASE_URL` - PostgreSQL connection (Supabase)
- `NEXT_PUBLIC_APP_URL` - App base URL (for links in emails)
- `RESEND_API_KEY` - Email service
- `RESEND_FROM_EMAIL` - Sender address
- `ANTHROPIC_API_KEY` - Claude API for document AI
- `S3_ENDPOINT`, `S3_REGION`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, `S3_BUCKET` - File storage
- `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` - Rate limiting
- `NEXT_PUBLIC_SENTRY_DSN`, `SENTRY_DSN`, `SENTRY_AUTH_TOKEN` - Error tracking
- `ADMIN_SECRET_KEY` - Super-admin portal password
- `CRON_SECRET` - Vercel cron job protection
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` - Address autocomplete (optional)
- `AUTH_SECRET` - JWT signing (NextAuth legacy or app-specific)

**LineUp (Testing):**
- `VITE_SUPABASE_URL` - Client-side Supabase URL
- `VITE_SUPABASE_ANON_KEY` - Client-side Supabase key
- `TEST_USER_EMAIL`, `TEST_USER_PASSWORD` - Legacy test user
- `TEST_ADMIN_EMAIL`, `TEST_ADMIN_PASSWORD` - SysAdmin test user
- `TEST_TENANT_EMAIL`, `TEST_TENANT_PASSWORD` - Tenant user for security tests

**Build Configuration:**

**DriveCommand Web:**
- `next.config.ts` - Next.js config with Sentry integration
- `tsconfig.json` - TypeScript config with `@/*` path alias
- `.eslintrc.json` - ESLint rules
- `prisma/schema.prisma` - Database schema (PostgreSQL with Prisma Client JS adapter)

**DriveCommand Mobile:**
- `app.json` - Expo app config
- EAS Build profiles: development, preview, production

**LineUp:**
- `vite.config.ts` - Vite config with React plugin, `@/*` path alias
- `tsconfig.json` / `tsconfig.app.json` / `tsconfig.node.json` - Separate configs for app and build tools
- `eslint.config.js` - Flat config format with React hooks and refresh plugins
- `tailwind.config.js` - Custom colors (carbon design tokens), animations
- `playwright.config.ts` - Multi-role E2E test setup
- `postcss.config.js` - CSS processing

## Platform Requirements

**Development (All):**
- Node.js 18+ with npm 11.6.2
- macOS/Linux/Windows with standard development tools
- Supabase account (free tier works for local dev with `supabase start`)

**DriveCommand Web (Additional):**
- PostgreSQL 13+ (via Supabase or local instance)
- AWS S3 or Cloudflare R2 account (for file storage)
- Resend account (for email)
- Anthropic API key (optional, for AI features)
- Sentry account (optional, for error tracking)
- Google Maps API key (optional, for address autocomplete)

**DriveCommand Mobile:**
- iOS 13+ / Android 8+ (native apps)
- EAS Build account for cloud builds
- Apple Developer account (iOS) / Google Play Developer account (Android) for deployment

**Production (DriveCommand Web):**
- **Vercel** - Recommended hosting (built-in Next.js optimization, environment secrets)
- Alternative: Any Node.js 18+ runtime (Render, Railway, Heroku, etc.)
- PostgreSQL 13+ (managed or self-hosted)
- Supabase (or self-hosted PostgreSQL + Supabase-compatible auth)

**Production (LineUp):**
- **Vercel** - Recommended (SPA with `vercel.json` rewrites)
- Alternative: Static file host (Netlify, CloudFlare Pages, AWS S3, etc.)

## Notable Patterns

**Monorepo Structure (DriveCommand):**
- Root `package.json` with npm workspaces and Turbo
- Shared packages in `packages/`: `types`, `validation`, `api-client`
- Apps in `apps/`: `web` (Next.js), `mobile` (Expo)
- Each app manages its own scripts and dependencies

**Type Safety:**
- Shared types in `@drivecommand/types` package
- Zod schemas in `@drivecommand/validation` package
- Generated Prisma types for database
- Generated Supabase types via `gen:types` script (LineUp)

**Database:**
- **Prisma ORM** with PostgreSQL adapter (DriveCommand Web)
- Multi-tenancy enforced at schema level (tenant_id on all tables)
- Supabase RLS policies for row-level security
- Both projects use Supabase PostgreSQL backend

**Authentication:**
- Supabase Auth (passwordless or email/password)
- JWT tokens stored in secure HTTP-only cookies
- Role-based access: sys_admin, org_admin, org_user, client_user
- Multi-tenancy via tenant_id in JWT claims

---

*Stack analysis: 2026-03-31*
