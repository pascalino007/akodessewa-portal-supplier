'use client'

import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { useDashboard } from '@/context/DashboardContext'
import { useState, useEffect } from 'react'

export default function EditCategoryPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const { getCategory, updateCategory } = useDashboard()
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [saving, setSaving] = useState(false)

  const category = getCategory(id)

  useEffect(() => {
    if (category) {
      setName(category.name)
      setSlug(category.slug)
    }
  }, [category])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !slug.trim() || !category) return
    setSaving(true)
    updateCategory(id, { name: name.trim(), slug: slug.trim() })
    setSaving(false)
    router.push('/dashboard/categories')
  }

  if (!category) {
    return (
      <div className="p-8 lg:p-12">
        <p className="text-gray-400">Catégorie introuvable.</p>
        <Link href="/dashboard/categories" className="text-accent hover:text-accent-light mt-4 inline-block">
          ← Catégories
        </Link>
      </div>
    )
  }

  return (
    <div className="p-8 lg:p-12 max-w-2xl">
      <Link href="/dashboard/categories" className="text-gray-400 hover:text-accent text-sm font-medium mb-6 inline-block">
        ← Catégories
      </Link>
      <h1 className="text-2xl font-bold text-white mb-6">Modifier la catégorie</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Nom</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-navy-600 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            required
          />
        </div>
        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-gray-300 mb-2">Slug (URL)</label>
          <input
            id="slug"
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-navy-600 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            required
          />
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 rounded-lg bg-accent text-white font-medium hover:bg-accent-light transition-colors disabled:opacity-50"
          >
            Enregistrer
          </button>
          <Link
            href="/dashboard/categories"
            className="px-6 py-3 rounded-lg border border-gray-600 text-gray-300 font-medium hover:border-gray-500 transition-colors"
          >
            Annuler
          </Link>
        </div>
      </form>
    </div>
  )
}
