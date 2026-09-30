// Cartes du mur : plans techniques, rendu futuriste (instrument, pas néon).
// Décoratifs, sans nom d'entreprise. Usage : node scripts/cards.mjs && node scripts/hero-media.mjs
import sharp from 'sharp';
import { mkdirSync, readdirSync, unlinkSync } from 'node:fs';

const W = 360, H = 500;
const OUT = new URL('../public/cards/', import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });
for (const f of readdirSync(OUT)) if (f.endsWith('.webp')) unlinkSync(`${OUT}${f}`);

const SANS = 'Helvetica Neue, Helvetica, Arial, sans-serif';
const voidc = '#071018';
const ice = '#e7f4f6';
const cyan = '#14d0e8';
const ink = '#071018';
const dim = '#7f97a8';

const label = (text, x, y, color = dim) =>
  `<text x="${x}" y="${y}" font-family="${SANS}" font-weight="600" letter-spacing="2.2" font-size="11" fill="${color}">${text}</text>`;

const brackets = (x, y, w, h, color) => {
  const a = 18;
  return `<path d="M${x} ${y + a} V${y} H${x + a} M${x + w - a} ${y} H${x + w} V${y + a} M${x + w} ${y + h - a} V${y + h} H${x + w - a} M${x + a} ${y + h} H${x} V${y + h - a}" fill="none" stroke="${color}" stroke-width="1.5"/>`;
};

