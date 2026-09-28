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
  forWho: string;
  pitch: string;
  highlights: string[];
}

export const offers: Offer[] = [
  {
    id: 'essentiel',
    name: 'Essentiel',
    price: 1190,
    delayDays: 10,
    forWho: 'Indépendants, artisans, thérapeutes, consultants',
    pitch: 'Une page claire qui dit qui vous êtes, ce que vous faites et comment vous joindre.',
    highlights: [
      'Site d’une page, jusqu’à 6 sections',
      'Vos textes mis en forme et relus',
      'Formulaire de contact',
      'Mise en ligne sur votre nom de domaine',
    ],
  },
  {
    id: 'complet',
    name: 'Complet',
    price: 1990,
    delayDays: 15,
    forWho: 'PME, commerces, cabinets, entreprises de services',
    pitch: 'Plusieurs pages pour présenter chaque service et être trouvé sur Google dans votre région.',
    highlights: [
      'Jusqu’à 6 pages',
      'Textes rédigés par nous à partir d’un entretien',
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

// TODO(human): valider ce qui sépare Essentiel de Complet
export const compare: CompareRow[] = [
  { label: 'Design à vos couleurs et à votre logo', essentiel: true, complet: true },
  { label: 'Nombre de pages', essentiel: '1 page', complet: 'jusqu’à 6' },
  { label: 'Adapté au mobile', essentiel: true, complet: true },
  { label: 'Formulaire de contact', essentiel: true, complet: true },
  { label: 'Référencement de base (titres, descriptions, vitesse)', essentiel: true, complet: true },
  { label: 'Rédaction des textes', essentiel: false, complet: true },
  { label: 'Fiche Google Business Profile', essentiel: false, complet: true },
  { label: 'Une page par service ou par localité', essentiel: false, complet: true },
  { label: 'Mise en ligne et nom de domaine relié', essentiel: true, complet: true },
  { label: 'Un tour de corrections', essentiel: true, complet: true },
  { label: 'Boutique en ligne', essentiel: false, complet: false },
  { label: 'Site en plusieurs langues', essentiel: false, complet: false },
  { label: 'Séance photo', essentiel: false, complet: false },
];

export const payment = {
  deposit: 50, // % à la commande
  depositWhen: 'à la commande',
  balanceWhen: 'à la mise en ligne',
};

export const care = {
  price: 29, // CHF / mois
  optional: true,
  includes: [
    'Hébergement et certificat HTTPS',
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
    text: 'Deux minutes de formulaire. On vous répond sous 1 jour ouvré.',
    who: 'vous',
  },
  {
    title: 'Appel de 20 minutes',
    text: 'On confirme l’offre, le périmètre et la date de mise en ligne. Vous recevez une confirmation écrite au prix affiché.',
    who: 'nous',
    money: `Acompte ${payment.deposit} %`,
  },
  {
    title: 'Vous envoyez vos contenus',
    text: 'Logo, photos, textes ou réponses à notre questionnaire. Une liste précise vous dit quoi envoyer. Le délai démarre à ce moment.',
    who: 'vous',
  },
  {
    title: 'Vous validez la maquette',
    text: 'Le site vous est présenté en ligne sur une adresse privée. Vous regroupez vos remarques en un seul tour de corrections.',
    who: 'nous',
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
    q: 'Pourquoi un prix fixe, et pas un devis ?',
    a: 'Parce que le périmètre est fixe. Deux offres, un contenu défini, un tour de corrections : on sait ce que ça coûte à produire, vous savez ce que vous payez.',
  },
  {
    q: 'Que comprend exactement « un tour de corrections » ?',
    a: 'Vous regroupez toutes vos remarques sur la maquette en une seule liste, on les applique en une fois. Changer un texte, une photo, une couleur, l’ordre des sections : c’est compris. Refaire le site dans une autre direction ne l’est pas.',
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
    q: 'Quand le délai commence-t-il ?',
    a: 'Le jour où l’on a reçu vos contenus complets. Si vous avez tout sous la main, un site Essentiel peut être en ligne deux semaines après votre demande.',
  },
  {
    q: 'Travaillez-vous hors de Suisse romande ?',
    a: 'Le site est en français et nos rendez-vous se font en français. Votre entreprise peut être n’importe où, tant que ce cadre vous convient.',
  },
];

const chf = new Intl.NumberFormat('fr-CH', { maximumFractionDigits: 0 });
/** 1190 → « 1 190 » avec espace insécable (Instrument n'a pas de glyphe pour l'espace fine U+202F). */
export const formatChf = (n: number) => chf.format(n).replace(/[\s\u2019']/g, '\u00a0');
export const minPrice = Math.min(...offers.map((o) => o.price));
