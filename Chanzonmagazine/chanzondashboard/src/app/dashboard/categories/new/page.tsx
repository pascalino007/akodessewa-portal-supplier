'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useDashboard } from '@/context/DashboardContext'
import { useState } from 'react'

export default function NewCategoryPage() {
  const router = useRouter()
  const { addCategory } = useDashboard()
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [saving, setSaving] = useState(false)

  const handleSlugFromName = () => {
    const s = name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
    setSlug(s)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !slug.trim()) return
    setSaving(true)
    addCategory({ name: name.trim(), slug: slug.trim() })
    setSaving(false)
    router.push('/dashboard/categories')
  }

  return (
    <div className="p-8 lg:p-12 max-w-2xl">
      <Link href="/dashboard/categories" className="text-gray-400 hover:text-accent text-sm font-medium mb-6 inline-block">
        Retour aux catégories
      </Link>
      <h1 className="text-2xl font-bold text-white mb-6">Nouvelle catégorie</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Nom</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={handleSlugFromName}
            className="w-full px-4 py-3 rounded-lg bg-navy-600 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="Ex: Education"
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
            className="w-full px-4 py-3 rounded-lg bg-navy-600 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="ex: education"
            required
          />
        </div>
        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="px-6 py-3 rounded-lg bg-accent text-white font-medium hover:bg-accent-light transition-colors disabled:opacity-50">
            Créer
          </button>
          <Link href="/dashboard/categories" className="px-6 py-3 rounded-lg border border-gray-600 text-gray-300 font-medium hover:border-gray-500 transition-colors">
            Annuler
          </Link>
        </div>
      </form>
    </div>
  )
}
