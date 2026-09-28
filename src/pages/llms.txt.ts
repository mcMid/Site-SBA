import type { APIRoute } from 'astro';
import { site, abs } from '../config/site';
import { offers, payment, care, formatChf } from '../config/offre';

export const GET: APIRoute = () => {
  const body = `# ${site.brand}

> Création de sites internet à prix fixe pour indépendants et PME de Suisse romande.

## Offres
${offers.map((o) => `- ${o.name} : ${formatChf(o.price)} CHF, en ligne en ${o.delayDays} jours ouvrés. ${o.pitch}`).join('\n')}

## Conditions
- Paiement : ${payment.deposit} % ${payment.depositWhen}, ${100 - payment.deposit} % ${payment.balanceWhen}.
- Un tour de corrections inclus.
- Abonnement facultatif : ${care.price} CHF par mois (hébergement, mises à jour, sauvegardes). ${care.cancel}

## Pages
- [Offres, tableau de ce qui est inclus, étapes, FAQ](${abs('/')})
- [Formulaire de demande](${abs('/demande/')})
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
