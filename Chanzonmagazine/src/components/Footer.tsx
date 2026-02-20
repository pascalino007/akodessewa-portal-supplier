'use client'

import Link from 'next/link'

const categories = [
  { href: '/category/education', label: 'Éducation' },
  { href: '/category/sante', label: 'Santé' },
  { href: '/category/solidarite', label: 'Solidarité' },
  { href: '/category/environnement', label: 'Environnement' },
]

const aboutLinks = [
  { href: '/mission', label: 'Notre mission' },
  { href: '/contact', label: 'Contact' },
  { href: '/partenaires', label: 'Partenaires' },
  { href: '/don', label: 'Faire un don' },
]

export function Footer() {
  return (
    <footer className="bg-slate-100 border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand & mission */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <span className="text-accent">
                <HeartIcon />
              </span>
              <span className="font-semibold text-primary tracking-wide">
                HUMANITÉ<span className="text-accent">+</span>
              </span>
            </Link>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Des récits inspirants sur l&apos;action sociale, l&apos;humanitaire et la solidarité dans le monde.
            </p>
            <p className="text-slate-500 text-xs">© 2025 Humanité+. Tous droits réservés.</p>
          </div>

          {/* Catégories */}
          <div>
            <h3 className="font-semibold text-primary mb-4">Catégories</h3>
            <ul className="space-y-2">
              {categories.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-600 hover:text-accent text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* À propos */}
          <div>
            <h3 className="font-semibold text-primary mb-4">À propos</h3>
            <ul className="space-y-2">
              {aboutLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-600 hover:text-accent text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-primary mb-4">Newsletter</h3>
            <p className="text-slate-600 text-sm mb-4">
              Recevez nos dernières histoires directement dans votre boîte mail.
            </p>
            <form className="flex flex-col sm:flex-row gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="votre@email.com"
                className="flex-1 min-w-0 px-4 py-2.5 rounded-lg bg-white border border-slate-300 text-primary placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-accent text-white font-medium hover:bg-accent-light transition-colors text-sm whitespace-nowrap"
              >
                S&apos;abonner
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-200 flex flex-wrap justify-end gap-6">
          <Link href="/confidentialite" className="text-slate-500 hover:text-primary text-sm">
            Confidentialité
          </Link>
          <Link href="/conditions" className="text-slate-500 hover:text-primary text-sm">
            Conditions
          </Link>
          <Link href="/cookies" className="text-slate-500 hover:text-primary text-sm">
            Cookies
          </Link>
        </div>
      </div>
    </footer>
  )
}

function HeartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  )
}
