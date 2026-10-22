import type { HomePromo, HomeWork, PageDoc } from "./types";

/**
 * Long-form pages for the French site. They are deliberately FR-only for now:
 * the EN and AR versions are concise single-page offers, and pretending to have
 * translated pages that do not exist would break hreflang and trust alike.
 */

export const serviceCreation: PageDoc = {
  slug: "creation-site-web",
  metaTitle: "Création de site web sur mesure — Feekza",
  metaDescription:
    "Un site de 5 pages conçu, écrit et mis en ligne pour votre activité. 195 € TTC/mois, hébergement et modifications comprises. Première version en 48⁠–⁠72 h.",
  eyebrow: "Service 01 — Création de site",
  h1: "Un site qui dit exactement ce que vous faites.",
  lead:
    "Jusqu’à cinq pages conçues pour votre activité, hébergées et maintenues, avec les modifications de contenu comprises. 195 € TTC par mois, sans frais de lancement.",
  factsTitle: "L’offre en un coup d’œil",
  facts: [
    { k: "Prix", v: "195 € TTC / mois" },
    { k: "Frais de lancement", v: "0 €" },
    { k: "Délai", v: "48⁠–⁠72 h" },
    { k: "Pages", v: "5 maximum" },
    { k: "Engagement", v: "6 mois, puis 1 mois de préavis" },
    { k: "Langues", v: "Sites en français, anglais ou arabe" },
  ],
  primaryCta: {
    label: "Ouvrir un dossier",
    href: "#dossier",
    note: "Deux minutes, aucune carte bancaire demandée.",
  },
  sections: [
    {
      id: "pour-qui",
      num: "01",
      label: "Pour qui",
      title: "À qui ce service est destiné",
      note:
        "Un site vitrine professionnel, pas une plateforme. Le périmètre est volontairement étroit pour que le prix et le délai restent tenables.",
      blocks: [
        {
          type: "p",
          text:
            "Feekza s’adresse aux indépendants, artisans, professions libérales, petites entreprises et associations qui ont besoin d’un site crédible pour être trouvés, rassurer et recevoir des demandes. Vous savez ce que vous faites ; le site doit le dire clairement, vite, et sur tous les écrans.",
        },
        {
          type: "ul",
          items: [
            "Vous n’avez pas de site, ou votre site actuel ne vous ressemble plus.",
            "Vous n’avez pas envie d’apprendre un outil de construction de site.",
            "Vous voulez un interlocuteur qui répond, corrige et maintient, pas un abonnement à une interface vide.",
            "Vous acceptez un cadrage écrit avant de commencer, plutôt qu’un devis flou.",
          ],
        },
        {
          type: "note",
          text:
            "Si vous vendez un catalogue de plusieurs centaines de produits, si vous avez besoin d’un espace client ou d’une application métier, ce n’est pas le bon service. Nous vous le dirons avant de prendre le dossier.",
        },
      ],
    },
    {
      id: "livrables",
      num: "02",
      label: "Livrables",
      title: "Ce que vous recevez, concrètement",
      note: "Chaque ligne ci-dessous est comprise dans les 195 € TTC mensuels.",
      blocks: [
        {
          type: "ul",
          items: [
            "La structure et le design des pages, réalisés pour votre activité — pas un thème acheté.",
            "Jusqu’à cinq pages : accueil, services ou prestations, à propos, galerie ou réalisations, contact.",
            "L’intégration responsive, du téléphone à l’écran large, avec des tailles de texte lisibles.",
            "Les bases du référencement : titres, descriptions, structure sémantique, plan du site, données structurées.",
            "Un formulaire de contact qui fonctionne réellement, avec validation et message d’erreur explicite.",
            "L’hébergement, le certificat SSL et une adresse email professionnelle au nom de votre domaine.",
            "Le nom de domaine, offert la première année.",
            "Les modifications de contenu, sans limite de nombre, dans le périmètre des cinq pages.",
          ],
        },
        {
          type: "p",
          text:
            "Les textes peuvent être fournis par vous, ou structurés par nous à partir de vos informations. La rédaction complète de contenus éditoriaux (articles, livres blancs) et la création d’identité visuelle sont chiffrées séparément.",
        },
      ],
    },
    {
      id: "methode",
      num: "03",
      label: "Méthode",
      title: "Quatre étapes, aucune zone d’ombre",
      note: "À chaque étape, vous savez ce qui est attendu de vous et ce qui est attendu de nous.",
      blocks: [
        {
          type: "steps",
          items: [
            {
              title: "Vous ouvrez le dossier",
              body:
                "Quelques questions sur votre activité, vos pages et vos contenus. Aucune carte bancaire n’est demandée pour envoyer le dossier.",
            },
            {
              title: "Nous cadrons par écrit",
              body:
                "Nous vérifions que le projet entre dans l’offre, puis nous confirmons le périmètre, le prix, le délai et le mode de paiement en euros.",
            },
            {
              title: "Vous recevez la première version",
              body:
                "Sous 48⁠–⁠72 h après réception de vos éléments, vous recevez un lien privé vers le site complet. Ce ne sont pas des maquettes : les pages sont réelles, sur ordinateur et sur mobile.",
            },
            {
              title: "Révisions, puis mise en ligne",
              body:
                "Vous indiquez ce qui doit changer ; nous appliquons les corrections sous 24 h. Le site est publié sur votre domaine après votre validation.",
            },
          ],
        },
      ],
    },
    {
      id: "standards",
      num: "04",
      label: "Standards",
      title: "Des choix techniques que vous pouvez vérifier",
      note:
        "Ces standards ne sont pas des options. Ils sont appliqués à ce site, dont les mesures sont publiées.",
      blocks: [
        {
          type: "ul",
          items: [
            "Pages pré-rendues en HTML : le contenu est lisible avant l’exécution du JavaScript, et indexable sans délai.",
            "Aucun constructeur de pages ni plugin tiers : moins de surface de panne et de mise à jour.",
            "Polices auto-hébergées, sans appel à Google Fonts. Aucun outil de mesure d’audience installé par défaut.",
            "Objectif WCAG 2.2 AA : structure sémantique, contrastes vérifiés, navigation au clavier, lien d’évitement.",
            "Objectifs Core Web Vitals : LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1, mesurés avant chaque mise en ligne.",
            "Formulaires avec validation côté serveur, champ anti-spam et message d’échec honnête — jamais de faux succès.",
          ],
        },
        {
          type: "note",
          text:
            "Les mesures de ce site (Lighthouse, axe-core, Web Vitals) sont publiées avec leurs conditions sur la page Réalisations. Nous ne publions pas de chiffres sans dire avec quel outil et dans quelles conditions ils ont été obtenus.",
        },
      ],
    },
    {
      id: "prix",
      num: "05",
      label: "Prix",
      title: "195 € TTC, et la sortie est écrite",
      note: "Le prix affiché est celui qui est débité. Pas de frais de dossier, pas de supplément à la livraison.",
      blocks: [
        {
          type: "ul",
          items: [
            "195 € TTC par mois, TVA incluse, sans frais de lancement.",
            "Premier mois réglé au démarrage du projet, après validation du périmètre.",
            "Engagement de six mois, puis abonnement mensuel résiliable avec un mois de préavis.",
            "Total des douze premiers mois : 2 340 € TTC, hébergement, SSL, email et maintenance compris.",
            "À partir de la deuxième année, le nom de domaine est réglé directement au registrar (repère public : 7,79 € HT par an pour un .fr chez OVHcloud).",
          ],
        },
        {
          type: "p",
          text:
            "Les éléments hors périmètre (boutique, prise de rendez-vous, espace membre, rédaction complète, logo, pages supplémentaires) sont chiffrés avant de commencer, jamais après. Si le projet n’entre pas dans l’offre, nous le disons dès le cadrage.",
        },
      ],
    },
  ],
  limitsTitle: "Où cette offre n’est pas la bonne réponse",
  limitsNote:
    "Nous préférons le dire avant. Un dossier refusé coûte moins cher qu’un projet mal cadré.",
  limits: [
    {
      title: "Vous voulez tout modifier vous-même",
      body:
        "Ce n’est pas un constructeur de site. Les modifications passent par nous, ce qui garantit la cohérence et évite les manipulations risquées. Si l’autonomie complète est une exigence, un outil en autonomie sera plus adapté.",
    },
    {
      title: "Vous vendez un catalogue important",
      body:
        "Une boutique avec des centaines de références, des variantes, des stocks et des transporteurs demande une plateforme e-commerce. Nous pouvons concevoir la vitrine, pas remplacer Shopify ou WooCommerce.",
    },
    {
      title: "Il vous faut un site de trente pages",
      body:
        "L’offre couvre cinq pages. Au-delà, chaque page supplémentaire est chiffrée séparément, ou nous orientons vers un format de projet différent.",
    },
    {
      title: "Vous devez être en ligne demain matin",
      body:
        "Le délai de 48⁠–⁠72 h court à partir de la réception de vos textes, photos et informations. Sans ces éléments, personne ne peut tenir un délai honnête.",
    },
  ],
  faqTitle: "Questions sur la création de site",
  faq: [
    {
      q: "Que se passe-t-il si la première version ne me plaît pas ?",
      a: [
        "Vous demandez des modifications, que nous appliquons sous 24 h. Si, après ces révisions, la version ne vous convient toujours pas, le montant réglé vous est remboursé et le projet s’arrête.",
      ],
    },
    {
      q: "Le site m’appartient-il ?",
      a: [
        "Vos contenus, vos photos et votre nom de domaine vous appartiennent. Le code et l’hébergement restent gérés par Feekza pendant l’abonnement.",
        "Si vous partez, nous vous remettons vos contenus et transférons le domaine. Tant que l’abonnement est actif, le site est exploité et maintenu par nous : c’est la limite honnête du modèle.",
      ],
    },
    {
      q: "Puis-je avoir plusieurs langues ?",
      a: [
        "Oui. Indiquez-le dans le dossier : les versions supplémentaires sont chiffrées séparément. L’arabe est géré en écriture de droite à gauche, sans version dégradée.",
      ],
    },
    {
      q: "Que comprend l’adresse email professionnelle ?",
      a: [
        "Une boîte au nom de votre domaine, par exemple contact@votre-activite.fr, configurée et incluse dans l’abonnement. Les boîtes supplémentaires et les outils de campagne sont chiffrés à part.",
      ],
    },
  ],
  formService: "site-web",
  formTitle: "Décrivez votre activité, nous cadrons le reste",
  formLead:
    "Deux minutes. Vous recevez une confirmation écrite du périmètre avant tout paiement.",
  relatedTitle: "À lire ensuite",
  related: [
    {
      label: "Référencement (SEO)",
      href: "/referencement-seo/",
      note: "Ce qui est inclus dans le site, et ce qui se travaille dans la durée.",
    },
    {
      label: "Réalisations et mesures",
      href: "/realisations/",
      note: "Le site que vous lisez, mesuré et documenté.",
    },
    {
      label: "Le prix, sans astérisque",
      href: "/creation-site-web/#prix",
      note: "Le calcul complet sur douze mois et le comparatif de marché.",
    },
  ],
};

