# Testing Patterns

**Analysis Date:** 2026-03-31

## Test Framework

**Runner:**
- **Framework:** Playwright 1.58.2 (End-to-End / Integration testing)
- **Config file:** `playwright.config.ts`
- **Test discovery:** All `.spec.ts` and `.setup.ts` files in `tests/` directory

**Assertion Library:**
- Playwright's built-in expect API with page interactions
- Matchers: `expect(page).not.toHaveURL()`, `expect(page.locator()).toBeVisible()`, `expect(bodyText).toContain()`, `expect(priority).toBe()`

**Run Commands:**
```bash
npm run test                # Run all tests (headless, all projects)
npm run test:ui            # Run tests with Playwright UI inspector
npm run test:headed        # Run tests with visible browser window
npm run test:report        # View HTML report of last test run
```

## Test File Organization

**Location:**
- **Pattern:** Co-located in `tests/` directory, not alongside source code
- **Structure:** Tests are E2E tests that interact with running application, not unit tests

**Naming:**
- **Setup files:** `*.setup.ts` (e.g., `auth.setup.ts`) - Runs before all tests to establish authentication state
- **Feature tests:** `*.spec.ts` (e.g., `v2-phase-detail.spec.ts`, `example.spec.ts`)
- **Security tests:** `security/*.spec.ts` - Tests multi-role isolation and permission enforcement

**Directory Structure:**
```
LineUp/
├── tests/
│   ├── auth.setup.ts              # Multi-role authentication setup
│   ├── example.spec.ts            # Priority calculation and basic auth tests
│   ├── v2-phase-detail.spec.ts
│   ├── v2-document-upload.spec.ts
│   ├── v2-priority-system.spec.ts
│   ├── v2-form-validation.spec.ts
│   ├── v2-dashboard-mywork.spec.ts
│   ├── v2-detail-pages.spec.ts
│   ├── v2-features.spec.ts
│   ├── v2-global-search.spec.ts
│   ├── v2-sidebar-navigation.spec.ts
│   ├── security/
│   │   ├── v2-features-security.spec.ts
│   │   └── isolation.spec.ts
└── playwright/
    └── .auth/
        ├── admin.json              # SysAdmin authenticated state
        ├── tenant.json             # OrgUser authenticated state
        └── user.json               # Legacy auth state
```

## Test Structure

**Suite Organization:**
```typescript
test.describe('Feature Category', () => {
  test('specific behavior is tested', async ({ page }) => {
    // Test implementation
  })
})
```

**Patterns:**

### Setup Pattern - Multi-Role Authentication (`auth.setup.ts`)

```typescript
interface RoleConfig {
  email: string
  password: string
  authFile: string
  expectedUrl: RegExp | string
  roleName: string
}

async function performLogin(page, role) {
  // Navigate to /login
  // Fill email/password using page.getByPlaceholder()
  // Click sign in button
  // Wait for navigation away from /login
  // Handle onboarding flow if present
  // Save authenticated state to file
  // page.context().storageState({ path: authFile })
}

setup('authenticate as admin (sys_admin)', async ({ page }) => {
  await performLogin(page, ROLES.admin)
})

setup('authenticate as tenant user (org_user)', async ({ page }) => {
  await performLogin(page, ROLES.tenant)
})
```

**Key features:**
- Three authentication roles: admin (SysAdmin), tenant (OrgUser), legacy user
- Credentials from env vars with defaults to seeded test users
- Automatic onboarding handling if user hasn't created organization yet
- Saves authenticated state to separate `.json` files for parallel test projects

### Page Interaction Pattern

```typescript
test('can access dashboard when authenticated', async ({ page }) => {
  // Navigate
  await page.goto('/dashboard')
  await page.waitForLoadState('networkidle')

  // Verify state
  await expect(page).not.toHaveURL(/\/login/)

  // Assert content
  await expect(page.locator('body')).toBeVisible()
})
```

