import { Loader2, Copy, Check, Terminal, ExternalLink, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import type { CampaignType, RunState } from '@/types'

interface PreviewPanelProps {
  activeTab: CampaignType
  runState: RunState
  results: Record<CampaignType, string>
  hasGenerated: boolean
}

export function PreviewPanel({ activeTab, runState, results, hasGenerated }: PreviewPanelProps) {
  const [copied, setCopied] = useState(false)
  const content = results[activeTab]

  function copyToClipboard() {
    navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (runState === 'running') {
    return (
      <div className="glass-card flex min-h-[600px] flex-col items-center justify-center border-dashed border-brand-orange/30">
        <div className="relative">
          <div className="absolute inset-0 scale-150 blur-3xl bg-brand-orange/20 animate-pulse" />
          <Loader2 className="relative h-16 w-16 animate-spin text-brand-orange" />
        </div>
        <h3 className="mt-10 text-xl font-black uppercase tracking-widest italic">Orchestrating Output...</h3>
        <p className="mt-3 text-sm font-medium text-white/30">Synthesizing 6E brand context for {activeTab}...</p>
      </div>
    )
  }

  if (!hasGenerated) {
    return (
      <div className="glass-card flex min-h-[600px] flex-col items-center justify-center p-12 text-center border-dashed border-white/10">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/5 text-white/10">
          <Terminal className="h-10 w-10" />
        </div>
        <h3 className="mt-8 text-2xl font-black">Waiting for Flight Path.</h3>
        <p className="mt-3 max-w-xs text-white/40 font-medium">
          Enter your campaign narrative on the left to start the AI orchestration engine.
        </p>
      </div>
    )
  }

  return (
    <div className="animate-fade-in space-y-6">
      {/* Canvas Controls */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Canvas Output · {activeTab}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white/60 ring-1 ring-white/10 hover:bg-white/10 hover:text-white transition-all"
          >
            {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
            {copied ? 'Copied' : 'Copy Text'}
          </button>
          <button className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white ring-1 ring-indigo-500 hover:bg-indigo-500 transition-all">
            <ExternalLink className="h-3 w-3" />
            Export
          </button>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="glass-card min-h-[600px] p-1 bg-gradient-to-br from-white/10 via-transparent to-transparent shadow-2xl">
        <div className="h-full rounded-[23px] bg-[#020e4a]/60 p-10 backdrop-blur-3xl">
          <div className="flex items-center gap-3 mb-10 pb-6 border-b border-white/5">
             <div className="h-2 w-2 rounded-full bg-brand-orange" />
             <div className="h-2 w-2 rounded-full bg-white/10" />
             <div className="h-2 w-2 rounded-full bg-white/10" />
             <div className="ml-auto flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-emerald-400 ring-1 ring-emerald-500/20">
               <ShieldCheck className="h-3 w-3" />
               6E Brand Verified
             </div>
          </div>

          <div className="prose prose-invert max-w-none">
            <div className="whitespace-pre-wrap text-lg leading-relaxed text-white/90 font-medium selection:bg-brand-orange/50">
              {content || `No ${activeTab} content generated for this campaign yet.`}
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer Meta */}
      <div className="flex items-center justify-between px-4 py-2 opacity-30">
        <span className="text-[9px] font-bold uppercase tracking-widest">Model: 6E-Linguistic-v2.5</span>
        <span className="text-[9px] font-bold uppercase tracking-widest">Safety Score: 1.0</span>
      </div>
    </div>
  )
}
