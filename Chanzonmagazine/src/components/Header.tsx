'use client'

import Link from 'next/link'

const navLinks = [
  { href: '/', label: 'Tous' },
  { href: '/category/education', label: 'Éducation' },
  { href: '/category/sante', label: 'Santé' },
  { href: '/category/solidarite', label: 'Solidarité' },
  { href: '/category/refugies', label: 'Réfugiés' },
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-accent" aria-hidden>
              <HeartIcon />
            </span>
            <span className="font-semibold text-primary tracking-wide">
              HUMANITÉ<span className="text-accent">+</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-primary/80 hover:text-primary transition-colors text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            className="p-2 text-slate-500 hover:text-primary transition-colors rounded-lg hover:bg-slate-100"
            aria-label="Rechercher"
          >
            <SearchIcon />
          </button>
        </div>
      </div>
    </header>
  )
}

function HeartIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  )
}
