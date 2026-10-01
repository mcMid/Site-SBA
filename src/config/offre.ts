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
    forWho: 'Pour les indépendants, artisans, consultants et petites activités qui ont besoin d’un site simple et professionnel.',
    pitch: 'Trois pages pour que l’on comprenne qui vous êtes, ce que vous faites et comment vous écrire. Vos textes, vos couleurs, un formulaire qui arrive dans votre boîte.',
    highlights: [
      'Jusqu’à 3 pages, aux couleurs de votre activité',
      'Vos textes mis en page, tels que vous les avez écrits',
      'Un formulaire simple, reçu directement dans votre boîte',
      'Hébergement offert la première année',
    ],
  },
  {
    id: 'complet',
    name: 'Complet',
    price: 1790,
    delayDays: 15,
    revisionRounds: 3,
    forWho: 'Pour les PME, commerces, cabinets et entreprises de services qui veulent présenter plusieurs activités et être trouvés localement.',
    pitch: 'Une page par activité, des textes rédigés à partir de vos réponses, et une fiche Google prête. Le site présente l’entreprise pendant que vous travaillez.',
    highlights: [
      'Jusqu’à 6 pages, une par activité',
      'Des textes rédigés à partir de vos réponses',
      'Une fiche Google configurée pour votre zone',
      '3 tours de corrections, remarques regroupées',
      'Hébergement offert la première année',
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
  { label: 'Design à vos couleurs, avec votre logo', essentiel: true, complet: true },
  { label: 'Nombre de pages', essentiel: 'jusqu’à 3', complet: 'jusqu’à 6' },
  { label: 'Lisible sur téléphone, tablette et ordinateur', essentiel: true, complet: true },
  { label: 'Formulaire de contact, reçu dans votre boîte', essentiel: true, complet: true },
  { label: 'Base pour Google : titres, descriptions, vitesse', essentiel: true, complet: true },
  { label: 'Rédaction des textes à partir de vos réponses', essentiel: false, complet: true },
  { label: 'Fiche Google Business Profile configurée', essentiel: false, complet: true },
  { label: 'Une page par activité', essentiel: false, complet: true },
  { label: 'Mise en ligne et nom de domaine relié', essentiel: true, complet: true },
  { label: 'Tours de corrections', essentiel: '1 tour', complet: '3 tours' },
  { label: 'Acompte remboursé si la maquette ne vous convient pas', essentiel: true, complet: true },
  { label: 'Hébergement et HTTPS offerts la 1re année', essentiel: true, complet: true },
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
  short: 'Si la maquette ne convient pas après les corrections comprises, le projet s’arrête et l’acompte est remboursé.',
  long: 'Vous découvrez le site sur une adresse privée avant de payer le solde. Après les corrections comprises dans votre offre, si la maquette ne vous convient toujours pas, le projet s’arrête et l’acompte vous est remboursé en entier. Le solde n’est dû que pour un site que vous mettez en ligne.',
};

export const care = {
  price: 29, // CHF / mois
  optional: true,
  freeFirstYear: 'La première année, l’hébergement est offert. Dès la deuxième, nous pouvons nous en occuper, si vous le souhaitez.',
  includes: [
    'Hébergement et certificat HTTPS, dès la 2e année',
    'Mises à jour et sauvegardes',
    'Surveillance : nous sommes prévenus si le site tombe',
    'Une modification de texte ou d’horaires par mois',
  ],
  without:
    'Le nom de domaine est enregistré à votre nom. À la mise en ligne, vous recevez les accès. Vous pouvez nous confier la maintenance, ou gérer l’hébergement vous-même. Dans les deux cas, le site vous appartient.',
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
    title: 'Vous expliquez votre projet',
    text: 'Une minute pour dire ce que vous faites. Nous répondons sous 24 h ouvrées, avec la formule adaptée. Rien n’est dû à cette étape.',
    who: 'vous',
  },
  {
    title: 'Vous donnez l’essentiel',
    text: 'Confirmation écrite au prix affiché : l’acompte n’est dû qu’à votre accord. Vous envoyez ensuite logo, photos et textes. Le délai démarre quand le dossier est complet.',
    who: 'vous',
    money: `Acompte ${payment.deposit} %`,
  },
  {
    title: 'Nous construisons le site',
    text: 'Nous mettons en page ce que vous faites, pour qui, et comment vous joindre. Sur le Complet, les textes sont rédigés à partir de vos réponses.',
    who: 'nous',
  },
  {
    title: 'Vous découvrez la maquette',
    text: 'Le site est en ligne sur une adresse privée, avant le solde. Un tour de corrections sur l’Essentiel, trois sur le Complet. Si la maquette ne convient toujours pas, l’acompte est rendu.',
    who: 'vous',
  },
  {
    title: 'Votre site est en ligne',
    text: 'Mise en ligne sur votre nom de domaine. Vous recevez les accès et un mode d’emploi. Le solde n’est demandé qu’à ce moment.',
    who: 'nous',
    money: `Solde ${100 - payment.deposit} %`,
  },
];

