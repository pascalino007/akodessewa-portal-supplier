/**
 * Category config - single source of truth for nav/filters.
 * Later: replace with API call to fetch categories from database.
 */
export interface Category {
  id: string
  label: string
}

export const categories: Category[] = [
  { id: 'education', label: 'Éducation' },
  { id: 'sante', label: 'Santé' },
  { id: 'solidarite', label: 'Solidarité' },
  { id: 'refugies', label: 'Réfugiés' },
  { id: 'eau-sante', label: 'Eau & Santé' },
  { id: 'environnement', label: 'Environnement' },
  { id: 'autonomisation', label: 'Autonomisation' },
  { id: 'action-humanitaire', label: 'Action Humanitaire' },
]

export function getCategories(): Category[] {
  return categories
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.id === slug)
}

export function getCategoryLabel(slug: string): string {
  const cat = getCategoryBySlug(slug)
  return cat?.label ?? slug
}
