// Génère les cartes du couloir (public/cards/*.webp) : des maquettes de sites
// pour les métiers de nos clients. Décoratives, sans nom d'entreprise : ce ne
// sont pas des réalisations et elles ne doivent pas le laisser croire.
// Usage : node scripts/cards.mjs
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const W = 360, H = 500;
const OUT = new URL('../public/cards/', import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });

const SERIF = 'Helvetica Neue, Arial, sans-serif';

// Chaque métier : palette, titre, et une mise en page parmi trois.
const trades = [
  { slug: 'boulangerie', bg: '#eef3fa', ink: '#14243d', accent: '#2f6fe4', photo: ['#9ec0ea', '#3a5f94'], title: ['Pain au levain,', 'depuis l’aube.'], layout: 'split' },
  { slug: 'physio', bg: '#eef4f3', ink: '#123c3a', accent: '#1f8a7d', photo: ['#9fd0c8', '#3f8f86'], title: ['Physiothérapie', 'à Lausanne'], layout: 'stack' },
  { slug: 'menuiserie', bg: '#0f1622', ink: '#e6edf7', accent: '#5aa2ff', photo: ['#35557f', '#101b2c'], title: ['Bois massif,', 'sur mesure.'], layout: 'full' },
  { slug: 'avocat', bg: '#f5f3ee', ink: '#14213d', accent: '#14213d', photo: ['#c9ced8', '#6b7688'], title: ['Étude', 'd’avocats'], layout: 'stack' },
  { slug: 'restaurant', bg: '#0d1530', ink: '#e3e9f8', accent: '#6f8dff', photo: ['#2e3f8f', '#0b1233'], title: ['Cuisine du', 'marché'], layout: 'full' },
  { slug: 'fleuriste', bg: '#fbeef0', ink: '#4a1f33', accent: '#d6477a', photo: ['#f2a7bd', '#b44d78'], title: ['Fleurs de', 'saison'], layout: 'split' },
  { slug: 'garage', bg: '#111214', ink: '#f2f2f0', accent: '#4fb3ff', photo: ['#4b4f57', '#1b1d21'], title: ['Garage', 'toutes marques'], layout: 'full' },
  { slug: 'architecte', bg: '#e9e9e6', ink: '#1a1a1a', accent: '#1a1a1a', photo: ['#bcbcb6', '#6d6d68'], title: ['Architecture', '&amp; rénovation'], layout: 'split' },
  { slug: 'coiffure', bg: '#eceff4', ink: '#1f2733', accent: '#4a6b9a', photo: ['#b7c4d8', '#5c6f8c'], title: ['Salon de', 'coiffure'], layout: 'stack' },
  { slug: 'vigneron', bg: '#eef1f6', ink: '#152238', accent: '#27549e', photo: ['#8fa9cf', '#2c4670'], title: ['Domaine', 'viticole'], layout: 'full' },
];

const photo = (id, [a, b], x, y, w, h, r = 6) => `
  <defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs>
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="url(#${id})"/>
  <circle cx="${x + w * 0.72}" cy="${y + h * 0.3}" r="${Math.min(w, h) * 0.12}" fill="#fff" opacity=".18"/>
  <path d="M${x} ${y + h * 0.78} L${x + w * 0.35} ${y + h * 0.5} L${x + w * 0.6} ${y + h * 0.7} L${x + w * 0.8} ${y + h * 0.55} L${x + w} ${y + h * 0.72} L${x + w} ${y + h} L${x} ${y + h}Z" fill="#000" opacity=".16"/>`;

const lines = (x, y, widths, color, gap = 12) =>
  widths.map((w, i) => `<rect x="${x}" y="${y + i * gap}" width="${w}" height="5" rx="2.5" fill="${color}" opacity=".35"/>`).join('');

const nav = (t) => `
  <rect x="24" y="24" width="18" height="18" rx="4" fill="${t.accent}"/>
  ${[0, 1, 2].map((i) => `<rect x="${196 + i * 38}" y="31" width="28" height="4" rx="2" fill="${t.ink}" opacity=".45"/>`).join('')}`;

const button = (t, x, y, fill = t.accent, text = t.bg) =>
  `<rect x="${x}" y="${y}" width="112" height="32" rx="5" fill="${fill}"/><rect x="${x + 24}" y="${y + 14}" width="64" height="4" rx="2" fill="${text}"/>`;

const layouts = {
  stack: (t) => `
    ${nav(t)}
    <text x="24" y="104" font-family="${SERIF}" font-weight="700" letter-spacing="-1" font-size="34" fill="${t.ink}">${t.title[0]}</text>
    <text x="24" y="142" font-family="${SERIF}" font-weight="700" letter-spacing="-1" font-size="34" font-style="italic" fill="${t.accent}">${t.title[1]}</text>
    ${lines(24, 164, [260, 220, 180], t.ink)}
    ${button(t, 24, 212)}
    ${photo(`p-${t.slug}`, t.photo, 24, 264, 312, 212)}`,
  split: (t) => `
    ${nav(t)}
    ${photo(`p-${t.slug}`, t.photo, 24, 64, 312, 190)}
    <text x="24" y="296" font-family="${SERIF}" font-weight="700" letter-spacing="-1" font-size="31" fill="${t.ink}">${t.title[0]}</text>
    <text x="24" y="332" font-family="${SERIF}" font-weight="700" letter-spacing="-1" font-size="31" font-style="italic" fill="${t.accent}">${t.title[1]}</text>
    ${lines(24, 352, [240, 200], t.ink)}
    ${button(t, 24, 384)}
    <rect x="24" y="440" width="148" height="60" rx="6" fill="${t.ink}" opacity=".08"/>
    <rect x="188" y="440" width="148" height="60" rx="6" fill="${t.ink}" opacity=".08"/>`,
  full: (t) => `
    ${photo(`p-${t.slug}`, t.photo, 0, 0, W, 330, 0)}
    <rect x="0" y="0" width="${W}" height="330" fill="#000" opacity=".25"/>
    <rect x="24" y="24" width="18" height="18" rx="4" fill="${t.accent}"/>
    <text x="24" y="232" font-family="${SERIF}" font-weight="700" letter-spacing="-1" font-size="36" fill="#fff">${t.title[0]}</text>
    <text x="24" y="274" font-family="${SERIF}" font-weight="700" letter-spacing="-1" font-size="36" font-style="italic" fill="#fff">${t.title[1]}</text>
    ${button(t, 24, 350, t.accent, t.bg)}
    ${lines(24, 408, [300, 260, 280, 190], t.ink, 14)}`,
};

for (const t of trades) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <rect width="${W}" height="${H}" fill="${t.bg}"/>${layouts[t.layout](t)}</svg>`;
  await sharp(Buffer.from(svg)).webp({ quality: 78 }).toFile(`${OUT}${t.slug}.webp`);
}
console.log(`${trades.length} cartes → public/cards/`);
