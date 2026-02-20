import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Faire un don | HUMANITÉ+',
  description: 'Soutenez nos actions humanitaires par un don. Chaque geste compte pour construire un monde plus solidaire.',
}

export default function DonPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-slate-100 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-accent text-sm font-medium mb-8 transition-colors"
          >
            ← Retour à l&apos;accueil
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
            Faire un don
          </h1>
          <p className="text-xl text-slate-600">
            Votre don permet de financer nos programmes : santé, éducation, aide d&apos;urgence et soutien aux réfugiés. Chaque euro compte.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-3">
              <span className="w-1 h-8 bg-accent rounded-full" aria-hidden />
              Où va votre don ?
            </h2>
            <ul className="space-y-3 text-slate-600">
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">•</span>
                <span><strong className="text-primary">Santé</strong> — Soins médicaux, vaccination, soutien psychologique.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">•</span>
                <span><strong className="text-primary">Éducation</strong> — Scolarisation des enfants, formation des adultes.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">•</span>
                <span><strong className="text-primary">Urgence</strong> — Eau, nourriture, abris en cas de catastrophe.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">•</span>
                <span><strong className="text-primary">Réfugiés</strong> — Accueil, intégration et accompagnement.</span>
              </li>
            </ul>
          </section>

          <section className="rounded-2xl border border-accent/30 bg-slate-50 p-8">
            <h2 className="text-xl font-bold text-accent mb-4">Choisissez votre montant</h2>
            <p className="text-slate-600 mb-6">
              Les dons à HUMANITÉ+ sont déductibles des impôts à hauteur de 66 %. Vous recevrez un reçu fiscal par email.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {[30, 50, 100, 200].map((amount) => (
                <button
                  key={amount}
                  type="button"
                  className="py-3 px-4 rounded-lg border border-slate-300 text-white font-medium hover:border-accent hover:bg-accent/10 transition-colors"
                >
                  {amount} €
                </button>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="number"
                placeholder="Autre montant (€)"
                className="flex-1 px-4 py-3 rounded-lg bg-white border border-slate-300 text-primary placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button
                type="button"
                className="px-6 py-3 rounded-lg bg-accent text-white font-medium hover:bg-accent-light transition-colors whitespace-nowrap"
              >
                Donner maintenant
              </button>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-3">
              <span className="w-1 h-8 bg-accent rounded-full" aria-hidden />
              Paiement sécurisé
            </h2>
            <p className="text-slate-600">
              Nous acceptons les cartes bancaires (Visa, Mastercard), les virements et les prélèvements mensuels. Toutes les transactions sont sécurisées. Nous ne revendons jamais vos données.
            </p>
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
