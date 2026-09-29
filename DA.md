# Direction artistique — « Nuit »

## Idée

On vend des sites. Le hero ne décrit pas un site, il en **ouvre un** : une maquette
en format portrait, posée sur un mur de sites de métiers romands, s'agrandit au
défilement jusqu'à remplir l'écran. Le titre « Votre site, / à prix fixe. » se
coupe en deux et s'écarte pour lui laisser la place. Les deux prix sont lisibles
avant le premier geste.

## Thèmes

- **Sombre par défaut.** Fond nuit `--bg #0b0c0e`, texte crème `--text #f2efe8`.
- **Clair en option** : bouton soleil / lune dans l'en-tête. Le choix est mémorisé
  (`localStorage`) et posé avant le premier rendu par `public/scripts/theme.js`
  (chargé de façon bloquante dans `<head>`), donc pas de flash de thème.
- Les deux thèmes redéfinissent **les mêmes jetons** (`:root` et
  `:root[data-theme="light"]` dans `global.css`). Aucun composant ne connaît le
  thème : il ne lit que des jetons. Nouveau composant = jetons seulement, jamais
  de couleur en dur.

| Jeton | Sombre | Clair | Rôle |
|---|---|---|---|
| `--bg` | `#0b0c0e` | `#f4f1ea` | Fond de page |
| `--surface` | `#15161a` | `#fffdf8` | Cartes, tableaux, panneaux |
| `--surface-2` | `#1d1f23` | `#ebe6db` | Offre mise en avant, appel final |
| `--text` / `--text-2` / `--muted` | crème → gris | encre → gris | Hiérarchie du texte |
| `--accent` | `#5aa2ff` | `#1f4fd1` | Prix, mot-clé, action principale |
| `--on-accent` | nuit | blanc | Texte sur bouton accent |

Contrastes vérifiés (texte courant ≥ 4,5:1) et notés à côté de chaque jeton.

## Couleur

- **Un seul accent** : le bleu. Ciel en sombre, cobalt en clair, même teinte.
  Aucun orange nulle part, maquettes comprises.
- Réservé au prix, à la seconde moitié du titre, aux fins de phrase qui concluent
  (*Tout ce qui ne l'est pas aussi.*) et au bouton principal.
- Les couleurs vives viennent des maquettes de sites, jamais de l'interface.

## Typographie

- **Bricolage Grotesque** (graisse 650–700, interlettrage serré) : titres, prix, chiffres.
  L'accent passe par la couleur, jamais par l'italique.
- **Figtree** : texte, boutons, libellés.
- Dans les images générées (OG, maquettes), Helvetica Neue gras tient le rôle du titre.
- Auto-hébergées, avec des polices de secours ajustées aux mêmes dimensions (aucun
  décalage au chargement).

## Mouvement

- **Un seul geste fort** : l'expansion du hero
  (`src/components/ui/ScrollExpandHero.astro` et `public/scripts/hero.js`). Toute
  l'animation passe par une variable CSS `--p` (0 → 1) ; le script ne fait que la
  mettre à jour.
- Le défilement n'est bloqué que tant que la maquette n'est pas ouverte, et jamais :
  - si le visiteur a activé la réduction des animations ;
  - si la page s'ouvre sur une ancre ou déjà défilée ;
  - après un clic sur un lien interne.
- Clavier pris en charge (flèches, Page suivante / Page précédente, Espace,
  Début / Fin).
- Sans JavaScript, la page défile normalement : le contenu n'est jamais caché.
- Ailleurs : aucune animation liée au défilement.

## Visuels

- `node scripts/cards.mjs` : 10 maquettes de métiers (fond mosaïque).
- `node scripts/hero-media.mjs` : maquette principale (1600×1000) et mur de fond.
- `node scripts/og.mjs` : image de partage (sombre).
- Toutes décoratives et sans nom d'entreprise : ce **ne sont pas** des réalisations.
  À remplacer par de vrais sites livrés, avec l'accord écrit des clients.

## À ne pas faire

- Ajouter une deuxième animation liée au défilement.
- Mettre une couleur en dur dans un composant.
- Présenter les maquettes comme des clients.
- Charger une image, une vidéo ou une police depuis un serveur tiers
  (la politique de sécurité n'autorise que le site lui-même).

## Conversion

- **Vert = agir.** Seuls les boutons d'action sont verts (`--cta`) ; le bleu
  informe (prix, accents, logo). Un seul élément vert par écran visible.
- **Logo :** une étiquette de prix qui est aussi une page de site. Au survol,
  elle se balance autour de son trou.
- **Preuves réelles seulement.** Fondateur, avis, réalisations et WhatsApp ne
  s'affichent que s'ils sont remplis dans `src/config/site.ts`. Aucun
  placeholder visible, aucun avis ou client inventé.
- **Garantie partout où l'on hésite :** hero, offres, paiement, corrections,
  formulaire, appel final.
