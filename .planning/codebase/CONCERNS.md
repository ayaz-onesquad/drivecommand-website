# Codebase Concerns

**Analysis Date:** 2026-03-31

## Tech Debt

**Prisma 7 Type Inference Issues:**
- Issue: Multiple `@ts-ignore` directives used across notification and repository modules due to Prisma 7 extended client type inference failures
- Files: `src/lib/notifications/check-upcoming-maintenance.ts`, `src/lib/notifications/check-expiring-documents.ts`, `src/lib/notifications/check-expiring-driver-documents.ts`, `src/lib/notifications/notification-deduplication.ts`, `src/lib/db/repositories/truck.repository.ts`, `src/lib/db/repositories/document.repository.ts`, `src/lib/integrations/motive.ts`, `src/lib/integrations/samsara.ts`
- Impact: Type safety compromised; future refactors of Prisma extensions may introduce runtime errors undetected at compile time
- Fix approach: Upgrade Prisma to latest stable version, or refactor extended client to use proper typing via type augmentation in `/src/lib/db/prisma.ts`

**Incomplete Placeholder Features (DriveCommand):**
- Issue: Mobile API endpoints return hardcoded placeholder values for unimplemented features
- Files: `src/app/api/mobile/driver/dashboard/route.ts` (lines 74-77), `src/app/api/mobile/owner/dashboard/route.ts`
- Specific placeholders:
  - `todayMiles: 0` (no GPS data source yet)
  - `hosHoursRemaining: 11.0` (no HOS tracking yet)
  - `recentAlerts: []` (no alerts model yet)
- Impact: Mobile apps display misleading data; drivers/owners cannot rely on accurate HOS hours or mileage tracking
- Fix approach: Implement GPS integration for mileage, add HOS tracking via Samsara/Motive integration, create alerts model for driver compliance

**Rate Limiting Not Applied to All Mobile Routes:**
- Issue: TODO comment indicates rate limiting only partially implemented across `/api/mobile/*` endpoints
- Files: `src/app/api/mobile/driver/dashboard/route.ts` (line 27), `src/app/api/mobile/owner/dashboard/route.ts` (line 27)
- Impact: Unprotected endpoints vulnerable to abuse/DoS attacks
- Fix approach: Apply `applyRateLimit()` check to all mobile API routes systematically using a middleware pattern

**Incomplete Email Features (LineUp):**
- Issue: Welcome email flow not implemented; sendWelcomeEmail flag exists but is unused
- Files: `src/services/api/tenants.ts` (line 254)
- Impact: New tenant users don't receive onboarding emails; poor UX for new account setup
- Fix approach: Implement edge function to send welcome emails via Resend or Supabase email service when `sendWelcomeEmail=true`

**Hardcoded Placeholder Client Name:**
- Issue: When client lookup fails during project creation, generates code with 'XXX' fallback
- Files: `src/services/api/projects.ts` (line 302)
- Impact: Projects can be created with invalid client references; code generation produces meaningless prefixes
- Fix approach: Add validation to prevent project creation without valid client; throw error earlier in form validation

## Known Issues

**Missing Invite Email Flow:**
- Symptom: LineUp tenant API rejects invite requests if user doesn't exist
- Files: `src/services/api/tenants.ts` (line 156-159)
- Trigger: Trying to invite a new user to a tenant who hasn't signed up yet
- Current behavior: Throws "User not found. Please ask them to sign up first"
- Workaround: Require users to sign up before sending invites; implement pre-invite email flow

**Orphaned Data Risk in LineUp:**
- Symptom: Orphaned requirements/pitches/sets can exist without parent references due to cascade logic gaps
- Files: `src/hooks/useMyWork.ts` (lines 397-449) - orphan detection exists but data isn't prevented from becoming orphaned
- Trigger: Deleting a project/phase doesn't cascade delete children if not properly configured
- Impact: Orphaned items appear in My Work tree as unlinked items; hierarchy becomes confusing
- Workaround: UI displays orphans separately; no data loss but visibility/navigation issues

## Security Considerations

**RLS Policy Enforcement (LineUp):**
- Risk: Row-level security relies on database functions marked `SECURITY DEFINER` to bypass RLS; if RPC functions have insufficient validation, multi-tenant data leakage possible
- Files: `src/services/api/tenants.ts` (lines 34-43, 208-215), `src/hooks/useUserRole.ts` (line 11)
- Current mitigation: Tenant ID and user ID extracted from JWT in auth layer; RPC functions assume caller is authenticated
- Recommendations:
  - Audit all SECURITY DEFINER functions to ensure they validate both tenant_id AND user role before returning data
  - Never trust passed tenant_id; always derive from JWT
  - Add logging to all RPC function calls to detect unauthorized access attempts
  - Test cross-tenant queries to ensure RLS prevents data leakage

