// Builds the whole Pearl Solutions brand kit from scripts/logo.mjs:
// site logos and icons, banners in pearl and gold, social headers and avatars.
// Needs Google Chrome (macOS path below) and ImageMagick (`magick`). Run: npm run brand
// Pass palette names (e.g. `npm run brand -- pearl-original`) to build only those kit folders,
// without touching the website's assets.
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { MARK_BOX, standaloneSvg } from "./logo.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const CHROME = process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const tmp = mkdtempSync(join(tmpdir(), "pearl-brand-"));
const kit = join(root, "brand-kit");

const themes = {
  "pearl-original": {
    word: "linear-gradient(90deg, #ffffff 0%, #ffffff 55%, #8c9194 100%)",
    glowA: "rgba(150, 128, 126, .7)", // top-left
    glowB: "rgba(64, 140, 126, .6)", // bottom-right
    ring: "rgba(255,255,255,.22)",
    blurTint: "none",
  },
  pearl: {
    word: "linear-gradient(90deg, #ffffff 0%, #ffffff 55%, #9a9fa2 100%)",
    glowA: "rgba(160, 140, 140, .6)",
    glowB: "rgba(90, 150, 140, .45)",
    ring: "rgba(255,255,255,.2)",
    blurTint: "none",
  },
  gold: {
    word: "linear-gradient(90deg, #ffffff 0%, #ffe9c4 45%, #c9770e 100%)",
    glowA: "rgba(214, 112, 6, .85)",
    glowB: "rgba(190, 92, 0, .8)",
    ring: "rgba(255,170,60,.45)",
    blurTint: "none",
  },
};

const only = process.argv.slice(2);
const kitThemes = only.length ? only : ["pearl", "gold"];
for (const t of Object.keys(themes)) writeFileSync(join(tmp, `mark-${t}.svg`), standaloneSvg(t));
const ratio = MARK_BOX.h / MARK_BOX.w;

const page = (w, h, inner, bg = "transparent") => `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;600;700&display=block" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0}
html,body{width:${w}px;height:${h}px;background:${bg};overflow:hidden}
body{font-family:Geist,system-ui,sans-serif;position:relative;-webkit-font-smoothing:antialiased}
.lock{position:absolute;display:flex;align-items:center}
.word{white-space:nowrap;letter-spacing:-.035em;line-height:1;background-clip:text;-webkit-background-clip:text;color:transparent;padding:.08em .02em .14em}
.word b{font-weight:600}.word span{font-weight:300}
.grain{position:absolute;inset:0;opacity:.09;mix-blend-mode:overlay}
</style></head><body>${inner}</body></html>`;

// The mark with its wordmark, sized by the cap height `size`.
function lockup(theme, size, { x = "50%", y = "50%", center = true } = {}) {
  const markH = size * 1.55;
  const markW = markH / ratio;
  return `<div class="lock" style="left:${x};top:${y};gap:${size * 0.32}px;${center ? "transform:translate(-50%,-50%)" : ""}">
    <img src="mark-${theme}.svg" style="width:${markW}px;height:${markH}px">
    <div class="word" style="font-size:${size}px;background-image:${themes[theme].word}"><b>Pearl</b> <span>Solutions</span></div>
  </div>`;
}

// Dark backdrop with coloured corner light, a faint ring and two out-of-focus shells, like the original banners.
function backdrop(theme, w, h, { shells = true } = {}) {
  const t = themes[theme];
  const s = Math.min(w, h);
  const shell = (left, top, size, rot) =>
    `<img src="mark-${theme}.svg" style="position:absolute;left:${left}px;top:${top}px;width:${size}px;transform:rotate(${rot}deg);filter:blur(${size * 0.016}px) saturate(${theme === "gold" ? 1.15 : 0.9});opacity:.95">`;
  return `
    <div style="position:absolute;inset:0;background:#030303"></div>
    <div style="position:absolute;inset:0;background:radial-gradient(70% 80% at 0% 0%, ${t.glowA}, transparent 62%)"></div>
    <div style="position:absolute;inset:0;background:radial-gradient(65% 75% at 100% 100%, ${t.glowB}, transparent 64%)"></div>
    <div style="position:absolute;left:50%;top:50%;width:${s * 1.05}px;height:${s * 1.05}px;transform:translate(-36%,-50%);border-radius:50%;box-shadow:inset 0 0 0 ${Math.max(1, s * 0.002)}px ${t.ring}, 0 0 ${s * 0.05}px ${t.ring};-webkit-mask-image:linear-gradient(135deg,#000 0%,transparent 34%,transparent 62%,#000 100%);mask-image:linear-gradient(135deg,#000 0%,transparent 34%,transparent 62%,#000 100%)"></div>
    ${shells ? shell(-s * 0.06, -s * 0.5, s * 0.84, 172) + shell(w - s * 0.66, h - s * 0.3, s * 0.86, -6) : ""}
    <svg class="grain" width="${w}" height="${h}"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>`;
}

function avatar(theme, size) {
  return `${backdrop(theme, size, size, { shells: false })}
    <img src="mark-${theme}.svg" style="position:absolute;left:50%;top:52%;width:${size * 0.6}px;transform:translate(-50%,-50%)">`;
}

function tile(theme, size) {
  // Rounded app tile for favicons and touch icons.
  const t = themes[theme];
  return `<div style="position:absolute;inset:0;border-radius:${size * 0.225}px;overflow:hidden;background:#060607">
      <div style="position:absolute;inset:0;background:radial-gradient(80% 80% at 0% 0%, ${t.glowA}, transparent 70%)"></div>
      <div style="position:absolute;inset:0;background:radial-gradient(80% 80% at 100% 100%, ${t.glowB}, transparent 70%)"></div>
      <div style="position:absolute;inset:0;border-radius:inherit;box-shadow:inset 0 0 0 ${Math.max(1, size * 0.008)}px rgba(255,255,255,.14)"></div>
    </div>
    <img src="mark-${theme}.svg" style="position:absolute;left:50%;top:51%;width:${size * 0.74}px;transform:translate(-50%,-50%)">`;
}

