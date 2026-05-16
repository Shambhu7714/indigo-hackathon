import { WarningBanner } from '@/components/layout/WarningBanner'
import { TopNav } from '@/components/layout/TopNav'
import { LandingBackground } from '@/components/landing/LandingBackground'

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col text-white selection:bg-brand-orange/30">
      <LandingBackground />
      <WarningBanner />
      <TopNav />
      <main className="relative flex-1 animate-fade-in">
        {children}
      </main>
    </div>
  )
}
