'use client'

import Link from 'next/link'
import { useDashboard } from '@/context/DashboardContext'
import { useState } from 'react'

export default function PostsPage() {
  const { posts, deletePost, getCategory } = useDashboard()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  function handleDelete(id: string) {
    if (!confirm('Supprimer cet article ?')) return
    setDeletingId(id)
    deletePost(id)
    setDeletingId(null)
  }

  return (
    <div className="p-8 lg:p-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold text-white">Articles</h1>
        <Link href="/dashboard/posts/new" className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-accent text-white font-medium hover:bg-accent-light transition-colors">
          Nouvel article
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-xl bg-navy-800 border border-gray-700/50 p-12 text-center">
          <p className="text-gray-400 mb-4">Aucun article.</p>
          <Link href="/dashboard/posts/new" className="text-accent hover:text-accent-light font-medium">Créer un article</Link>
        </div>
      ) : (
        <div className="rounded-xl bg-navy-800 border border-gray-700/50 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700/50">
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Article</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Catégorie</th>
                <th className="text-right py-4 px-6 text-sm font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b border-gray-700/30 last:border-0">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      {post.image ? (
                        <img src={post.image} alt="" className="w-12 h-12 rounded-lg object-cover bg-navy-600" />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-navy-600 flex items-center justify-center text-gray-500 text-xs">IMG</div>
                      )}
                      <span className="text-white font-medium">{post.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-400">{getCategory(post.categoryId)?.name ?? '—'}</td>
                  <td className="py-4 px-6 text-right">
                    <Link href={`/dashboard/posts/${post.id}/edit`} className="text-accent hover:text-accent-light text-sm font-medium mr-4">Modifier</Link>
                    <button type="button" onClick={() => handleDelete(post.id)} disabled={deletingId === post.id} className="text-red-400 hover:text-red-300 text-sm font-medium disabled:opacity-50">
                      Supprimer
                    </button>
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
