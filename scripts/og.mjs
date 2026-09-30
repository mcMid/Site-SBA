// Génère public/og.png (1200×630) à partir des prix de src/config/offre.ts.
// Relancer après un changement de prix : node scripts/og.mjs
import sharp from 'sharp';
import { readFileSync } from 'node:fs';

const src = readFileSync(new URL('../src/config/offre.ts', import.meta.url), 'utf8');
const prices = [...src.matchAll(/price:\s*(\d+),/g)].map((m) => Number(m[1]).toLocaleString('fr-CH').replace(/[’']/g, ' '));
const brand = readFileSync(new URL('../src/config/site.ts', import.meta.url), 'utf8').match(/brand:\s*'([^']+)'/)[1];

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#07090f"/>
  <text x="80" y="120" font-family="Helvetica, Arial" font-size="22" font-weight="700" letter-spacing="4" fill="#9bb0c4">INDÉPENDANTS ET PME, SUISSE ROMANDE</text>
  <text x="80" y="245" font-family="Helvetica Neue, Arial" font-weight="700" letter-spacing="-3" font-size="92" fill="#e8f4f8">Votre site internet,</text>
  <text x="80" y="345" font-family="Helvetica Neue, Arial" font-weight="700" letter-spacing="-3" font-size="92" fill="#5cefff">à prix fixe.</text>
  <line x1="80" y1="420" x2="1120" y2="420" stroke="#1e2c3d" stroke-width="2"/>
  <text x="80" y="520" font-family="Helvetica Neue, Arial" font-weight="700" font-size="84" fill="#e8f4f8">${prices[0]} <tspan font-family="Helvetica, Arial" font-size="30" font-weight="700" fill="#9bb0c4">CHF</tspan></text>
  <text x="470" y="520" font-family="Helvetica Neue, Arial" font-weight="700" font-size="84" fill="#e8f4f8">${prices[1]} <tspan font-family="Helvetica, Arial" font-size="30" font-weight="700" fill="#9bb0c4">CHF</tspan></text>
  <text x="1120" y="520" text-anchor="end" font-family="Helvetica Neue, Arial" font-weight="700" letter-spacing="-3" font-size="44" fill="#e8f4f8">${brand}<tspan fill="#5cefff">.</tspan></text>
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(new URL('../public/og.png', import.meta.url).pathname);
console.log('public/og.png', prices.join(' / '));
