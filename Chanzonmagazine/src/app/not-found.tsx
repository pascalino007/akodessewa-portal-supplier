import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold text-primary mb-2">Page non trouvée</h1>
      <p className="text-slate-600 mb-8">La page que vous recherchez n&apos;existe pas ou a été déplacée.</p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-white font-medium hover:bg-accent-light transition-colors"
      >
        ← Retour à l&apos;accueil
      </Link>
    </div>
  )
}
