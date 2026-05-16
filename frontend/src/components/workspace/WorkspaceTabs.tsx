import {
  LayoutTemplate,
  PenLine,
  Share2,
  Sparkles,
} from 'lucide-react'
import type { AgentId } from '@/types'

const tabs: { id: AgentId; label: string; icon: typeof Share2 }[] = [
  { id: 'social', label: 'Social', icon: Share2 },
  { id: 'copywriting', label: 'Copywriting', icon: PenLine },
  { id: 'banner', label: 'Banner', icon: LayoutTemplate },
  { id: 'imageGen', label: 'Image Gen', icon: Sparkles },
]

interface WorkspaceTabsProps {
  active: AgentId
  onChange: (id: AgentId) => void
}

export function WorkspaceTabs({ active, onChange }: WorkspaceTabsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 border-b border-gray-200 bg-gray-50/80 px-4 py-4 sm:px-6">
      {tabs.map(({ id, label, icon: Icon }) => {
        const isActive = active === id
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
              isActive
                ? 'border-blue-200 bg-blue-50 text-blue-900 shadow-sm'
                : 'border-transparent bg-white text-gray-600 shadow-sm ring-1 ring-gray-200 hover:bg-gray-50'
            }`}
          >
            <Icon className="h-4 w-4 shrink-0" aria-hidden />
            {label}
          </button>
        )
      })}
    </div>
  )
}