export const serviceSeo: PageDoc = {
  slug: "referencement-seo",
  metaTitle: "Référencement SEO technique et éditorial — Feekza",
  metaDescription:
    "Le socle technique est inclus dans chaque site. Le travail éditorial et la stratégie de contenu sont chiffrés après un audit écrit. Aucune promesse de position.",
  eyebrow: "Service 02 — Référencement",
  h1: "Être trouvé, sans promesses en l’air.",
  lead:
    "Le socle technique est posé sur chaque site que nous construisons. Le travail éditorial, la structure de contenu et le suivi se chiffrent séparément, après un audit écrit.",
  factsTitle: "Le cadre",
  facts: [
    { k: "Socle technique", v: "Inclus dans chaque site" },
    { k: "Audit initial", v: "Écrit, remis avant devis" },
    { k: "Travail éditorial", v: "Sur devis" },
    { k: "Suivi", v: "Mensuel ou mission ponctuelle" },
    { k: "Garantie de position", v: "Aucune — personne ne peut la tenir" },
  ],
  primaryCta: {
    label: "Demander un audit",
    href: "#dossier",
    note: "Décrivez votre site actuel et votre objectif. Réponse sous un jour ouvré.",
  },
  sections: [
    {
      id: "trois-couches",
      num: "01",
      label: "Cadre",
      title: "Le référencement n’est pas un bouton",
      note:
        "Trois couches, trois responsabilités. Nous en pilotons deux ; la troisième se gagne dans le temps.",
      blocks: [
        {
          type: "p",
          text:
            "Le référencement naturel repose sur trois choses : un site que les moteurs peuvent lire et comprendre, des contenus qui répondent à une intention réelle, et une autorité qui se construit par des mentions et des liens. Les deux premières sont du travail. La troisième n’est pas vendable au mois.",
        },
        {
          type: "ul",
          items: [
            "Technique : structure, vitesse, indexation, métadonnées, données structurées, redirections. Inclus dans chaque site.",
            "Contenu : intentions de recherche, plan de pages, rédaction, maillage interne. Chiffré selon le volume.",
            "Autorité : relations, mentions, liens. Nous ne vendons pas de liens et n’en achetons pas.",
          ],
        },
      ],
    },
    {
      id: "socle",
      num: "02",
      label: "Socle inclus",
      title: "Ce que chaque site livré contient déjà",
      note: "Sans ces bases, aucun travail éditorial ne tient.",
      blocks: [
        {
          type: "ul",
          items: [
            "Un titre et une description uniques par page, rédigés à la main.",
            "Une structure de titres cohérente, avec un seul H1 par page et des sections ordonnées.",
            "Des URL lisibles, stables, avec des redirections si une page change d’adresse.",
            "Un plan du site XML, un fichier robots.txt correct et une page 404 utile.",
            "Les données structurées adaptées : organisation, offre, questions fréquentes, fil d’Ariane.",
            "Des performances mesurées (LCP, CLS, INP) et un affichage mobile réellement testé.",
            "Des balises de langue et des alternates cohérents lorsque le site existe en plusieurs langues.",
          ],
        },
        {
          type: "note",
          text:
            "Ce site applique ces règles. Son plan du site, ses métadonnées et ses données structurées sont publics et vérifiables.",
        },
      ],
    },
    {
      id: "editorial",
      num: "03",
      label: "Éditorial",
      title: "Le travail qui se chiffre à part",
      note: "Une mission de contenu commence par un audit, pas par une liste de mots-clés.",
      blocks: [
        {
          type: "ul",
          items: [
            "Audit technique et éditorial du site existant, avec les corrections classées par impact.",
            "Étude des intentions de recherche réelles de vos clients, pas seulement des volumes.",
            "Plan de pages et de contenus : quoi écrire, pour qui, dans quel ordre.",
            "Rédaction ou optimisation des pages, avec une structure lisible et des réponses directes.",
            "Maillage interne et consolidation des pages qui se cannibalisent.",
            "Fiche Google Business Profile et cohérence des informations locales, si votre activité est locale.",
            "Mesure dans Search Console : impressions, clics, pages, requêtes, avant et après.",
          ],
        },
        {
          type: "p",
          text:
            "Le devis précise le nombre de pages, le nombre de cycles de révision et la durée. Il ne contient ni « optimisation continue » floue, ni engagement de résultat chiffré.",
        },
      ],
    },
    {
      id: "deroule",
      num: "04",
      label: "Déroulé",
      title: "Comment se déroule une mission",
      note: "Chaque étape produit un document que vous gardez.",
      blocks: [
        {
          type: "steps",
          items: [
            {
              title: "Audit écrit",
              body:
                "Nous regardons le site, son indexation, ses contenus et ses concurrents directs. Vous recevez les constats, les priorités et ce que nous ne recommanderions pas.",
            },
            {
              title: "Devis et périmètre",
              body:
                "Le devis détaille les pages, les contenus, les cycles de révision et la durée. Vous savez ce qui est inclus et ce qui ne l’est pas.",
            },
            {
              title: "Corrections et contenus",
              body:
                "Nous travaillons par lots : d’abord ce qui bloque l’indexation, ensuite les pages qui peuvent gagner. Chaque lot est vérifié avant publication.",
            },
            {
              title: "Mesure et décision",
              body:
                "Search Console fournit les impressions, les clics et les positions. Nous comparons à la période précédente et décidons de la suite — y compris l’arrêt si le levier ne vaut pas l’investissement.",
            },
          ],
        },
      ],
    },
    {
      id: "mesure",
      num: "05",
      label: "Mesure",
      title: "Ce que nous mesurons, et avec quoi",
      note:
        "Pas de tableau de bord inventé. Les chiffres viennent d’outils que vous pouvez consulter vous-même.",
      blocks: [
        {
          type: "ul",
          items: [
            "Google Search Console : impressions, clics, taux de clic, position moyenne, pages indexées.",
            "Core Web Vitals : mesures de laboratoire avant livraison, puis données de terrain quand le trafic le permet.",
            "Conversions : appels, emails et formulaires reçus, comptés dans votre boîte, pas dans un outil tiers.",
            "Aucun outil de mesure d’audience n’est installé par défaut. Si vous en voulez un, il est choisi avec vous et mentionné dans la politique de confidentialité.",
          ],
        },
        {
          type: "note",
          text:
            "Un site neuf met souvent plusieurs semaines à être indexé et plusieurs mois à se positionner. Nous le disons avant de commencer, pas après.",
        },
      ],
    },
  ],
  limitsTitle: "Ce que nous ne promettrons jamais",
  limitsNote:
    "Le référencement attire les promesses faciles. Voici la liste de celles que nous refusons.",
  limits: [
    {
      title: "La première position garantie",
      body:
        "Personne ne contrôle l’algorithme de Google. Une agence qui garantit une position vend soit un mot-clé sans concurrence, soit une clause qu’elle n’honorera pas.",
    },
    {
      title: "Des résultats en trente jours",
      body:
        "L’indexation, la confiance et les liens prennent du temps. Un audit peut livrer des corrections rapides ; un positionnement durable, non.",
    },
    {
      title: "L’achat de liens",
      body:
        "Nous n’achetons pas de liens, ne participons pas à des réseaux de sites et n’utilisons pas de contenu généré en masse. Le risque est supporté par votre domaine, pas par nous.",
    },
    {
      title: "Du SEO sans site",
      body:
        "Si le site n’existe pas ou ne peut pas être modifié, le premier travail est de le construire. Nous ne vendons pas d’optimisation sur une base absente.",
    },
  ],
  faqTitle: "Questions sur le référencement",
  faq: [
    {
      q: "Le référencement est-il inclus dans les 195 € ?",
      a: [
        "Le socle technique, oui : titres, descriptions, structure, plan du site, données structurées, performance, mobile, indexation.",
        "Le travail éditorial (audit de contenu, plan de pages, rédaction, optimisation continue) est chiffré séparément, car son volume varie fortement d’un projet à l’autre.",
      ],
    },
    {
      q: "Combien coûte une mission SEO ?",
      a: [
        "Cela dépend du nombre de pages, de l’état du site et du volume de contenus à produire. Le devis est remis après l’audit, avec un périmètre et une durée explicites.",
        "Nous ne pratiquons pas de frais de gestion cachés ni de reconduction automatique.",
      ],
    },
    {
      q: "Travaillez-vous sur un site que vous n’avez pas construit ?",
      a: [
        "Oui, si nous pouvons le modifier sans casser ce qui fonctionne. L’audit détermine si le site doit être corrigé ou reconstruit ; nous le disons franchement, même quand la reconstruction est notre intérêt.",
      ],
    },
    {
      q: "Utilisez-vous des outils d’IA pour écrire ?",
      a: [
        "Nous utilisons l’IA pour explorer et structurer, jamais pour publier des pages générées en masse. Chaque page publiée est relue, corrigée et vérifiée contre une intention de recherche réelle.",
      ],
    },
  ],
  formService: "seo",
  formTitle: "Parlez-nous de votre site et de votre objectif",
  formLead:
    "Décrivez la situation actuelle. Nous revenons sous un jour ouvré avec une première lecture, ou une question si le dossier manque d’informations.",
  relatedTitle: "À lire ensuite",
  related: [
    {
      label: "Création de site",
      href: "/creation-site-web/",
      note: "Le socle technique dont dépend tout le reste.",
    },
    {
      label: "Marketing digital",
      href: "/marketing-digital/",
      note: "Quand le référencement ne suffit pas à remplir l’agenda.",
    },
    {
      label: "Réalisations et mesures",
      href: "/realisations/",
      note: "Les chiffres de ce site, avec leur méthode.",
    },
  ],
};

