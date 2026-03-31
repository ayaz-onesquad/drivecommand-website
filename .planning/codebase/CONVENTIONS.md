# Coding Conventions

**Analysis Date:** 2026-03-31

## Naming Patterns

**Files:**
- **TypeScript source files:** Lowercase with hyphens for compound names (e.g., `authStore.ts`, `statusUtils.ts`, `api-client.ts`)
- **React components:** PascalCase (e.g., `LoginPage.tsx`, `ClientDetailPage.tsx`, `ErrorBoundary.tsx`)
- **Test files:** Match source file name with `.spec.ts` or `.setup.ts` suffix (e.g., `auth.setup.ts`, `example.spec.ts`)
- **Configuration files:** Lowercase with dots (e.g., `eslint.config.js`, `playwright.config.ts`, `tsconfig.json`)

**Functions:**
- **Exported API functions:** camelCase (e.g., `apiRequest()`, `configureApiClient()`, `setUnauthorizedHandler()`)
- **Export object methods:** camelCase (e.g., `apiClient.login()`, `driverApi.getDashboard()`, `useAuthStore()`)
- **Handler/callback functions:** Prefix with handle or on (e.g., `handleSubmit()`, `onRowClick()`)
- **Utility functions:** descriptive camelCase (e.g., `getBaseUrl()`, `getLocalToday()`, `formatCurrency()`, `parseJwt()`)
- **Store actions:** camelCase (e.g., `setUser()`, `toggleSidebar()`, `openDetailPanel()`)

**Variables:**
- **Interfaces/Types:** PascalCase (e.g., `AuthSession`, `AuthUser`, `GPSLocation`, `LoadDetail`)
- **Enum-like values:** UPPER_SNAKE_CASE for constants (e.g., `UserRole`, `TruckStatus`, `LoadStatus`, `HOSStatus`, `IncidentCategory`)
- **Store instances:** camelCase with Use prefix (e.g., `useAuthStore`, `useUIStore`, `useTenantStore`)
- **Regular variables:** camelCase (e.g., `baseUrl`, `unauthorizedHandler`, `entityType`, `entityId`)

**Types:**
- **Interface names:** PascalCase with descriptive names (e.g., `AuthUser`, `CreateIncidentPayload`, `DetailPanelState`)
- **Type aliases:** PascalCase (e.g., `UserRole`, `TruckStatus`, `LeadsViewMode`, `EntityType`)
- **Generic type parameters:** Single uppercase letters (T, TData, TValue)
- **Inferred types from Zod schemas:** PascalCase ending with the schema base name (e.g., `DriverInvite = z.infer<typeof driverInviteSchema>`)

## Code Style

**Formatting:**
- **No Prettier config found** - Code uses manual formatting with consistent style
- **Key settings observed:**
  - 2-space indentation
  - No trailing semicolons in object literals and JSX (except statement ends)
  - String quotes: Single quotes for JS/TS, double quotes for JSX attributes
  - Consistent spacing around operators and function arguments

**Linting:**
- **Tool:** ESLint 9.39.1 with flat config format
- **Config file:** `eslint.config.js`
- **Configurations:**
  - `@eslint/js` - JavaScript recommended rules
  - `typescript-eslint` - TypeScript support with recommended rules
  - `eslint-plugin-react-hooks` - React hooks best practices
  - `eslint-plugin-react-refresh` - React fast refresh compatibility
- **Key rules:**
  - Strict TypeScript checking (`strict: true` in tsconfig)
  - No unused locals or parameters (`noUnusedLocals`, `noUnusedParameters`)
  - No switch fallthrough (`noFallthroughCasesInSwitch`)
  - No unchecked side effect imports (`noUncheckedSideEffectImports`)

## Import Organization

**Order:**
1. React and framework imports (`import React from 'react'`, `import { BrowserRouter } from 'react-router-dom'`)
2. Third-party library imports (`import { create } from 'zustand'`, `import { z } from 'zod'`, `import { apiRequest } from './client'`)
3. Local imports from path aliases (`import type { AuthUser } from '@/types/database'`, `import { useAuthStore } from '@/stores/authStore'`)
4. Local relative imports (`import { useToast } from '@/hooks/use-toast'`)

**Path Aliases:**
- `@/*` → `src/` - Use for all non-relative imports within src directory
- Example: `import { cn } from '@/lib/utils'`, `import { DataTable } from '@/components/ui/data-table'`

**Type imports:**
- Use `import type` for type-only imports to enable tree-shaking (e.g., `import type { AuthSession, AuthUser } from '@drivecommand/types'`)
- Type inference imports at end of file (e.g., `export type { AuthSession, AuthUser }`)

## Error Handling

**Patterns:**
- **Try-catch with default fallback:** Used for non-critical operations like JSON parsing
  ```typescript
  const error = await res.json().catch(() => ({ error: 'Request failed' }))
  ```
- **Throw with descriptive messages:** API errors throw Error objects with context (e.g., `throw new Error('Unauthorized')`)
- **Status code checking:** Check response status before assuming success (`if (!res.ok)`)
- **Specific error cases:** Handle 401 (Unauthorized) separately to trigger logout handlers
- **Test setup error messages:** Include role context and user email in error messages for debugging

