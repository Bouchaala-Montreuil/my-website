import type { PageDoc } from "./types";

/**
 * Contact and editorial pages. They complete the buying journey: the service
 * pages argue, these answer "what happens if I write", and the guides answer
 * the questions people search before they are ready to talk.
 *
 * Every price quoted here comes from a public page that was checked on
 * 20 October 2026; the source links are printed in the guide itself.
 */

const UPDATED = "2026-10-20";

export const contactPage: PageDoc = {
  slug: "contact",
  metaTitle: "Contact et dossier de projet — Feekza",
  metaDescription:
    "Décrivez votre activité en deux minutes. Réponse sous un jour ouvré, périmètre écrit avant tout paiement, aucune carte bancaire demandée.",
  eyebrow: "Contact",
  h1: "Parlez-nous de votre projet, en deux minutes.",
  lead:
    "Le formulaire remplace le premier appel. Il nous donne assez d’informations pour répondre avec un périmètre, un prix et une date — pas avec une invitation à « échanger ».",
  factsTitle: "Ce qu’il faut savoir",
  facts: [
    { k: "Réponse", v: "Sous 1 jour ouvré" },
    { k: "Langues", v: "Français, anglais, arabe" },
    { k: "Prix du site", v: "195 € TTC / mois" },
    { k: "Frais de lancement", v: "0 €" },
    { k: "Engagement", v: "6 mois, puis 1 mois de préavis" },
    { k: "Paiement", v: "Après périmètre validé" },
  ],
  primaryCta: {
    label: "Ouvrir un dossier",
    href: "#dossier",
    note: "Aucune carte bancaire, aucun compte à créer.",
  },
  sections: [
    {
      id: "ce-qui-se-passe",
      num: "01",
      label: "La suite",
      title: "Ce qui se passe après l’envoi",
      note: "Trois étapes, aucune relance commerciale automatisée.",
      blocks: [
        {
          type: "steps",
          items: [
            {
              title: "Nous lisons votre dossier",
              body:
                "Sous un jour ouvré, nous vérifions que le projet entre dans l’offre : cinq pages, un site vitrine, un contenu que vous pouvez fournir ou faire rédiger.",
            },
            {
              title: "Nous répondons par écrit",
              body:
                "Périmètre proposé, prix, date de première version, ce qui n’est pas inclus. Si le projet ne nous convient pas, nous le disons et nous indiquons vers quel type de prestataire aller.",
            },
            {
              title: "Vous décidez, puis nous produisons",
              body:
                "Le premier mois n’est réglé qu’après votre accord écrit. La première version arrive ensuite sous 48⁠–⁠72 h après réception de vos textes et images.",
            },
          ],
        },
        {
          type: "note",
          text:
            "Aucun montant n’est prélevé à l’envoi du dossier. Le lien de paiement n’est transmis qu’avec le périmètre accepté.",
        },
      ],
    },
    {
      id: "ecrire",
      num: "02",
      label: "Direct",
      title: "Écrire sans passer par le formulaire",
      note: "Pour une question courte, un litige ou une demande de facture.",
      blocks: [
        {
          type: "p",
          text:
            "Écrivez à contact@feekza.com. Précisez l’objet en une ligne et, si votre message concerne un site existant, l’adresse du site. Nous répondons dans les mêmes délais que pour le formulaire.",
        },
        {
          type: "ul",
          items: [
            "Pour un nouveau projet, le formulaire reste plus rapide : il évite trois allers-retours.",
            "Pour une correction sur un site en production, indiquez la page et ce qui doit changer.",
            "Pour une facture ou un changement de coordonnées, indiquez le nom utilisé lors de la commande.",
          ],
        },
      ],
    },
    {
      id: "preparer",
      num: "03",
      label: "Préparer",
      title: "Ce qui rend une réponse utile",
      blocks: [
        {
          type: "p",
          text:
            "Vous n’avez pas besoin d’un cahier des charges. Trois éléments suffisent pour que notre réponse soit précise plutôt que prudente.",
        },
        {
          type: "ul",
          items: [
            "Ce que vous vendez, à qui, et dans quelle zone vous intervenez.",
            "Les trois pages qui comptent le plus pour vos clients.",
            "Ce que vous avez déjà : textes, photos, logo, nom de domaine.",
            "La date à laquelle le site doit être en ligne, et pourquoi cette date.",
          ],
        },
        {
          type: "note",
          text:
            "Si vous n’avez ni textes ni photos, dites-le. Nous pouvons structurer le contenu à partir d’un entretien ; la rédaction complète et la photographie sont chiffrées à part.",
        },
      ],
    },
  ],
  limitsTitle: "Ce que ce formulaire n’est pas",
  limitsNote:
    "Un dossier envoyé n’est ni un contrat, ni une commande, ni un engagement de votre part.",
  limits: [
    {
      title: "Pas un devis immédiat",
      body:
        "Le formulaire ne calcule pas de prix automatiquement. Le prix du site est public ; les missions de référencement et d’acquisition sont chiffrées après lecture.",
    },
    {
      title: "Pas une file d’attente payante",
      body:
        "Nous ne vendons pas de priorité. Les projets sont pris dans l’ordre où les périmètres sont acceptés, dans la limite de ce que le studio peut tenir.",
    },
    {
      title: "Pas un outil de prospection",
      body:
        "Nous n’ajoutons personne à une liste de diffusion et nous n’envoyons pas de relance automatisée. Une seule réponse écrite, puis c’est vous qui décidez.",
    },
  ],
  faqTitle: "Questions sur la prise de contact",
  faq: [
    {
      q: "Faut-il déjà avoir un nom de domaine ?",
      a: [
        "Non. S’il n’existe pas, nous l’enregistrons et il est offert la première année. S’il existe déjà, nous récupérons les accès ou nous vous guidons pour les transférer.",
        "Le renouvellement annuel est ensuite réglé directement au registrar ; pour un .fr chez OVHcloud, il était de 7,79 € HT par an au 20 octobre 2026.",
      ],
    },
    {
      q: "Que faites-vous des informations envoyées ?",
      a: [
        "Elles servent uniquement à répondre à votre demande et à préparer le périmètre. Elles ne sont ni revendues ni utilisées pour de la prospection.",
        "Le détail des traitements, des durées de conservation et des droits figure dans la politique de confidentialité.",
      ],
    },
    {
      q: "Puis-je demander un délai plus court ?",
      a: [
        "Le délai de 48⁠–⁠72 h court à partir du moment où nous avons vos textes et vos images. Il n’existe pas de version accélérée payante : ce serait vendre une promesse que la production ne peut pas tenir.",
      ],
    },
  ],
  formService: "site-web",
  schemaType: "WebPage",
  formTitle: "Ouvrir un dossier",
  formLead:
    "Six questions, deux minutes, et une réponse écrite sous un jour ouvré.",
  relatedTitle: "Avant d’écrire",
  related: [
    {
      label: "Création de site",
      href: "/creation-site-web/",
      note: "Le périmètre exact, les délais et ce qui n’est pas inclus.",
    },
    {
      label: "Combien coûte un site vitrine",
      href: "/ressources/combien-coute-un-site-vitrine/",
      note: "Les prix observés ailleurs, et ce qu’ils cachent.",
    },
    {
      label: "À propos du studio",
      href: "/a-propos/",
      note: "Qui répond, et avec quelles limites assumées.",
    },
  ],
};

