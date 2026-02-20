import Link from 'next/link'
import { VideoCard } from './VideoCard'
import type { VideoCardProps } from './VideoCard'

const videos: VideoCardProps[] = [
  {
    slug: 'refugies-climatiques',
    tag: 'Documentaire',
    title: "Sur les routes de l'exil: parcours de réfugiés climatiques",
    description: "Un documentaire poignant sur les familles contraintes de quitter leurs terres.",
    duration: '42 min',
    date: '5 nov. 2025',
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80',
  },
  {
    slug: 'equipes-urgence',
    tag: 'Reportage',
    title: "Première ligne: équipes d'urgence en zone de catastrophe",
    description: "Immersion au cœur des opérations de secours avec les équipes humanitaires.",
    duration: '28 min',
    date: '2 nov. 2025',
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80',
  },
  {
    slug: 'femmes-debout',
    tag: 'Série',
    title: "Femmes debout: l'émancipation par l'entrepreneuriat",
    description: "Une série qui met en lumière des femmes entrepreneures.",
    duration: '35 min',
    date: '30 oct. 2025',
    imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80',
  },
]

export function ReportagesSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-primary flex items-center gap-3">
            <span className="w-1 h-8 bg-accent rounded-full" aria-hidden />
            Reportages & Documentaires
          </h2>
          <p className="text-slate-600 mt-2">
            Des récits visuels au cœur de l&apos;action humanitaire
          </p>
        </div>
        <Link href="/reportages" className="text-slate-600 hover:text-accent transition-colors text-sm font-medium whitespace-nowrap">
          Voir tout
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {videos.map((video) => (
          <VideoCard key={video.slug} {...video} />
        ))}
      </div>
    </section>
  )
}
