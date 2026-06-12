# In Thorns — Site Overview

Band website for **In Thorns**, a Finnish metalcore collective from Jyväskylä. Built with Astro 6 SSR, deployed to Vercel. Two main surfaces: a public-facing homepage and a press kit (EPK) page.

---

## Stack

| Layer | Tech | Version |
|---|---|---|
| Framework | Astro (SSR) | ^6.4.6 |
| CSS | Tailwind CSS | ^4.3.0 |
| Tailwind integration | @tailwindcss/vite (Vite plugin) | ^4.3.0 |
| Deployment | Vercel (serverless) | @astrojs/vercel ^10.0.8 |
| Analytics | @vercel/analytics + @vercel/speed-insights | v2 |
| Types / validation | Zod | ^4.4.3 |
| Runtime | Node.js | >=24.0.0 (runs on v22 locally — fine) |

**No frontend framework** (React/Vue/Preact). Everything is Astro components. `@astrojs/preact` is installed but not wired into integrations and not used.

---

## Configuration files

| File | Purpose |
|---|---|
| `astro.config.mjs` | Astro config — Vite Tailwind plugin, Vercel adapter |
| `src/styles/design-system.css` | Single CSS entry point — imports Tailwind, declares `@theme`, all custom CSS |
| `tsconfig.json` | TypeScript — path alias `@/*` → `src/*` |
| `.env` | `BANDS_IN_A_TOWN_API_KEY` (not committed) |

There is **no `tailwind.config.js`** — the project was upgraded from Tailwind 3 to 4. All theme config lives in the `@theme {}` block inside `design-system.css`.

---

## Routing

```
/                      src/pages/index.astro            Homepage (SSR)
/press-kit/            src/pages/press-kit/index.astro  Electronic press kit (noindex)
/gallery/              src/pages/gallery/index.astro    Photo gallery
/gallery/[slug]/       src/pages/gallery/[slug].astro   Per-collection gallery page
/gallery/[slug]/[id]/  src/pages/gallery/[slug]/[id].astro  Single photo page
/album/[slug]/         src/pages/album/[slug].astro     Per-release page
/photos/[id]/          src/pages/photos/[id].astro      Direct photo URL
/api/events            src/pages/api/events.ts          Bandsintown proxy (serverless fn)
/privacy/              src/pages/privacy.astro          Privacy policy
```

---

## Homepage structure

Page order (v3 layout — `src/pages/index.astro`):

```
Navigation
Hero              ← band intro + wormhusk CTA
Ticker            ← scrolling marquee (tour dates + accolades)
Tour              ← live dates from Bandsintown API
Discography       ← 3-card grid (wormhusk · exit wounds · tlboacos)
PhotoStrip        ← full-bleed 4-tile photo strip → gallery
Bio               ← Pressline strip + bio text + facts grid
Contact           ← booking email + socials
Footer
```

Events are fetched **once** in `index.astro` at page level and passed as props to `Ticker` and `Tour`. Components handle empty state gracefully if the fetch fails.

---

## Component map

```
src/components/
├── navigation/navigation.astro     Sticky nav — links, mobile hamburger
├── hero/hero.astro                 Hero section — WORMHUSK headline, intro, CTAs
├── ticker/ticker.astro             Scrolling marquee strip
├── tour/tour.astro                 Tour dates section
│   └── components/events-list.astro  Renders individual date rows
├── discography/discography.astro   3-card music grid
├── photostrip/photostrip.astro     4-tile full-bleed photo strip
├── bio/bio.astro                   Bio section — pressline + prose + facts
├── contact/contact.astro           Contact section
│   └── components/social-links.astro
├── footer/footer.astro             Site footer
├── gallery/gallery.astro           Gallery section (unused on homepage in v3)
├── feature/feature.astro           Feature block (unused on homepage in v3)
├── press/press.astro               Standalone press section (unused in v3)
├── statband/statband.astro         Big-number stat band (unused in v3)
├── about/about.astro               About block (unused in v3)
├── media/media.astro               Media section (unused in v3)
├── barcode-divider.astro           Decorative divider
├── card.astro                      Generic card wrapper
├── events.astro                    Standalone events display (legacy)
├── menu.astro                      Legacy nav (superseded by navigation/)
└── social.astro                    Social icon row
```

