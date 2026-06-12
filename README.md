<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="public/it-logo-white.png">
    <img src="public/it-logo.png" alt="In Thorns" width="360">
  </picture>
</div>

# in-thorns.com

Official website for **In Thorns** — a Finnish metalcore collective from Jyväskylä.

The site serves as the band's primary online presence: latest single, tour dates, photo gallery, biography, and a full electronic press kit for media and promoters.

## Stack

- **[Astro](https://astro.build)** — SSR, file-based routing, serverless API routes
- **[Tailwind CSS](https://tailwindcss.com)** — utility-first styling
- **[Vercel](https://vercel.com)** — hosting and edge deployment
- **[Bandsintown API](https://bandsintown.com)** — live tour date sync

## Pages

| Route | Description |
|---|---|
| `/` | Homepage — single, tour dates, gallery, bio, booking |
| `/press-kit` | Electronic press kit — bio, members, releases, press photos, downloads |
| `/contact` | Booking and contact |

## Development

```bash
npm install
npm run dev       # localhost:4321
npm run build
npm run preview
```

## Environment variables

```
BANDS_IN_A_TOWN_API_KEY=   # Bandsintown API key for tour date sync
```

Create a `.env` file at the root with the above, or set it in your Vercel project settings.
