/**
 * llms.txt Route Handler
 *
 * Serves a markdown document at /llms.txt following the llmstxt.org specification.
 * This provides LLM-readable site information for AI crawlers and assistants.
 *
 * @see https://llmstxt.org/
 */

// Base URL from environment with production fallback
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://drivecommand.co'

export async function GET() {
  const content = `# DriveCommand

> Fleet management software for trucking companies. Miles Ahead.

DriveCommand is an all-in-one fleet management platform built specifically for independent owner-operators, small carriers, and growing trucking fleets. It consolidates dispatch, GPS tracking, driver payroll, invoicing, and DOT compliance into a single system—eliminating spreadsheets, phone tag, and disconnected tools.

## Target Audience

- Independent owner-operators running 1-10 trucks
- Small to mid-size carriers scaling their fleet
- Dispatchers managing loads and driver assignments
- Fleet managers tracking performance and compliance

## Core Features

### Dispatch & Loads
Book loads, assign drivers, and track delivery status in one board. Drag-and-drop load assignment, real-time status updates (dispatched, in-transit, delivered), automatic ETA calculations based on live traffic, and broker integration for rate confirmations.

### Live GPS Tracking
See every truck on a live map with 30-second updates. Geofencing alerts for pickup/delivery locations, route deviation notifications, historical route playback for dispute resolution, and driver ETA sharing with customers via link.

### Driver & Payroll
Log hours, calculate per-mile pay, and run payroll from the same place where you track loads. Supports per-mile, percentage, or flat-rate pay. Automatic deductions for advances and fuel cards. Digital pay stubs via driver app. Works for both 1099 and W-2 drivers.

### Invoicing
Generate invoices the moment a POD is uploaded. Customizable templates with your branding. Automated payment reminders at 30/60/90 days. QuickBooks integration. Aging reports and receivables dashboard.

### Compliance & Safety
HOS violation alerts before they happen. IFTA mileage reports generated from GPS data. License, registration, and insurance expiration tracking. Pre-trip inspection checklists with photo capture. One-click audit packages for DOT reviews.

### AI Tools
Smart driver matching based on location and deadhead. Late load predictions with proactive alerts. Auto-drafted rate confirmations and BOLs. Natural language search across all your data.

## Pricing

- **Starter**: $29/truck/month — GPS tracking, dispatch, driver portal, invoicing, basic reports
- **Growth** (Most Popular): $49/truck/month — Everything in Starter plus maintenance scheduling, document storage, fuel analytics, safety analytics, driver payroll
- **Enterprise**: Custom pricing — API access, custom integrations, dedicated account manager, SLA guarantee, SSO, 24/7 support

All plans include unlimited trucks. No per-seat fees. Annual billing saves ~17%.

## Pages

- [Home](${BASE_URL}/): Product overview, feature highlights, interactive demo, and pricing calculator
- [Pricing](${BASE_URL}/pricing): Detailed plan comparison, feature matrix, and cost calculator
- [Demo](${BASE_URL}/demo): Interactive product walkthrough
- [Contact](${BASE_URL}/contact): Request early access or talk to sales
- [About](${BASE_URL}/about): Company mission and team information

## Technical Details

- Web-based platform accessible from any device
- Mobile-friendly driver portal
- Real-time GPS with 30-second update intervals
- Integrations: QuickBooks, broker load boards
- API access available on Enterprise plan
`

  return new Response(content, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