export const resourcesPage: PageDoc = {
  slug: "ressources",
  metaTitle: "Ressources : guides pour décider avant de signer — Feekza",
  metaDescription:
    "Deux guides pratiques : combien coûte réellement un site vitrine, et ce qu’il faut vérifier avant de mettre un site en ligne.",
  eyebrow: "Ressources",
  h1: "Des guides qui servent avant de signer.",
  lead:
    "Pas de newsletter, pas de PDF à échanger contre une adresse e-mail. Des pages longues, datées, avec leurs sources — utiles même si vous ne travaillez pas avec nous.",
  factsTitle: "Les guides",
  facts: [
    { k: "Guides publiés", v: "2" },
    { k: "Mise à jour", v: "20 octobre 2026" },
    { k: "Sources", v: "Citées et datées" },
    { k: "Accès", v: "Sans inscription" },
    { k: "Langue", v: "Français" },
  ],
  primaryCta: {
    label: "Lire le premier guide",
    href: "/ressources/combien-coute-un-site-vitrine/",
    note: "Environ huit minutes de lecture.",
  },
  sections: [
    {
      id: "pourquoi",
      num: "01",
      label: "Méthode",
      title: "Pourquoi publier des guides plutôt qu’un blog",
      note: "Un article sans date ni source ne vaut pas mieux qu’une promesse commerciale.",
      blocks: [
        {
          type: "p",
          text:
            "La plupart des sites d’agence publient des articles pour remplir un blog et capter des mots-clés. Nous publions peu, mais chaque page répond à une question que nos clients posent réellement avant de commander, avec les chiffres disponibles et la date à laquelle ils ont été relevés.",
        },
        {
          type: "ul",
          items: [
            "Chaque guide indique sa date de mise à jour et ses sources.",
            "Les prix sont ceux observés publiquement, pas une moyenne inventée.",
            "Les limites de l’exercice sont écrites dans la page, pas en bas de page.",
            "Aucune inscription, aucun cookie de mesure, aucun contenu réservé.",
          ],
        },
        {
          type: "note",
          text:
            "Ces guides ne remplacent ni un devis, ni un conseil juridique ou fiscal. Ils servent à poser les bonnes questions à un prestataire, quel qu’il soit.",
        },
      ],
    },
    {
      id: "a-venir",
      num: "02",
      label: "À venir",
      title: "Ce que nous préparons",
      note: "Publié seulement quand le contenu est vérifiable.",
      blocks: [
        {
          type: "ul",
          items: [
            "Un guide sur le référencement local : ce qui dépend de la fiche Google, du site, et ce qui n’en dépend pas.",
            "Un guide sur la mesure : quelles données un site vitrine peut réellement collecter sans outil d’audience.",
            "Un retour d’expérience sur les six premiers mois de Feekza, chiffres et erreurs comprises.",
          ],
        },
      ],
    },
  ],
  limitsTitle: "Ce que vous ne trouverez pas ici",
  limitsNote:
    "Ces choix sont volontaires. Ils expliquent aussi pourquoi il n’y a pas de blog actif.",
  limits: [
    {
      title: "Pas de contenu généré en série",
      body:
        "Nous n’écrivons pas trente articles sur des variantes de « création de site à Roquebrune ». Un guide par vraie question, mis à jour, vaut mieux qu’un catalogue de pages vides.",
    },
    {
      title: "Pas de collecte d’adresses",
      body:
        "Aucun guide n’est verrouillé derrière un formulaire. Vous pouvez lire, imprimer et transmettre sans laisser votre adresse e-mail.",
    },
    {
      title: "Pas de veille automatique",
      body:
        "Nous ne publions pas de « tendances 2026 » sans travail de fond. Les pages sont datées ; si une information change, la page est corrigée et la date de mise à jour est modifiée.",
    },
  ],
  faqTitle: "Questions sur les ressources",
  faq: [
    {
      q: "Puis-je reprendre ces textes ?",
      a: [
        "Vous pouvez citer un extrait en indiquant la source et le lien vers la page d’origine. La reproduction intégrale n’est pas autorisée sans demande écrite.",
      ],
    },
    {
      q: "Les prix indiqués sont-ils à jour ?",
      a: [
        "Ils ont été relevés le 20 octobre 2026 sur les pages publiques citées. Les tarifs des prestataires changent souvent : considérez-les comme un ordre de grandeur daté, pas comme une grille en vigueur.",
      ],
    },
  ],
  formTitle: "Une question qui n’est pas traitée ici ?",
  formLead:
    "Écrivez-nous : nous répondons aux questions de méthode même quand elles ne débouchent pas sur un projet.",
  relatedTitle: "Les guides",
  related: [
    {
      label: "Combien coûte un site vitrine en 2026",
      href: "/ressources/combien-coute-un-site-vitrine/",
      note: "Abonnement, projet au forfait, constructeur : ce que chaque modèle implique réellement.",
    },
    {
      label: "Checklist avant de mettre un site en ligne",
      href: "/ressources/checklist-avant-lancement/",
      note: "Vingt vérifications concrètes, du nom de domaine à la fiche Google.",
    },
    {
      label: "Poser une question",
      href: "/contact/",
      note: "Sans dossier complet, si la question tient en quelques lignes.",
    },
  ],
};

