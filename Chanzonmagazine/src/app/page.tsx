import { Suspense } from 'react'
import { FeaturedHero } from '@/components/FeaturedHero'
import { ReportagesSection } from '@/components/ReportagesSection'
import { ArticlesSection } from '@/components/ArticlesSection'
import { TestimonialsSection } from '@/components/TestimonialsSection'
import { CommunityCTA } from '@/components/CommunityCTA'

function CategoryFiltersFallback() {
  return (
    <div className="flex flex-wrap gap-2">
      <span className="px-4 py-2 rounded-lg bg-accent text-white text-sm font-medium">Tous</span>
      <span className="px-4 py-2 rounded-lg bg-navy-600/80 text-gray-400 text-sm border border-gray-600">Éducation</span>
      <span className="px-4 py-2 rounded-lg bg-navy-600/80 text-gray-400 text-sm border border-gray-600">Santé</span>
      <span className="px-4 py-2 rounded-lg bg-navy-600/80 text-gray-400 text-sm border border-gray-600">Solidarité</span>
      <span className="px-4 py-2 rounded-lg bg-navy-600/80 text-gray-400 text-sm border border-gray-600">Réfugiés</span>
      <span className="px-4 py-2 rounded-lg bg-navy-600/80 text-gray-400 text-sm border border-gray-600">Eau & Santé</span>
      <span className="px-4 py-2 rounded-lg bg-navy-600/80 text-gray-400 text-sm border border-gray-600">Environnement</span>
    </div>
  )
}

export default function HomePage() {
  return (
    <>
      <FeaturedHero />
      <ReportagesSection />
      <Suspense fallback={<CategoryFiltersFallback />}>
        <ArticlesSection />
      </Suspense>
      <TestimonialsSection />
      <CommunityCTA />
    </>
  )
}
