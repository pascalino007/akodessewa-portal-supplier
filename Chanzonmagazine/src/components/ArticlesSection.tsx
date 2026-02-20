import { ArticleCard } from './ArticleCard'
import { CategoryFilters } from './CategoryFilters'
import { articles } from '@/lib/articles'

/** Home page shows latest 6 articles. Later: replace with API (e.g. latest articles from DB). */
const latestArticles = articles.slice(0, 6)

export function ArticlesSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="mb-6">
        <CategoryFilters />
      </div>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-primary flex items-center gap-3">
            <span className="w-1 h-8 bg-accent rounded-full" aria-hidden />
            Derniers Articles
          </h2>
          <p className="text-slate-600 mt-2">
            Analyses, enquêtes et actualités du monde humanitaire
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {latestArticles.map((article) => (
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
      <div className="flex justify-center mt-10">
        <a href="/articles" className="px-8 py-3 rounded-lg border border-slate-300 text-primary hover:border-accent hover:text-accent transition-colors font-medium">
          Voir plus d&apos;articles
        </a>
      </div>
    </section>
  )
}
