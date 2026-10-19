# Pearl Solutions website

Next.js 16 (App Router), TypeScript, CSS Modules. No UI framework.

## Run

```bash
npm install --no-bin-links   # the USB drive is exFAT, which has no symlinks
npm run dev                  # http://localhost:3000
npm run build && npm start          # production (what Vercel runs)
npm run build:usb && npm run start:usb   # local production test from the USB drive
```

`npm run dev`, `build:usb` and `start:usb` set `NEXT_IMAGE_UNOPTIMIZED=1`: on exFAT, macOS writes `._*` files into
Next's image cache and breaks it. For the same reason Turbopack's on-disk cache is turned off in
`next.config.ts`; if the dev server ever reports "Failed to open database", delete `.next/` and restart.
Hosting (Vercel) is not affected.

## Configure

- `lib/site.ts`: company details, hosts (Vercel, OVH), services, FAQ.
- `.env.local`: `DISCORD_WEBHOOK_URL=` receives contact-form submissions (see `.env.example`).
  On Vercel, add the same variable in Project → Settings → Environment Variables.
- Logo and brand kit: `scripts/logo.mjs` draws the mark (pearl and gold palettes);
  `npm run brand` regenerates `brand-kit/`, the site logos, favicons and share images
  (needs Google Chrome and ImageMagick). Original logos are in `brand-source/`.

## SEO

Per-page metadata and canonicals, Open Graph/Twitter image, `sitemap.xml`, `robots.txt`, web manifest,
JSON-LD (ProfessionalService, WebSite, Service, BreadcrumbList, FAQPage), descriptive alt text on every image.
