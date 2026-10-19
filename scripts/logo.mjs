// The Pearl Solutions shell mark as SVG, rebuilt from the original logo's geometry
// (fanned petals that touch, flat base, a pearl at the hinge) with a liquid-glass finish.
// Coordinates are those of the original 1932px artwork.

const P = { x: 962, y: 1300, r: 200 }; // the pearl
const f = (n) => Math.round(n * 10) / 10;
const rad = (deg) => (deg * Math.PI) / 180;
const pt = (a, d) => [P.x + Math.cos(rad(a)) * d, P.y - Math.sin(rad(a)) * d];

// Fanned petals between two radial edges (degrees, 90 = up). Each ends in a round cap that is
// tangent to both edges, so the straight sides flow into the curve without a corner.
const fan = [
  { a1: 135, a2: 164, d: 520, kind: "nacre" }, // left
  { a1: 105.6, a2: 135, d: 588, kind: "white" }, // upper left
  { a1: 74.4, a2: 105.6, d: 680, kind: "nacre" }, // top
  { a1: 45, a2: 74.4, d: 588, kind: "white" }, // upper right
  { a1: 16, a2: 45, d: 520, kind: "nacre" }, // right
];

function fanPath({ a1, a2, d }) {
  // A hair of overlap so neighbouring petals never show an anti-aliasing seam.
  const e1 = a1 - 0.25;
  const e2 = a2 + 0.25;
  const h = rad((e2 - e1) / 2);
  const mid = (a1 + a2) / 2;
  // Keep the tip where the original's tip was, then fit the largest circle tangent to both edges.
  const tipDist = d * (1 + Math.tan(rad((a2 - a1) / 2)));
  const D = tipDist / (1 + Math.sin(h)); // distance of the cap centre
  const r = D * Math.sin(h);
  const t = D * Math.cos(h); // tangent points along each edge
  const [x1, y1] = pt(e1, t);
  const [x2, y2] = pt(e2, t);
  return {
    d: `M${P.x} ${P.y}L${f(x1)} ${f(y1)}A${f(r)} ${f(r)} 0 1 0 ${f(x2)} ${f(y2)}Z`,
    tip: pt(mid, tipDist),
    mid,
  };
}

// The two lower petals: a radial top edge that runs tangent into a round end, then a flat base.
function lowerPath(side) {
  const left = side === "left";
  const a = left ? 164 : 16;
  const u = [Math.cos(rad(a)), -Math.sin(rad(a))];
  const down = left ? [u[1], -u[0]] : [-u[1], u[0]]; // normal pointing below the edge
  const along = 397; // where the edge meets the round end
  const r = 118;
  const T = [P.x + u[0] * along, P.y + u[1] * along];
  const C = [T[0] + down[0] * r, T[1] + down[1] * r];
  const bottom = [C[0], C[1] + r];
  const base = [left ? P.x - 122 : P.x + 122, bottom[1]];
  const sweep = left ? 0 : 1;
  return {
    d: `M${P.x} ${P.y - 4}L${f(T[0])} ${f(T[1])}A${r} ${r} 0 1 ${sweep} ${f(bottom[0])} ${f(bottom[1])}L${f(base[0])} ${f(base[1])}Z`,
    tip: [C[0] + (left ? -r : r), C[1]],
    mid: left ? 180 : 0,
  };
}

export const palettes = {
  "pearl-original": {
    white: ["#ffffff", "#f4f6f7", "#cfd4d8"],
    nacre: ["#8ff3dc", "#f2faf8", "#ffc1c8"],
    base: "#3f474b",
    pearl: ["#ffffff", "#effdf9", "#a9eee2", "#e9b3bc", "#4b5b60"],
    tintA: "#7ff5ee",
    tintB: "#ff9fae",
    rim: ["#ffffff", "#bff7ec", "#ffd3d6"],
  },
  // The main pearl: lighter mint and pink. "pearl-original" is the earlier, more saturated one.
  pearl: {
    white: ["#ffffff", "#f6f8f9", "#d6dade"],
    nacre: ["#c8f7ec", "#f8fcfb", "#ffdce0"],
    base: "#3f474b",
    pearl: ["#ffffff", "#f7fefc", "#d2f6ef", "#f2d4d9", "#5d6b70"],
    tintA: "#b2f6ef",
    tintB: "#ffc4cd",
    tintOpacity: [0.45, 0.4],
    rim: ["#ffffff", "#ddfaf4", "#ffe6e8"],
  },
  gold: {
    white: ["#fff6e6", "#ffdca0", "#eda345"],
    nacre: ["#ffc463", "#fff0d6", "#ea962c"],
    base: "#9a4c00",
    pearl: ["#ffffff", "#fff2dc", "#f8c877", "#d47d12", "#6a3600"],
    tintA: "#ffd27a",
    tintB: "#ffb04a",
    rim: ["#ffffff", "#ffe2b0", "#ffc46b"],
  },
};

