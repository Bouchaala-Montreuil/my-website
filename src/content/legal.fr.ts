import type { LegalPage } from "./types";

const UPDATED = "20 octobre 2026";

const notice = {
  title: "Document à compléter avant mise en ligne",
  body:
    "Les mentions marquées « à compléter » sont des informations que seul l’éditeur du site peut fournir. Elles doivent être renseignées avant la publication commerciale du site.",
};

export const mentionsLegales: LegalPage = {
  slug: "mentions-legales",
  title: "Mentions légales",
  description:
    "Éditeur, hébergeur, propriété intellectuelle et droit applicable du site feekza.com.",
  updated: UPDATED,
  tocLabel: "Sommaire",
  notice,
  sections: [
    {
      id: "editeur",
      heading: "1. Éditeur du site",
      blocks: [
        { type: "p", text: "Le site feekza.com est édité par :" },
        {
          type: "ul",
          items: [
            "Dénomination : {{raison sociale}}",
            "Forme juridique : {{forme juridique}}",
            "Siège social : {{adresse}}",
            "Immatriculation : SIREN/SIRET {{numéro}} — RCS {{ville}}",
            "Numéro de TVA intracommunautaire : {{TVA}}",
            "Capital social : {{capital}}",
            "Directeur de la publication : {{nom du responsable}}",
            "Contact : hello@feekza.com",
          ],
        },
        {
          type: "note",
          text:
            "Ces informations sont obligatoires pour un site professionnel (article 6 III de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l’économie numérique).",
        },
      ],
    },
    {
      id: "hebergement",
      heading: "2. Hébergement",
      blocks: [
        {
          type: "p",
          text:
            "Le site est hébergé par GitHub Pages, service de GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis. Site : github.com. Le nom de domaine est enregistré auprès de {{registrar}}.",
        },
      ],
    },
    {
      id: "propriete",
      heading: "3. Propriété intellectuelle",
      blocks: [
        {
          type: "p",
          text:
            "La structure du site, les textes éditoriaux et les éléments graphiques originaux sont protégés par le droit d’auteur. Toute reproduction intégrale ou partielle sans autorisation écrite est interdite.",
        },
        {
          type: "p",
          text:
            "Les polices utilisées sont sous licence SIL Open Font License et les licences correspondantes sont fournies avec les fichiers du site. Les marques et logos éventuellement cités appartiennent à leurs détenteurs.",
        },
        {
          type: "p",
          text:
            "Les sites livrés aux clients et les contenus qu’ils fournissent relèvent des conditions générales de vente.",
        },
      ],
    },
    {
      id: "donnees",
      heading: "4. Données personnelles",
      blocks: [
        {
          type: "p",
          text:
            "Les modalités de collecte et de traitement des données sont décrites dans la politique de confidentialité, accessible depuis le pied de page.",
        },
        { type: "p", text: "Pour exercer vos droits : {{email de contact RGPD}}." },
      ],
    },
    {
      id: "responsabilite",
      heading: "5. Responsabilité",
      blocks: [
        {
          type: "p",
          text:
            "L’éditeur s’efforce de maintenir les informations publiées à jour. Les prix, délais et prestations décrits sur le site sont ceux de l’offre au jour de la consultation ; ils peuvent évoluer pour les commandes futures.",
        },
        {
          type: "p",
          text:
            "Le site peut contenir des liens vers des sites tiers. L’éditeur n’exerce aucun contrôle sur leur contenu et décline toute responsabilité à cet égard.",
        },
      ],
    },
    {
      id: "litiges",
      heading: "6. Litiges et médiation",
      blocks: [
        {
          type: "p",
          text:
            "En cas de litige, une solution amiable sera recherchée avant toute action judiciaire. Conformément aux articles L.612-1 et suivants du Code de la consommation, le consommateur peut recourir gratuitement à un médiateur de la consommation : {{médiateur de la consommation}}.",
        },
        {
          type: "p",
          text:
            "Le droit français est applicable. En l’absence d’accord amiable, les tribunaux compétents sont ceux du ressort du siège de l’éditeur, sous réserve des règles impératives protégeant les consommateurs.",
        },
      ],
    },
  ],
  backHome: "Retour à l’accueil",
  otherPagesTitle: "Autres documents",
  otherPages: [
    { label: "Politique de confidentialité", href: "/confidentialite/" },
    { label: "Conditions générales de vente", href: "/cgv/" },
  ],
};

