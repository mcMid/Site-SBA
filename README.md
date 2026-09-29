# Site « Studio Romand » — sites internet à prix fixe

Site statique Astro pour vendre des sites à des indépendants et PME de Suisse
romande : deux offres à prix fixe, tableau oui / non, garantie, formulaire.

## Commandes

```bash
npm install
npm run dev      # http://localhost:4321 (ou le port donné)
npm run check    # build + contrôles SEO/qualité (bloque la publication en cas de défaut)
```

Images générées (à relancer après un changement de prix ou de couleurs) :

```bash
node scripts/cards.mjs && node scripts/hero-media.mjs && node scripts/og.mjs
```

## Où changer quoi

| Fichier | Contenu |
|---|---|
| `src/config/offre.ts` | Prix, délais, tableau oui / non, garantie, abonnement, étapes, FAQ. Tout le site en découle. |
| `src/config/site.ts` | Nom, domaine, coordonnées, WhatsApp, fondateur, avis Google, réalisations, statistiques. |
| `src/styles/global.css` | Design : couleurs par thème (sombre / clair), typographies, composants. |
| `DA.md` | Direction artistique et règles à respecter. |

## Avant la mise en ligne

1. Remplacer tous les `A_REMPLIR` de `src/config/site.ts` (le build de
   production échoue sinon) et le domaine dans `astro.config.mjs`.
2. Remplir les blocs de conversion, masqués tant qu'ils sont vides
   (`npm run check` liste ceux qui manquent) : WhatsApp, téléphone, fondateur
   (photo 400×400 dans `public/`), avis Google, réalisations (captures
   1200×750 dans `public/realisations/`, accord écrit des clients), Plausible.
3. Déployer sur Netlify (`netlify.toml` : build, en-têtes de sécurité,
   formulaire, proxy Plausible). Tester un envoi du formulaire.
4. Créer la fiche Google Business Profile, soumettre le sitemap dans la
   Search Console.
