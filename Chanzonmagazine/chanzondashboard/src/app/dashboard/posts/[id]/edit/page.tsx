'use client'

import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { useDashboard } from '@/context/DashboardContext'
import { useState, useEffect } from 'react'
import type { PostSection } from '@/context/DashboardContext'

function generateSectionId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

const MIN_SECTIONS = 3

export default function EditPostPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const { categories, getPost, updatePost } = useDashboard()
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [sections, setSections] = useState<PostSection[]>([])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const post = getPost(id)

  useEffect(() => {
    if (post) {
      setName(post.name)
      setImage(post.image)
      setCategoryId(post.categoryId)
      setSections(post.sections.length >= MIN_SECTIONS ? post.sections : [...post.sections, ...Array(MIN_SECTIONS - post.sections.length).fill(0).map(() => ({ id: generateSectionId(), content: '' }))])
    }
  }, [post])

  function addSection() {
    setSections((prev) => [...prev, { id: generateSectionId(), content: '' }])
  }

  function removeSection(index: number) {
    if (sections.length <= MIN_SECTIONS) return
    setSections((prev) => prev.filter((_, i) => i !== index))
  }

  function updateSection(index: number, content: string) {
    setSections((prev) => prev.map((s, i) => (i === index ? { ...s, content } : s)))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!name.trim()) {
      setError('Le nom est requis.')
      return
    }
    if (!categoryId) {
      setError('Choisissez une categorie.')
      return
    }
    const filled = sections.filter((s) => s.content.trim())
    if (filled.length < MIN_SECTIONS) {
      setError('Au moins 3 sections de texte sont requises.')
      return
    }
    setSaving(true)
    updatePost(id, { name: name.trim(), image: image.trim(), categoryId, sections })
    setSaving(false)
    router.push('/dashboard/posts')
  }

  if (!post) {
    return (
      <div className="p-8 lg:p-12">
        <p className="text-gray-400">Article introuvable.</p>
        <Link href="/dashboard/posts" className="text-accent hover:text-accent-light mt-4 inline-block">Retour aux articles</Link>
      </div>
    )
  }

  return (
    <div className="p-8 lg:p-12 max-w-3xl">
      <Link href="/dashboard/posts" className="text-gray-400 hover:text-accent text-sm font-medium mb-6 inline-block">
        Retour aux articles
      </Link>
      <h1 className="text-2xl font-bold text-white mb-6">Modifier l article</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Nom</label>
          <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 rounded-lg bg-navy-600 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-accent" required />
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-300 mb-2">URL image</label>
          <input id="image" type="url" value={image} onChange={(e) => setImage(e.target.value)} className="w-full px-4 py-3 rounded-lg bg-navy-600 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-accent" />
          {image && <img src={image} alt="Apercu" className="mt-2 w-32 h-24 object-cover rounded-lg bg-navy-600" />}
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">Categorie</label>
          <select id="category" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="w-full px-4 py-3 rounded-lg bg-navy-600 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-accent" required>
            <option value="">Choisir</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-300">Sections (min. 3)</label>
            <button type="button" onClick={addSection} className="text-sm text-accent hover:text-accent-light font-medium">+ Section</button>
          </div>
          {sections.map((section, index) => (
            <div key={section.id} className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-500">Section {index + 1}</span>
                {sections.length > MIN_SECTIONS && <button type="button" onClick={() => removeSection(index)} className="text-xs text-red-400 hover:text-red-300">Supprimer</button>}
              </div>
              <textarea value={section.content} onChange={(e) => updateSection(index, e.target.value)} rows={4} className="w-full px-4 py-3 rounded-lg bg-navy-600 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-accent resize-none" placeholder="Contenu..." />
            </div>
          ))}
        </div>
        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="px-6 py-3 rounded-lg bg-accent text-white font-medium hover:bg-accent-light transition-colors disabled:opacity-50">Enregistrer</button>
          <Link href="/dashboard/posts" className="px-6 py-3 rounded-lg border border-gray-600 text-gray-300 font-medium">Annuler</Link>
        </div>
      </form>
    </div>
  )
}