**Type Safety Gaps with `any` Types:**
- Risk: Multiple `any` types used in action props and functions bypass TypeScript checking
- Files: `src/components/drivers/driver-invite-form.tsx` (line 7), `src/components/routes/route-form.tsx` (line 21), `src/lib/geofencing/geofence-check.ts` (line 262)
- Impact: Runtime errors in form submission and geofencing logic not caught at compile time
- Recommendations: Replace all `any` with proper types; use `unknown` if type is truly dynamic, then narrow with type guards

**Foreign Key Constraint Handling:**
- Risk: Cascade delete not properly validated before deletion operations
- Files: `src/services/api/projects.ts` (lines 34-63), `src/lib/utils.ts` (line 561)
- Current approach: Error messages caught and displayed, but no prevention of invalid state
- Recommendations: Implement pre-delete validation checks; fetch child counts before allowing delete; show warning dialogs with child entity counts

## Performance Bottlenecks

**N+1 Query Pattern in LineUp Detail Pages:**
- Problem: Detail pages (ClientDetailPage, ProjectDetailPage, SetDetailPage) fetch related data in multiple separate queries
- Files: `src/pages/clients/ClientDetailPage.tsx` (1680 lines), `src/pages/projects/ProjectDetailPage.tsx` (1386 lines)
- Cause: Each hook (`useProjectsByClient`, `useContacts`, `useSetsByClient`, etc.) fetches independently instead of batching
- Example: ClientDetailPage fetches clients → projects → contacts → sets → requirements → competitors (6+ separate requests)
- Improvement path: Implement batch query hook that fetches entire hierarchy in single request; use Supabase's nested select capability; cache at QueryClient level with proper invalidation

**Large Page Components (LineUp):**
- Problem: Multiple detail pages exceed 1000 lines, combining data fetching, filtering, editing, and UI rendering
- Files: `src/pages/clients/ClientDetailPage.tsx` (1680 lines), `src/pages/projects/ProjectDetailPage.tsx` (1386 lines), `src/pages/sets/SetDetailPage.tsx` (1240 lines), `src/pages/documents/DocumentsPage.tsx` (1232 lines)
- Cause: Monolithic "view + edit" pattern; too many tabs and inline editors in single component
- Impact: Slow initial render; complex state management; hard to test individual sections
- Improvement path: Split detail pages into composable tab components; extract edit forms to separate modal components; use React.memo for tab sections; defer non-critical tabs with Suspense

**Database Query for Latest HOS Entry per Driver:**
- Problem: Fetch all open HOS entries then deduplicate in memory instead of using database GROUP BY
- Files: `src/app/api/mobile/owner/dashboard/route.ts` (lines 127-147)
- Cause: Complex deduplication logic in JavaScript instead of leveraging SQL aggregation
- Impact: O(n) memory and CPU for deduplication; inefficient for large fleets (500+ drivers)
- Fix approach: Use `DISTINCT ON (driverId)` in Postgres query; order by startTime DESC to get latest in single query pass

## Fragile Areas

**Geofencing Logic:**
- Files: `src/lib/geofencing/geofence-check.ts` (262 lines with `any` types)
- Why fragile: Complex coordinate calculations combined with incomplete type safety; missing error boundaries for notification failures
- Safe modification: Add comprehensive unit tests for edge cases (boundary points, pole crossing, null coordinates); add try-catch around notification calls; type notify functions properly
- Test coverage: Gaps in coordinate edge cases, null handling, notification delivery confirmation

**Mobile API Dashboard Aggregations:**
- Files: `src/app/api/mobile/owner/dashboard/route.ts` (234 lines), `src/app/api/mobile/driver/dashboard/route.ts` (84 lines)
- Why fragile: Complex date calculations (month start/end, 30-day windows) repeated in multiple routes; hardcoded status constants; placeholder values can mask real data
- Safe modification: Extract date utilities to shared module; centralize status enums; replace placeholders with runtime warnings; add comprehensive logging
- Test coverage: Gaps in date boundary conditions (month transitions, leap years), status filtering logic

**Notification Deduplication System:**
- Files: `src/lib/notifications/notification-deduplication.ts` (100+ lines)
- Why fragile: Uses `any` types extensively; complex Map-based deduplication logic; relies on Prisma extensions with type ignores
- Safe modification: Replace `any` with proper types; add unit tests for deduplication edge cases; test with various document and truck counts
- Test coverage: No tests for deduplication logic; edge cases unknown

