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
  brand: 'Studio Romand', // nom provisoire
  url: 'https://www.example.ch', // domaine réel à renseigner avant la mise en ligne
  locale: 'fr-CH',
  email: 'A_REMPLIR@example.ch',
  phone: '', // format E.164, ex. +41791234567 ; vide = non affiché
  phoneDisplay: '', // ex. 079 123 45 67
  whatsapp: '', // format E.164 sans +, ex. 41791234567 ; vide = bouton masqué
  legalName: 'A_REMPLIR (raison sociale)',
  ide: '', // CHE-xxx.xxx.xxx, si inscrit au registre du commerce
  address: {
    street: 'A_REMPLIR',
    postalCode: 'A_REMPLIR',
    city: 'A_REMPLIR',
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
