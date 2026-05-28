---
phase: quick-10
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - package.json
  - src/lib/supabase/admin.ts
  - src/app/contact/actions.ts
autonomous: true
user_setup:
  - service: supabase
    why: "LineUp Supabase leads table integration"
    env_vars:
      - name: SUPABASE_URL
        source: "Supabase Dashboard -> Project Settings -> API -> Project URL"
      - name: SUPABASE_SERVICE_ROLE_KEY
        source: "Supabase Dashboard -> Project Settings -> API -> service_role key (secret)"
      - name: LINEUP_TENANT_ID
        source: "LineUp admin or database: the DriveCommand tenant UUID"

must_haves:
  truths:
    - "Contact form submissions create a lead row in Supabase leads table"
    - "Lead row has correct tenant_id, lead_name, email, status, source, source_automation_name"
    - "Supabase insert failure does not block user submission (non-blocking)"
    - "Missing LINEUP_TENANT_ID causes a loud runtime error on first call"
  artifacts:
    - path: "src/lib/supabase/admin.ts"
      provides: "Server-only Supabase admin client using service role key"
      exports: ["supabaseAdmin"]
    - path: "src/app/contact/actions.ts"
      provides: "Server Action with Supabase lead insert"
      contains: "supabaseAdmin"
  key_links:
    - from: "src/app/contact/actions.ts"
      to: "src/lib/supabase/admin.ts"
      via: "import supabaseAdmin"
      pattern: "import.*supabaseAdmin.*from.*supabase/admin"
    - from: "src/app/contact/actions.ts"
      to: "supabase.leads"
      via: "insert call"
      pattern: "from\\(['\"]leads['\"]\\)"
---

<objective>
Insert contact form submissions into LineUp Supabase leads table

Purpose: Enable DriveCommand waitlist signups to appear as leads in LineUp for sales follow-up
Output: Server Action that writes to Supabase on successful form submission (non-blocking)
</objective>

<execution_context>
@/Users/ayazmohammed/.claude/get-shit-done/workflows/execute-plan.md
@/Users/ayazmohammed/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/STATE.md
@src/app/contact/actions.ts
@package.json
</context>

<tasks>

<task type="auto">
  <name>Task 1: Install Supabase JS and create admin client</name>
  <files>package.json, src/lib/supabase/admin.ts</files>
  <action>
1. Install @supabase/supabase-js:
   ```bash
   npm install @supabase/supabase-js
   ```

2. Create `src/lib/supabase/admin.ts` with a server-only Supabase client:
   - Import createClient from @supabase/supabase-js
   - Add "use server" or import "server-only" to prevent client bundling (prefer server-only package)
   - Read SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY from process.env
   - Export a single `supabaseAdmin` client instance
   - Include a startup check: if either env var is missing, throw immediately with a clear error message

Note: Use service_role key for full insert access. Never use the anon key for this pattern.
  </action>
  <verify>
- `npm ls @supabase/supabase-js` shows installed version
- `src/lib/supabase/admin.ts` exists and exports supabaseAdmin
- File contains "server-only" import or "use server" directive
  </verify>
  <done>Supabase admin client module exists and is server-only</done>
</task>

<task type="auto">
  <name>Task 2: Add Supabase lead insert to contact Server Action</name>
  <files>src/app/contact/actions.ts</files>
  <action>
Modify the submitContactForm Server Action:

1. Import supabaseAdmin from "@/lib/supabase/admin"

2. At module scope (before any function), add a tenant ID check:
   ```ts
   const LINEUP_TENANT_ID = process.env.LINEUP_TENANT_ID
   if (!LINEUP_TENANT_ID) {
     throw new Error('LINEUP_TENANT_ID environment variable is required')
   }
   ```

3. After successful validation and before returning success, add a non-blocking Supabase insert:
   ```ts
   // Insert lead into LineUp Supabase (non-blocking)
   try {
     const { error } = await supabaseAdmin
       .from('leads')
       .insert({
         tenant_id: LINEUP_TENANT_ID,
         lead_name: `Waitlist - ${validated.data.email}`,
         email: validated.data.email,
         status: 'new',
         source: 'website',
         source_automation_name: 'DriveCommand Waitlist',
       })

     if (error) {
       console.error('Failed to insert lead into Supabase:', error)
     }
   } catch (err) {
     console.error('Supabase lead insert error:', err)
   }
   ```

4. Keep the existing success return AFTER the insert attempt - the insert must not block success

Important constraints:
- Insert ONLY the 6 fields specified: tenant_id, lead_name, email, status, source, source_automation_name
- Status must be literal string "new" (not "waitlist")
- lead_name format: "Waitlist - {email}"
- Do NOT modify the Zod schema, form UI, or any other logic
  </action>
  <verify>
- `npm run build` passes with no TypeScript errors
- `grep -n "from('leads')" src/app/contact/actions.ts` shows insert call
- `grep -n "LINEUP_TENANT_ID" src/app/contact/actions.ts` shows env var check
- `grep -n "console.error" src/app/contact/actions.ts` shows error logging
  </verify>
  <done>Contact form Server Action inserts leads to Supabase on submission, with proper error handling and non-blocking behavior</done>
</task>

</tasks>

<verification>
- `npm run build` completes without errors
- `npm run lint` passes
- Server Action file imports supabaseAdmin
- Server Action has LINEUP_TENANT_ID validation at module scope
- Insert uses correct 6 fields with specified values
- Insert is wrapped in try/catch with console.error logging
- Insert failure does not affect user-facing success response
</verification>

<success_criteria>
- Supabase admin client created at src/lib/supabase/admin.ts (server-only)
- Contact form Server Action modified to insert leads
- Build passes, lint passes
- Non-blocking insert pattern implemented
- Loud failure on missing LINEUP_TENANT_ID
</success_criteria>

<output>
After completion, create `.planning/quick/10-insert-waitlist-signups-into-lineup-supa/10-SUMMARY.md`
</output>
