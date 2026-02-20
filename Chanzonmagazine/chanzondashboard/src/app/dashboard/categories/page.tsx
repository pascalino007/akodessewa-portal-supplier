'use client'

import Link from 'next/link'
import { useDashboard } from '@/context/DashboardContext'

export default function CategoriesPage() {
  const { categories, deleteCategory } = useDashboard()

  return (
    <div className="p-8 lg:p-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-white">Catégories</h1>
        <Link href="/dashboard/categories/new" className="px-4 py-2 rounded-lg bg-accent text-white font-medium">
          Nouvelle catégorie
        </Link>
      </div>
      {categories.length === 0 ? (
        <div className="rounded-xl bg-navy-800 border border-gray-700/50 p-12 text-center">
          <p className="text-gray-400 mb-4">Aucune catégorie.</p>
          <Link href="/dashboard/categories/new" className="text-accent font-medium">Créer une catégorie</Link>
        </div>
      ) : (
        <div className="rounded-xl bg-navy-800 border border-gray-700/50 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700/50">
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Nom</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Slug</th>
                <th className="text-right py-4 px-6 text-sm font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id} className="border-b border-gray-700/30">
                  <td className="py-4 px-6 text-white font-medium">{cat.name}</td>
                  <td className="py-4 px-6 text-gray-400">{cat.slug}</td>
                  <td className="py-4 px-6 text-right">
                    <Link href={"/dashboard/categories/" + cat.id + "/edit"} className="text-accent text-sm font-medium mr-4">Modifier</Link>
                    <button type="button" onClick={() => deleteCategory(cat.id)} className="text-red-400 text-sm font-medium">Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
