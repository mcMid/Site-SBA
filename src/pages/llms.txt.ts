import type { APIRoute } from 'astro';
import { site, abs } from '../config/site';
import { offers, payment, care, guarantee, formatChf } from '../config/offre';

export const GET: APIRoute = () => {
  const body = `# ${site.brand}

> Création de sites internet à prix fixe pour indépendants et PME de Suisse romande.

## Offres
${offers.map((o) => `- ${o.name} : ${formatChf(o.price)} CHF, en ligne en ${o.delayDays} jours ouvrés. ${o.pitch}`).join('\n')}

## Conditions
- Paiement : ${payment.deposit} % ${payment.depositWhen}, ${100 - payment.deposit} % ${payment.balanceWhen}.
- Corrections comprises : ${offers.map((o) => `${o.name}, ${o.revisionRounds} tour${o.revisionRounds > 1 ? 's' : ''}`).join(' ; ')}. Garantie : ${guarantee.short}
- Hébergement offert la 1re année.
- Abonnement facultatif : ${care.price} CHF par mois (hébergement, mises à jour, sauvegardes). ${care.cancel}

## Pages
- [Offres, tableau de ce qui est inclus, étapes, FAQ](${abs('/')})
- [Formulaire de demande](${abs('/demande/')})
- [Guide : prix d’un site internet en Suisse en 2026](${abs('/prix-site-internet-suisse/')})
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
