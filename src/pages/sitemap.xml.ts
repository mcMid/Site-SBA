import type { APIRoute } from 'astro';
import { abs } from '../config/site';

// Pages indexables seulement. lastmod = date de dernière modification réelle
// du contenu, à mettre à jour à la main : une date « maintenant » à chaque
// build apprend à Google à ignorer le champ.
const pages = [
  { path: '/', lastmod: '2026-09-29' },
  { path: '/demande/', lastmod: '2026-09-29' },
  { path: '/prix-site-internet-suisse/', lastmod: '2026-09-29' },
  { path: '/mentions-legales/', lastmod: '2026-09-29' },
  { path: '/confidentialite/', lastmod: '2026-09-29' },
];

export const GET: APIRoute = () =>
  new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages
      .map((p) => `  <url><loc>${abs(p.path)}</loc><lastmod>${p.lastmod}</lastmod></url>`)
      .join('\n')}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