function render(name, w, h, html, out, { transparent = false } = {}) {
  const file = join(tmp, `${name}.html`);
  writeFileSync(file, html);
  mkdirSync(dirname(out), { recursive: true });
  const shot = join(tmp, `${name}.png`);
  execFileSync(CHROME, [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--allow-file-access-from-files",
    "--virtual-time-budget=6000",
    ...(transparent ? ["--default-background-color=00000000"] : []),
    `--window-size=${w},${h}`,
    `--screenshot=${shot}`,
    `file://${file}`,
  ], { stdio: "ignore" });
  const args = [shot, "-strip"];
  if (out.endsWith(".jpg")) args.push("-background", "#000", "-flatten", "-quality", "88");
  if (out.endsWith(".webp")) args.push("-quality", "92", "-define", "webp:alpha-quality=100");
  execFileSync("magick", [...args, out]);
  console.log("✓", out.replace(root + "/", ""));
}

const markPage = (theme, w) => page(w, Math.round(w * ratio), `<img src="mark-${theme}.svg" style="width:${w}px;display:block">`);

for (const theme of kitThemes) {
  const k = (p) => join(kit, theme, p);
  mkdirSync(join(kit, theme), { recursive: true });
  writeFileSync(k("logo-mark.svg"), standaloneSvg(theme));
  render(`mark-${theme}`, 2048, Math.round(2048 * ratio), markPage(theme, 2048), k("logo-mark.png"), { transparent: true });
  render(`lock-${theme}`, 3200, 900, page(3200, 900, lockup(theme, 320)), k("logo-horizontal.png"), { transparent: true });
  render(`banner-${theme}`, 2000, 1125, page(2000, 1125, backdrop(theme, 2000, 1125) + lockup(theme, 150)), k("banner-2000x1125.png"));
  render(`og-${theme}`, 1200, 630, page(1200, 630, backdrop(theme, 1200, 630) + lockup(theme, 92)), k("og-1200x630.jpg"));
  render(`x-${theme}`, 1500, 500, page(1500, 500, backdrop(theme, 1500, 500) + lockup(theme, 92)), k("x-header-1500x500.png"));
  render(`li-${theme}`, 1584, 396, page(1584, 396, backdrop(theme, 1584, 396) + lockup(theme, 76, { x: "58%" })), k("linkedin-1584x396.png"));
  render(`dc-${theme}`, 960, 540, page(960, 540, backdrop(theme, 960, 540) + lockup(theme, 72)), k("discord-banner-960x540.png"));
  render(`av-${theme}`, 1024, 1024, page(1024, 1024, avatar(theme, 1024)), k("avatar-1024.png"));
  render(`tile-${theme}`, 1024, 1024, page(1024, 1024, tile(theme, 1024)), k("app-icon-1024.png"), { transparent: true });
}

if (only.length) {
  rmSync(tmp, { recursive: true, force: true });
  process.exit(0);
}

// Site assets (pearl theme).
const pub = (p) => join(root, "public", "brand", p);
writeFileSync(pub("pearl-mark.svg"), standaloneSvg("pearl"));
render("site-mark", 864, Math.round(864 * ratio), markPage("pearl", 864), pub("pearl-glass.webp"), { transparent: true });
render("site-mark-sm", 144, Math.round(144 * ratio), markPage("pearl", 144), pub("pearl-glass-sm.webp"), { transparent: true });
render("site-tile", 384, 384, page(384, 384, tile("pearl", 384)), pub("pearl-glass-tile.webp"), { transparent: true });
render("site-avatar", 256, 256, page(256, 256, avatar("pearl", 256)), pub("pearl-avatar.png"));
render("site-apple", 180, 180, page(180, 180, tile("pearl", 180)), join(root, "app", "apple-icon.png"), { transparent: true });
render("site-og", 1200, 630, page(1200, 630, backdrop("pearl", 1200, 630) + lockup("pearl", 92)), join(root, "app", "opengraph-image.jpg"));
render("site-tw", 1200, 630, page(1200, 630, backdrop("pearl", 1200, 630) + lockup("pearl", 92)), join(root, "app", "twitter-image.jpg"));
for (const s of [16, 32, 48]) render(`fav-${s}`, s, s, page(s, s, tile("pearl", s)), join(tmp, `fav-${s}.png`), { transparent: true });
execFileSync("magick", [16, 32, 48].map((s) => join(tmp, `fav-${s}.png`)).concat(join(root, "app", "favicon.ico")));
console.log("✓ app/favicon.ico");

// SVG favicon: the mark on its tile.
const tileSvg = standaloneSvg("pearl").replace(
  /<svg([^>]*)viewBox="([^"]+)"([^>]*)>/,
  (_, a, vb, b) => {
    const [x, y, w, h] = vb.split(" ").map(Number);
    const side = Math.max(w, h) * 1.3;
    const cx = x + w / 2;
    const cy = y + h / 2;
    const vx = cx - side / 2;
    const vy = cy - side / 2;
    return `<svg${a}viewBox="${vx} ${vy} ${side} ${side}"${b}><rect x="${vx}" y="${vy}" width="${side}" height="${side}" rx="${side * 0.225}" fill="#0b0c0d"/>`;
  },
);
writeFileSync(join(root, "app", "icon.svg"), tileSvg);
console.log("✓ app/icon.svg");

rmSync(tmp, { recursive: true, force: true });
