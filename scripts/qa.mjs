// Contrôles après build. Sort en erreur au moindre défaut : Netlify ne publie pas.
// Usage : npm run check  (build + qa)   ou   node scripts/qa.mjs  (dist/ déjà construit)
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;
const errors = [];
const warn = [];
const fail = (page, msg) => errors.push(`${page} — ${msg}`);

const walk = (dir) => readdirSync(dir).flatMap((f) => {
  const p = join(dir, f);
  return statSync(p).isDirectory() ? walk(p) : [p];
});

const htmlFiles = walk(DIST).filter((f) => f.endsWith('.html'));
const route = (f) => '/' + relative(DIST, f).replace(/index\.html$/, '').replace(/\.html$/, '/');
const pick = (html, re) => (html.match(re) || [])[1];
const titles = new Map();
const descs = new Map();

// Promesse de marque : le prix est toujours affiché. Ces formules n'ont rien à faire sur le site.
// Citée entre guillemets (« nous consulter »), la formule est dénoncée, pas utilisée.
const FORBIDDEN = [/(?<!«[\s\u00a0\u202f]*)nous consulter/i, /sur devis/i, /prix sur demande/i, /à partir de\s*\?/i];

for (const file of htmlFiles) {
  const page = route(file);
  const html = readFileSync(file, 'utf8');
  const noindex = /<meta name="robots" content="noindex/.test(html);

  if (html.includes('A_REMPLIR')) warn.push(`${page} — contient encore A_REMPLIR (bloquant pour la mise en ligne)`);

  const title = pick(html, /<title>([^<]*)<\/title>/);
  const desc = pick(html, /<meta name="description" content="([^"]*)"/);
  const canonical = pick(html, /<link rel="canonical" href="([^"]*)"/);
  const h1 = (html.match(/<h1[\s>]/g) || []).length;

  if (!title) fail(page, 'title manquant');
  else if (!noindex && (title.length < 20 || title.length > 70)) fail(page, `title de ${title.length} caractères (20–70)`);
  if (!desc) fail(page, 'description manquante');
  else if (!noindex && (desc.length < 70 || desc.length > 165)) fail(page, `description de ${desc.length} caractères (70–165)`);
  if (h1 !== 1) fail(page, `${h1} H1 (attendu : 1)`);
  if (page !== '/404/' && (!canonical || !canonical.endsWith(page))) fail(page, `canonical « ${canonical} » ne correspond pas à la page`);

  if (!noindex) {
    if (titles.has(title)) fail(page, `title identique à ${titles.get(title)}`);
    if (descs.has(desc)) fail(page, `description identique à ${descs.get(desc)}`);
    titles.set(title, page);
    descs.set(desc, page);
  }

  // Hiérarchie : pas de niveau sauté (h2 → h4).
  const levels = [...html.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));
  levels.forEach((l, i) => { if (i && l > levels[i - 1] + 1) fail(page, `titre h${l} après h${levels[i - 1]}`); });

  for (const img of html.match(/<img\b[^>]*>/g) || []) if (!/\balt=/.test(img)) fail(page, `image sans alt : ${img.slice(0, 60)}`);

  // CSP script-src 'self' : aucun script exécutable en ligne.
  for (const s of html.match(/<script\b[^>]*>[\s\S]*?<\/script>/g) || []) {
    if (/type="application\/ld\+json"/.test(s)) {
      try { JSON.parse(s.replace(/^<script[^>]*>|<\/script>$/g, '')); } catch { fail(page, 'JSON-LD invalide'); }
    } else if (!/\bsrc=/.test(s)) fail(page, 'script en ligne (bloqué par la CSP)');
  }

  const text = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ');
  for (const re of FORBIDDEN) if (re.test(text)) fail(page, `formule interdite : ${re}`);

  // Liens internes : chaque cible doit exister dans dist/.
  for (const [, href] of html.matchAll(/href="(\/[^"#?]*)/g)) {
    const target = join(DIST, href);
    const ok = existsSync(target) && (statSync(target).isFile() || existsSync(join(target, 'index.html')));
    if (!ok) fail(page, `lien interne cassé : ${href}`);
  }
}

// Chaque page du sitemap existe, et chaque page indexable est dans le sitemap.
const sitemap = readFileSync(join(DIST, 'sitemap.xml'), 'utf8');
const inSitemap = [...sitemap.matchAll(/<loc>https?:\/\/[^/]+(\/[^<]*)<\/loc>/g)].map((m) => m[1]);
for (const p of inSitemap) if (!existsSync(join(DIST, p, 'index.html'))) fail('sitemap', `${p} absent du build`);
for (const [, p] of titles) if (!inSitemap.includes(p) && p !== '/404/') fail(p, 'page indexable absente du sitemap');

// Éléments de conversion encore vides (voir src/config/site.ts). Pas bloquant :
// les blocs sont masqués tant qu'ils ne sont pas remplis.
const cfg = readFileSync(new URL('../src/config/site.ts', import.meta.url), 'utf8');
const missing = [
  [/whatsapp: '',/, 'numéro WhatsApp (site.whatsapp)'],
  [/phone: '',/, 'téléphone (site.phone)'],
  [/founder = \{\s*name: '',/, 'nom et photo du fondateur (founder)'],
  [/count: 0,/, 'avis Google (reviews)'],
  [/realisations: Realisation\[\] = \[\];/, 'réalisations avec accord client (realisations)'],
  [/plausibleDomain: '',/, 'statistiques Plausible (analytics)'],
].filter(([re]) => re.test(cfg)).map(([, label]) => label);

console.log(`${htmlFiles.length} pages contrôlées.`);
if (missing.length) console.warn('◌ Conversion, à remplir : ' + missing.join(' · '));
warn.forEach((w) => console.warn('⚠ ' + w));
if (errors.length) {
  errors.forEach((e) => console.error('✗ ' + e));
  console.error(`\n${errors.length} défaut(s).`);
  process.exit(1);
}
console.log('✓ Aucun défaut.');
if (process.env.CONTEXT === 'production' && warn.length) {
  console.error('Mise en ligne refusée : des champs A_REMPLIR subsistent.');
  process.exit(1);
}