**Note:** Several components exist from the v2 design that are no longer used on the homepage (`gallery`, `feature`, `press`, `statband`, `about`, `media`). They have not been deleted — they may be used on other pages or in future designs.

---

## Data layer

### Static data (`src/data/`)

`releases.ts` — Array of `Release` objects. Each release has:
- `slug` — used for `/album/[slug]` routing
- `type`: `'single' | 'album' | 'ep'`
- `theme`: `'wh' | 'primary' | 'secondary'` — maps to CSS modifier classes on release cards
- `cover`, `meta`, `desc`, `links` — display data

`albums.ts` — Album-specific data.

`press.ts` — Press quote data.

### Live data — Bandsintown API

`src/pages/api/events.ts` is a serverless GET endpoint:

1. Reads `BANDS_IN_A_TOWN_API_KEY` from env
2. Hits `https://rest.bandsintown.com/artists/In%20Thorns/events?app_id=<key>`
3. Validates the response with Zod (`BandsintownEventsResponseSchema`)
4. Transforms to simplified `TourEvent[]`
5. Returns JSON with `Cache-Control: s-maxage=3600, stale-while-revalidate=7200`

Supports an optional `?date=` query param that is forwarded to Bandsintown.

Types and schemas are in `src/types/bandsintown.ts`. The internal `TourEvent` type is what components consume — not the raw Bandsintown shape.

---

## Design system

**Single CSS file:** `src/styles/design-system.css` — imported by `Layout.astro`.

### Structure of design-system.css

```
@import "tailwindcss"          ← Tailwind 4 entry point
font @imports                   ← Anton, Archivo, JetBrains Mono
@theme { ... }                  ← Tailwind custom tokens (colors, fonts, animations)
@keyframes { ... }              ← Animation keyframes
@source inline("...") × 7      ← Safelist for dynamic class names
:root { ... }                   ← CSS custom properties (not Tailwind — used directly in CSS)
component styles                ← .section__head, .it-btn, .it-chip, etc.
```

### Fonts

| Variable | Font | Usage |
|---|---|---|
| `var(--it-font-display)` | Anton | All section titles, big numbers |
| `var(--it-font-body)` | Archivo | Body text, hero intro |
| `var(--it-font-mono)` | JetBrains Mono | Labels, metadata, eyebrows |

Tailwind classes: `font-display`, `font-body`, `font-mono`.

### Color tokens

Two layers — CSS custom properties (used in `design-system.css` component styles) and Tailwind classes (used in `.astro` templates).

Key CSS vars:
```
--it-orange    #FF6B35   Primary brand
--it-cream     #F5F5DC   Text on dark backgrounds
--it-ink       #0A0A0A   Near-black background
--it-black     #000
--it-wh-violet #9D52C2   Wormhusk single accent
```

Key Tailwind classes: `text-it-orange`, `bg-it-ink`, `border-it-orange`, `text-wh-violet`, etc.

`--it-orange-30` (and `20`, `50`) are rgba opacity variants used directly as CSS vars — they have no Tailwind class equivalents.

### Section heads

`.section__head` — single-column grid. The labels row (`.section__num` + `.section__sub`) renders as a flex baseline row **above** the title. Title spans full width.

This is v3 layout. In v2 the labels were in a 180px left column — do not revert.

### Buttons and chips

`.it-btn` / `.it-btn--primary` / `.it-btn--ghost` — CTA buttons  
`.it-chip` — small pill link (used in nav and release cards)

### Theming variants

The wormhusk single uses `--it-wh-violet*` tokens and a `.hero--wh` class modifier. Release cards use `release--wh`, `release--primary`, `release--secondary` modifiers.

---

## Layout and pages

### `src/layouts/Layout.astro`

Base HTML shell. Imports:
- `design-system.css` (Tailwind + all styles)
- `ClientRouter` (Astro view transitions)
- `Analytics` from `@vercel/analytics/astro`
- `SpeedInsights` from `@vercel/speed-insights/astro`

Props: `title`, `description` (optional), `noindex` (optional boolean).

### Press kit (`/press-kit/`)

