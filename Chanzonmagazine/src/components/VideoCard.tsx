import Link from 'next/link'

export interface VideoCardProps {
  slug: string
  tag: string
  title: string
  description: string
  duration: string
  date: string
  imageUrl: string
}

export function VideoCard({ slug, tag, title, description, duration, date, imageUrl }: VideoCardProps) {
  return (
    <Link href={`/video/${slug}`} className="group block">
      <article className="bg-slate-50 rounded-xl overflow-hidden border border-slate-200 hover:border-slate-300 transition-colors h-full flex flex-col">
        <div className="relative aspect-video overflow-hidden">
          <img
            src={imageUrl}
            alt=""
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-accent text-white text-xs font-medium">
            {tag}
          </span>
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors">
            <span className="w-14 h-14 rounded-full bg-accent flex items-center justify-center text-white shadow-lg" aria-hidden>
              <PlayIcon />
            </span>
          </div>
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-semibold text-primary group-hover:text-accent transition-colors line-clamp-2 mb-2">
            {title}
          </h3>
          <p className="text-slate-600 text-sm line-clamp-2 mb-4 flex-1">{description}</p>
          <div className="flex items-center gap-4 text-slate-500 text-sm">
            <span className="flex items-center gap-1">
              <ClockIcon />
              {duration}
            </span>
            <span className="flex items-center gap-1">
              <CalendarIcon />
              {date}
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}

function PlayIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  )
}
