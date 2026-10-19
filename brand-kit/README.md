# Pearl Solutions brand kit

Two colourways, same files in each folder: `pearl/` (soft silver nacre, the website's) and `gold/`.
`backup/` keeps the earlier, more saturated pearl kit (`pearl-original/`) and the website files that used it (`site-assets/`).

| File | Use |
| --- | --- |
| `logo-mark.svg` / `logo-mark.png` | The shell on its own, transparent (PNG 2048 px wide) |
| `logo-horizontal.png` | Shell + "Pearl Solutions", transparent, 3200×900 |
| `banner-2000x1125.png` | Presentation / website banner (16:9) |
| `og-1200x630.jpg` | Link previews (Open Graph) |
| `x-header-1500x500.png` | X (Twitter) header |
| `linkedin-1584x396.png` | LinkedIn banner |
| `discord-banner-960x540.png` | Discord server banner |
| `avatar-1024.png` | Profile picture (Discord, X, LinkedIn…), safe in a circle |
| `app-icon-1024.png` | Rounded app icon, transparent corners |

Regenerate everything with `npm run brand` after editing `scripts/logo.mjs` or `scripts/build-brand.mjs`.
`npm run brand -- pearl-original` rebuilds the saturated version into `brand-kit/pearl-original/` without touching the website.
