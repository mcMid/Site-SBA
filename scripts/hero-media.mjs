// Génère les visuels du hero :
//   public/hero/site.webp  — maquette de site (1600×1000) qui s'ouvre au défilement
//   public/hero/bg.webp    — mosaïque des cartes métiers, en fond
// Décoratifs, sans nom d'entreprise. Usage : node scripts/cards.mjs && node scripts/hero-media.mjs
import sharp from 'sharp';
import { mkdirSync, readdirSync, readFileSync } from 'node:fs';

// Prix d'entrée lu dans l'offre, comme scripts/og.mjs : l'image ne peut pas
// annoncer un autre prix que le site. Relancer ce script après un changement de prix.
const offre = readFileSync(new URL('../src/config/offre.ts', import.meta.url), 'utf8');
const minPrice = Math.min(...[...offre.matchAll(/^\s{4}price:\s*(\d+),/gm)].map((m) => Number(m[1])));
const chf = (n) => n.toLocaleString('fr-CH').replace(/[’']/g, ' ');

const ROOT = new URL('../public/', import.meta.url).pathname;
mkdirSync(`${ROOT}hero`, { recursive: true });

const SERIF = 'Helvetica Neue, Arial, sans-serif'; // titres en grotesque gras, comme le site
const SANS = 'Helvetica, Arial, sans-serif';
const W = 1600, H = 1000;
const c = { bg: '#eef2f8', ink: '#101a2e', accent: '#2f6fe4', wood1: '#2f5fa8', wood2: '#0c1a33' };

// Composition centrée : en format portrait (début de l'animation), c'est le
// centre du haut de page qui reste visible.
const bar = (x, y, w, o = 0.3, col = c.ink) => `<rect x="${x}" y="${y}" width="${w}" height="8" rx="4" fill="${col}" opacity="${o}"/>`;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="wood" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c.wood1}"/><stop offset="1" stop-color="${c.wood2}"/></linearGradient>
    <linearGradient id="shade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".15"/><stop offset="1" stop-color="#000" stop-opacity=".65"/></linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="${c.bg}"/>
  <!-- photo plein cadre -->
  <rect width="${W}" height="690" fill="url(#wood)"/>
  ${Array.from({ length: 18 }, (_, i) => `<path d="M0 ${40 + i * 38} C 400 ${20 + i * 38}, 1200 ${70 + i * 38}, 1600 ${35 + i * 38}" stroke="#000" stroke-opacity=".07" stroke-width="3" fill="none"/>`).join('')}
  <circle cx="1180" cy="210" r="120" fill="#fff" opacity=".08"/>
  <rect width="${W}" height="690" fill="url(#shade)"/>
  <!-- navigation -->
  <rect x="80" y="48" width="34" height="34" rx="8" fill="${c.accent}"/>
  ${[0, 1, 2, 3].map((i) => bar(1060 + i * 110, 60, 80, 0.7, '#fff')).join('')}
  <!-- titre centré -->
  <text x="800" y="330" text-anchor="middle" font-family="${SERIF}" font-weight="700" letter-spacing="-4" font-size="104" fill="#fff">Sur mesure</text>
  <text x="800" y="440" text-anchor="middle" font-family="${SERIF}" font-weight="700" letter-spacing="-4" font-size="104" fill="#9cc4ff">en 10 jours.</text>
  <text x="800" y="505" text-anchor="middle" font-family="${SANS}" font-size="28" fill="#fff" opacity=".85">Design, mise en ligne et corrections compris. Prix fixe, dès ${chf(minPrice)} CHF.</text>
  <!-- bouton : posé en HTML par-dessus l'image (.xh-cta), à x 660–940, y 560–624 -->
  <!-- trois services -->
  ${[0, 1, 2].map((i) => {
    const x = 80 + i * 490;
    return `<rect x="${x}" y="740" width="460" height="220" rx="14" fill="#fff"/>
      <rect x="${x + 32}" y="772" width="54" height="54" rx="12" fill="${c.accent}" opacity=".18"/>
      <text x="${x + 32}" y="872" font-family="${SERIF}" font-weight="700" letter-spacing="-1" font-size="34" fill="${c.ink}">${['Design sur mesure', 'Mise en ligne', 'Hébergement offert'][i]}</text>
      ${bar(x + 32, 898, 360)}${bar(x + 32, 918, 290)}`;
  }).join('')}
</svg>`;
await sharp(Buffer.from(svg)).webp({ quality: 80 }).toFile(`${ROOT}hero/site.webp`);

// Fond : grille des cartes, légèrement tournée, comme un mur de sites.
const cards = readdirSync(`${ROOT}cards`).filter((f) => f.endsWith('.webp')).sort();
const cw = 216, ch = 300, gap = 28, cols = 9, rows = 4;
const tiles = await Promise.all(
  Array.from({ length: cols * rows }, async (_, i) => ({
    input: await sharp(`${ROOT}cards/${cards[(i * 3) % cards.length]}`).resize(cw, ch).png().toBuffer(),
    left: (i % cols) * (cw + gap) + ((Math.floor(i / cols) % 2) * (cw / 2)),
    top: Math.floor(i / cols) * (ch + gap),
  })),
);
const mw = cols * (cw + gap) + cw, mh = rows * (ch + gap);
const mosaic = await sharp({ create: { width: mw, height: mh, channels: 3, background: '#0b0c0e' } }).composite(tiles).png().toBuffer();
await sharp(mosaic)
  .rotate(-8, { background: '#0b0c0e' })
  .resize(1920, 1080, { fit: 'cover' })
  .blur(1.2)
  .webp({ quality: 62 })
  .toFile(`${ROOT}hero/bg.webp`);

console.log('public/hero/site.webp, public/hero/bg.webp');
