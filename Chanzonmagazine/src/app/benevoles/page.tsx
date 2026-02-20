import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Devenir bénévole | HUMANITÉ+',
  description: 'Rejoignez nos équipes de bénévoles et participez à nos actions humanitaires sur le terrain ou à distance.',
}

export default function BenevolesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-slate-100 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-accent text-sm font-medium mb-8 transition-colors"
          >
            ← Retour à l&apos;accueil
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
            Devenir bénévole
          </h1>
          <p className="text-xl text-slate-600">
            Donnez de votre temps et de vos compétences pour soutenir nos missions. Que vous soyez sur le terrain ou à distance, chaque engagement compte.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-3">
              <span className="w-1 h-8 bg-accent rounded-full" aria-hidden />
              Comment s&apos;engager ?
            </h2>
            <div className="space-y-6">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-lg font-semibold text-accent mb-2">Sur le terrain</h3>
                <p className="text-slate-600">
                  Partez en mission avec nos équipes : distribution d&apos;aide, soutien scolaire, soins de santé primaire, logistique. Missions courtes (2–4 semaines) ou longues (3–6 mois). Formation préalable assurée.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-lg font-semibold text-accent mb-2">À distance</h3>
                <p className="text-slate-600">
                  Traduction, communication, collecte de fonds, administration : de nombreuses missions peuvent être réalisées depuis chez vous, à raison de quelques heures par semaine.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-lg font-semibold text-accent mb-2">En France</h3>
                <p className="text-slate-600">
                  Accueil des réfugiés, cours de français, maraudes, événements de sensibilisation : agissez localement avec nos antennes et partenaires.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-accent/30 bg-slate-50 p-8">
            <h2 className="text-xl font-bold text-accent mb-4">Candidater</h2>
            <p className="text-slate-600 mb-6">
              Remplissez le formulaire ci-dessous. Nous vous recontacterons sous 15 jours pour un échange sur vos disponibilités et compétences.
            </p>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">Nom complet</label>
                <input
                  id="name"
                  type="text"
                  className="w-full px-4 py-3 rounded-lg bg-white border border-slate-300 text-primary placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Votre nom"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">Email</label>
                <input
                  id="email"
                  type="email"
                  className="w-full px-4 py-3 rounded-lg bg-white border border-slate-300 text-primary placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="votre@email.com"
                />
              </div>
              <div>
                <label htmlFor="mission" className="block text-sm font-medium text-primary mb-2">Type de mission souhaitée</label>
                <select
                  id="mission"
                  className="w-full px-4 py-3 rounded-lg bg-white border border-slate-300 text-white focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="">Choisir...</option>
                  <option value="terrain">Sur le terrain</option>
                  <option value="distance">À distance</option>
                  <option value="france">En France</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-primary mb-2">Message (optionnel)</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-slate-300 text-primary placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                  placeholder="Présentez-vous en quelques lignes, vos compétences et disponibilités..."
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 rounded-lg bg-accent text-white font-medium hover:bg-accent-light transition-colors"
              >
                Envoyer ma candidature
              </button>
            </form>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-accent hover:text-accent-light font-medium transition-colors"
          >
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  )
}