export const guidePrice: PageDoc = {
  slug: "ressources/combien-coute-un-site-vitrine",
  metaTitle: "Combien coûte un site vitrine en 2026 ? Prix observés — Feekza",
  metaDescription:
    "Abonnement, forfait ou constructeur : les prix publics observés en France en 2026, ce qu’ils incluent, et le coût réel sur trois ans.",
  eyebrow: "Guide — Budget",
  h1: "Combien coûte vraiment un site vitrine en 2026 ?",
  lead:
    "Les prix affichés vont de 10 € par mois à 18 000 € au forfait. La différence n’est pas seulement le design : c’est ce que vous possédez, ce que vous payez chaque année, et qui peut modifier le site.",
  factsTitle: "En bref",
  facts: [
    { k: "Mise à jour", v: "20 octobre 2026" },
    { k: "Lecture", v: "8 minutes" },
    { k: "Prix observés", v: "10 € à 18 000 €" },
    { k: "Sources citées", v: "5 pages publiques" },
    { k: "Offre Feekza", v: "195 € TTC / mois" },
  ],
  primaryCta: {
    label: "Voir ce que couvre 195 €",
    href: "/creation-site-web/",
    note: "Périmètre de cinq pages, prix public.",
  },
  article: { published: UPDATED, updated: UPDATED, author: "Feekza" },
  sections: [
    {
      id: "trois-modeles",
      num: "01",
      label: "Trois modèles",
      title: "Trois façons de payer un site, trois rapports de force",
      note:
        "Le prix mensuel n’est pas comparable au prix d’un projet : ce ne sont pas les mêmes engagements.",
      blocks: [
        {
          type: "p",
          text:
            "Un site vitrine peut s’acheter comme un abonnement, comme un projet, ou se construire soi-même. Chaque modèle déplace le coût : dans l’abonnement, vous payez un service continu ; au forfait, vous payez une livraison ; en autonomie, vous payez en temps et en compétences.",
        },
        {
          type: "steps",
          items: [
            {
              title: "L’abonnement",
              body:
                "Un prix mensuel couvre l’hébergement, la maintenance et souvent les modifications. Le site est loué, rarement cédé. La sortie est le point à vérifier avant de signer : que se passe-t-il si vous partez ?",
            },
            {
              title: "Le projet au forfait",
              body:
                "Vous payez une livraison, puis l’hébergement et les mises à jour séparément. C’est souvent plus cher la première année, et plus libre ensuite. Le devis doit préciser ce qui est repris en cas de changement de prestataire.",
            },
            {
              title: "Le constructeur en autonomie",
              body:
                "L’abonnement à un outil coûte peu, mais suppose de passer du temps : structure, textes, images, référencement, mises à jour. C’est un bon choix si le temps existe et si le site doit évoluer souvent.",
            },
          ],
        },
      ],
    },
    {
      id: "prix-observes",
      num: "02",
      label: "Prix observés",
      title: "Les ordres de grandeur publics",
      note:
        "Relevés le 20 octobre 2026 sur les pages tarifaires citées. Les prix changent : vérifiez la page source avant de décider.",
      blocks: [
        {
          type: "metrics",
          items: [
            { value: "30⁠–⁠36 €", label: "HT / mois", note: "Simplebo, offre d’entrée" },
            { value: "99,90 €", label: "HT / mois", note: "Webgazelle, engagement 24 mois" },
            { value: "5 200 €", label: "Projet médian", note: "La Fabrique du Net" },
            { value: "18 000 €", label: "Projet sur mesure", note: "La Fabrique du Net" },
          ],
        },
        {
          type: "p",
          text:
            "Ces quatre chiffres suffisent à comprendre le marché : un abonnement d’entrée se situe autour de 30 à 100 € HT par mois, un projet livré par une agence se compte en milliers d’euros. Entre les deux, les offres hybrides — abonnement avec engagement, paiement échelonné — mélangent les deux logiques.",
        },
        {
          type: "ul",
          items: [
            "Simplebo affiche 30 à 36 € HT par mois, avec des frais de lancement de 200 à 240 €, et revendique plus de 10 000 clients.",
            "Webgazelle affiche 99,90 € HT par mois avec un engagement de 24 mois.",
            "L’observatoire de Madra relève un prix médian affiché de 59 € HT par mois, pour un premier coût réel de 929 € TTC la première année.",
            "La Fabrique du Net situe le projet médian à 5 200 € et le sur-mesure autour de 18 000 €.",
          ],
        },
        {
          type: "note",
          text:
            "Un prix d’appel bas sur douze mois peut coûter plus cher qu’un abonnement plus élevé sans frais de lancement. Comparez toujours le coût total de la première année, puis celui de la troisième.",
        },
      ],
    },
    {
      id: "cout-reel",
      num: "03",
      label: "Coût réel",
      title: "Le coût sur trois ans, pas le prix d’entrée",
      note: "Exemple de calcul à partir des offres publiques, hors rédaction et photographie.",
      blocks: [
        {
          type: "p",
          text:
            "Prenons trois parcours pour un site de cinq pages, hors achat de textes et de photos. Les montants sont calculés à partir des prix publics cités, pas d’une moyenne de marché.",
        },
        {
          type: "ul",
          items: [
            "Abonnement d’entrée à 36 € HT par mois + 240 € de lancement : environ 1 536 € HT sur trois ans.",
            "Abonnement à 99,90 € HT par mois sur 24 mois minimum : environ 2 398 € HT sur deux ans, puis le tarif en vigueur.",
            "Projet au forfait médian à 5 200 € + hébergement et maintenance : le coût dépend fortement de qui met à jour le site ensuite.",
            "Feekza : 195 € TTC par mois, sans frais de lancement, soit 2 340 € TTC sur douze mois, modifications de contenu comprises.",
          ],
        },
        {
          type: "p",
          text:
            "Le calcul ne dit pas quelle offre est la meilleure : il dit ce que vous payez réellement. Un site à 30 € par mois dont vous ne pouvez pas sortir sans perdre le nom de domaine n’est pas moins cher qu’un site à 100 € par mois que vous pouvez récupérer.",
        },
        {
          type: "note",
          text:
            "À partir de la deuxième année, le nom de domaine est renouvelé directement au registrar. Pour un .fr chez OVHcloud, l’ordre de grandeur public était de 7,79 € HT par an au 20 octobre 2026.",
        },
      ],
    },
    {
      id: "comparer",
      num: "04",
      label: "Comparer",
      title: "Les six questions qui font la différence",
      note: "À poser avant de signer, quel que soit le prestataire.",
      blocks: [
        {
          type: "ul",
          items: [
            "Que se passe-t-il si j’arrête ? Le site reste-t-il en ligne, et à qui appartiennent le domaine, les textes et les images ?",
            "Les modifications de contenu sont-elles incluses, et dans quelle limite ?",
            "Qui héberge le site, et que se passe-t-il en cas de panne ou de pic de trafic ?",
            "Le prix affiché est-il HT ou TTC, et quels frais s’ajoutent la première année ?",
            "Qui possède le nom de domaine, et à quel nom est-il enregistré ?",
            "Que se passe-t-il si je veux changer de prestataire dans deux ans ?",
          ],
        },
        {
          type: "p",
          text:
            "Si un prestataire refuse de répondre par écrit à ces six questions, ce n’est pas un détail commercial : c’est une information sur ce que vous possédez.",
        },
      ],
    },
    {
      id: "sources",
      num: "05",
      label: "Sources",
      title: "Pages consultées le 20 octobre 2026",
      blocks: [
        {
          type: "links",
          items: [
            {
              label: "Simplebo — tarifs",
              href: "https://simplebo.fr/tarifs",
              note: "Abonnements de 30 à 36 € HT par mois, frais de lancement de 200 à 240 €.",
            },
            {
              label: "Webgazelle",
              href: "https://webgazelle.net/",
              note: "Offre à 99,90 € HT par mois, engagement de 24 mois.",
            },
            {
              label: "Madra — observatoire des prix",
              href: "https://madra.io/observatoire-prix-site-internet-par-abonnement",
              note: "Prix médian affiché de 59 € HT par mois, 929 € TTC la première année.",
            },
            {
              label: "La Fabrique du Net — tarifs des agences",
              href: "https://www.lafabriquedunet.fr/agences/pages/agences-site-internet/tarifs",
              note: "Projet médian à 5 200 €, sur-mesure autour de 18 000 €.",
            },
            {
              label: "OVHcloud — noms de domaine",
              href: "https://www.ovhcloud.com/fr/domains/",
              note: "Ordre de grandeur du renouvellement d’un .fr.",
            },
          ],
        },
      ],
    },
  ],
  limitsTitle: "Les limites de ce guide",
  limitsNote:
    "Un comparatif honnête dit aussi ce qu’il ne mesure pas.",
  limits: [
    {
      title: "Ce n’est pas une étude de marché",
      body:
        "Les prix cités sont des prix publics affichés par cinq prestataires, relevés un jour donné. Ils ne représentent ni la médiane du secteur, ni ce que vous obtiendrez réellement après devis.",
    },
    {
      title: "Le contenu n’est pas compté",
      body:
        "Rédaction, traduction, photographie et identité visuelle sont exclues des montants. Ce sont souvent les postes qui font doubler une facture.",
    },
    {
      title: "La qualité n’est pas mesurée",
      body:
        "Deux sites au même prix peuvent différer par la vitesse, l’accessibilité ou la capacité à être modifiés. Aucun de ces critères n’apparaît dans une grille tarifaire.",
    },
  ],
  faqTitle: "Questions fréquentes sur le budget",
  faq: [
    {
      q: "Un site à 30 € par mois peut-il suffire ?",
      a: [
        "Oui, si votre besoin est une présence simple, si vous n’avez pas de contraintes de contenu et si les conditions de sortie vous conviennent. Le prix bas devient un problème quand il faut ajouter des pages, modifier souvent, ou récupérer le site.",
      ],
    },
    {
      q: "Pourquoi un abonnement plutôt qu’un paiement unique ?",
      a: [
        "Parce que le coût réel d’un site n’est pas la mise en ligne : c’est la maintenance, les mises à jour de sécurité, les modifications de contenu et l’hébergement. L’abonnement les regroupe et les rend prévisibles. Il a un revers : vous ne possédez pas le code, et la sortie doit être écrite.",
      ],
    },
    {
      q: "Faut-il payer la TVA en plus ?",
      a: [
        "Cela dépend du prestataire et de votre statut. Les prix affichés par Feekza sont TTC ; plusieurs offres citées dans ce guide sont affichées HT. Comparez toujours le même régime.",
      ],
    },
  ],
  formTitle: "Besoin d’un chiffrage pour votre projet ?",
  formLead:
    "Décrivez votre activité : vous recevez un périmètre écrit, avec le prix et la date, sous un jour ouvré.",
  relatedTitle: "À lire ensuite",
  related: [
    {
      label: "Checklist avant le lancement",
      href: "/ressources/checklist-avant-lancement/",
      note: "Les vérifications qui évitent les mauvaises surprises après la mise en ligne.",
    },
    {
      label: "Création de site",
      href: "/creation-site-web/",
      note: "Ce que couvre exactement l’offre à 195 € TTC par mois.",
    },
    {
      label: "Référencement",
      href: "/referencement-seo/",
      note: "Ce qui est inclus dans le socle, et ce qui se chiffre à part.",
    },
  ],
};

