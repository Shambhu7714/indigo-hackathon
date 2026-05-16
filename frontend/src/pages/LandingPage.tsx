import { Link } from 'react-router-dom'
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Cpu,
  LayoutTemplate,
  PenLine,
  Plane,
  Share2,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { LandingBackground } from '@/components/landing/LandingBackground'
import { LandingNav } from '@/components/landing/LandingNav'

const engines = [
  { title: 'Social', icon: Share2, line: 'Viral-ready posts tuned to the brief.' },
  { title: 'Copywriting', icon: PenLine, line: 'Compelling headlines & body copy.' },
  { title: 'Visuals', icon: LayoutTemplate, line: 'Ad specs & design hand-offs.' },
  { title: 'AI Assets', icon: Sparkles, line: 'High-fidelity generative prompts.' },
] as const

const pillars = [
  {
    icon: ClipboardList,
    title: 'Single Intake',
    body: 'Input your campaign narrative once. Every engine inherits the exact same brand context.',
    color: 'text-sky-400',
  },
  {
    icon: Cpu,
    title: 'Parallel Power',
    body: 'Four specialized AI agents run in parallel to generate comprehensive campaign suites.',
    color: 'text-brand-orange',
  },
  {
    icon: ShieldCheck,
    title: 'Human Approved',
    body: 'Nothing goes live without your sign-off. Built for enterprise brand safety.',
    color: 'text-emerald-400',
  },
] as const

