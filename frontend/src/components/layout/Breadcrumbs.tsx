import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

interface BreadcrumbsProps {
  projectName: string
}

export function Breadcrumbs({ projectName }: BreadcrumbsProps) {
  return (
    <nav className="text-sm text-gray-600" aria-label="Breadcrumb">
      <ol className="mx-auto flex max-w-7xl flex-wrap items-center gap-1 px-4 py-3 sm:px-6">
        <li>
          <Link to="/projects" className="font-medium text-[#0C2340] hover:underline">
            Projects
          </Link>
        </li>
        <li className="flex items-center gap-1">
          <ChevronRight className="h-4 w-4 text-gray-400" aria-hidden />
          <span className="font-medium text-gray-900">{projectName}</span>
        </li>
      </ol>
    </nav>
  )
}
