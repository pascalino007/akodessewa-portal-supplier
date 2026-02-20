const testimonials = [
  {
    name: 'Amira Hassan',
    role: 'Réfugiée syrienne, France',
    quote: 'L\'accueil que j\'ai reçu m\'a redonné espoir en l\'humanité.',
    story: 'Après avoir fui la guerre, j\'ai trouvé une communauté qui m\'a aidée à reprendre pied. Aujourd\'hui je travaille pour aider d\'autres familles.',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
  },
  {
    name: 'Jean-Marc Durand',
    role: 'Bénévole, Médecins du Monde',
    quote: 'Chaque mission me rappelle pourquoi nous nous battons.',
    story: 'Sur le terrain, nous voyons des visages, pas des statistiques. Chaque vie sauvée compte.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
  },
  {
    name: 'Fatou Diallo',
    role: 'Entrepreneure, Sénégal',
    quote: 'Le micro-crédit m\'a donné les clés de mon autonomie.',
    story: 'Avec un petit prêt et une formation, j\'ai pu créer mon commerce et scolariser mes enfants.',
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
  },
]

export function TestimonialsSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-primary flex items-center gap-3">
            <span className="w-1 h-8 bg-accent rounded-full" aria-hidden />
            Témoignages
          </h2>
          <p className="text-slate-600 mt-2">
            Des histoires de vie qui inspirent le changement
          </p>
        </div>
        <a
          href="/temoignages"
          className="px-4 py-2 rounded-lg border border-slate-300 text-primary hover:border-accent hover:text-accent transition-colors text-sm font-medium whitespace-nowrap"
        >
          Toutes les stories
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {testimonials.map((t) => (
          <article
            key={t.name}
            className="bg-slate-50 rounded-xl overflow-hidden border border-slate-200 flex flex-col"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={t.imageUrl}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex items-center justify-center gap-2 my-3">
                <span className="w-8 h-0.5 bg-accent rounded" aria-hidden />
                <span className="text-slate-500 text-xs font-medium">99</span>
                <span className="w-8 h-0.5 bg-accent rounded" aria-hidden />
              </div>
              <blockquote className="text-primary font-medium mb-3 line-clamp-2">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <p className="font-semibold text-primary text-lg">{t.name}</p>
              <p className="text-slate-500 text-sm mb-3">{t.role}</p>
              <p className="text-slate-600 text-sm line-clamp-3 flex-1">{t.story}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