export const serviceMarketing: PageDoc = {
  slug: "marketing-digital",
  metaTitle: "Marketing digital pour petites entreprises — Feekza",
  metaDescription:
    "Fiche Google, contenu local, campagnes Google Ads et pages d’atterrissage. Un objectif, un canal, une mesure. Honoraires sur devis, budget média payé directement.",
  eyebrow: "Service 03 — Marketing digital",
  h1: "Faire venir les bonnes personnes, pas seulement du trafic.",
  lead:
    "Nous travaillons un objectif commercial à la fois : être trouvé localement, générer des demandes, remplir un agenda. Les honoraires sont sur devis ; le budget publicitaire reste chez vous.",
  factsTitle: "Le cadre",
  facts: [
    { k: "Objectif", v: "Un seul, mesurable" },
    { k: "Honoraires", v: "Devis gratuit sous 2 jours ouvrés" },
    { k: "Budget média", v: "Payé directement à la plateforme" },
    { k: "Durée minimale", v: "Annoncée dans le devis" },
    { k: "Commission sur le média", v: "Aucune" },
  ],
  primaryCta: {
    label: "Décrire mon objectif",
    href: "#dossier",
    note: "Un objectif clair suffit pour commencer la conversation.",
  },
  sections: [
    {
      id: "pour-qui",
      num: "01",
      label: "Pour qui",
      title: "Quand le marketing digital a du sens",
      note:
        "Le marketing ne répare pas une offre illisible. Il accélère ce qui fonctionne déjà.",
      blocks: [
        {
          type: "ul",
          items: [
            "Votre site reçoit des visites mais peu de demandes : le problème est souvent la page, pas le trafic.",
            "Votre activité est locale et votre fiche Google Business Profile est incomplète ou incohérente.",
            "Vous voulez tester un canal payant avec un budget limité, sans signer un an de gestion.",
            "Vous avez un lancement ou une offre saisonnière à soutenir sur quelques semaines.",
          ],
        },
        {
          type: "note",
          text:
            "Si votre offre n’est pas claire, la première étape est le site, pas la publicité. Payer pour envoyer du trafic vers une page confuse coûte plus cher que de corriger la page.",
        },
      ],
    },
    {
      id: "leviers",
      num: "02",
      label: "Leviers",
      title: "Ce que nous prenons en charge",
      note: "Chaque levier est chiffré séparément, avec son propre indicateur.",
      blocks: [
        {
          type: "ul",
          items: [
            "Fiche Google Business Profile : catégories, description, horaires, photos, avis — sans jamais solliciter de faux avis.",
            "Pages locales et contenus de service, écrits pour répondre à une intention précise.",
            "Campagnes Google Ads (recherche et Performance Max) : structure, mots-clés exclus, annonces, suivi des conversions.",
            "Pages d’atterrissage dédiées à une campagne, avec un formulaire court et un test réel.",
            "Suivi des conversions : formulaires, appels, emails, avec un événement vérifié avant de dépenser.",
            "Rapport mensuel : dépenses, coût par demande, demandes reçues, décisions recommandées.",
          ],
        },
      ],
    },
    {
      id: "methode",
      num: "03",
      label: "Méthode",
      title: "Un objectif, un canal, une mesure",
      note: "Trois questions avant de dépenser le premier euro.",
      blocks: [
        {
          type: "steps",
          items: [
            {
              title: "Quel résultat compte ?",
              body:
                "Un appel, un formulaire, une réservation, une vente ? Nous écrivons l’objectif et le seuil à partir duquel le canal est rentable.",
            },
            {
              title: "Quel canal, à quelle condition ?",
              body:
                "Nous choisissons un seul levier pour commencer, avec un budget plafonné et une durée d’essai. Pas de dispersion sur cinq plateformes.",
            },
            {
              title: "Comment sait-on que ça marche ?",
              body:
                "Le suivi des conversions est installé et testé avant le lancement. Si l’événement ne remonte pas, la campagne ne démarre pas.",
            },
            {
              title: "On continue ou on arrête ?",
              body:
                "À la fin de la période d’essai, les chiffres décident. Si le coût par demande dépasse ce que vous pouvez payer, nous arrêtons le canal.",
            },
          ],
        },
      ],
    },
    {
      id: "budget",
      num: "04",
      label: "Budget",
      title: "Deux lignes de dépense, jamais mélangées",
      note:
        "Vous devez pouvoir lire votre facture sans calculateur. Voici comment elle est construite.",
      blocks: [
        {
          type: "p",
          text:
            "Nous ne publions pas de tarif marketing, parce qu’une mission commence toujours par un audit : le prix juste pour un commerce local qui veut remplir son agenda n’est pas celui d’une entreprise qui veut ouvrir un deuxième établissement. En revanche, le devis est écrit et tient en une page : l’objectif chiffré, le canal retenu, le nombre de jours de travail, le budget média que vous engagez directement et la durée de l’essai. Il est gratuit, envoyé sous deux jours ouvrés, et il indique aussi le seuil en dessous duquel nous refusons la mission.",
        },
        {
          type: "ul",
          items: [
            "Honoraires de gestion : un montant fixe, défini dans le devis, pour le travail décrit.",
            "Budget publicitaire : payé directement à Google ou à la plateforme, avec votre moyen de paiement. Nous n’y prenons aucune commission.",
            "Aucun pourcentage sur les dépenses média, aucun frais de « setup » caché.",
            "Si le budget média change, les honoraires ne changent pas automatiquement.",
            "Les outils payants éventuels (suivi d’appels, emailing) sont listés séparément et restent à votre nom.",
          ],
        },
        {
          type: "note",
          text:
            "Un budget publicitaire insuffisant ne devient pas rentable en ajoutant des honoraires. Nous le disons avant le lancement.",
        },
      ],
    },
    {
      id: "ce-que-nous-ne-faisons-pas",
      num: "05",
      label: "Limites",
      title: "Ce que nous ne faisons pas",
      note: "Ces refus font partie du service, pas d’une clause de style.",
      blocks: [
        {
          type: "ul",
          items: [
            "Aucun faux avis, aucun achat d’avis, aucune relance automatisée pour obtenir une note.",
            "Aucun email ou message non sollicité en masse.",
            "Aucun engagement de résultat chiffré sur un canal dont la plateforme fixe les enchères.",
            "Aucune gestion de compte publicitaire sans accès vérifié et sans suivi de conversion fonctionnel.",
            "Aucune campagne sur un secteur réglementé sans vérification préalable des règles applicables.",
          ],
        },
      ],
    },
  ],
  limitsTitle: "Où le marketing digital ne sert à rien",
  limitsNote: "Mieux vaut un canal de moins qu’un budget gaspillé.",
  limits: [
    {
      title: "Sans capacité de réponse",
      body:
        "Une campagne qui génère dix demandes par semaine ne sert à rien si personne ne répond sous trois jours. Nous vérifions ce point avant de commencer.",
    },
    {
      title: "Sur une offre non différenciée",
      body:
        "Si votre page dit la même chose que cinq concurrents, la publicité achètera des clics chers. Le travail préalable est le positionnement et la page, pas l’enchère.",
    },
    {
      title: "Avec un budget trop faible",
      body:
        "Sous un certain seuil, un canal ne produit pas assez de données pour être jugé. Nous préférons le dire et attendre, plutôt que de facturer une gestion décorative.",
    },
    {
      title: "Pour « être sur les réseaux sociaux »",
      body:
        "Une présence sans objectif ni rythme de publication est une dépense sans fin. Si le canal n’a pas de rôle commercial clair, nous ne le recommandons pas.",
    },
  ],
  faqTitle: "Questions sur le marketing digital",
  faq: [
    {
      q: "Faut-il un budget publicitaire minimum ?",
      a: [
        "Le seuil dépend du secteur et de la zone géographique. Nous le calculons à partir du coût par clic observé et du nombre de demandes nécessaires pour être rentable, puis nous vous disons si votre budget peut atteindre ce seuil.",
      ],
    },
    {
      q: "Gérez-vous les réseaux sociaux ?",
      a: [
        "Pas comme un service de publication quotidienne. Nous pouvons cadrer une présence, produire des pages et des contenus de référence, ou préparer une campagne. La production de contenu social régulière n’est pas notre métier principal.",
      ],
    },
    {
      q: "Puis-je arrêter quand je veux ?",
      a: [
        "La durée minimale est indiquée dans le devis, ainsi que le préavis. Il n’y a pas de reconduction automatique cachée.",
        "Le compte publicitaire et les données restent à votre nom : vous conservez l’historique si nous arrêtons.",
      ],
    },
    {
      q: "Travaillez-vous avec des associations ?",
      a: [
        "Oui. Pour les associations à budget limité, nous privilégions la fiche Google, les pages locales et le contenu utile avant toute dépense publicitaire.",
      ],
    },
  ],
  formService: "marketing",
  formTitle: "Décrivez votre objectif commercial",
  formLead:
    "Un appel, une réservation, une vente ? Dites-nous lequel compte le plus, et ce que vous avez déjà essayé.",
  relatedTitle: "À lire ensuite",
  related: [
    {
      label: "Référencement (SEO)",
      href: "/referencement-seo/",
      note: "Le canal qui ne s’arrête pas quand le budget s’arrête.",
    },
    {
      label: "Création de site",
      href: "/creation-site-web/",
      note: "Une page qui convertit avant d’acheter du trafic.",
    },
    {
      label: "Réalisations et mesures",
      href: "/realisations/",
      note: "Notre méthode de mesure, appliquée à ce site.",
    },
  ],
};

