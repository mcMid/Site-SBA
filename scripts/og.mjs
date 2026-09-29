// Génère public/og.png (1200×630) à partir des prix de src/config/offre.ts.
// Relancer après un changement de prix : node scripts/og.mjs
import sharp from 'sharp';
import { readFileSync } from 'node:fs';

const src = readFileSync(new URL('../src/config/offre.ts', import.meta.url), 'utf8');
const prices = [...src.matchAll(/price:\s*(\d+),/g)].map((m) => Number(m[1]).toLocaleString('fr-CH').replace(/[’']/g, ' '));
const brand = readFileSync(new URL('../src/config/site.ts', import.meta.url), 'utf8').match(/brand:\s*'([^']+)'/)[1];

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#0b0c0e"/>
  <text x="80" y="120" font-family="Helvetica, Arial" font-size="28" font-weight="700" letter-spacing="3" fill="#9a968d">INDÉPENDANTS ET PME · SUISSE ROMANDE</text>
  <text x="80" y="245" font-family="Helvetica Neue, Arial" font-weight="700" letter-spacing="-3" font-size="92" fill="#f2efe8">Votre site internet,</text>
  <text x="80" y="345" font-family="Helvetica Neue, Arial" font-weight="700" letter-spacing="-3" font-size="92" fill="#5aa2ff">à prix fixe.</text>
  <line x1="80" y1="420" x2="1120" y2="420" stroke="#2a2c31" stroke-width="2"/>
  <text x="80" y="520" font-family="Helvetica Neue, Arial" font-weight="700" font-size="84" fill="#f2efe8">${prices[0]} <tspan font-family="Helvetica, Arial" font-size="30" font-weight="700" fill="#9a968d">CHF</tspan></text>
  <text x="470" y="520" font-family="Helvetica Neue, Arial" font-weight="700" font-size="84" fill="#f2efe8">${prices[1]} <tspan font-family="Helvetica, Arial" font-size="30" font-weight="700" fill="#9a968d">CHF</tspan></text>
  <text x="1120" y="520" text-anchor="end" font-family="Helvetica Neue, Arial" font-weight="700" letter-spacing="-3" font-size="44" fill="#f2efe8">${brand}<tspan fill="#5aa2ff">.</tspan></text>
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(new URL('../public/og.png', import.meta.url).pathname);
console.log('public/og.png', prices.join(' / '));