Standalone page — its own sticky header, no `Navigation` component. Has `noindex: true`. All styles are scoped `<style>` within the page file (it does not use the component-based system). Sections: Quick facts → Bio (long/short/one-liner) → Line-up → Releases → Press → Photos → Downloads → Contact.

### Gallery (`/gallery/`)

Masonry CSS grid with client-side filter bar (Live / Promo / Archive) and a lightbox. Photo data is hardcoded arrays of filenames at the top of the page file. The filter and lightbox JS uses `initGallery()` re-run on `astro:page-load` to survive view transitions.

---

## Integrations

### Vercel adapter (`@astrojs/vercel` v10)

- `adapter: vercel()` — no options needed
- **`webAnalytics` was removed in v10** — analytics now via the component approach below
- API routes (`src/pages/api/`) become Vercel serverless functions automatically

### Vercel Analytics + Speed Insights

Both are rendered as Astro components in `Layout.astro`:
```astro
import Analytics from '@vercel/analytics/astro'
import SpeedInsights from '@vercel/speed-insights/astro'
```
They inject their scripts client-side. No configuration needed beyond the import.

### Tailwind CSS v4

Loaded via Vite plugin in `astro.config.mjs`:
```js
import tailwindcss from '@tailwindcss/vite'
// ...
vite: { plugins: [tailwindcss()] }
```

Entry point is `@import "tailwindcss"` at the top of `design-system.css`. Custom theme is in `@theme {}`. No `tailwind.config.js` file exists.

### Astro View Transitions

`<ClientRouter />` in `Layout.astro` enables SPA-style page transitions with a `fade` animation (`<body transition:animate='fade'>`).

---

## Assets

All in `public/`:

```
public/
├── photos/
│   ├── live/poppari_2025/     Live shots (_X2A*.webp)
│   ├── exit_wounds/           Promo shots (1–11.webp + promo.zip)
│   └── tlbocos/               Archive shots (UUID-named .webp)
├── music/
│   ├── WH SINGLE ART.png      Wormhusk artwork
│   ├── exit-wounds-cover.webp
│   └── tlboacos-album.webp
├── hero/                      Hero background images
├── favicon.svg
├── it-logo-white.png          Logo (not currently used on homepage)
├── logo.zip                   Logo download bundle (EPK)
└── candles.jpg, itbg.gif, xii_(the_death).jpg  Background images
```

Photo filenames in the gallery are hardcoded in `src/pages/gallery/index.astro`. If photos are added or removed, update that file manually.

---

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `BANDS_IN_A_TOWN_API_KEY` | Yes | Bandsintown API key — without it `/api/events` returns 500 |

Set in `.env` locally, and in Vercel project settings for production/preview.

---

## Copy accuracy — Kaaoszine accolade

The band placed **#8** (top 10) in Kaaoszine's "Newcommer of the year 2024" readers' poll. They did **not** win it (Crownshift won). The correct claim everywhere is "top 10 newcomer of the year 2024". Grep for `Newcomer` or `NCY` if you suspect stale copy.

Correct forms by location:
- Ticker: `TOP 10 NEWCOMER OF THE YEAR 2024 — KAAOSZINE`
- Pressline: `Top 10 newcomer of the year, 2024.` / `— Kaaoszine readers' poll · 5,000+ voters`
- Bio facts grid: `#8 '24` / `Newcommer of the year · Kaaoszine`
- Release desc (debut LP): `Top 10 newcomer of the year 2024 — Kaaoszine readers' poll.`

---

## Development

```bash
npm install
npm run dev       # localhost:4321
npm run build     # production build
npm run preview   # preview production build locally
```

TypeScript path alias: `@/` resolves to `src/`. Use it for all imports (`@/components/...`, `@/types/...`).

The dev server requires `BANDS_IN_A_TOWN_API_KEY` in `.env` for tour dates to load. Without it, tour/ticker components silently show empty state.

---

## Deployment

Push to the `master` branch triggers Vercel deployment automatically. The `overhaul` branch is the active feature/development branch — PRs go to `master`.

Build command: `npm run build` (Astro SSR → `.vercel/output/`).  
The Vercel adapter bundles the server entry into a single serverless function.