export const workPage: PageDoc = {
  slug: "realisations",
  metaTitle: "Réalisations et mesures — Feekza",
  metaDescription:
    "Aucun logo client inventé. Une étude de cas vérifiable : ce site, ses mesures Lighthouse et axe-core, et la méthode complète pour les publier.",
  eyebrow: "Réalisations",
  h1: "Le travail vérifiable, pas la galerie de logos.",
  lead:
    "Nous n’avons pas encore de projets clients à publier. Plutôt que d’inventer des études de cas, voici ce que vous pouvez inspecter aujourd’hui — et la place exacte des prochains dossiers.",
  factsTitle: "L’état réel",
  facts: [
    { k: "Projets clients publiés", v: "0 à ce jour" },
    { k: "Démonstrations vérifiables", v: "1 — ce site" },
    { k: "Accessibilité", v: "0 violation axe-core" },
    { k: "Lighthouse mobile", v: "99 / 100 / 100 / 100" },
    { k: "Mesuré le", v: "20 octobre 2026" },
  ],
  primaryCta: {
    label: "Ouvrir un dossier",
    href: "#dossier",
    note: "Vous pouvez inspecter le code et les mesures avant de nous écrire.",
  },
  sections: [
    {
      id: "etude",
      num: "01",
      label: "Étude de cas",
      title: "feekza.com — refonte complète, mesurée",
      note:
        "Le seul projet que nous pouvons documenter sans invention : le site que vous lisez.",
      blocks: [
        {
          type: "p",
          text:
            "L’ancien site était une page unique construite autour d’animations lourdes. Un écran de chargement occupait près de trois secondes avant le premier contenu ; le débordement horizontal atteignait 20 à 50 px sur cinq largeurs d’écran ; sept champs de formulaire n’avaient pas d’étiquette accessible ; et le formulaire affichait un succès même lorsque l’envoi échouait.",
        },
        {
          type: "p",
          text:
            "La refonte a remplacé cette page par un site statique pré-rendu, avec des pages de service, des pages légales complètes et un formulaire dont les états d’erreur sont réels. Le contenu de l’offre est resté identique ; c’est la manière de le dire et de le livrer qui a changé.",
        },
        {
          type: "metrics",
          items: [
            { value: "99", label: "Performance mobile", note: "Lighthouse 12, profil mobile par défaut" },
            { value: "100", label: "Accessibilité", note: "Lighthouse 12 / axe-core 4" },
            { value: "0", label: "Violation WCAG 2.2 AA", note: "axe-core, chaque page publiée, à 390 px et 1440 px" },
            { value: "0,8 s", label: "LCP mobile simulé", note: "Moto G Power, 4G, CPU ralenti ; pire page mesurée le 20 octobre 2026" },
          ],
        },
        {
          type: "ul",
          items: [
            "Quatorze pages pré-rendues : le contenu et les métadonnées existent sans JavaScript, et l’hydratation attend le chargement complet plutôt que de retarder l’affichage.",
            "Une seule langue, tenue de bout en bout : la version française est la seule publiée, plutôt que trois approximatives.",
            "Formulaire en six questions, validation explicite, message d’échec honnête, solution de repli par email.",
            "Pages légales complètes, avec les informations que seul l’éditeur peut fournir signalées comme telles.",
            "Zéro requête tierce : polices auto-hébergées, aucune mesure d’audience, aucune image distante.",
          ],
        },
        {
          type: "ul",
          items: [
            "Le code source est public : github.com/Bouchaala-Montreuil/my-website. Vous pouvez lire chaque décision, y compris celles qui ont été annulées.",
            "Aucune capture d’écran ici : une capture vieillit en silence, et celle de ce site montrait déjà une version qui n’existe plus. La page que vous lisez est la démonstration.",
            "Les mesures ci-dessus se refont en trois minutes : Lighthouse et axe-core sont gratuits, et la méthode exacte est décrite juste en dessous.",
          ],
        },
      ],
    },
    {
      id: "methode",
      num: "02",
      label: "Méthode",
      title: "Comment nous mesurons, et dans quelles conditions",
      note:
        "Une capture d’écran d’un score ne vaut rien sans l’outil, la date et les réglages.",
      blocks: [
        {
          type: "ul",
          items: [
            "Lighthouse 12.8.2, Chromium 131, serveur statique local avec compression gzip et HTTP/1.1.",
            "Profil mobile par défaut de Lighthouse (Moto G Power simulé, 4G, ralentissement CPU ×4) et profil desktop.",
            "axe-core 4.14 avec les règles WCAG 2.0, 2.1 et 2.2 niveaux A et AA, sur chaque page, à 390 px et 1440 px.",
            "Mesures de laboratoire uniquement : nous n’avons pas de données de terrain tant que le site n’a pas de trafic mesuré.",
            "Aucun chiffre n’est comparé à une autre période sans indiquer les mêmes réglages.",
          ],
        },
        {
          type: "note",
          text:
            "Les scores dépendent de la machine, du réseau et de la version des outils. Ils démontrent une marge de sécurité, pas une garantie de résultat identique chez vous.",
        },
      ],
    },
    {
      id: "emplacements",
      num: "03",
      label: "Prochains dossiers",
      title: "Ce qui sera publié ici",
      note:
        "Trois emplacements, prêts à recevoir des projets réels. Aucun ne sera rempli avec un exemple fictif.",
      blocks: [
        {
          type: "p",
          text:
            "Les trois premiers dossiers bénéficient du même prix et du même périmètre que les suivants. Ce qui change : vous acceptez que le projet soit documenté publiquement — le contexte, les décisions, la mesure avant et après — et nous fournissons ce dossier complet, sans le réécrire après coup.",
        },
        {
          type: "steps",
          items: [
            {
              title: "Le contexte",
              body:
                "L’activité, la situation de départ, ce qui ne fonctionnait pas. Avec les chiffres disponibles avant le projet, même s’ils sont mauvais.",
            },
            {
              title: "Le périmètre et les décisions",
              body:
                "Ce qui a été fait, ce qui a été refusé, et pourquoi. Les arbitrages techniques et éditoriaux, pas seulement le résultat final.",
            },
            {
              title: "La mesure après",
              body:
                "Le même outil, les mêmes réglages, à une date explicite. Ce qui a bougé, ce qui n’a pas bougé, et ce qui reste inconnu.",
            },
          ],
        },
        {
          type: "note",
          text:
            "Un dossier ne sera publié qu’avec l’accord écrit du client. Sans accord, le projet reste privé — même s’il est réussi.",
        },
      ],
    },
    {
      id: "regles",
      num: "04",
      label: "Règles",
      title: "Ce que nous ne publierons pas",
      note: "Ces règles s’appliquent à nous, pas seulement aux autres.",
      blocks: [
        {
          type: "ul",
          items: [
            "Aucun logo client sans autorisation écrite.",
            "Aucun témoignage rédigé par nous et attribué à un client.",
            "Aucun chiffre de résultat sans outil, date et conditions.",
            "Aucune capture de « avant / après » sans les deux mesures complètes.",
            "Aucune étude de cas sur un projet que nous n’avons pas réalisé nous-mêmes.",
          ],
        },
        {
          type: "quote",
          text:
            "Une page de réalisations sans preuve n’est pas une page de réalisations. C’est une décoration.",
          source: "Notre règle interne",
        },
      ],
    },
  ],
  limitsTitle: "Les limites de cette page",
  limitsNote: "Une démonstration n’est pas un portefeuille client.",
  limits: [
    {
      title: "Un seul projet",
      body:
        "Ce site est notre propre travail. Il prouve une méthode, pas une capacité à livrer pour un client externe dans des contraintes qui ne sont pas les nôtres.",
    },
    {
      title: "Une mesure auto-réalisée",
      body:
        "Nous mesurons notre propre site. C’est vérifiable, mais ce n’est pas une évaluation indépendante. Les outils sont publics : refaites la mesure si vous le souhaitez.",
    },
    {
      title: "Aucun résultat commercial",
      body:
        "Nous ne publions pas de taux de conversion, de chiffre d’affaires généré ou de position obtenue, faute de projets clients documentés. Ces chiffres viendront avec les dossiers, pas avant.",
    },
  ],
  faqTitle: "Questions sur les réalisations",
  faq: [
    {
      q: "Pourquoi n’y a-t-il aucun projet client ?",
      a: [
        "Nous ne publions que ce que nous pouvons prouver. Les premiers dossiers seront ajoutés avec l’accord écrit des clients, leurs mesures et leurs limites.",
      ],
    },
    {
      q: "Puis-je voir le code de ce site ?",
      a: [
        "Oui. Le dépôt est public : github.com/Bouchaala-Montreuil/my-website. Le HTML, le CSS, les données structurées et l’historique des décisions s’y trouvent, y compris les modifications annulées.",
      ],
    },
    {
      q: "Les scores Lighthouse sont-ils fiables ?",
      a: [
        "Ils mesurent une situation donnée sur une machine donnée. Ils sont utiles pour comparer avant et après avec les mêmes réglages, pas pour promettre un score chez vous.",
      ],
    },
    {
      q: "Acceptez-vous des projets qui ne seront pas publiés ?",
      a: [
        "Oui, à condition que la confidentialité soit prévue dès le départ. Nous ne publions rien sans accord écrit.",
      ],
    },
  ],
  relatedTitle: "À lire ensuite",
  related: [
    {
      label: "Création de site",
      href: "/creation-site-web/",
      note: "Le service derrière cette démonstration.",
    },
    {
      label: "Référencement (SEO)",
      href: "/referencement-seo/",
      note: "Le socle technique qui rend ces pages trouvables.",
    },
    {
      label: "À propos de Feekza",
      href: "/a-propos/",
      note: "Ce que nous refusons de faire, et pourquoi.",
    },
  ],
};