export const confidentialite: LegalPage = {
  slug: "confidentialite",
  title: "Politique de confidentialité",
  description:
    "Quelles données le site feekza.com collecte, pourquoi, combien de temps, à qui elles sont transmises et comment exercer vos droits.",
  updated: UPDATED,
  tocLabel: "Sommaire",
  notice,
  sections: [
    {
      id: "responsable",
      heading: "1. Responsable du traitement",
      blocks: [
        {
          type: "p",
          text:
            "Le responsable du traitement est {{raison sociale}}, joignable à l’adresse {{email de contact RGPD}} et au {{téléphone}}. Les informations d’identification complètes figurent dans les mentions légales.",
        },
      ],
    },
    {
      id: "collecte",
      heading: "2. Quelles données sont collectées",
      blocks: [
        {
          type: "p",
          text:
            "Le site ne collecte des données que lorsque vous les transmettez volontairement, via le formulaire de dossier :",
        },
        {
          type: "ul",
          items: [
            "Identité et contact : nom, adresse email, éventuellement téléphone.",
            "Informations sur votre activité : nom, objectif du site, pages souhaitées, langues, contenus disponibles, délai, précisions libres.",
            "Choix de paiement : mode de règlement sélectionné. Aucune donnée de carte bancaire ne transite par ce site.",
          ],
        },
        {
          type: "p",
          text:
            "Aucun outil de mesure d’audience, aucun cookie publicitaire et aucun traceur tiers n’est installé sur le site.",
        },
        {
          type: "p",
          text:
            "L’hébergeur conserve des journaux techniques (adresse IP, date et heure de la requête, page demandée) pour la sécurité et le fonctionnement du service.",
        },
      ],
    },
    {
      id: "finalites",
      heading: "3. Pourquoi ces données sont traitées",
      blocks: [
        {
          type: "ul",
          items: [
            "Répondre à votre demande et établir un devis ou une proposition (base légale : mesures précontractuelles, article 6.1.b du RGPD).",
            "Exécuter le contrat si une commande est passée (article 6.1.b).",
            "Respecter les obligations comptables et fiscales (article 6.1.c).",
            "Améliorer le service sur la base de l’intérêt légitime, sans profilage publicitaire (article 6.1.f).",
          ],
        },
        {
          type: "p",
          text:
            "Les champs facultatifs du formulaire ne conditionnent pas l’envoi du dossier. Les champs obligatoires sont indiqués par un astérisque.",
        },
      ],
    },
    {
      id: "destinataires",
      heading: "4. Qui reçoit les données",
      blocks: [
        {
          type: "p",
          text:
            "Les données sont accessibles à l’éditeur du site et aux prestataires techniques suivants, agissant comme sous-traitants :",
        },
        {
          type: "ul",
          items: [
            "Formspree (Formspree, Inc., États-Unis) : traitement et transmission du formulaire de dossier par email.",
            "Stripe (Stripe Payments Europe, Ltd., Irlande, et Stripe, Inc., États-Unis) : traitement des paiements par carte.",
            "GitHub Pages (GitHub, Inc., États-Unis) : hébergement du site et journaux techniques.",
            "Le prestataire d’envoi d’emails utilisé pour répondre à votre demande : {{prestataire email}}.",
          ],
        },
        {
          type: "p",
          text:
            "Certains de ces prestataires sont établis aux États-Unis. Les transferts sont encadrés par les clauses contractuelles types de la Commission européenne ou par un mécanisme équivalent.",
        },
        { type: "p", text: "Aucune donnée n’est vendue ni louée." },
      ],
    },
    {
      id: "duree",
      heading: "5. Durée de conservation",
      blocks: [
        {
          type: "ul",
          items: [
            "Dossiers sans suite : 12 mois après le dernier échange.",
            "Données contractuelles et comptables : 10 ans à compter de la clôture de l’exercice, conformément aux obligations légales.",
            "Journaux techniques de l’hébergeur : durée définie par GitHub Pages, généralement moins de 30 jours.",
          ],
        },
      ],
    },
    {
      id: "droits",
      heading: "6. Vos droits",
      blocks: [
        {
          type: "p",
          text:
            "Vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation, d’opposition et de portabilité de vos données. Vous pouvez les exercer en écrivant à {{email de contact RGPD}}.",
        },
        {
          type: "p",
          text:
            "Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la CNIL, 3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07, ou en ligne sur cnil.fr.",
        },
      ],
    },
    {
      id: "cookies",
      heading: "7. Cookies et stockage local",
      blocks: [
        {
          type: "p",
          text:
            "Le site ne dépose aucun cookie de mesure d’audience ou de publicité. Le choix de langue est mémorisé dans le stockage local de votre navigateur (clé « feekza-lang »). Cette préférence reste sur votre appareil, n’est pas transmise à nos serveurs et peut être supprimée à tout moment via les réglages de votre navigateur.",
        },
      ],
    },
    {
      id: "securite",
      heading: "8. Sécurité",
      blocks: [
        {
          type: "p",
          text:
            "Le site est servi en HTTPS. Les échanges du formulaire sont transmis à Formspree, qui applique ses propres mesures de sécurité. Les paiements sont traités exclusivement par Stripe ; aucune donnée bancaire n’est stockée par Feekza.",
        },
      ],
    },
    {
      id: "modification",
      heading: "9. Modification de cette politique",
      blocks: [
        {
          type: "p",
          text:
            "Cette politique peut être mise à jour. La date de dernière mise à jour figure en haut de page. Les changements substantiels seront signalés sur le site.",
        },
      ],
    },
  ],
  backHome: "Retour à l’accueil",
  otherPagesTitle: "Autres documents",
  otherPages: [
    { label: "Mentions légales", href: "/mentions-legales/" },
    { label: "Conditions générales de vente", href: "/cgv/" },
  ],
};

