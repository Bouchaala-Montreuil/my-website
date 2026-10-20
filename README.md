# FEEKZA — Custom Websites

Site vitrine de **FEEKZA** : une offre unique (sites web sur mesure,
195 €/mois tout compris), une page, trois langues (🇬🇧 EN / 🇫🇷 FR / 🇸🇦 AR avec support RTL).

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

➡️ URL : https://feekza.com (custom domain, via `docs/CNAME`)
Ancienne URL : https://bouchaala-montreuil.github.io/my-website/

### DNS (à configurer une fois chez le registrar)

- 4 enregistrements **A** pour `@` :
  `185.199.108.153` · `185.199.109.153` · `185.199.110.153` · `185.199.111.153`
- Optionnel : **CNAME** `www` → `bouchaala-montreuil.github.io`
- Puis : repo Settings → Pages → Custom domain → `feekza.com` → Enforce HTTPS

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
│   ├── config.ts               # Formspree, email, lien de paiement
│   ├── context/
│   │   └── LanguageContext.tsx # traductions EN/FR/AR + direction RTL
│   └── components/             # une section par composant
│       ├── Loader.tsx          # écran de chargement
│       ├── Navigation.tsx      # barre de navigation + switch de langue
│       ├── Hero.tsx            # bannière principale
│       ├── Services.tsx        # ce qui est inclus
│       ├── HowItWorks.tsx      # le processus en 4 étapes
│       ├── Portfolio.tsx       # exemples de sites
│       ├── About.tsx           # à propos
│       ├── Pricing.tsx         # l'offre unique (195 €/mois)
│       ├── FAQ.tsx             # questions fréquentes
│       ├── OrderFlow.tsx       # tunnel de commande (5 étapes)
│       ├── Contact.tsx         # formulaire de contact
│       └── Footer.tsx          # pied de page
└── docs/index.html             # build de production (servi par GitHub Pages)

## Configuration

Tous les points d'entrée externes sont dans `src/config.ts` :
- `FORMSPREE_ENDPOINT` — recevoir les commandes/contact par email
- `CONTACT_EMAIL` — email affiché + fallback mailto
- `PAYMENT_LINK` — lien de paiement Stripe/PayPal (laisser vide = paiement manuel)
```

## Modifier les textes / traductions

Tous les textes des trois langues sont centralisés dans
`src/context/LanguageContext.tsx`.
