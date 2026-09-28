// Génère public/og.png (1200×630) à partir des prix de src/config/offre.ts.
// Relancer après un changement de prix : node scripts/og.mjs
import sharp from 'sharp';
import { readFileSync } from 'node:fs';

const src = readFileSync(new URL('../src/config/offre.ts', import.meta.url), 'utf8');
const prices = [...src.matchAll(/price:\s*(\d+),/g)].map((m) => Number(m[1]).toLocaleString('fr-CH').replace(/[’']/g, ' '));
const brand = readFileSync(new URL('../src/config/site.ts', import.meta.url), 'utf8').match(/brand:\s*'([^']+)'/)[1];

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#f4f1ea"/>
  <text x="80" y="120" font-family="Helvetica, Arial" font-size="28" font-weight="700" letter-spacing="3" fill="#5b6168">INDÉPENDANTS ET PME · SUISSE ROMANDE</text>
  <text x="80" y="245" font-family="Georgia, serif" font-size="92" fill="#17191c">Votre site internet,</text>
  <text x="80" y="345" font-family="Georgia, serif" font-style="italic" font-size="92" fill="#c2371b">à prix fixe.</text>
  <line x1="80" y1="420" x2="1120" y2="420" stroke="#17191c" stroke-width="2"/>
  <text x="80" y="520" font-family="Georgia, serif" font-size="84" fill="#17191c">${prices[0]} <tspan font-family="Helvetica, Arial" font-size="30" font-weight="700" fill="#5b6168">CHF</tspan></text>
  <text x="470" y="520" font-family="Georgia, serif" font-size="84" fill="#17191c">${prices[1]} <tspan font-family="Helvetica, Arial" font-size="30" font-weight="700" fill="#5b6168">CHF</tspan></text>
  <text x="1120" y="520" text-anchor="end" font-family="Georgia, serif" font-size="44" fill="#17191c">${brand}<tspan fill="#c2371b">.</tspan></text>
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(new URL('../public/og.png', import.meta.url).pathname);
console.log('public/og.png', prices.join(' / '));
