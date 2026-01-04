# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the website for In Thorns, a Finnish metal band. The site is built with Astro using server-side rendering (SSR) and deployed to Vercel. The main features include tour date display (fetched from Bandsintown API), press kit, and contact information.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (localhost:4321)
npm run dev
# or
npm start

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run Astro CLI commands
npm run astro -- <command>
```

## Architecture

### Framework Configuration
- **Astro 5.x** with SSR mode (`output: 'server'`)
- **Vercel serverless adapter** for deployment
- **Tailwind CSS** for styling
- **TypeScript** with strict mode and path aliases (`@/*` → `src/*`)
- **Preact** integration for JSX support (though currently only using Astro components)

### Project Structure
```
src/
├── pages/              # File-based routing
│   ├── index.astro    # Homepage with tour dates
│   ├── contact/       # Contact page
│   ├── press-kit/     # Press kit/bio page
│   └── api/           # API endpoints (serverless functions)
│       └── events.ts  # Bandsintown API proxy
├── components/        # Astro components
│   ├── events.astro   # Tour dates display component
│   ├── menu.astro     # Navigation menu
│   ├── social.astro   # Social media links
│   └── card.astro     # Content card wrapper
├── layouts/
│   └── Layout.astro   # Base HTML layout
└── types/
    └── bandsintown.ts # Zod schemas and TypeScript types
```

### API Integration Pattern

The site uses a proxy pattern for external API calls:

1. **API Endpoint** (`src/pages/api/events.ts`): Server-side endpoint that fetches from Bandsintown API
   - Reads `BANDS_IN_A_TOWN_API_KEY` from environment variables
   - Validates responses using Zod schemas from `src/types/bandsintown.ts`
   - Transforms Bandsintown response into simplified `TourEvent` format
   - Sets cache headers (`s-maxage=3600, stale-while-revalidate=7200`)
   - Returns typed `TourEventsAPIResponse` with success/error handling

2. **Component** (`src/components/events.astro`): Fetches from `/api/events` during SSR
   - Accepts optional `limit` prop to control number of events shown
   - Handles loading and error states
   - Only renders if no errors occurred (uses `{!error && ...}` pattern)

### Type Safety with Zod

The codebase uses Zod for runtime validation of external API responses:
- Schemas defined in `src/types/bandsintown.ts`
- Types inferred from schemas using `z.infer<typeof Schema>`
- Separate internal types (e.g., `TourEvent`) simplified for frontend consumption
- All API responses follow `{ success: boolean, data?: T, error?: string }` pattern

### Styling Approach

- Tailwind utility classes for all styling
- Custom font setup: body uses inline `font-family: simsun, times, serif` override
- Consistent page layout: full-screen main with border, background image overlay
- Mobile-first responsive design with `sm:`, `md:` breakpoints

### Environment Variables

Required in `.env` (or Vercel environment):
- `BANDS_IN_A_TOWN_API_KEY`: API key for Bandsintown integration

### Common Patterns

**Page Structure:**
```astro
---
import Layout from '@/layouts/Layout.astro'
import Menu from '@/components/menu.astro'
---

<Layout title='Page Title'>
  <main class='m-4 border-white text-white border-2 flex flex-grow flex-col w-auto h-auto bg-no-repeat bg-center bg-cover bg-opacity-50 relative'
    style='background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(candles.jpg);'>
    <Menu />
    <section class='flex flex-col gap-4 px-4 w-full h-auto flex-grow justify-center items-center'>
      <!-- Page content -->
    </section>
  </main>
</Layout>
```

**TypeScript Import Aliases:**
- Use `@/` prefix for all src imports (e.g., `@/components/menu.astro`, `@/types/bandsintown`)

### Deployment

- Deployed to Vercel using `@astrojs/vercel/serverless` adapter
- Node.js version requirement: `>=20.0.0` (set in package.json engines)
- API routes become serverless functions
- Static assets served from `public/` directory
