# DriveCommand Marketing Website

Marketing website for DriveCommand — fleet management software built for independent operators and growing trucking fleets.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Animation**: Motion (Framer Motion v12)
- **UI Components**: Radix UI (Dialog)
- **Icons**: Lucide React
- **Validation**: Zod

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd drivecommand-website

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_DEMO_VIDEO_URL` | No | YouTube/Vimeo embed URL for demo video. If unset, displays an animated loads table mockup. |

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage (landing page)
│   ├── about/             # About page
│   ├── contact/           # Contact form with Server Action
│   ├── demo/              # Interactive demo walkthrough
│   └── pricing/           # Pricing comparison + calculator
├── components/
│   ├── layout/            # Navbar, footer, mobile menu
│   ├── sections/          # Landing page sections
│   └── shared/            # Reusable components
└── lib/
    ├── pricing.config.ts  # Single source of truth for pricing
    └── utils.ts           # Utility functions (cn helper)
```

## Key Features

- **Pricing Calculator**: Interactive calculator pulling rates from `lib/pricing.config.ts`
- **Interactive Demo**: 5-step walkthrough showing a day in fleet operations
- **Contact Form**: Server Action with Zod validation and toast feedback
- **Responsive Design**: Mobile-first, tested from 320px to 1440px+
- **Performance Optimized**: Lighthouse scores — Performance: 96+, Accessibility: 96+

## Deployment

The site is built as static pages and can be deployed to any static hosting:

```bash
npm run build
# Output in .next/ directory
```

For Vercel:
```bash
vercel
```

## CTA Routing

| Button | Destination |
|--------|-------------|
| Start Free Trial | `https://app.drivecommand.com/sign-up` |
| Sign In | `https://app.drivecommand.com/sign-in` |
| Watch the Demo | `#demo-video` (scroll) |
| Contact Sales / Enterprise | `/contact` |

## License

Private — All rights reserved.
