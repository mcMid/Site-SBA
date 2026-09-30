/**
 * Identité, coordonnées et preuves. Tout ce qui est marqué A_REMPLIR bloque la
 * mise en ligne : scripts/qa.mjs refuse un build de production qui contient
 * encore ce marqueur.
 *
 * Les blocs de conversion (fondateur, WhatsApp, avis, réalisations,
 * statistiques) ne s'affichent QUE s'ils sont remplis : rien de fictif n'est
 * jamais montré. scripts/qa.mjs liste ceux qui manquent encore.
 */
export const site = {
  brand: 'SBA system',
  url: 'https://sbasystem.ch',
  locale: 'fr-CH',
  email: 'contact@sbasystem.ch',
  phone: '', // non publié : contact sur demande, via le formulaire
  phoneDisplay: '',
  whatsapp: '', // vide = bouton masqué. Un lien wa.me public contient le numéro : n'importe qui peut écrire.
  legalName: 'SBA System Sàrl',
  ide: '', // CHE-xxx.xxx.xxx — obligatoire sur le site pour une société inscrite (art. 954a CO)
  address: {
    street: 'Rue de la Gare 11a',
    postalCode: '1110',
    city: 'Morges',
    country: 'CH',
  },
  areaServed: ['Vaud', 'Genève', 'Fribourg', 'Neuchâtel', 'Valais', 'Jura', 'Berne francophone'],
  responseTime: '24 h ouvrées',
  paymentMethods: ['virement', 'facture QR', 'TWINT'],
} as const;

/** La personne qui fait les sites. Un visage vend mieux qu'une marque. */
export const founder = {
  name: '', // ex. « Mathieu »
  role: 'Je conçois et mets en ligne chaque site moi-même.',
  city: '', // ex. « Lausanne »
  photo: '', // ex. '/fondateur.webp' (carré, 400×400, déposé dans public/)
  bio: '', // 2 phrases : parcours, pourquoi ce métier
};

/** Avis Google réels. Laisser count à 0 tant qu'il n'y en a pas. */
export const reviews = {
  rating: 0, // ex. 4.9
  count: 0, // ex. 12
  url: '', // lien vers la fiche Google
};

export interface Realisation {
  name: string; // nom du client, avec son accord écrit
  sector: string; // ex. « Restaurant »
  city: string;
  url: string; // site en ligne
  image: string; // capture 1200×750, déposée dans public/realisations/
  quote?: string; // témoignage réel, mot pour mot
  author?: string; // prénom + fonction
}

/** Vrais sites livrés, avec l'accord des clients. Vide = section masquée. */
export const realisations: Realisation[] = [];

/** Statistiques sans cookies (Plausible). Vide = aucun script chargé. */
export const analytics = {
  plausibleDomain: '', // ex. 'monsite.ch' ; passe par /stats/ (voir netlify.toml)
};

export const abs = (path: string) => new URL(path, site.url).href;