export function LandingPage() {
  const user = useAuthStore((s) => s.user)

  return (
    <div className="relative min-h-[100dvh] overflow-x-hidden text-white selection:bg-brand-orange/30">
      <LandingBackground />
      <LandingNav userSignedIn={!!user} />

      <main className="relative pt-32">
        {/* --- HERO SECTION --- */}
        <section className="mx-auto max-w-7xl px-6 pt-12 pb-24 lg:pt-20">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
            <div className="animate-slide-up">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-brand-orange ring-1 ring-white/10 backdrop-blur-md">
                <Zap className="h-3 w-3 fill-brand-orange" />
                <span>Next-Gen Content Loop</span>
              </div>
              
              <h1 className="mt-8 text-balance text-6xl font-extrabold leading-[1.1] tracking-tight sm:text-7xl">
                Fly with <br />
                <span className="text-shimmer">Creative Intelligence.</span>
              </h1>

              <p className="mt-8 max-w-lg text-pretty text-lg leading-relaxed text-white/60 sm:text-xl">
                The internal studio for IndiGo marketing. Orchestrate campaigns at the speed of 6E with brand-safe AI agents.
              </p>

              <div className="mt-12 flex flex-col gap-5 sm:flex-row">
                <Link to={user ? '/projects' : '/login'} className="btn-orange text-base px-12 py-5">
                  <span className="flex items-center gap-3">
                    {user ? 'Open Studio' : 'Get Started Now'}
                    <ArrowRight className="h-5 w-5" />
                  </span>
                </Link>
                <Link to="/login" className="btn-ghost text-base px-10 py-5">
                  View Demo
                </Link>
              </div>

              <div className="mt-12 flex items-center gap-8 border-t border-white/5 pt-8">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-white">4x</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Faster Loop</span>
                </div>
                <div className="h-10 w-px bg-white/10" />
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-white">100%</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Brand Safe</span>
                </div>
              </div>
            </div>

            {/* Hero Interactive Card */}
            <div className="relative animate-fade-in delay-300">
              <div className="absolute -inset-10 bg-indigo-500/20 blur-[120px] animate-pulse" />
              <div className="glass-card overflow-hidden p-1 p-px bg-gradient-to-br from-white/10 to-transparent">
                <div className="rounded-[23px] bg-[#020e4a]/80 p-8 backdrop-blur-3xl">
                  <div className="flex items-center justify-between border-b border-white/5 pb-6">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full bg-brand-orange shadow-[0_0_12px_#FF6B00]" />
                      <span className="text-xs font-bold uppercase tracking-widest text-white/70">Agent Processing</span>
                    </div>
                    <span className="text-[10px] font-bold text-white/30">ID: 6E-9021</span>
                  </div>

                  <div className="mt-8 space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] font-bold uppercase tracking-tighter text-white/40">
                        <span>Linguistic Engine</span>
                        <span className="text-brand-orange">94%</span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                        <div className="h-full w-[94%] animate-gradient bg-gradient-to-r from-brand-orange to-indigo-500" />
                      </div>
                    </div>

                    <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
                      <p className="text-[14px] leading-relaxed text-white/80 italic">
                        "Experience seamless travel with IndiGo's new winter routes. Book now for exclusive 6E rewards."
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {[1, 2].map((i) => (
                        <div key={i} className="aspect-square rounded-xl bg-white/5 ring-1 ring-white/5 flex items-center justify-center">
                          <Plane className={`h-8 w-8 text-white/10 ${i === 1 ? 'animate-float' : 'animate-float-slow'}`} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- PILLARS SECTION --- */}
        <section className="relative py-32">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center">
              <h2 className="text-orange-gradient text-sm font-black uppercase tracking-[0.4em]">Propulsion</h2>
              <p className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">Built for the 6E standard.</p>
            </div>

            <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
              {pillars.map((pillar, idx) => (
                <div key={idx} className="glass-card group p-10 animate-slide-up" style={{ animationDelay: `${idx * 0.15}s` }}>
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 ${pillar.color} ring-1 ring-white/10 group-hover:scale-110 transition-transform`}>
                    <pillar.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-8 text-2xl font-bold">{pillar.title}</h3>
                  <p className="mt-4 text-white/50 leading-relaxed">
                    {pillar.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- FEATURES GRID --- */}
        <section className="bg-white/[0.02] py-32 ring-1 ring-white/5">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 gap-20 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="text-4xl font-extrabold tracking-tight leading-tight">
                  One input. <br />
                  <span className="text-orange-gradient">Total campaign coverage.</span>
                </h2>
                <p className="mt-6 text-lg text-white/60 leading-relaxed">
                  Stop repeating yourself across creative desks. Our orchestration layer ensures every piece of content—from a tweet to a print brief—stays perfectly aligned with your core campaign message.
                </p>
                
                <div className="mt-12 space-y-6">
                  {engines.map((engine, idx) => (
                    <div key={idx} className="flex items-center gap-6 group">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-800/40 text-white group-hover:bg-brand-orange transition-colors">
                        <engine.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">{engine.title}</h4>
                        <p className="text-sm text-white/40">{engine.line}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative aspect-square">
                <div className="absolute inset-0 bg-brand-orange/20 blur-[100px] animate-pulse" />
                <div className="relative h-full w-full glass-card flex items-center justify-center border-dashed">
                  <div className="animate-orbit p-8">
                     <div className="h-32 w-32 rounded-3xl bg-indigo-600 flex items-center justify-center shadow-[0_0_50px_rgba(79,70,229,0.5)]">
                        <Plane className="h-16 w-16 -rotate-45" />
                     </div>
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                    <span className="text-4xl font-black text-brand-orange drop-shadow-lg">6E</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- CTA --- */}
        <section className="py-32">
          <div className="mx-auto max-w-5xl px-6">
            <div className="relative overflow-hidden rounded-[40px] bg-indigo-800 p-12 text-center shadow-2xl ring-1 ring-white/20">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/20 via-transparent to-indigo-900/40" />
              <h2 className="relative text-4xl font-black sm:text-5xl leading-tight">
                Ready for Takeoff?
              </h2>
              <p className="relative mt-6 text-xl text-indigo-100 max-w-2xl mx-auto">
                Join the internal IndiGo hackathon studio and start building your first AI-powered campaign today.
              </p>
              <div className="relative mt-12 flex flex-col items-center gap-6 sm:flex-row justify-center">
                <Link to="/login" className="btn-orange text-lg px-12 py-5 w-full sm:w-auto">
                  Sign in to Start
                </Link>
                <div className="flex items-center gap-2 text-sm font-bold text-indigo-200">
                  <CheckCircle2 className="h-5 w-5 text-brand-orange" />
                  Internal Access Only
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- FOOTER --- */}
        <footer className="border-t border-white/5 py-12">
          <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-3">
              <Plane className="h-6 w-6 text-brand-orange" />
              <span className="font-black text-xl tracking-tighter">6E CREATIVE</span>
            </div>
            <p className="text-xs font-bold text-white/20 uppercase tracking-[0.2em]">
              © 2024 IndiGo Airlines · Internal Hackathon Project
            </p>
            <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-white/40">
              <a href="#" className="hover:text-brand-orange transition-colors">Privacy</a>
              <a href="#" className="hover:text-brand-orange transition-colors">Safety</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
