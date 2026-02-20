import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCategoryBySlug, getCategories } from '@/lib/categories'
import { getArticlesByCategory } from '@/lib/articles'
import { ArticleCard } from '@/components/ArticleCard'

type Props = { params: Promise<{ category: string }> | { category: string } }

export async function generateMetadata({ params }: Props) {
  const { category } = await Promise.resolve(params)
  const cat = getCategoryBySlug(category)
  if (!cat) return { title: 'Catégorie | HUMANITÉ+' }
  return { title: `${cat.label} | HUMANITÉ+`, description: `Articles et reportages sur ${cat.label}.` }
}

export async function generateStaticParams() {
  return getCategories().map((c) => ({ category: c.id }))
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await Promise.resolve(params)
  const cat = getCategoryBySlug(category)
  if (!cat) notFound()
  const articles = getArticlesByCategory(category)

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-slate-100 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-accent text-sm font-medium mb-6 transition-colors">
            ← Retour à l&apos;accueil
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-primary flex items-center gap-3 mb-2">
            <span className="w-1 h-10 bg-accent rounded-full" aria-hidden />
            {cat.label}
          </h1>
          <p className="text-slate-600">
            {articles.length} article{articles.length !== 1 ? 's' : ''} dans cette catégorie
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {articles.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-slate-600 mb-6">Aucun article dans cette catégorie pour le moment.</p>
            <Link href="/" className="text-accent hover:text-accent-light font-medium">← Voir tous les articles</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {articles.map((article) => (
              <ArticleCard
                key={article.slug}
                slug={article.slug}
                category={article.category}
                title={article.title}
                description={article.description}
                author={article.author}
                date={article.date}
                readTime={article.readTime}
                imageUrl={article.imageUrl}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