export const cgv: LegalPage = {
  slug: "cgv",
  title: "Conditions générales de vente",
  description:
    "Périmètre, prix, engagement de six mois, prévisualisation, remboursement et résiliation de l’offre Feekza.",
  updated: UPDATED,
  tocLabel: "Sommaire",
  notice,
  sections: [
    {
      id: "objet",
      heading: "1. Objet et champ d’application",
      blocks: [
        {
          type: "p",
          text:
            "Les présentes conditions régissent l’offre de création et de maintenance de site internet proposée par {{raison sociale}} (« Feekza ») aux professionnels et particuliers. Elles s’appliquent à toute commande passée via le site feekza.com ou par email.",
        },
        {
          type: "p",
          text:
            "La commande vaut acceptation sans réserve des présentes conditions. Les conditions particulières éventuellement convenues par écrit prévalent sur les présentes.",
        },
      ],
    },
    {
      id: "offre",
      heading: "2. Contenu de l’offre",
      blocks: [
        {
          type: "p",
          text:
            "L’offre comprend : un site sur mesure de cinq pages maximum, l’hébergement et le certificat SSL, une adresse email professionnelle, le nom de domaine la première année, la maintenance technique, les sauvegardes et les modifications de contenu illimitées dans le périmètre des pages livrées.",
        },
        {
          type: "p",
          text:
            "Ne sont pas compris, sauf devis séparé : boutique en ligne et paiements, réservation en ligne, espace client, rédaction complète des textes, création de logo et d’identité visuelle, référencement éditorial, publicité, pages au-delà de la cinquième, nom de domaine à partir de la deuxième année.",
        },
        {
          type: "p",
          text:
            "Le délai de première version de 48 à 72 heures court à compter de la réception de l’ensemble des éléments nécessaires (textes, images, informations légales, accès).",
        },
      ],
    },
    {
      id: "prix",
      heading: "3. Prix et facturation",
      blocks: [
        {
          type: "p",
          text:
            "Le prix de l’offre est de 195 € TTC par mois, TVA incluse, sans frais de lancement. Le premier mois est réglé au démarrage du projet.",
        },
        {
          type: "p",
          text:
            "Le nom de domaine est inclus la première année. À partir de la deuxième année, son renouvellement est réglé directement par le client au registrar, à un tarif indicatif de 10 à 20 € par an selon l’extension.",
        },
        {
          type: "p",
          text:
            "Les prestations supplémentaires font l’objet d’un devis accepté avant exécution. Aucun frais n’est facturé sans accord écrit préalable.",
        },
        {
          type: "p",
          text:
            "En cas de retard de paiement, la prestation peut être suspendue après mise en demeure restée sans effet pendant quinze jours.",
        },
      ],
    },
    {
      id: "duree",
      heading: "4. Durée, résiliation",
      blocks: [
        {
          type: "p",
          text:
            "L’abonnement est souscrit pour une durée minimale de six mois à compter de la mise en ligne. Il se poursuit ensuite de mois en mois et peut être résilié à tout moment avec un préavis d’un mois, par écrit ou par email à hello@feekza.com.",
        },
        {
          type: "p",
          text:
            "En cas de résiliation, le site est mis hors ligne à la fin de la période payée. Les contenus fournis par le client et le nom de domaine lui sont restitués ou transférés dans un délai de trente jours, à sa demande.",
        },
        {
          type: "p",
          text:
            "Feekza peut résilier l’abonnement en cas de manquement grave, notamment de non-paiement, après mise en demeure.",
        },
      ],
    },
    {
      id: "previsualisation",
      heading: "5. Prévisualisation et remboursement",
      blocks: [
        {
          type: "p",
          text:
            "Une première version complète est présentée au client via un lien privé avant la mise en ligne définitive. Le client peut demander des modifications, traitées dans un délai de 24 heures ouvrées.",
        },
        {
          type: "p",
          text:
            "Si, après ces modifications, la première version ne convient pas au client, celui-ci peut demander le remboursement du montant effectivement réglé. Le remboursement est effectué dans un délai de quatorze jours et met fin au contrat.",
        },
        {
          type: "p",
          text:
            "La commande n’est définitivement finalisée qu’après validation écrite de la première version par le client.",
        },
      ],
    },
    {
      id: "obligations",
      heading: "6. Obligations des parties",
      blocks: [
        { type: "h3", text: "Obligations du client" },
        {
          type: "ul",
          items: [
            "Fournir les textes, images et informations nécessaires, et garantir qu’il détient les droits correspondants.",
            "Répondre aux demandes de validation dans un délai raisonnable.",
            "Désigner un interlocuteur unique habilité à valider.",
          ],
        },
        { type: "h3", text: "Obligations de Feekza" },
        {
          type: "ul",
          items: [
            "Réaliser la prestation avec diligence et selon les règles de l’art.",
            "Assurer la disponibilité et la maintenance du site pendant la durée de l’abonnement.",
            "Informer le client de toute difficulté susceptible d’affecter le délai.",
          ],
        },
      ],
    },
    {
      id: "propriete",
      heading: "7. Propriété intellectuelle et données",
      blocks: [
        {
          type: "p",
          text:
            "Le client conserve la propriété de ses contenus, images, données et nom de domaine. Il concède à Feekza une licence d’utilisation nécessaire à la réalisation et à l’exploitation du site pendant la durée du contrat.",
        },
        {
          type: "p",
          text:
            "Le code source, les gabarits et éléments techniques développés par Feekza restent sa propriété, sauf cession écrite. À la fin du contrat, et à la demande du client, Feekza restitue les contenus et transfère le nom de domaine.",
        },
        {
          type: "p",
          text:
            "Les données personnelles sont traitées conformément à la politique de confidentialité.",
        },
      ],
    },
    {
      id: "responsabilite",
      heading: "8. Garanties et responsabilité",
      blocks: [
        {
          type: "p",
          text:
            "Feekza s’engage à une obligation de moyens. Elle ne garantit ni un positionnement particulier dans les moteurs de recherche, ni un résultat commercial.",
        },
        {
          type: "p",
          text:
            "La responsabilité de Feekza ne peut être engagée en cas d’indisponibilité imputable à l’hébergeur, à un prestataire tiers, à un cas de force majeure ou à une utilisation non conforme du site par le client.",
        },
        {
          type: "p",
          text:
            "En tout état de cause, la responsabilité de Feekza est limitée au montant total effectivement versé au titre des douze derniers mois.",
        },
      ],
    },
    {
      id: "droit",
      heading: "9. Droit applicable et médiation",
      blocks: [
        {
          type: "p",
          text:
            "Les présentes conditions sont soumises au droit français. En cas de litige, les parties recherchent une solution amiable avant toute action judiciaire.",
        },
        {
          type: "p",
          text:
            "Le consommateur peut recourir gratuitement au médiateur de la consommation suivant : {{médiateur de la consommation}}. À défaut d’accord, les tribunaux compétents sont ceux du ressort du siège de Feekza, sous réserve des règles impératives protégeant les consommateurs.",
        },
        {
          type: "p",
          text:
            "Conformément aux articles L.221-18 et suivants du Code de la consommation, le droit de rétractation ne s’applique pas aux prestations déjà pleinement exécutées avec l’accord du client, ni aux contrats conclus entre professionnels.",
        },
      ],
    },
  ],
  backHome: "Retour à l’accueil",
  otherPagesTitle: "Autres documents",
  otherPages: [
    { label: "Mentions légales", href: "/mentions-legales/" },
    { label: "Politique de confidentialité", href: "/confidentialite/" },
  ],
};

export const legalPages = [mentionsLegales, confidentialite, cgv];
