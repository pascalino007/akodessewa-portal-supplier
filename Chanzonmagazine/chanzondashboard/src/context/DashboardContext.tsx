'use client'

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'

export interface Category {
  id: string
  name: string
  slug: string
}

export interface PostSection {
  id: string
  content: string
}

export interface Post {
  id: string
  name: string
  image: string
  categoryId: string
  sections: PostSection[]
  createdAt: string
  updatedAt: string
}

const STORAGE_CATEGORIES = 'chanzon_categories'
const STORAGE_POSTS = 'chanzon_posts'

function loadJson<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function saveJson(key: string, value: unknown) {
  if (typeof window === 'undefined') return
  localStorage.setItem(key, JSON.stringify(value))
}

function generateId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

interface DashboardContextValue {
  categories: Category[]
  posts: Post[]
  addCategory: (data: { name: string; slug: string }) => Category
  updateCategory: (id: string, data: { name: string; slug: string }) => void
  deleteCategory: (id: string) => void
  getCategory: (id: string) => Category | undefined
  addPost: (data: { name: string; image: string; categoryId: string; sections: PostSection[] }) => Post
  updatePost: (id: string, data: { name: string; image: string; categoryId: string; sections: PostSection[] }) => void
  deletePost: (id: string) => void
  getPost: (id: string) => Post | undefined
}

const DashboardContext = createContext<DashboardContextValue | null>(null)

function ensureSections(sections: PostSection[], min = 3): PostSection[] {
  if (sections.length >= min) return sections
  const extra = Array(min - sections.length).fill(0).map(() => ({ id: generateId(), content: '' }))
  return [...sections, ...extra]
}

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([])
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    setCategories(loadJson(STORAGE_CATEGORIES, []))
    setPosts(loadJson(STORAGE_POSTS, []))
  }, [])

  useEffect(() => {
    saveJson(STORAGE_CATEGORIES, categories)
  }, [categories])

  useEffect(() => {
    saveJson(STORAGE_POSTS, posts)
  }, [posts])

  const addCategory = useCallback((data: { name: string; slug: string }) => {
    const newCat: Category = { id: generateId(), ...data }
    setCategories((prev) => [...prev, newCat])
    return newCat
  }, [])

  const updateCategory = useCallback((id: string, data: { name: string; slug: string }) => {
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, ...data } : c)))
  }, [])

  const deleteCategory = useCallback((id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id))
    setPosts((prev) => prev.filter((p) => p.categoryId !== id))
  }, [])

  const getCategory = useCallback((id: string) => categories.find((c) => c.id === id), [categories])

  const addPost = useCallback((data: { name: string; image: string; categoryId: string; sections: PostSection[] }) => {
    const now = new Date().toISOString()
    const newPost: Post = {
      id: generateId(),
      ...data,
      sections: ensureSections(data.sections),
      createdAt: now,
      updatedAt: now,
    }
    setPosts((prev) => [...prev, newPost])
    return newPost
  }, [])

  const updatePost = useCallback((id: string, data: { name: string; image: string; categoryId: string; sections: PostSection[] }) => {
    const now = new Date().toISOString()
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...data, sections: ensureSections(data.sections), updatedAt: now } : p))
    )
  }, [])

  const deletePost = useCallback((id: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== id))
  }, [])

  const getPost = useCallback((id: string) => posts.find((p) => p.id === id), [posts])

  const value: DashboardContextValue = {
    categories,
    posts,
    addCategory,
    updateCategory,
    deleteCategory,
    getCategory,
    addPost,
    updatePost,
    deletePost,
    getPost,
  }

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>
}

export function useDashboard() {
  const ctx = useContext(DashboardContext)
  if (!ctx) throw new Error('useDashboard must be used within DashboardProvider')
  return ctx
}
