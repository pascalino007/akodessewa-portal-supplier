'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

const SLIDES = [
  { src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80', alt: 'Bénévoles en action humanitaire' },
  { src: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80', alt: 'Équipes humanitaires sur le terrain' },
  { src: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80', alt: 'Solidarité et entraide' },
]

const AUTOPLAY_MS = 5000

export function FeaturedHero() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length)
    }, AUTOPLAY_MS)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="grid lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
        <div className="p-8 lg:p-12 flex flex-col justify-center order-2 lg:order-1">
          <span className="inline-flex w-fit px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium mb-4">
            Action Humanitaire
          </span>
          <h1 className="text-3xl lg:text-4xl font-bold text-primary leading-tight mb-4">
            Pour un monde plus solidaire
          </h1>
          <p className="text-slate-600 text-lg leading-relaxed mb-6">
            Comment les organisations humanitaires mobilisent citoyens et ressources pour répondre aux crises mondiales et construire un avenir plus juste pour tous.
          </p>
          <div className="flex flex-wrap items-center gap-3 text-slate-500 text-sm mb-8">
            <span>Jean-Luc Moreau</span>
            <span>•</span>
            <span>10 nov. 2025</span>
            <span>•</span>
            <span>12 min</span>
          </div>
          <Link
            href="/article/pour-un-monde-plus-solidaire"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-white font-medium hover:bg-accent-light transition-colors w-fit"
          >
            Lire l&apos;article
            <span aria-hidden>→</span>
          </Link>
        </div>
        <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[400px] order-1 lg:order-2 overflow-hidden">
          {SLIDES.map((slide, i) => (
            <div
              key={i}
              className="absolute inset-0 transition-opacity duration-500 ease-out"
              style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
              aria-hidden={i !== current}
            >
              <img
                src={slide.src}
                alt={i === current ? slide.alt : ''}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10" aria-label="Slides">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current ? 'w-8 bg-accent' : 'w-2 bg-white/70 hover:bg-white'
                }`}
                aria-current={i === current}
                aria-label={`Image ${i + 1}`}
              />
            ))}
          </div>
          <div className="absolute left-2 top-1/2 -translate-y-1/2 z-10">
            <button
              type="button"
              onClick={() => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length)}
              className="p-2 rounded-full bg-white/80 text-primary hover:bg-white shadow-md"
              aria-label="Image précédente"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
          </div>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 z-10">
            <button
              type="button"
              onClick={() => setCurrent((c) => (c + 1) % SLIDES.length)}
              className="p-2 rounded-full bg-white/80 text-primary hover:bg-white shadow-md"
              aria-label="Image suivante"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
