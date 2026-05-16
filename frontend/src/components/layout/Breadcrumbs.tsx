import { ChevronRight, Home } from 'lucide-react'
import { Link } from 'react-router-dom'

interface BreadcrumbsProps {
  projectName: string
}

export function Breadcrumbs({ projectName }: BreadcrumbsProps) {
  return (
    <nav className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2">
        <li className="flex items-center gap-2">
          <Link to="/projects" className="flex items-center gap-1.5 transition-colors hover:text-brand-orange">
            <Home className="h-3 w-3" />
            <span>Fleet</span>
          </Link>
        </li>
        <li className="flex items-center gap-2">
          <ChevronRight className="h-3 w-3 opacity-20" aria-hidden />
          <span className="text-white/60">{projectName}</span>
        </li>
      </ol>
    </nav>
  )
}
