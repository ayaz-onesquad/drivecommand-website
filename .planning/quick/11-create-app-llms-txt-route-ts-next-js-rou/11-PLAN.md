---
phase: quick-11
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - src/app/llms.txt/route.ts
autonomous: true

must_haves:
  truths:
    - "GET /llms.txt returns valid markdown content"
    - "Response has Content-Type: text/markdown header"
    - "Product name DriveCommand appears in H1"
    - "Tagline 'Miles Ahead.' appears in blockquote"
    - "All sitemap pages are linked with full URLs"
  artifacts:
    - path: "src/app/llms.txt/route.ts"
      provides: "llms.txt route handler"
      exports: ["GET"]
  key_links:
    - from: "src/app/llms.txt/route.ts"
      to: "/llms.txt"
      via: "Next.js route handler convention"
      pattern: "export.*GET"
---

<objective>
Create a Next.js route handler that serves llms.txt at /llms.txt

Purpose: Provide LLM-readable site summary following llmstxt.org spec for AI crawlers
Output: src/app/llms.txt/route.ts serving text/markdown response
</objective>

<execution_context>
@/Users/ayazmohammed/.claude/get-shit-done/workflows/execute-plan.md
@/Users/ayazmohammed/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@src/app/sitemap.ts
@src/app/api/waitlist/route.ts
</context>

<tasks>

<task type="auto">
  <name>Task 1: Create llms.txt route handler</name>
  <files>src/app/llms.txt/route.ts</files>
  <action>
Create Next.js route handler at src/app/llms.txt/route.ts that:

1. Exports a GET function returning Response (not NextResponse — simpler for plain text)
2. Uses BASE_URL from process.env.NEXT_PUBLIC_SITE_URL with fallback to 'https://drivecommand.co'
3. Returns markdown content following llmstxt.org format:

```markdown
# DriveCommand

> Fleet management software for trucking companies. Miles Ahead.

DriveCommand is a project management tool built specifically for logistics and trucking operations. It helps fleet owners, dispatchers, and managers coordinate loads, track performance, and streamline operations.

## Pages

- [Home](https://drivecommand.co/): Main landing page with product overview
- [Pricing](https://drivecommand.co/pricing): Pricing plans and features
- [Demo](https://drivecommand.co/demo): Interactive product demo
- [Contact](https://drivecommand.co/contact): Get in touch with sales
- [About](https://drivecommand.co/about): Company information
```

4. Return with headers:
   - Content-Type: text/markdown; charset=utf-8
   - Cache-Control: public, max-age=86400 (cache for 1 day)

Pattern to follow (simple Response, not NextResponse):
```typescript
export async function GET() {
  const content = `...markdown...`
  return new Response(content, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
```
  </action>
  <verify>
Run: curl -I http://localhost:3000/llms.txt (check Content-Type header)
Run: curl http://localhost:3000/llms.txt (verify markdown content)
  </verify>
  <done>
GET /llms.txt returns markdown with DriveCommand H1, tagline blockquote, and links to all 5 sitemap pages
  </done>
</task>

</tasks>

<verification>
- `npm run build` completes without errors
- `curl -s http://localhost:3000/llms.txt | head -1` returns "# DriveCommand"
- Response Content-Type header is text/markdown
</verification>

<success_criteria>
- Route handler exists at src/app/llms.txt/route.ts
- GET request to /llms.txt returns valid markdown
- Content includes product name, tagline, and all sitemap page links
- Response is properly cached (Cache-Control header set)
</success_criteria>

<output>
After completion, create `.planning/quick/11-create-app-llms-txt-route-ts-next-js-rou/11-SUMMARY.md`
</output>
