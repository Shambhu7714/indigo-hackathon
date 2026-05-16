import { Loader2, Copy, Check, Terminal, ExternalLink, ShieldCheck, Share2, PenLine, LayoutTemplate, Sparkles } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import type { AgentId, AgentResults, AgentStatus } from '@/types'

interface PreviewPanelProps {
  activeTab: AgentId
  runState: Record<AgentId, AgentStatus>
  results: AgentResults
  hasGenerated: boolean
}

interface ContentResult {
  jsx: ReactNode
  text: string
}

export function PreviewPanel({ activeTab, runState, results, hasGenerated }: PreviewPanelProps) {
  const [copied, setCopied] = useState(false)
  const currentStatus = runState[activeTab]

  function getRenderedContent(): ContentResult {
    if (activeTab === 'social') {
      const text = results.social.map(p => `[${p.platform}]\n${p.text}\n${p.hashtags.join(' ')}`).join('\n\n---\n\n')
      return { jsx: <div className="whitespace-pre-wrap">{text}</div>, text }
    }
    if (activeTab === 'copywriting') {
      const text = results.copywriting.map(c => `### ${c.title}\n${c.body}`).join('\n\n')
      return { jsx: <div className="whitespace-pre-wrap">{text}</div>, text }
    }
    if (activeTab === 'banner') {
      const b = results.banner
      if (!b) return { jsx: null, text: '' }
      const text = `### ${b.headline}\n${b.subhead}\n\n**CTA:** ${b.cta}\n**Sizes:** ${b.dimensions}\n\n*Notes: ${b.notes}*`
      return { jsx: <div className="whitespace-pre-wrap">{text}</div>, text }
    }
    if (activeTab === 'imageGen') {
      const i = results.imageGen
      if (!i) return { jsx: null, text: '' }
      return {
        jsx: (
          <div className="space-y-6 animate-fade-in">
            {i.imageUrl && (
              <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
                <img
                  src={i.imageUrl}
                  alt={i.suggestedAlt}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020e4a]/80 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="inline-flex items-center gap-2 rounded-full bg-brand-orange/90 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-white shadow-lg">
                    AI Generated Visual
                  </div>
                </div>
              </div>
            )}
            <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
              <h4 className="text-xs font-black uppercase tracking-widest text-white/40 mb-3">Creative Prompt</h4>
              <p className="text-sm leading-relaxed text-white/70 italic">"{i.description}"</p>
            </div>
          </div>
        ),
        text: i.description
      }
    }
    return { jsx: null, text: '' }
  }

  const { jsx, text: copyText } = getRenderedContent()

  function copyToClipboard() {
    if (!copyText) return
    navigator.clipboard.writeText(copyText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (currentStatus === 'pending' || currentStatus === 'running') {
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

  if (!hasGenerated || !jsx) {
    return (
      <div className="glass-card flex min-h-[600px] flex-col items-center justify-center p-12 text-center border-dashed border-white/10">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/5 text-white/10">
          <Terminal className="h-10 w-10" />
        </div>
        <h3 className="mt-8 text-2xl font-black">Waiting for Flight Path.</h3>
        <p className="mt-3 max-w-xs text-white/40 font-medium">
          Enter your campaign narrative on the left to start the AI orchestration engine for {activeTab}.
        </p>
      </div>
    )
  }

  const icons = {
    social: Share2,
    copywriting: PenLine,
    banner: LayoutTemplate,
    imageGen: Sparkles
  }
  const ActiveIcon = icons[activeTab]

  return (
    <div className="animate-fade-in space-y-6">
      {/* Canvas Controls */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-brand-orange/10 text-brand-orange">
             <ActiveIcon className="h-3.5 w-3.5" />
          </div>
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
            <div className="text-lg leading-relaxed text-white/90 font-medium selection:bg-brand-orange/50">
              {jsx}
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
