import type { CampaignType } from '@/types'
import { Share2, PenLine, LayoutTemplate, Sparkles } from 'lucide-react'

interface WorkspaceTabsProps {
  active: CampaignType
  onChange: (t: CampaignType) => void
}

const tabs: { id: CampaignType; label: string; icon: any }[] = [
  { id: 'social', label: 'Social', icon: Share2 },
  { id: 'copy', label: 'Copywriting', icon: PenLine },
  { id: 'banner', label: 'Banners', icon: LayoutTemplate },
  { id: 'image', label: 'AI Assets', icon: Sparkles },
]

export function WorkspaceTabs({ active, onChange }: WorkspaceTabsProps) {
  return (
    <div className="flex items-center gap-1.5 rounded-2xl bg-white/5 p-1.5 ring-1 ring-white/10 backdrop-blur-md">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`flex items-center gap-2.5 rounded-xl px-5 py-2.5 text-[11px] font-black uppercase tracking-widest transition-all ${
            active === tab.id
              ? 'bg-white text-indigo-900 shadow-xl'
              : 'text-white/40 hover:text-white/70 hover:bg-white/5'
          }`}
        >
          <tab.icon className={`h-3.5 w-3.5 ${active === tab.id ? 'text-indigo-800' : ''}`} />
          <span className="hidden sm:inline">{tab.label}</span>
        </button>
      ))}
    </div>
  )
}