export const aboutPage: PageDoc = {
  slug: "a-propos",
  metaTitle: "À propos de Feekza — méthode et limites",
  metaDescription:
    "Un petit studio qui écrit ses limites avant ses promesses. Notre méthode, nos refus, et ce que vous pouvez vérifier avant de nous confier un projet.",
  eyebrow: "Le studio",
  h1: "Un studio qui écrit ses limites avant ses promesses.",
  lead:
    "Feekza conçoit et maintient des sites pour des indépendants et des petites entreprises. Le studio est volontairement petit, le périmètre est écrit, et ce que nous ne savons pas faire est dit avant la signature.",
  factsTitle: "En bref",
  facts: [
    { k: "Ce que nous faisons", v: "Des sites web ; le reste à la demande" },
    { k: "Langues", v: "Sites en français, anglais ou arabe" },
    { k: "Prix", v: "Affiché, pas de devis surprise" },
    { k: "Réponse", v: "Sous un jour ouvré" },
    { k: "Engagement", v: "6 mois, puis 1 mois de préavis" },
  ],
  primaryCta: {
    label: "Nous écrire",
    href: "#dossier",
    note: "Un dossier complet vaut mieux qu’un long email.",
  },
  sections: [
    {
      id: "pratique",
      num: "01",
      label: "Pratique",
      title: "Ce que nous faisons, et pour qui",
      note: "Un métier principal, deux compléments qui ne s’imposent à personne.",
      blocks: [
        {
          type: "p",
          text:
            "Nous construisons des sites vitrines professionnels, nous posons leur socle de référencement, et nous aidons les petites structures à gagner des demandes là où leurs clients cherchent réellement. Notre clientèle type : un indépendant, un artisan, une profession libérale ou une très petite entreprise qui n’a pas de service marketing interne.",
        },
        {
          type: "ul",
          items: [
            "Un site sur abonnement, à prix fixe, avec un périmètre de cinq pages.",
            "Le socle technique du référencement, inclus dans chaque site.",
            "Des missions de contenu et d’acquisition chiffrées séparément, quand elles ont un sens.",
          ],
        },
      ],
    },
    {
      id: "methode",
      num: "02",
      label: "Méthode",
      title: "Comment nous travaillons",
      note: "Ces quatre règles expliquent la plupart de nos décisions.",
      blocks: [
        {
          type: "steps",
          items: [
            {
              title: "Écrit avant oral",
              body:
                "Le périmètre, le prix, le délai et la sortie figurent dans un document. Une promesse qui n’est pas écrite n’existe pas.",
            },
            {
              title: "Mesuré, pas supposé",
              body:
                "Performance, accessibilité, indexation : nous mesurons avec des outils publics et nous publions les conditions. Un avis ne remplace pas une mesure.",
            },
            {
              title: "Accessible par défaut",
              body:
                "Structure sémantique, contrastes, clavier, mouvements réduits. L’accessibilité n’est pas une option facturée à part.",
            },
            {
              title: "Sans dépendance inutile",
              body:
                "Peu de dépendances techniques, pas de constructeur de pages, pas de traceur par défaut. Moins de pièces mobiles, moins de pannes.",
            },
          ],
        },
      ],
    },
    {
      id: "refus",
      num: "03",
      label: "Refus",
      title: "Ce que nous refusons de faire",
      note: "Une liste courte, appliquée sans exception.",
      blocks: [
        {
          type: "ul",
          items: [
            "Inventer des témoignages, des logos clients, des chiffres de résultat ou des certifications.",
            "Garantir une position dans Google ou un volume de demandes.",
            "Afficher un prix d’appel qui change après le premier échange.",
            "Utiliser des schémas sombres : cases précochées, abonnements cachés, résiliation entravée.",
            "Facturer un travail que nous ne savons pas faire correctement.",
          ],
        },
        {
          type: "p",
          text:
            "Ces refus coûtent des projets. Ils évitent surtout les projets qui se terminent mal. Si vous cherchez un prestataire qui dira oui à tout, nous ne sommes pas le bon choix.",
        },
      ],
    },
    {
      id: "droits",
      num: "04",
      label: "Vos droits",
      title: "Ce qui vous appartient",
      note: "La propriété et la sortie sont écrites, pas suggérées.",
      blocks: [
        {
          type: "ul",
          items: [
            "Vos contenus, vos photos et vos textes vous appartiennent.",
            "Votre nom de domaine vous appartient ; nous le configurons et le transférons si vous partez.",
            "Le code et l’hébergement restent gérés par Feekza pendant l’abonnement.",
            "Après six mois, l’abonnement est mensuel avec un mois de préavis. Aucune reconduction forcée.",
            "Vous pouvez demander une copie de vos contenus à tout moment.",
            "Vos données personnelles sont décrites dans la politique de confidentialité, avec leurs destinataires.",
          ],
        },
      ],
    },
    {
      id: "contact",
      num: "05",
      label: "Contact",
      title: "Qui vous répond",
      note: "Un seul interlocuteur, joignable par écrit.",
      blocks: [
        {
          type: "p",
          text:
            "Les dossiers et les emails arrivent dans la même boîte. Nous répondons sous un jour ouvré, généralement plus vite. Si votre demande sort de notre périmètre, nous vous le disons et, quand nous connaissons quelqu’un de compétent, nous vous orientons.",
        },
        {
          type: "note",
          text:
            "Les informations d’immatriculation de l’éditeur figurent dans les mentions légales. Les champs que seul l’éditeur peut fournir y sont signalés comme à compléter, plutôt que remplis avec une approximation.",
        },
      ],
    },
  ],
  limitsTitle: "Les limites du studio",
  limitsNote:
    "Un petit studio a des avantages et des contraintes. Voici les contraintes.",
  limits: [
    {
      title: "Une capacité limitée",
      body:
        "Nous ne prenons qu’un nombre restreint de projets simultanément. Un délai annoncé est tenu parce que nous refusons les dossiers que nous ne pouvons pas traiter.",
    },
    {
      title: "Pas une agence intégrée",
      body:
        "Pas de studio photo, pas de régie publicitaire, pas d’équipe de développeurs disponible pour une application. Nous travaillons avec des partenaires quand le projet l’exige, et nous le disons.",
    },
    {
      title: "Pas de garantie de résultat commercial",
      body:
        "Nous garantissons un périmètre, un délai et une qualité de livraison. Nous ne garantissons pas un chiffre d’affaires, un classement ou un volume de demandes.",
    },
  ],
  faqTitle: "Questions sur le studio",
  faq: [
    {
      q: "Où est basé Feekza ?",
      a: [
        "Les informations d’immatriculation et l’adresse de l’éditeur figurent dans les mentions légales. Nous ne publions pas d’adresse approximative pour donner l’impression d’une implantation que nous n’avons pas.",
      ],
    },
    {
      q: "Travaillez-vous avec des clients hors de France ?",
      a: [
        "Oui, en français, en anglais ou en arabe. Les échanges sont écrits, ce qui rend les fuseaux horaires moins gênants. Le cadre contractuel reste le droit français.",
      ],
    },
    {
      q: "Puis-je vous rencontrer ?",
      a: [
        "Un échange téléphonique ou en visioconférence peut être organisé après réception du dossier. Nous privilégions l’écrit pour les décisions qui engagent le périmètre et le prix.",
      ],
    },
    {
      q: "Reprenez-vous un site existant ?",
      a: [
        "Cela dépend de son état technique. Nous auditons d’abord, puis nous disons s’il vaut mieux corriger ou reconstruire. La réponse est écrite, avec les raisons.",
      ],
    },
  ],
  relatedTitle: "À lire ensuite",
  related: [
    {
      label: "Création de site",
      href: "/creation-site-web/",
      note: "L’offre principale, détaillée.",
    },
    {
      label: "Réalisations et mesures",
      href: "/realisations/",
      note: "La preuve que nous acceptons de publier.",
    },
    {
      label: "Mentions légales",
      href: "/mentions-legales/",
      note: "L’éditeur, l’hébergeur et les informations à compléter.",
    },
  ],
};

