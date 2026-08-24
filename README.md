# WEEKZA — We Build Growth

Site vitrine de l'agence **WEEKZA** : une page, trois langues (🇬🇧 EN / 🇫🇷 FR / 🇸🇦 AR avec support RTL).

## Tech

- [React 19](https://react.dev) + [Vite 7](https://vite.dev)
- [Tailwind CSS 4](https://tailwindcss.com)
- [GSAP](https://gsap.com) (animations)
- Build en un seul fichier HTML via `vite-plugin-singlefile`

## Démarrage

```bash
npm install     # installer les dépendances
npm run dev     # serveur de développement → http://localhost:5173
```

## Build de production

```bash
npm run build   # génère dist/index.html (fichier unique)
npm run preview # prévisualiser le build
```

## Déploiement (GitHub Pages)

Le site en ligne est servi depuis le dossier **`docs/`** (le build est un fichier
HTML unique grâce à `vite-plugin-singlefile`).

➡️ URL : https://bouchaala-montreuil.github.io/my-website/

### Mettre le site à jour

Après une modification du code :

```bash
npm run build          # génère dist/index.html
cp dist/index.html docs/index.html
```

Puis commit + push sur `main` — le site est mis à jour en 1–2 minutes.

## Structure

```
├── index.html                  # point d'entrée (titre, meta, polices)
├── src/
│   ├── App.tsx                 # assemblage des sections
│   ├── index.css               # design system (Tailwind + typographie + couleurs)
│   ├── context/
│   │   └── LanguageContext.tsx # traductions EN/FR/AR + direction RTL
│   └── components/             # une section par composant
│       ├── Loader.tsx          # écran de chargement
│       ├── Navigation.tsx      # barre de navigation + switch de langue
│       ├── Hero.tsx            # bannière principale
│       ├── Services.tsx        # services
│       ├── Portfolio.tsx       # réalisations
│       ├── About.tsx           # à propos
│       ├── Testimonials.tsx    # témoignages
│       ├── Pricing.tsx         # tarifs
│       ├── FAQ.tsx             # questions fréquentes
│       ├── Contact.tsx         # formulaire de contact
│       └── Footer.tsx          # pied de page
└── docs/index.html             # build de production (servi par GitHub Pages)
```

## Modifier les textes / traductions

Tous les textes des trois langues sont centralisés dans
`src/context/LanguageContext.tsx`.