const chf = new Intl.NumberFormat('fr-CH', { maximumFractionDigits: 0 });
/** 1190 → « 1 190 » avec espace insécable (certaines polices n'ont pas de glyphe pour l'espace fine U+202F). */
export const formatChf = (n: number) => chf.format(n).replace(/[\s\u2019']/g, '\u00a0');
export const minPrice = Math.min(...offers.map((o) => o.price));

export const faq: { q: string; a: string }[] = [
  {
    q: 'Combien coûte réellement un site ?',
    a: `Deux prix fixes : ${formatChf(offers[0].price)} CHF pour l’Essentiel, ${formatChf(offers[1].price)} CHF pour le Complet. Le montant est connu avant de commander. Le .ch, environ 10 à 20 CHF par an, est enregistré à votre nom et reste à votre charge. Rien n’est ajouté sur la facture sans un prix annoncé avant.`,
  },
  {
    q: 'Combien de temps faut-il ?',
    a: `${offers[0].delayDays} jours ouvrés pour l’Essentiel, ${offers[1].delayDays} pour le Complet. Le décompte démarre le jour où vos contenus sont complets, pas le jour du premier message.`,
  },
  {
    q: 'Dois-je payer la totalité au début ?',
    a: `Non. ${payment.deposit} % à la commande, une fois la confirmation écrite acceptée, et ${100 - payment.deposit} % à la mise en ligne. Virement, facture QR ou TWINT. Aucune carte enregistrée, aucun prélèvement.`,
  },
  {
    q: 'Et si je n’aime pas le résultat ?',
    a: `Vous voyez la maquette sur une adresse privée, avant le solde. ${offers[0].name} : ${offers[0].revisionRounds} tour de corrections. ${offers[1].name} : ${offers[1].revisionRounds} tours. Textes, photos, couleurs, ordre des sections : compris. Un autre design : non. Après ces corrections, si la maquette ne convient toujours pas, le projet s’arrête et l’acompte est remboursé en entier. Un tour en plus est chiffré avant d’être fait.`,
  },
  {
    q: 'Le site m’appartient-il ?',
    a: 'Oui. Le nom de domaine est à votre nom, et vous recevez les accès à la mise en ligne. Avec ou sans maintenance.',
  },
  {
    q: 'Que se passe-t-il après la première année ?',
    a: `L’hébergement est offert la première année. Ensuite, soit ${care.price} CHF par mois (hébergement, mises à jour, sauvegardes, surveillance, une modification de texte ou d’horaires par mois), soit un hébergement à votre nom. ${care.cancel} Le .ch, 10 à 20 CHF par an, reste à votre charge.`,
  },
  {
    q: 'Puis-je gérer le site moi-même ?',
    a: 'Oui. Sans maintenance, le site est hébergé à votre nom et tous les accès vous sont remis. Vous pouvez aussi nous confier la maintenance, et arrêter quand vous voulez.',
  },
  {
    q: 'Travaillez-vous avec les entreprises de Suisse romande ?',
    a: 'Oui. Les échanges se font en français, par e-mail, depuis Morges. Votre entreprise peut être ailleurs, si ce cadre vous convient.',
  },
];
