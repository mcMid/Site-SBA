/**
 * Identité et coordonnées. Tout ce qui est marqué A_REMPLIR bloque la mise en
 * ligne : scripts/qa.mjs refuse un build qui contient encore ce marqueur.
 */
export const site = {
  brand: 'Studio Romand', // nom provisoire
  url: 'https://www.example.ch', // domaine réel à renseigner avant la mise en ligne
  locale: 'fr-CH',
  email: 'A_REMPLIR@example.ch',
  phone: '', // format E.164, ex. +41791234567 ; laisser vide pour ne pas l'afficher
  phoneDisplay: '',
  legalName: 'A_REMPLIR (raison sociale)',
  ide: '', // CHE-xxx.xxx.xxx, si inscrit au registre du commerce
  address: {
    street: 'A_REMPLIR',
    postalCode: 'A_REMPLIR',
    city: 'A_REMPLIR',
    country: 'CH',
  },
  areaServed: ['Vaud', 'Genève', 'Fribourg', 'Neuchâtel', 'Valais', 'Jura', 'Berne francophone'],
  responseTime: '1 jour ouvré',
} as const;

export const abs = (path: string) => new URL(path, site.url).href;
