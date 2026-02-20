'use client'

import Link from 'next/link'
import { useDashboard } from '@/context/DashboardContext'

export default function DashboardHome() {
  const { categories, posts } = useDashboard()

  return (
    <div className="p-8 lg:p-12">
      <h1 className="text-2xl font-bold text-white mb-2">Tableau de bord</h1>
      <p className="text-gray-400 mb-8">Bienvenue. Gérez vos articles et catégories.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/dashboard/posts"
          className="block p-6 rounded-xl bg-navy-800 border border-gray-700/50 hover:border-accent/50 transition-colors"
        >
          <h2 className="text-lg font-semibold text-white mb-1">Articles</h2>
          <p className="text-3xl font-bold text-accent">{posts.length}</p>
          <p className="text-sm text-gray-500 mt-2">Créer, modifier, supprimer</p>
        </Link>
        <Link
          href="/dashboard/categories"
          className="block p-6 rounded-xl bg-navy-800 border border-gray-700/50 hover:border-accent/50 transition-colors"
        >
          <h2 className="text-lg font-semibold text-white mb-1">Catégories</h2>
          <p className="text-3xl font-bold text-accent">{categories.length}</p>
          <p className="text-sm text-gray-500 mt-2">Gérer les catégories</p>
        </Link>
      </div>
    </div>
  )
}
