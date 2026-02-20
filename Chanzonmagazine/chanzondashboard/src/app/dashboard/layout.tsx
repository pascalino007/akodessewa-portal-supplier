'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'

const nav = [
  { href: '/dashboard', label: 'Tableau de bord' },
  { href: '/dashboard/posts', label: 'Articles' },
  { href: '/dashboard/categories', label: 'Catégories' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { isAuthenticated, hasChecked, logout } = useAuth()

  useEffect(() => {
    if (hasChecked && !isAuthenticated) {
      router.replace('/login')
    }
  }, [hasChecked, isAuthenticated, router])

  function handleLogout() {
    logout()
    router.replace('/login')
  }

  if (hasChecked && !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">Redirection vers la connexion...</p>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 flex-shrink-0 bg-navy-800 border-r border-gray-700/50 flex flex-col">
        <div className="p-6 border-b border-gray-700/50">
          <Link href="/dashboard" className="text-xl font-semibold text-white tracking-tight">
            Chanzon <span className="text-accent">Dashboard</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {nav.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'bg-accent text-white' : 'text-gray-400 hover:bg-navy-600 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="p-4 border-t border-gray-700/50 space-y-2">
          <Link href="/" className="block text-sm text-gray-500 hover:text-accent transition-colors" target="_blank" rel="noopener noreferrer">
            Voir le site
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="block text-sm text-gray-500 hover:text-red-400 transition-colors"
          >
            Déconnexion
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
