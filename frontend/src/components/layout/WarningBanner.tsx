import { ShieldAlert } from 'lucide-react'

export function WarningBanner() {
  return (
    <div
      className="border-b border-brand-orange/20 bg-brand-orange/5 px-4 py-2 text-center text-[10px] font-black uppercase tracking-[0.2em] text-brand-orange/80"
      role="status"
    >
      <p className="mx-auto flex max-w-7xl items-center justify-center gap-3">
        <ShieldAlert className="h-3.5 w-3.5" aria-hidden />
        <span>
          Compliance: All generated assets require Marketing Head approval before publication.
        </span>
      </p>
    </div>
  )
}