export const guideChecklist: PageDoc = {
  slug: "ressources/checklist-avant-lancement",
  metaTitle: "Checklist avant de mettre un site en ligne — Feekza",
  metaDescription:
    "Vingt vérifications concrètes avant la mise en ligne : domaine, HTTPS, pages d’erreur, formulaires, vitesse, accessibilité, fiche Google et sauvegardes.",
  eyebrow: "Guide — Lancement",
  h1: "La checklist avant de mettre un site en ligne.",
  lead:
    "Un site ne se juge pas à son apparence le jour du lancement, mais à ce qui reste vrai trois mois plus tard : les liens fonctionnent, le formulaire arrive, les pages se chargent, et quelqu’un peut corriger.",
  factsTitle: "En bref",
  facts: [
    { k: "Mise à jour", v: "20 octobre 2026" },
    { k: "Lecture", v: "6 minutes" },
    { k: "Vérifications", v: "20" },
    { k: "Public", v: "Tout site vitrine" },
    { k: "Coût", v: "Aucun outil payant" },
  ],
  primaryCta: {
    label: "Voir nos standards techniques",
    href: "/creation-site-web/",
    note: "Les mêmes contrôles, appliqués à ce site.",
  },
  article: { published: UPDATED, updated: UPDATED, author: "Feekza" },
  sections: [
    {
      id: "domaine",
      num: "01",
      label: "Domaine",
      title: "Le nom de domaine et les accès",
      note: "C’est le point qui casse le plus souvent quand on change de prestataire.",
      blocks: [
        {
          type: "ul",
          items: [
            "Le domaine est enregistré à votre nom, ou au nom de votre structure, avec une adresse e-mail que vous contrôlez.",
            "Vous avez les identifiants du registrar, ou une procédure écrite pour les récupérer.",
            "Le renouvellement automatique est activé et la date d’échéance est notée.",
            "Le certificat HTTPS couvre le domaine et le www, et redirige proprement vers une seule version.",
            "Les accès à l’hébergement et au code sont documentés, même si vous ne les utilisez pas.",
          ],
        },
        {
          type: "note",
          text:
            "Si un prestataire refuse de vous donner ces informations, demandez-le par écrit avant de payer. C’est un indicateur plus fiable que n’importe quelle promesse commerciale.",
        },
      ],
    },
    {
      id: "contenu",
      num: "02",
      label: "Contenu",
      title: "Les pages et les textes",
      note: "À vérifier sur le site en ligne, pas dans un document.",
      blocks: [
        {
          type: "ul",
          items: [
            "Chaque page a un titre unique et une description qui décrit son contenu réel.",
            "Les coordonnées sont identiques partout : adresse, téléphone, e-mail, horaires.",
            "Les mentions légales sont complètes : éditeur, hébergeur, immatriculation si nécessaire.",
            "La politique de confidentialité décrit les formulaires et les outils réellement installés.",
            "Les conditions de vente ou d’usage existent si vous vendez en ligne ou prenez des acomptes.",
            "Aucun texte de démonstration, aucun « lorem ipsum », aucun lien mort ne subsiste.",
          ],
        },
      ],
    },
    {
      id: "technique",
      num: "03",
      label: "Technique",
      title: "Ce qui doit fonctionner sans intervention",
      note: "Testez sur un téléphone réel, en 4G, pas seulement sur l’ordinateur du bureau.",
      blocks: [
        {
          type: "steps",
          items: [
            {
              title: "Les formulaires arrivent",
              body:
                "Envoyez un message de test depuis chaque formulaire et vérifiez la réception, l’accusé de réception et le message d’erreur en cas d’échec.",
            },
            {
              title: "Les pages d’erreur existent",
              body:
                "Une adresse inexistante doit renvoyer une page 404 utile, avec un lien vers l’accueil, et non une page blanche ou une redirection trompeuse.",
            },
            {
              title: "Les liens et les redirections",
              body:
                "Parcourez le site au clavier et cliquez chaque lien de navigation. Vérifiez que les anciennes adresses redirigent vers les nouvelles.",
            },
            {
              title: "La vitesse et l’affichage",
              body:
                "Mesurez le chargement sur mobile et vérifiez qu’aucun contenu ne déborde horizontalement entre 320 et 1 600 px de large.",
            },
            {
              title: "Les sauvegardes",
              body:
                "Une sauvegarde existe, elle est datée, et vous savez qui la restaure et en combien de temps.",
            },
          ],
        },
      ],
    },
    {
      id: "apres",
      num: "04",
      label: "Après",
      title: "Les huit jours qui suivent la mise en ligne",
      blocks: [
        {
          type: "ul",
          items: [
            "Le plan du site est soumis et les pages principales sont indexées.",
            "La fiche Google Business Profile est à jour, avec la bonne adresse et le bon lien.",
            "Les mesures sont installées si vous en avez besoin — et seulement si vous pouvez expliquer ce qu’elles collectent.",
            "Une personne est désignée pour répondre aux demandes, avec un délai cible écrit.",
            "Les premières corrections sont planifiées : les erreurs de lancement sont normales, leur accumulation ne l’est pas.",
          ],
        },
        {
          type: "quote",
          text:
            "Un site n’est pas terminé le jour où il est en ligne. Il est terminé le jour où quelqu’un peut le corriger sans appeler personne.",
          source: "Règle interne Feekza",
        },
      ],
    },
  ],
  limitsTitle: "Les limites de cette checklist",
  limitsNote:
    "Elle couvre un site vitrine. Elle ne remplace pas un audit de sécurité ou un conseil juridique.",
  limits: [
    {
      title: "Pas un audit de sécurité",
      body:
        "Une checklist de lancement ne détecte pas une faille applicative. Si vous collectez des données sensibles ou vendez en ligne, un audit dédié est nécessaire.",
    },
    {
      title: "Pas un avis juridique",
      body:
        "Les mentions légales et la politique de confidentialité dépendent de votre activité et de votre statut. Cette page liste ce qu’il faut vérifier, pas ce que vous devez écrire.",
    },
    {
      title: "Pas une garantie de référencement",
      body:
        "Un site techniquement propre est une condition, pas un résultat. Le positionnement dépend aussi du contenu, de la concurrence et du temps.",
    },
  ],
  faqTitle: "Questions fréquentes sur le lancement",
  faq: [
    {
      q: "Combien de temps faut-il prévoir entre la livraison et le lancement ?",
      a: [
        "Comptez une semaine pour les vérifications, les tests de formulaires et la relecture des mentions légales. Le lancement lui-même prend une heure si le domaine et l’hébergement sont prêts.",
      ],
    },
    {
      q: "Faut-il installer un outil de mesure d’audience ?",
      a: [
        "Pas par défaut. Un site vitrine peut fonctionner sans cookie ni outil tiers. Si vous installez une mesure, elle doit être décrite dans la politique de confidentialité et proportionnée au besoin.",
      ],
    },
  ],
  formTitle: "Un lancement à préparer ?",
  formLead:
    "Décrivez votre projet : nous vérifions le périmètre, y compris ces vingt points, avant de commencer.",
  relatedTitle: "À lire ensuite",
  related: [
    {
      label: "Combien coûte un site vitrine",
      href: "/ressources/combien-coute-un-site-vitrine/",
      note: "Les prix observés et le coût réel sur trois ans.",
    },
    {
      label: "Référencement",
      href: "/referencement-seo/",
      note: "Le socle technique inclus, et ce qui se chiffre à part.",
    },
    {
      label: "Nous écrire",
      href: "/contact/",
      note: "Une question courte, sans dossier complet.",
    },
  ],
};

export const resourcePages: PageDoc[] = [contactPage, resourcesPage, guidePrice, guideChecklist];