**Selectors used:**
- `page.getByPlaceholder('text')` - For form inputs
- `page.getByRole('button', { name: 'text' })` - For buttons with accessible labels
- `page.locator('body')` - For page structure checks
- `page.locator('.className')` - Class-based selectors
- `page.locator('[href="/path"]')` - Attribute selectors

### Assertion Pattern

```typescript
// URL assertions
await expect(page).not.toHaveURL(/\/login/)
await expect(page).toHaveURL((url) => !url.pathname.includes('/login'))

// Visibility assertions
await expect(page.locator('body')).toBeVisible()

// Content assertions
const bodyText = await page.locator('body').textContent()
expect(bodyText).not.toContain('Sign In')

// Numeric assertions
expect(priority).toBe(1)
```

## Mocking

**Framework:** No mocking framework detected

**Approach:** E2E tests use real application and backend
- **What NOT to mock:** Database state, authentication, network calls to real backend
- **What IS controlled:** Test user credentials, authentication state persistence, environment configuration

**Authentication state mocking:**
- Pre-authenticated sessions stored in JSON files in `playwright/.auth/`
- Session injected via `storageState` project option
- Each project (admin, tenant, legacy) gets separate authenticated state

## Fixtures and Factories

**Test Data:**
- **Authentication:** Test users seeded in database via `supabase/seed.sql`
  - `sysadmin@test.lineup.dev` / `TestPassword123!` (SysAdmin)
  - `orguser@test.lineup.dev` / `TestPassword123!` (OrgUser)
  - `orgadmin@test.lineup.dev` / `TestPassword123!` (OrgAdmin)

- **User creation pattern:** Credentials passed via environment variables
  ```typescript
  const DEFAULT_ADMIN_EMAIL = 'sysadmin@test.lineup.dev'
  const DEFAULT_ADMIN_PASSWORD = 'TestPassword123!'

  const email = process.env.TEST_ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL
  const password = process.env.TEST_ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD
  ```

**Location:**
- Authentication setup: `tests/auth.setup.ts`
- Database seeding: `supabase/seed.sql` (external, run before tests)
- Environment config: `.env` file (required for test URLs and optional credential overrides)

## Coverage

**Requirements:** No enforced coverage thresholds detected

**View Coverage:**
- Not applicable - Playwright generates HTML test reports at `playwright-report/` instead of coverage reports
- View with: `npm run test:report`

## Test Types

**Unit Tests:**
- Not used in this codebase
- Logic testing is done via E2E tests at page level

**Integration Tests:**
- **Scope:** Full user workflows from login through feature interaction
- **Approach:** Navigate pages, interact with UI, verify state changes
- **Examples:**
  - `v2-form-validation.spec.ts` - Form submission and validation
  - `v2-document-upload.spec.ts` - File upload workflows
  - `v2-dashboard-mywork.spec.ts` - Dashboard data display and interaction

**E2E Tests:**
- **Framework:** Playwright
- **Pattern:** Used as primary testing methodology
- **Features tested:**
  - Authentication flows (login, logout, onboarding)
  - Navigation and routing
  - CRUD operations on entities (Phase, Set, Requirement, etc.)
  - Priority system calculations
  - Global search functionality
  - Sidebar navigation
  - Detail page views and edits

**Security Tests:**
- **Location:** `tests/security/` directory
- **Pattern:** Multi-role isolation verification
- **Examples:**
  - `isolation.spec.ts` - Ensures SysAdmin/OrgUser cannot see each other's data
  - `v2-features-security.spec.ts` - Role-based feature access control
- **Setup:** Each security test specifies its own `storageState` per test.describe block

## Common Patterns

**Async Testing:**

```typescript
test('async operation completes', async ({ page }) => {
  // Playwright tests are async by default
  // Use async/await for page operations

  // Wait for navigation
  await page.waitForURL((url) => !url.pathname.includes('/login'), {
    timeout: 20000,  // Explicit timeout
  })

  // Wait for network to settle
  await page.waitForLoadState('networkidle')

  // Wait for specific element
  const input = page.getByPlaceholder(/organization/i)
  await input.waitFor({ timeout: 5000 })
  await input.fill('Organization Name')

  // Optional: wait for UI reactions
  await page.waitForTimeout(500)
})
```