const cards = {
  radar: `
    <rect width="${W}" height="${H}" fill="${voidc}"/>
    ${label('RADAR', 28, 44, '#8fd8e4')}
    <circle cx="180" cy="270" r="150" fill="none" stroke="#143040"/>
    <circle cx="180" cy="270" r="100" fill="none" stroke="#143040"/>
    <circle cx="180" cy="270" r="50" fill="none" stroke="#1c4d5c"/>
    <line x1="180" y1="120" x2="180" y2="420" stroke="#143040"/>
    <line x1="30" y1="270" x2="330" y2="270" stroke="#143040"/>
    <path d="M180 270 L300 160 A150 150 0 0 0 180 120 Z" fill="${cyan}" opacity=".18"/>
    <circle cx="248" cy="198" r="5" fill="${cyan}"/>
    <circle cx="180" cy="270" r="4" fill="${cyan}"/>
    <text x="28" y="460" font-family="${SANS}" font-size="13" fill="#8fd8e4">Balayage</text>`,

  signal: `
    <rect width="${W}" height="${H}" fill="${voidc}"/>
    ${label('SIGNAL', 28, 44, '#8fd8e4')}
    <text x="28" y="100" font-family="${SANS}" font-weight="700" letter-spacing="-2" font-size="42" fill="#e8f7fb">10 j</text>
    ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => {
      const h = [40, 70, 28, 110, 60, 150, 90, 46, 120, 70, 36, 80][i];
      return `<rect x="${28 + i * 26}" y="${400 - h}" width="14" height="${h}" fill="${i === 5 ? cyan : '#163848'}"/>`;
    }).join('')}
    <text x="28" y="450" font-family="${SANS}" font-size="13" fill="#8fd8e4">Délai mesuré</text>`,

  cadre: `
    <rect width="${W}" height="${H}" fill="${ice}"/>
    ${label('CADRE', 28, 44, '#4d6d7c')}
    ${brackets(28, 80, 304, 300, cyan)}
    <rect x="56" y="112" width="248" height="16" fill="${ink}"/>
    <rect x="56" y="148" width="160" height="10" fill="${ink}" opacity=".2"/>
    <rect x="56" y="186" width="248" height="110" fill="none" stroke="${ink}" stroke-opacity=".25"/>
    <path d="M56 270 L120 220 L170 250 L230 190 L304 240" fill="none" stroke="${cyan}" stroke-width="2"/>
    <text x="56" y="340" font-family="${SANS}" font-weight="700" font-size="22" fill="${ink}">Vue</text>
    <text x="28" y="430" font-family="${SANS}" font-size="14" fill="#4d6d7c">Un écran, un prix.</text>`,

  orbite: `
    <rect width="${W}" height="${H}" fill="${voidc}"/>
    ${label('ORBITE', 28, 44, '#8fd8e4')}
    <ellipse cx="180" cy="270" rx="140" ry="52" fill="none" stroke="#1a4554" transform="rotate(-18 180 270)"/>
    <ellipse cx="180" cy="270" rx="140" ry="52" fill="none" stroke="${cyan}" stroke-opacity=".8" transform="rotate(24 180 270)"/>
    <ellipse cx="180" cy="270" rx="90" ry="90" fill="none" stroke="#143848"/>
    <circle cx="180" cy="270" r="28" fill="${cyan}" opacity=".9"/>
    <circle cx="286" cy="214" r="6" fill="#e8f7fb"/>
    <text x="28" y="450" font-family="${SANS}" font-size="13" fill="#8fd8e4">Centre fixe</text>`,

  spectre: `
    <rect width="${W}" height="${H}" fill="${ice}"/>
    ${label('SPECTRE', 28, 44, '#4d6d7c')}
    ${Array.from({ length: 14 }, (_, i) => `<rect x="28" y="${80 + i * 26}" width="${[300, 220, 260, 140, 304, 180, 240, 120, 280, 200, 304, 160, 230, 90][i]}" height="8" fill="${i % 4 === 0 ? cyan : ink}" opacity="${i % 4 === 0 ? 1 : 0.16}"/>`).join('')}
    <text x="28" y="470" font-family="${SANS}" font-size="14" fill="#4d6d7c">Lignes utiles seulement.</text>`,

  noeuds: `
    <rect width="${W}" height="${H}" fill="${voidc}"/>
    ${label('RÉSEAU', 28, 44, '#8fd8e4')}
    <g stroke="${cyan}" stroke-opacity=".55" fill="none">
      <path d="M80 160 L180 250 L280 150"/>
      <path d="M80 340 L180 250 L280 360"/>
      <path d="M180 250 L180 120"/>
    </g>
    ${[[80, 160], [180, 250], [280, 150], [80, 340], [280, 360], [180, 120]].map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${i === 1 ? 10 : 5}" fill="${i === 1 ? cyan : '#e8f7fb'}"/>`).join('')}
    <text x="28" y="450" font-family="${SANS}" font-size="13" fill="#8fd8e4">Pages reliées</text>`,

  altitude: `
    <rect width="${W}" height="${H}" fill="${ice}"/>
    ${label('ALTITUDE', 28, 44, '#4d6d7c')}
    <text x="28" y="200" font-family="${SANS}" font-weight="700" letter-spacing="-5" font-size="120" fill="${ink}">10</text>
    ${Array.from({ length: 18 }, (_, i) => `<line x1="${28 + i * 16}" y1="${i % 5 === 0 ? 250 : 262}" x2="${28 + i * 16}" y2="274" stroke="${ink}" stroke-opacity=".35"/>`).join('')}
    <rect x="28" y="300" width="200" height="4" fill="${cyan}"/>
    <text x="28" y="360" font-family="${SANS}" font-size="18" fill="${ink}">jours ouvrés</text>
    <text x="28" y="400" font-family="${SANS}" font-size="14" fill="#4d6d7c">À partir des contenus.</text>`,

  plans: `
    <rect width="${W}" height="${H}" fill="${voidc}"/>
    ${label('PLANS', 28, 44, '#8fd8e4')}
    <g fill="none" stroke="${cyan}">
      <path d="M50 180 L180 120 L310 180 L180 240 Z" stroke-width="1.5"/>
      <path d="M50 250 L180 190 L310 250 L180 310 Z" stroke-width="1.5" opacity=".65"/>
      <path d="M50 320 L180 260 L310 320 L180 380 Z" stroke-width="1.5" opacity=".35"/>
    </g>
    <text x="28" y="450" font-family="${SANS}" font-size="13" fill="#8fd8e4">Structure, puis surface</text>`,

  viseur: `
    <rect width="${W}" height="${H}" fill="${ice}"/>
    ${label('VISEUR', 28, 44, '#4d6d7c')}
    <circle cx="180" cy="260" r="110" fill="none" stroke="${ink}" stroke-opacity=".2"/>
    <circle cx="180" cy="260" r="4" fill="${cyan}"/>
    <path d="M180 130 V190 M180 330 V390 M60 260 H120 M240 260 H300" stroke="${cyan}" stroke-width="2"/>
    <rect x="120" y="200" width="120" height="70" fill="none" stroke="${ink}"/>
    <text x="180" y="242" text-anchor="middle" font-family="${SANS}" font-weight="700" font-size="22" fill="${ink}">990</text>
    <text x="28" y="450" font-family="${SANS}" font-size="14" fill="#4d6d7c">Prix au centre.</text>`,

  couches: `
    <rect width="${W}" height="${H}" fill="${voidc}"/>
    ${label('COUCHES', 28, 44, '#8fd8e4')}
    <rect x="48" y="100" width="264" height="70" fill="#102833" stroke="${cyan}" stroke-opacity=".4"/>
    <rect x="48" y="190" width="264" height="70" fill="#123848" stroke="${cyan}" stroke-opacity=".7"/>
    <rect x="48" y="280" width="264" height="90" fill="${cyan}"/>
    <text x="68" y="142" font-family="${SANS}" font-size="16" fill="#e8f7fb">Fond</text>
    <text x="68" y="232" font-family="${SANS}" font-size="16" fill="#e8f7fb">Grille</text>
    <text x="68" y="332" font-family="${SANS}" font-weight="700" font-size="22" fill="${voidc}">Surface</text>
    <text x="28" y="450" font-family="${SANS}" font-size="13" fill="#8fd8e4">Trois passes</text>`,
};

for (const [slug, inner] of Object.entries(cards)) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${inner}</svg>`;
  await sharp(Buffer.from(svg)).webp({ quality: 84 }).toFile(`${OUT}${slug}.webp`);
}
console.log(`${Object.keys(cards).length} cartes → public/cards/`);