**Multi-Tenant User Creation Flow:**
- Files: `src/services/api/tenants.ts` (lines 187-261)
- Why fragile: User creation succeeds but tenant assignment fails; no transaction to roll back user creation; partial failures leave orphaned users
- Safe modification: Wrap in explicit transaction; add rollback logic if tenant assignment fails; add comprehensive error logging with userId for cleanup
- Test coverage: No tests for failure scenarios; failure path unknown

## Scaling Limits

**Database Transaction Strategy:**
- Current capacity: Works for small fleet operations (< 100 drivers, < 1000 loads)
- Limit: Prisma transactions in `src/app/api/mobile/owner/dashboard/route.ts` (lines 34-70) don't specify timeout; long transactions lock tables during peak hours
- Scaling path: Add explicit `maxWait` and `timeout` to transaction options; implement connection pooling with pgBouncer; consider event-driven architecture for real-time dashboards

**RLS Policy Evaluation:**
- Current capacity: RLS checks per query are O(1) for single-tenant lookups
- Limit: If multi-tenant queries grow complex, RLS evaluation becomes bottleneck; no query plan optimization
- Scaling path: Profile RLS policy performance with pgBench; consider materialized views for read-heavy dashboards; implement caching layer (Redis) for tenant-scoped data

**In-Memory Map Deduplication:**
- Current capacity: Works for < 500 drivers in `src/app/api/mobile/owner/dashboard/route.ts`
- Limit: Lines 141-147 create Maps for HOS and load data; memory usage O(n) drivers
- Scaling path: Use database-side GROUP BY instead of in-memory deduplication; implement pagination for driver lists

## Dependencies at Risk

**Prisma Version Mismatch with Extensions:**
- Risk: Prisma 7 extended client causes widespread `@ts-ignore` usage
- Impact: Cannot upgrade Prisma or dependencies safely; type safety compromised
- Migration plan: Audit Prisma extensions; rewrite using proper type augmentation or switch to runtime validation layer

**Supabase RLS Complexity (LineUp):**
- Risk: Multiple SECURITY DEFINER RPC functions are single points of failure; if any RPC has insufficient validation, entire multi-tenant isolation fails
- Impact: Potential multi-tenant data leakage
- Migration plan: Implement RPC security audit checklist; add end-to-end tests that verify cross-tenant isolation; consider moving complex logic to middleware instead of RPCs

## Missing Critical Features

**GPS Tracking & HOS Integration (DriveCommand):**
- Problem: Mobile driver dashboard shows 0 miles and hardcoded 11.0 HOS hours; no real tracking
- Blocks: Drivers cannot view accurate mileage; fleet managers cannot ensure HOS compliance
- Required for: DOT compliance, accurate fuel tracking, route optimization

**Email Notification System (DriveCommand):**
- Problem: Sendable email templates exist but welcome email, dispatch notification, and compliance alerts not implemented
- Blocks: Drivers don't receive dispatch notifications; customers don't get load status updates
- Required for: Driver engagement, customer communication, compliance documentation

**Invite Email Flow (LineUp):**
- Problem: Can't invite new users; only existing users can join tenants
- Blocks: New tenant creation is blocked; account setup requires manual email coordination
- Required for: Tenant onboarding, team expansion

## Test Coverage Gaps

**Geofencing Edge Cases:**
- What's not tested: Polygon boundaries, coordinate calculations at poles, null/invalid coordinates, notification delivery confirmation
- Files: `src/lib/geofencing/geofence-check.ts`
- Risk: Geofence alerts may silently fail or trigger incorrectly; customers receive wrong load status
- Priority: High

**Mobile API Aggregations:**
- What's not tested: Date boundary calculations (month end, leap years), status filtering logic, edge cases with 0 results
- Files: `src/app/api/mobile/owner/dashboard/route.ts`, `src/app/api/mobile/driver/dashboard/route.ts`
- Risk: Dashboard shows incorrect KPIs on month boundaries or during edge cases
- Priority: High

**Multi-Tenant Data Isolation:**
- What's not tested: Cross-tenant query attempts, RLS bypass attempts, RPC function validation
- Files: `src/services/api/tenants.ts`, RPC functions
- Risk: Unauthorized access to tenant data; multi-tenant data leakage
- Priority: Critical

**Notification Deduplication:**
- What's not tested: Deduplication logic with edge cases, notification delivery confirmation, retry behavior
- Files: `src/lib/notifications/notification-deduplication.ts`
- Risk: Duplicate notifications sent to users; notification storms during syncs
- Priority: Medium

**Project Cascade Delete:**
- What's not tested: Cascading client_id change to all children; orphan prevention; deletion of deeply nested hierarchies
- Files: `src/services/api/projects.ts` (cascadeProjectClientId function)
- Risk: Orphaned data; inconsistent client references
- Priority: Medium

---

*Concerns audit: 2026-03-31*