**Navigation Testing:**

```typescript
test('navigates after action', async ({ page }) => {
  await page.goto('/login')
  await page.waitForLoadState('networkidle')

  // Perform action
  await page.getByRole('button', { name: 'Sign In' }).click()

  // Verify navigation
  try {
    await page.waitForURL(
      (url) => !url.pathname.includes('/login'),
      { timeout: 20000 }
    )
  } catch {
    // Handle timeout - check for error message
    const errorMessage = await page
      .locator('.text-destructive, [role="alert"]')
      .textContent()
      .catch(() => null)

    if (errorMessage) {
      throw new Error(`Login failed: ${errorMessage}`)
    }
    throw new Error('Navigation timeout')
  }
})
```

**Error Handling in Tests:**

```typescript
test('handles missing data gracefully', async ({ page }) => {
  await page.goto('/dashboard')
  await page.waitForLoadState('networkidle')

  // Catch expected errors
  const optional = await page
    .locator('.optional-element')
    .textContent()
    .catch(() => null)

  // Assert either content or null
  expect(optional).toBeNull()
})
```

**Multi-Project Test Configuration:**

```typescript
// playwright.config.ts - Project definitions

projects: [
  // Setup project runs first
  {
    name: 'setup',
    testMatch: /.*\.setup\.ts/,
    fullyParallel: true,
  },

  // Admin tests use admin auth state
  {
    name: 'chromium-admin',
    testDir: './tests',
    use: {
      ...devices['Desktop Chrome'],
      storageState: 'playwright/.auth/admin.json',
    },
    dependencies: ['setup'],
  },

  // Tenant tests use tenant auth state
  {
    name: 'chromium-tenant',
    testDir: './tests',
    use: {
      ...devices['Desktop Chrome'],
      storageState: 'playwright/.auth/tenant.json',
    },
    dependencies: ['setup'],
  },

  // Security tests specify auth per test
  {
    name: 'security-tests',
    testDir: './tests/security',
    use: { ...devices['Desktop Chrome'] },
    dependencies: ['setup'],
  },
]

// Web server auto-starts before tests
webServer: {
  command: 'npm run dev',
  url: 'http://localhost:5173',
  reuseExistingServer: !process.env.CI,
}
```

**Test Instrumentation:**

```typescript
// Log context for debugging
console.log(`[${roleName}] Starting authentication with seeded user: ${email}`)

// Screenshot on important state changes
await page.screenshot({
  path: `playwright/.auth/${roleName.toLowerCase()}-authenticated.png`,
})

// Detailed error reporting
throw new Error(
  `[${roleName}] Still on login page. Authentication failed. Make sure the user exists in the database.`
)
```

## CI/CD Integration

**Configuration:**
- **Retry logic:** Tests retry 2 times on CI, 0 times locally
- **Parallel execution:** CI runs with 1 worker (sequential), local runs with default (parallel)
- **Fail-fast:** `forbidOnly: true` on CI - prevents accidental test.only commits

**Reporter:**
- HTML report for visual inspection: `playwright-report/`
- Console reporter with detailed steps for security tests

## Test Environment

**Base URL:** `http://localhost:5173` (Vite dev server)

**Database:** Tests connect to real application backend (no mock server)

**Test users:** Must be pre-seeded in Supabase before tests run
```bash
# Run seed script to create test users
npx supabase db push  # Applies migrations
# Then seed data should be loaded from supabase/seed.sql
```

**Environment variables:**
```
TEST_ADMIN_EMAIL=sysadmin@test.lineup.dev        # Override admin user
TEST_ADMIN_PASSWORD=TestPassword123!
TEST_TENANT_EMAIL=orguser@test.lineup.dev        # Override tenant user
TEST_TENANT_PASSWORD=TestPassword123!
TEST_USER_EMAIL=sysadmin@test.lineup.dev         # Legacy fallback
TEST_USER_PASSWORD=TestPassword123!
```

---

*Testing analysis: 2026-03-31*