export function markSvg({ palette = "pearl", id = "pm" } = {}) {
  const c = palettes[palette];
  const defs = [];
  const body = [];
  const petals = [lowerPath("left"), lowerPath("right"), ...fan.map((p) => ({ ...fanPath(p), kind: p.kind }))];
  petals[0].kind = "white";
  petals[1].kind = "white";

  defs.push(`
    <filter id="${id}-soft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="9"/></filter>
    <filter id="${id}-softer" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="28"/></filter>
    <radialGradient id="${id}-pearl" cx=".4" cy=".34" r=".72">
      <stop offset="0" stop-color="${c.pearl[0]}"/>
      <stop offset=".35" stop-color="${c.pearl[1]}"/>
      <stop offset=".64" stop-color="${c.pearl[2]}"/>
      <stop offset=".86" stop-color="${c.pearl[3]}"/>
      <stop offset="1" stop-color="${c.pearl[4]}"/>
    </radialGradient>
    <radialGradient id="${id}-tintB" cx=".8" cy=".2" r=".6"><stop offset="0" stop-color="${c.tintB}" stop-opacity="${c.tintOpacity?.[1] ?? 0.7}"/><stop offset="1" stop-color="${c.tintB}" stop-opacity="0"/></radialGradient>
    <radialGradient id="${id}-tintA" cx=".16" cy=".3" r=".55"><stop offset="0" stop-color="${c.tintA}" stop-opacity="${c.tintOpacity?.[0] ?? 0.75}"/><stop offset="1" stop-color="${c.tintA}" stop-opacity="0"/></radialGradient>
    <linearGradient id="${id}-rim" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${c.rim[0]}" stop-opacity=".95"/>
      <stop offset=".5" stop-color="${c.rim[1]}" stop-opacity=".25"/>
      <stop offset="1" stop-color="${c.rim[2]}" stop-opacity=".7"/>
    </linearGradient>
    <clipPath id="${id}-pc"><circle cx="${P.x}" cy="${P.y}" r="${P.r}"/></clipPath>
  `);

  petals.forEach((p, i) => {
    const pid = `${id}-p${i}`;
    const [tx, ty] = p.tip;
    const across = rad(p.mid + 90);
    const [ax, ay] = [Math.cos(across) * 240, -Math.sin(across) * 240];
    defs.push(`<clipPath id="${pid}c"><path d="${p.d}"/></clipPath>`);
    if (p.kind === "white") {
      defs.push(`<linearGradient id="${pid}f" gradientUnits="userSpaceOnUse" x1="${f(tx)}" y1="${f(ty)}" x2="${P.x}" y2="${P.y}">
        <stop offset="0" stop-color="${c.white[0]}"/><stop offset=".55" stop-color="${c.white[1]}"/><stop offset="1" stop-color="${c.white[2]}"/></linearGradient>`);
    } else {
      // Iridescent petals shift from one tint to the other across their width.
      const cx = (tx + P.x) / 2;
      const cy = (ty + P.y) / 2;
      defs.push(`<linearGradient id="${pid}f" gradientUnits="userSpaceOnUse" x1="${f(cx + ax)}" y1="${f(cy + ay)}" x2="${f(cx - ax)}" y2="${f(cy - ay)}">
        <stop offset="0" stop-color="${c.nacre[0]}"/><stop offset=".5" stop-color="${c.nacre[1]}"/><stop offset="1" stop-color="${c.nacre[2]}"/></linearGradient>`);
    }
    // Depth: each petal darkens as it folds into the hinge.
    defs.push(`<linearGradient id="${pid}s" gradientUnits="userSpaceOnUse" x1="${P.x}" y1="${P.y}" x2="${f(tx)}" y2="${f(ty)}">
      <stop offset=".25" stop-color="${c.base}" stop-opacity=".22"/><stop offset=".7" stop-color="${c.base}" stop-opacity="0"/></linearGradient>`);
    body.push(`<g>
      <path d="${p.d}" fill="url(#${pid}f)"/>
      <path d="${p.d}" fill="url(#${pid}s)"/>
      <g clip-path="url(#${pid}c)">
        <path d="${p.d}" fill="none" stroke="#fff" stroke-width="22" opacity=".42" filter="url(#${id}-soft)"/>
      </g>
      <path d="${p.d}" fill="none" stroke="url(#${id}-rim)" stroke-width="2.5" stroke-linejoin="round" opacity=".45"/>
    </g>`);
  });

  // One shadow for the whole shell, cast by the pearl: deepest at its edge, fading out on an
  // eased curve so there is no visible ring or seam between petals.
  const R = P.r * 2.7;
  const shade = [
    [0.35, 0.62],
    [0.4, 0.5],
    [0.46, 0.39],
    [0.53, 0.29],
    [0.61, 0.2],
    [0.7, 0.12],
    [0.8, 0.06],
    [0.9, 0.02],
    [1, 0],
  ];
  defs.push(`<clipPath id="${id}-shell">${petals.map((p) => `<path d="${p.d}"/>`).join("")}</clipPath>
    <radialGradient id="${id}-shade" gradientUnits="userSpaceOnUse" cx="${P.x}" cy="${P.y + 18}" r="${R}">
      ${shade.map(([o, a]) => `<stop offset="${o}" stop-color="${c.base}" stop-opacity="${a}"/>`).join("")}
    </radialGradient>`);
  body.push(`<rect x="${P.x - R}" y="${P.y - R}" width="${2 * R}" height="${2 * R}" fill="url(#${id}-shade)" clip-path="url(#${id}-shell)"/>`);

  // The pearl: a glossy sphere in front of the hinge.
  body.push(`<g>
    <circle cx="${P.x}" cy="${P.y}" r="${P.r}" fill="url(#${id}-pearl)"/>
    <g clip-path="url(#${id}-pc)">
      <circle cx="${P.x}" cy="${P.y}" r="${P.r}" fill="url(#${id}-tintB)"/>
      <circle cx="${P.x}" cy="${P.y}" r="${P.r}" fill="url(#${id}-tintA)"/>
      <ellipse cx="${P.x - 62}" cy="${P.y - 86}" rx="86" ry="52" fill="#fff" opacity=".9" filter="url(#${id}-soft)" transform="rotate(-28 ${P.x - 62} ${P.y - 86})"/>
      <circle cx="${P.x - 80}" cy="${P.y - 98}" r="16" fill="#fff"/>
      <circle cx="${P.x}" cy="${P.y}" r="${P.r - 6}" fill="none" stroke="#fff" stroke-width="18" opacity=".3" filter="url(#${id}-soft)"/>
      <path d="M${P.x - 132} ${P.y + 112}A170 170 0 0 0 ${P.x + 142} ${P.y + 100}" fill="none" stroke="#fff" stroke-width="12" opacity=".65" filter="url(#${id}-soft)"/>
    </g>
    <circle cx="${P.x}" cy="${P.y}" r="${P.r - 2}" fill="none" stroke="url(#${id}-rim)" stroke-width="4"/>
  </g>`);

  return { defs: defs.join(""), body: body.join("") };
}

// Bounding box of the mark in artwork coordinates.
export const MARK_BOX = { x: 357, y: 408, w: 1210, h: 1112 };

export function standaloneSvg(palette = "pearl") {
  const { defs, body } = markSvg({ palette, id: palette });
  const b = MARK_BOX;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${b.x} ${b.y} ${b.w} ${b.h}"><title>Pearl Solutions</title><defs>${defs}</defs>${body}</svg>\n`;
}