export const servicePages: PageDoc[] = [
  serviceCreation,
  serviceSeo,
  serviceMarketing,
  workPage,
  aboutPage,
];

export const homePromo: HomePromo = {
  head: {
    num: "01",
    label: "Trois métiers",
    title: "Un site solide, puis les gens qui le trouvent.",
    note:
      "La création de site est notre offre principale. Le référencement et l’acquisition se travaillent ensuite, avec un périmètre écrit.",
  },
  items: [
    {
      index: "01",
      tag: "À partir de 195 € TTC / mois",
      title: "Création de site",
      body:
        "Un site vitrine de cinq pages, conçu pour votre activité, hébergé et maintenu. Première version en 48⁠–⁠72 h, modifications comprises.",
      href: "/creation-site-web/",
      cta: "Voir le service",
    },
    {
      index: "02",
      tag: "Sur devis, après audit",
      title: "Référencement",
      body:
        "Le socle technique est inclus dans chaque site. Le travail éditorial — intentions, plan de pages, contenus, maillage — se chiffre séparément.",
      href: "/referencement-seo/",
      cta: "Voir la méthode",
    },
    {
      index: "03",
      tag: "Sur devis, sans commission média",
      title: "Marketing digital",
      body:
        "Fiche Google, pages locales, campagnes Google Ads. Un objectif, un canal, une mesure. Le budget publicitaire reste chez vous.",
      href: "/marketing-digital/",
      cta: "Voir le cadre",
    },
  ],
};

export const homeWork: HomeWork = {
  head: {
    num: "09",
    label: "Réalisations",
    title: "Pas de portfolio gonflé.",
    note:
      "Nous n’avons pas encore de projets clients publiables. Ce site est la seule démonstration que nous pouvons mesurer.",
  },
  title: "Ce site, mesuré et documenté",
  body:
    "Lighthouse mobile : 99 en performance, 100 en accessibilité, 100 en bonnes pratiques, 100 en SEO. Zéro violation axe-core sur chaque page publiée. Les conditions de mesure sont publiées, pas seulement les scores.",
  metrics: [
    { value: "99", label: "Performance mobile" },
    { value: "0", label: "Violation WCAG 2.2 AA" },
    { value: "0,8 s", label: "LCP mobile simulé" },
  ],
  cta: { label: "Voir l’étude de cas", href: "/realisations/" },
};