**Authorization error flow:**
```typescript
if (res.status === 401) {
  unauthorizedHandler?.()
  throw new Error('Unauthorized')
}
```

## Logging

**Framework:** `console` methods (no logging framework detected)

**Patterns:**
- **Console.log for setup/debug info:** Prefixed with role context in test setup (e.g., `console.log('[SysAdmin] Starting authentication...')`)
- **Console.warn for warnings:** Used in test setup for non-blocking issues (e.g., signup link visibility warnings)
- **No debug logging in source code:** Focus is on test instrumentation and error messages

## Comments

**When to Comment:**
- **JSDoc for public APIs:** Functions exported from packages or utilities use JSDoc format
- **Algorithm explanation:** Complex logic gets multi-line comments explaining the "why" (e.g., timezone handling, status computation)
- **Critical assumptions:** Comments highlight important dependencies or state requirements
- **Test setup comments:** Extensive commenting in test setup files explaining authentication flow and expected outcomes

**JSDoc/TSDoc:**
- **Format:** Standard JSDoc with parameter and return type documentation
  ```typescript
  /**
   * Login with email and password
   * @param email - User email address
   * @param password - User password
   * @returns Promise resolving to auth session
   */
  login: (email: string, password: string) => apiRequest<AuthSession>(...)
  ```
- **Usage:** Primarily on schema definitions, API functions, and utility functions
- **Types in comments:** Document expected format for complex parameters (e.g., "YYYY-MM-DD format", "Must match /^[A-Z0-9\s\-]+$/i")

## Function Design

**Size:**
- **Short functions preferred:** API client methods are 1-2 lines (direct apiRequest calls)
- **Utility functions:** 5-15 lines typical for date/status computation
- **Handlers/callbacks:** 2-10 lines for state management operations

**Parameters:**
- **Object destructuring:** Prefer named parameters for functions with multiple args
  ```typescript
  openDetailPanel: (entityType: EntityType, entityId: string, entityData?: unknown) => void
  ```
- **Optional parameters:** Use `?` suffix with sensible defaults
- **REST parameters:** Used for spread operators in state updates (e.g., `{ ...fetchOptions, headers }`)

**Return Values:**
- **Type annotations required:** All exported functions have explicit return types
- **Generic types for API:** API functions return generic `Promise<T>` types (e.g., `apiRequest<AuthSession>()`)
- **Union types for status:** Status fields return discriminated unions (e.g., `LoadStatus = 'PENDING' | 'ACCEPTED' | 'EN_ROUTE'`)
- **Nullable returns:** Use `| null` for optional results (e.g., `getNextOccurrenceDate(): string | null`)

## Module Design

**Exports:**
- **Named exports preferred:** Each module exports specific functions/types it provides
- **Type exports:** Use `export type` for type-only exports
- **Barrel patterns:** Index files re-export from submodules (e.g., `export { useAuthStore }` from `stores/index.ts`)
- **API client exports:** Export both types and functions together
  ```typescript
  export type { DocumentStatus, DocumentType, DriverDocument }
  export const driverApi = { /* methods */ }
  ```

**Barrel Files:**
- **Used in:** `src/stores/index.ts` - Re-exports all store hooks
- **Pattern:** Simple re-export of main module exports
- **Not used for:** UI components or utilities (direct imports preferred for tree-shaking)

## Validation Patterns

**Framework:** Zod for runtime schema validation

**Pattern:**
- **Schema definitions:** Use Zod chain API for expressive validation (e.g., `z.string().email().min(1)`)
- **Custom error messages:** Each validation rule has a custom error message
- **Optional fields:** Chain `.optional().or(z.literal(''))` to allow empty strings as falsy value
- **Type inference:** Use `z.infer<typeof schema>` to derive TypeScript types from schemas
- **Re-export pattern:** Schemas in `packages/validation/` with inferred types exported alongside

Example from `/Users/ayazmohammed/DriveCommand/packages/validation/src/driver.ts`:
```typescript
export const driverInviteSchema = z.object({
  email: z.string().email('Invalid email address'),
  firstName: z.string().min(1, 'First name is required').max(50, 'First name must be 50 characters or less'),
  licenseNumber: z.string().regex(/^[A-Z0-9\s\-]+$/i, 'License number contains invalid characters').optional()
})
export type DriverInvite = z.infer<typeof driverInviteSchema>
```

## State Management

**Framework:** Zustand for global state

**Patterns:**
- **Store creation:** Use `create<StateType>()` with TypeScript interface definition
- **Persistence middleware:** Apply `persist()` middleware with selective partialize for sensitive data
- **Store hooks:** Export as `useXxxStore` following React hooks naming convention
- **State shape:** Separate state properties and action methods in single object
- **Partial persistence:** Use `partialize` option to exclude sensitive fields from localStorage
  ```typescript
  persist(
    (set) => ({ /* state and actions */ }),
    { name: 'auth-storage', partialize: (state) => ({ isAuthenticated: state.isAuthenticated }) }
  )
  ```
- **Action patterns:** Direct state setters for simple updates, reducer-style for complex transformations

---

*Convention analysis: 2026-03-31*
