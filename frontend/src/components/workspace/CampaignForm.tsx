import { Send, Zap, Info } from 'lucide-react'
import type { CampaignType } from '@/types'

interface CampaignFormProps {
  campaignType: CampaignType
  description: string
  onCampaignTypeChange: (v: CampaignType) => void
  onDescriptionChange: (v: string) => void
  onSubmit: () => void
  loading: boolean
}

const types: { value: CampaignType; label: string; desc: string }[] = [
  { value: 'social', label: 'Social Burst', desc: 'Instagram, Twitter, FB content' },
  { value: 'copywriting', label: 'Copy Deck', desc: 'Web, CRM, and internal briefs' },
  { value: 'banner', label: 'Visual Display', desc: 'Google Ads & Banner specs' },
  { value: 'imageGen', label: 'Gen Assets', desc: 'AI Image generation prompts' },
]

export function CampaignForm({
  campaignType,
  description,
  onCampaignTypeChange,
  onDescriptionChange,
  onSubmit,
  loading,
}: CampaignFormProps) {
  return (
    <div className="glass-card flex flex-col p-8 shadow-2xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-orange/20 text-brand-orange">
          <Zap className="h-4 w-4 fill-brand-orange" />
        </div>
        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-white">Intake Controls</h2>
      </div>

      <div className="space-y-8">
        {/* Campaign Type Selector */}
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1">
            Engine Configuration
          </label>
          <div className="grid grid-cols-1 gap-2">
            {types.map((t) => (
              <button
                key={t.value}
                onClick={() => onCampaignTypeChange(t.value)}
                className={`flex items-start gap-4 rounded-2xl p-4 text-left transition-all ring-1 ${
                  campaignType === t.value
                    ? 'bg-brand-orange/10 ring-brand-orange/40'
                    : 'bg-white/5 ring-white/5 hover:bg-white/10'
                }`}
              >
                <div className={`mt-1 h-2 w-2 rounded-full ${campaignType === t.value ? 'bg-brand-orange shadow-[0_0_8px_#FF6B00]' : 'bg-white/20'}`} />
                <div>
                  <div className={`text-sm font-bold ${campaignType === t.value ? 'text-white' : 'text-white/60'}`}>{t.label}</div>
                  <div className="text-[10px] text-white/30 font-medium">{t.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Prompt Input */}
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1">
            Campaign Narrative
          </label>
          <div className="relative group">
            <textarea
              value={description}
              onChange={(e) => onDescriptionChange(e.target.value)}
              placeholder="e.g. Winter sale for flights to Maldives. Focus on family travel and early-bird discounts..."
              rows={6}
              className="w-full resize-none rounded-2xl border border-white/5 bg-white/5 p-5 text-sm text-white placeholder:text-white/20 focus:border-brand-orange/50 focus:outline-none focus:ring-4 focus:ring-brand-orange/5 transition-all"
            />
          </div>
        </div>

        {/* Info Box */}
        <div className="flex gap-3 rounded-2xl bg-indigo-500/5 p-4 ring-1 ring-indigo-500/10">
          <Info className="h-4 w-4 shrink-0 text-sky-400" />
          <p className="text-[10px] leading-relaxed text-white/40">
            Agents will use the 6E brand guidelines to verify safety and tone compliance.
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={onSubmit}
          disabled={loading || !description.trim()}
          className="btn-orange w-full py-5 text-base flex items-center justify-center gap-3 disabled:opacity-40 group"
        >
          {loading ? (
            <>
              <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Orchestrating...</span>
            </>
          ) : (
            <>
              <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              <span>Run Engines</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}
