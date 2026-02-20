export interface Article {
  slug: string
  /** URL slug for filtering (e.g. "sante", "refugies"). Matches category id in categories config. */
  categorySlug: string
  /** Display name – can be derived from getCategoryLabel(categorySlug) when using backend */
  category: string
  title: string
  description: string
  author: string
  date: string
  readTime: string
  imageUrl: string
  content: string[]
}

export const articles: Article[] = [
  {
    slug: 'pour-un-monde-plus-solidaire',
    categorySlug: 'action-humanitaire',
    category: 'Action Humanitaire',
    title: 'Pour un monde plus solidaire',
    description: "Comment les organisations humanitaires mobilisent citoyens et ressources pour répondre aux crises mondiales.",
    author: 'Jean-Luc Moreau',
    date: '10 nov. 2025',
    readTime: '12 min',
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80',
    content: [
      "Les crises humanitaires se multiplient à travers le monde. Face à ces défis, les organisations humanitaires jouent un rôle essentiel en mobilisant des ressources et en coordonnant les efforts sur le terrain.",
      "La solidarité internationale ne se limite pas aux dons financiers. Elle passe par l'engagement des bénévoles, le partage d'expertise, et la volonté des citoyens de s'informer et d'agir.",
      "Dans les zones de conflit, les équipes médicales risquent leur vie pour soigner les blessés. Partout, des femmes et des hommes construisent des ponts entre les communautés.",
      "Pour construire un monde plus juste, il faut agir ensemble. L'humanitaire n'est pas une option : c'est une nécessité pour notre avenir commun.",
    ],
  },
  {
    slug: 'accueillir-integrer-refugies',
    categorySlug: 'refugies',
    category: 'Réfugiés',
    title: "Accueillir et intégrer : le défi de l'hospitalité",
    description: "Des initiatives locales montrent comment l'accompagnement des réfugiés peut enrichir les communautés.",
    author: 'Karim Hassan',
    date: '5 nov. 2025',
    readTime: '8 min',
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&q=80',
    content: [
      "L'accueil des réfugiés pose des défis juridiques, sociaux et humains. Pourtant, partout en Europe, des villes et des associations prouvent que l'intégration est possible.",
      "Les programmes d'accompagnement linguistique, d'insertion professionnelle et de parrainage citoyen montrent des résultats concrets.",
      "Les témoignages des familles accueillies et des bénévoles rappellent une évidence : l'hospitalité n'est pas une charge, c'est un investissement dans un avenir commun.",
    ],
  },
  {
    slug: 'medecins-sans-frontieres',
    categorySlug: 'sante',
    category: 'Santé',
    title: "Médecins sans frontières : soigner au-delà des conflits",
    description: "Dans les zones de guerre et de catastrophe, ces professionnels risquent leur vie pour sauver des vies.",
    author: 'Dr. Marie Dubois',
    date: '4 nov. 2025',
    readTime: '9 min',
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&q=80',
    content: [
      "Médecins Sans Frontières intervient dans plus de 70 pays. Les équipes font face à la violence, aux pénuries et à l'urgence, avec pour seule boussole le droit à la santé pour tous.",
      "Chirurgiens, infirmiers, logisticiens travaillent main dans la main pour apporter des soins de qualité.",
      "Le témoignage des soignants rappelle que la médecine humanitaire est un combat quotidien pour la dignité.",
    ],
  },
  {
    slug: 'empowerment-femmes',
    categorySlug: 'autonomisation',
    category: 'Autonomisation',
    title: "L'empowerment des femmes : clé du développement",
    description: "Des programmes de micro-crédit et de formation transforment la vie des femmes et de leurs familles.",
    author: 'Fatou Ndiaye',
    date: '3 nov. 2025',
    readTime: '6 min',
    imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&q=80',
    content: [
      "L'autonomisation des femmes est reconnue comme un levier majeur du développement.",
      "Les programmes de micro-crédit permettent à des milliers de femmes de créer ou de développer une activité génératrice de revenus.",
      "Les témoignages montrent que l'empowerment n'est pas un slogan : c'est une réalité vécue au quotidien.",
    ],
  },
  {
    slug: 'lutter-illettrisme-afrique',
    categorySlug: 'education',
    category: 'Éducation',
    title: "Lutter contre l'illettrisme en Afrique subsaharienne",
    description: "Des programmes d'alphabétisation et de formation professionnelle transforment la vie des communautés rurales.",
    author: 'Aminata Diallo',
    date: '8 nov. 2025',
    readTime: '7 min',
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80',
    content: [
      "L'illettrisme reste un défi majeur en Afrique subsaharienne. Pourtant, des initiatives locales prouvent que l'alphabétisation est possible à tout âge.",
      "Les programmes combinent cours de lecture, écriture et calcul avec des formations professionnelles adaptées au contexte local.",
      "Les témoignages des apprenants montrent que l'éducation est la clé de l'autonomie et du développement communautaire.",
    ],
  },
  {
    slug: 'acces-eau-potable',
    categorySlug: 'eau-sante',
    category: 'Eau & Santé',
    title: "L'accès à l'eau potable : un droit fondamental",
    description: "Des projets d'adduction d'eau et d'assainissement sauvent des vies et améliorent la santé des populations.",
    author: 'Pierre Legrand',
    date: '7 nov. 2025',
    readTime: '5 min',
    imageUrl: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=600&q=80',
    content: [
      "L'accès à l'eau potable et à l'assainissement est un droit humain reconnu. Pourtant, des millions de personnes en sont encore privées.",
      "Les projets humanitaires combinent forage, pompes, latrines et sensibilisation à l'hygiène pour des résultats durables.",
      "Chaque point d'eau installé change la vie d'un village : moins de maladies, plus de temps pour les enfants et les femmes.",
    ],
  },
  {
    slug: 'banques-alimentaires-dignite',
    categorySlug: 'solidarite',
    category: 'Solidarité',
    title: "Banques alimentaires : nourrir la dignité",
    description: "Les banques alimentaires luttent contre le gaspillage et la précarité en redistribuant des denrées aux plus démunis.",
    author: 'Sophie Martin',
    date: '6 nov. 2025',
    readTime: '6 min',
    imageUrl: 'https://images.unsplash.com/photo-1488459716781-31db59582adf?w=600&q=80',
    content: [
      "Les banques alimentaires collectent les surplus auprès des producteurs et distributeurs pour les redistribuer aux associations et familles dans le besoin.",
      "Au-delà de l'aide alimentaire, elles offrent un accueil, une écoute et un lien social à des personnes souvent isolées.",
      "Nourrir la dignité, c'est reconnaître que chacun mérite de manger à sa faim dans le respect et la solidarité.",
    ],
  },
  {
    slug: 'sante-mentale-zones-conflit',
    categorySlug: 'sante',
    category: 'Santé',
    title: "Santé mentale dans les zones de conflit",
    description: "Les équipes psychosociales apportent un soutien essentiel aux victimes de traumatismes de guerre.",
    author: 'Dr. Marie Dubois',
    date: '2 nov. 2025',
    readTime: '8 min',
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80',
    content: [
      "La santé mentale est trop souvent oubliée dans l'aide d'urgence. Pourtant, les traumatismes liés à la guerre ou à l'exil ont des effets durables.",
      "Les équipes psychosociales proposent des entretiens individuels, des groupes de parole et des activités pour les enfants.",
      "Soigner les blessures invisibles, c'est permettre aux personnes de retrouver un équilibre et de se reconstruire.",
    ],
  },
  {
    slug: 'refugies-climatiques',
    categorySlug: 'refugies',
    category: 'Réfugiés',
    title: "Réfugiés climatiques : les oubliés des négociations",
    description: "Les déplacements liés au climat augmentent. Il est urgent de reconnaître et protéger les réfugiés climatiques.",
    author: 'Karim Hassan',
    date: '1 nov. 2025',
    readTime: '7 min',
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80',
    content: [
      "Sécheresses, inondations, cyclones : le changement climatique pousse des millions de personnes à quitter leur foyer.",
      "Le droit international ne reconnaît pas encore le statut de réfugié climatique. Les États et les ONG se mobilisent pour faire évoluer les cadres.",
      "Témoignages et données rappellent l'urgence d'agir pour les populations les plus vulnérables face au climat.",
    ],
  },
  {
    slug: 'forets-communautaires',
    categorySlug: 'environnement',
    category: 'Environnement',
    title: "Forêts communautaires : quand les populations protègent la biodiversité",
    description: "Des projets de gestion communautaire des forêts montrent que conservation et développement peuvent aller de pair.",
    author: 'Fatou Ndiaye',
    date: '28 oct. 2025',
    readTime: '6 min',
    imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80',
    content: [
      "La déforestation menace la biodiversité et les populations qui en dépendent. Les projets de gestion communautaire inversent la logique.",
      "Lorsque les communautés ont des droits sur la forêt et en tirent des revenus durables, elles deviennent les premières protectrices des écosystèmes.",
      "Des modèles qui inspirent d'autres régions du monde pour concilier préservation et justice sociale.",
    ],
  },
]

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}

export function getAllArticleSlugs(): string[] {
  return articles.map((a) => a.slug)
}

/** Articles for a given category. Later: replace with API fetch by category. */
export function getArticlesByCategory(categorySlug: string): Article[] {
  return articles.filter((a) => a.categorySlug === categorySlug)
}
