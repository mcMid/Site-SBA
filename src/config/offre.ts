/**
 * L'offre commerciale, en un seul endroit. Prix, délais, tableau, étapes,
 * abonnement et FAQ en sont tous tirés : changer un chiffre ici le change
 * partout, JSON-LD compris.
 */

export type OfferId = 'essentiel' | 'complet';

export interface Offer {
  id: OfferId;
  name: string;
  price: number; // CHF, prix fixe
  delayDays: number; // jours ouvrés après réception des contenus
  revisionRounds: number; // tours de corrections compris
  forWho: string;
  pitch: string;
  highlights: string[];
}

export const offers: Offer[] = [
  {
    id: 'essentiel',
    name: 'Essentiel',
    price: 990,
    delayDays: 10,
    revisionRounds: 1,
    forWho: 'Indépendants, artisans, thérapeutes, consultants',
    pitch: 'Un site court et clair : qui vous êtes, ce que vous faites, comment vous joindre.',
    highlights: [
      'Jusqu’à 3 pages',
      'Vos textes mis en page',
      'Formulaire de contact',
      'Hébergement offert la 1re année',
    ],
  },
  {
    id: 'complet',
    name: 'Complet',
    price: 1790,
    delayDays: 15,
    revisionRounds: 3,
    forWho: 'PME, commerces, cabinets, entreprises de services',
    pitch: 'Plusieurs pages pour présenter chaque service et être trouvé sur Google dans votre région.',
    highlights: [
      'Jusqu’à 6 pages',
      '3 tours de corrections',
      'Textes rédigés par nous à partir du formulaire de projet',
      'Fiche Google Business Profile configurée',
      'Une page par service pour le référencement local',
    ],
  },
];

/** Valeur d'une cellule : true = oui, false = non, texte = précision. */
export type Cell = boolean | string;

export interface CompareRow {
  label: string;
  essentiel: Cell;
  complet: Cell;
}

// Ce qui sépare les deux offres. Validé le 29.09.2026 (garantie et hébergement 1re année compris).
export const compare: CompareRow[] = [
  { label: 'Design à vos couleurs et à votre logo', essentiel: true, complet: true },
  { label: 'Nombre de pages', essentiel: 'jusqu’à 3', complet: 'jusqu’à 6' },
  { label: 'Adapté au mobile', essentiel: true, complet: true },
  { label: 'Formulaire de contact', essentiel: true, complet: true },
  { label: 'Référencement de base (titres, descriptions, vitesse)', essentiel: true, complet: true },
  { label: 'Rédaction des textes', essentiel: false, complet: true },
  { label: 'Fiche Google Business Profile', essentiel: false, complet: true },
  { label: 'Une page par service', essentiel: false, complet: true },
  { label: 'Mise en ligne et nom de domaine relié', essentiel: true, complet: true },
  { label: 'Tours de corrections', essentiel: '1 tour', complet: '3 tours' },
  { label: 'Garantie : acompte remboursé si la maquette ne vous convient pas', essentiel: true, complet: true },
  { label: 'Hébergement et HTTPS la 1re année', essentiel: true, complet: true },
  { label: 'Boutique en ligne', essentiel: false, complet: false },
  { label: 'Site en plusieurs langues', essentiel: false, complet: false },
  { label: 'Séance photo', essentiel: false, complet: false },
];

export const payment = {
  deposit: 50, // % à la commande
  depositWhen: 'à la commande',
  balanceWhen: 'à la mise en ligne',
};

/** Garantie : renverse le risque du premier paiement. */
export const guarantee = {
  short: 'Après les corrections comprises, si la maquette ne vous convient pas : on arrête, acompte remboursé.',
  long: 'Si la maquette ne vous convient pas après les corrections comprises dans votre offre, vous nous le dites : on arrête là et on vous rembourse l’acompte en entier. Vous ne payez que pour un site que vous voulez mettre en ligne.',
};

export const care = {
  price: 29, // CHF / mois
  optional: true,
  freeFirstYear: 'L’hébergement est offert la 1re année. Ensuite, deux choix :',
  includes: [
    'Hébergement et certificat HTTPS (dès la 2e année)',
    'Mises à jour et sauvegardes',
    'Surveillance : on est prévenus avant vous si le site tombe',
    'Une petite modification de texte ou d’horaires par mois',
  ],
  without:
    'Sans abonnement, le site est hébergé à votre nom et on vous remet tous les accès. Il vous appartient dans les deux cas.',
  cancel: 'Résiliable chaque mois, sans frais.',
};

export interface Step {
  title: string;
  text: string;
  who: 'vous' | 'nous';
  money?: string;
}

export const steps: Step[] = [
  {
    title: 'Vous faites une demande',
    text: 'Une minute de formulaire. On vous répond sous 24 h ouvrées.',
    who: 'vous',
  },
  {
    title: 'Formulaire de projet',
    text: 'On vous envoie par e-mail un formulaire de 10 minutes : vos pages, vos services, votre date souhaitée. Vous recevez ensuite une confirmation écrite au prix affiché. L’acompte est dû quand vous l’acceptez.',
    who: 'vous',
    money: `Acompte ${payment.deposit} %`,
  },
  {
    title: 'Vous envoyez vos contenus',
    text: 'Logo, photos et textes (pour l’offre Complet, on les rédige à partir de votre formulaire de projet). Une liste précise vous dit quoi envoyer. Le délai démarre à ce moment.',
    who: 'vous',
  },
  {
    title: 'Vous validez la maquette',
    text: 'Le site vous est présenté en ligne sur une adresse privée. Vous regroupez vos remarques : un tour pour l’offre Essentiel, trois pour l’offre Complet. Après ces tours, si la maquette ne vous convient pas : acompte remboursé.',
    who: 'vous',
  },
  {
    title: 'Mise en ligne',
    text: 'Le site passe sur votre nom de domaine. Vous recevez les accès et un mode d’emploi d’une page.',
    who: 'nous',
    money: `Solde ${100 - payment.deposit} %`,
  },
];

export const faq: { q: string; a: string }[] = [
  {
    q: 'Et si le site ne me plaît pas ?',
    a: 'Vous voyez la maquette en ligne avant de payer le solde. Si elle ne vous convient pas après les corrections comprises dans votre offre, on arrête et on vous rembourse l’acompte en entier.',
  },
  {
    q: 'Pourquoi un prix fixe, et pas un devis ?',
    a: 'Parce que le périmètre est fixe. Deux offres, un contenu défini, un nombre de tours de corrections écrit d’avance : on sait ce que ça coûte à produire, vous savez ce que vous payez.',
  },
  {
    q: 'Que comprend un tour de corrections ?',
    a: 'Vous regroupez toutes vos remarques sur la maquette, on les applique en une fois. L’offre Essentiel comprend un tour, l’offre Complet en comprend trois. Changer un texte, une photo, une couleur, l’ordre des sections : c’est compris. Refaire le site dans une autre direction ne l’est pas.',
  },
  {
    q: 'Et si j’ai besoin de plus de corrections ?',
    a: 'On vous annonce le prix avant de toucher à quoi que ce soit. Rien n’est facturé sans votre accord écrit.',
  },
  {
    q: 'Le site m’appartient-il ?',
    a: 'Oui, avec ou sans abonnement. Le nom de domaine est enregistré à votre nom et vous recevez tous les accès à la mise en ligne.',
  },
  {
    q: 'Le nom de domaine est-il compris ?',
    a: 'On le relie et on le configure. L’enregistrement lui-même (environ 10 à 20 CHF par an pour un .ch) se fait à votre nom, chez le registraire de votre choix.',
  },
  {
    q: 'Comment payer ?',
    a: 'Par virement, facture QR ou TWINT. La moitié à la commande, le solde à la mise en ligne. Pas de carte de crédit demandée, pas de prélèvement automatique.',
  },
  {
    q: 'Qu’est-ce que je paie après la mise en ligne ?',
    a: 'Rien la première année : l’hébergement est offert. Ensuite, soit l’abonnement facultatif à 29 CHF par mois (hébergement, mises à jour, une modification par mois), soit un hébergement à votre nom, que l’on vous configure. Le nom de domaine (10 à 20 CHF par an pour un .ch) reste à votre charge dans les deux cas.',
  },
  {
    q: 'Quand le délai commence-t-il ?',
    a: `Le jour où l’on a reçu vos contenus complets : ${offers[0].delayDays} jours ouvrés pour l’Essentiel, ${offers[1].delayDays} pour le Complet. Le formulaire et l’envoi des contenus viennent avant ce décompte.`,
  },
  {
    q: 'Travaillez-vous hors de Suisse romande ?',
    a: 'Les échanges se font en français, par e-mail. On travaille depuis la Suisse romande. Votre entreprise peut être ailleurs, si ce cadre vous convient.',
  },
];

const chf = new Intl.NumberFormat('fr-CH', { maximumFractionDigits: 0 });
/** 1190 → « 1 190 » avec espace insécable (certaines polices n'ont pas de glyphe pour l'espace fine U+202F). */
export const formatChf = (n: number) => chf.format(n).replace(/[\s\u2019']/g, '\u00a0');
export const minPrice = Math.min(...offers.map((o) => o.price));
