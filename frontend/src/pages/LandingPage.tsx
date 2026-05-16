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
} from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { LandingBackground } from '@/components/landing/LandingBackground'
import { LandingNav } from '@/components/landing/LandingNav'

const engines = [
  { title: 'Social', icon: Share2, line: 'Posts and hashtags tuned to the brief and channel.' },
  { title: 'Copywriting', icon: PenLine, line: 'Headlines, bodies, CTAs for web, CRM, and decks.' },
  { title: 'Banner', icon: LayoutTemplate, line: 'Specs: headline, sub, sizes, hand-off notes.' },
  { title: 'Image Gen', icon: Sparkles, line: 'Visual briefs and alt text for your gen stack.' },
] as const

const pillars = [
  {
    icon: ClipboardList,
    title: 'One intake',
    body: 'Campaign type and narrative captured once — every engine inherits the same context.',
  },
  {
    icon: Cpu,
    title: 'Parallel engines',
    body: 'Social, copy, banner layout, and image-gen briefs run from that single brief.',
  },
  {
    icon: ShieldCheck,
    title: 'Review-native',
    body: 'Outputs land in preview for Marketing sign-off — not silent publication.',
  },
] as const

const runway = ['Brief', 'Orchestrate', 'Preview', 'Review'] as const

export function LandingPage() {
  const user = useAuthStore((s) => s.user)

  return (
    <div className="relative min-h-[100dvh] overflow-x-hidden text-slate-800 antialiased">
      <LandingBackground />
      <LandingNav userSignedIn={!!user} />

      <main className="relative pt-20">
        {/* --- Hero Section --- */}
        <section className="mx-auto max-w-7xl px-6 pt-24 pb-20 lg:pt-32 lg:pb-32">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-800 ring-1 ring-inset ring-sky-200/50">
                <Sparkles className="h-3 w-3" />
                <span>AI-Powered Content Orchestration</span>
              </div>
              <h1 className="mt-8 text-balance text-5xl font-bold leading-[1.05] tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
                Campaign-ready creatives,{' '}
                <span className="bg-gradient-to-r from-[#0C2340] via-sky-800 to-cyan-600 bg-clip-text text-transparent">
                  reviewed for brand safety
                </span>
              </h1>

              <p className="mt-8 text-pretty text-lg leading-relaxed text-slate-600 sm:text-xl">
                One continuous flow: capture the brief, run four specialised agents, and land in a preview built for marketing review — not
                auto-publish.
              </p>

              <ul className="mt-10 space-y-4 text-[15px] leading-relaxed text-slate-600">
                {[
                  'Mapped outputs per channel, ready for stakeholder passes',
                  'Human approval before anything goes external',
                  'Mocks now — swap in your agentic backend when you ship',
                ].map((line) => (
                  <li key={line} className="flex gap-3.5">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden />
                    {line}
                  </li>
                ))}
              </ul>

              <div className="mt-12 flex flex-col gap-4 sm:flex-row">
                <Link
                  to={user ? '/projects' : '/login'}
                  className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-[#0C2340] px-10 py-4.5 text-center text-sm font-bold text-white shadow-2xl shadow-[#0C2340]/20 transition-all hover:scale-[1.02] hover:shadow-[#0C2340]/30 active:scale-[0.98]"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {user ? 'Go to studio' : 'Sign in to start'}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                  </span>
                </Link>
                <Link
                  to={user ? '/projects' : '/login'}
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white/80 px-10 py-4.5 text-center text-sm font-bold text-slate-800 backdrop-blur transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 active:scale-[0.98]"
                >
                  {user ? 'View Projects' : 'Enter workspace'}
                </Link>
              </div>

              <p className="mt-8 text-xs font-medium uppercase tracking-widest text-slate-400">
                Internal hackathon preview · 6E Creative Studio
              </p>
            </div>

            {/* Hero Visual Component (Live Canvas Preview) */}
            <div className="relative">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-tr from-sky-100/50 to-white/50 blur-2xl lg:-inset-8" />
              <div className="relative overflow-hidden rounded-3xl bg-white/60 p-1 shadow-[0_32px_64px_-16px_rgba(15,23,42,0.15)] ring-1 ring-slate-200/50 backdrop-blur-2xl">
                <div className="rounded-[1.25rem] bg-white p-6 sm:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">Live canvas</p>
                      </div>
                      <p className="mt-1 text-lg font-bold text-slate-900">Winter destination push</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700 ring-1 ring-inset ring-emerald-200/50">
                      <ShieldCheck className="h-3 w-3" />
                      Brand-safe
                    </span>
                  </div>

                  <div className="mt-8 space-y-8">
                    <div className="group rounded-2xl bg-slate-50/50 p-4 transition-colors hover:bg-slate-50">
                      <div className="flex items-center gap-2 text-xs font-bold text-sky-700">
                        <Share2 className="h-3.5 w-3.5" />
                        <span>SOCIAL · INSTAGRAM</span>
                      </div>
                      <p className="mt-3 text-[15px] leading-relaxed text-slate-700">
                        ✈️ Direct flights to your next winter escape. Fare rules apply — book on goIndiGo.in.
                      </p>
                      <div className="mt-3 flex gap-2 font-mono text-[10px] text-sky-800/60">
                        <span>#goIndiGo</span>
                        <span>#6ECreativeStudio</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div className="rounded-2xl border border-slate-100 p-4">
                        <div className="flex items-center gap-2 text-xs font-bold text-[#0C2340]">
                          <LayoutTemplate className="h-3.5 w-3.5" />
                          <span>BANNER</span>
                        </div>
                        <p className="mt-2 text-[13px] leading-relaxed text-slate-600">
                          "Your next destination awaits" — subhead & CTA ready for export.
                        </p>
                      </div>
                      <div className="rounded-2xl border border-slate-100 p-4">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                          <Sparkles className="h-3.5 w-3.5 text-cyan-500" />
                          <span>IMAGE GEN</span>
                        </div>
                        <p className="mt-2 text-[13px] italic leading-relaxed text-slate-500">
                          Sunrise boarding, cool blues, hero zone top-left...
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Pillars Section --- */}
        <section className="relative bg-[#0C2340] py-24 lg:py-32">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(14,165,233,0.1),transparent_50%)]" />
          <div className="relative mx-auto max-w-7xl px-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                The way marketing teams <br />
                <span className="text-sky-400 text-pretty">actually ship content.</span>
              </h2>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {pillars.map(({ icon: Icon, title, body }) => (
                <div
                  key={title}
                  className="group rounded-3xl bg-white/5 p-8 ring-1 ring-white/10 transition-all hover:bg-white/10 hover:ring-white/20"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-400 ring-1 ring-sky-500/20 group-hover:bg-sky-500 group-hover:text-white transition-colors">
                    <Icon className="h-6 w-6" aria-hidden />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-white">{title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-slate-400">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Workflow Section --- */}
        <section className="py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center">
              <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-sky-600">The 6E Runway</h2>
              <p className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">From brief to brand-safe preview</p>
            </div>

            <div className="mt-16 overflow-hidden rounded-[2.5rem] bg-white/40 p-2 shadow-2xl shadow-slate-200/50 ring-1 ring-slate-200/50 backdrop-blur-md">
              <div className="rounded-[2.25rem] bg-white px-6 py-12 lg:px-16">
                <div className="relative">
                  <div className="absolute top-1/2 left-0 h-0.5 w-full -translate-y-1/2 bg-slate-100" />
                  <div className="relative flex justify-between gap-4">
                    {runway.map((label, idx) => (
                      <div key={label} className="relative flex flex-col items-center">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full border-4 border-white text-sm font-bold shadow-md ${
                            idx === 2 ? 'bg-[#0C2340] text-white ring-4 ring-[#0C2340]/10' : 'bg-slate-200 text-slate-500'
                          }`}
                        >
                          {idx + 1}
                        </div>
                        <span className="mt-4 text-[11px] font-bold uppercase tracking-widest text-slate-500">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-20 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24">
                  {engines.map(({ title, icon: Icon, line }) => (
                    <div key={title} className="flex items-start gap-6 group">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-50 text-[#0C2340] ring-1 ring-slate-200/50 group-hover:bg-[#0C2340] group-hover:text-white transition-all">
                        <Icon className="h-6 w-6" aria-hidden />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-slate-900">{title}</h4>
                        <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{line}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- CTA Section --- */}
        <section className="relative overflow-hidden py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <div className="relative isolate overflow-hidden bg-[#0C2340] px-6 py-24 text-center shadow-2xl rounded-3xl sm:px-16">
              <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to accelerate your marketing loop?
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
                Join the internal preview and start generating brand-safe creatives for IndiGo campaigns.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  to={user ? '/projects' : '/login'}
                  className="rounded-2xl bg-white px-10 py-4 text-sm font-bold text-[#0C2340] shadow-sm hover:bg-sky-50 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {user ? 'Continue to Studio' : 'Get Started'}
                </Link>
                <Link to="/projects" className="text-sm font-bold leading-6 text-white hover:text-sky-300 transition-colors">
                  Learn more <span aria-hidden="true">→</span>
                </Link>
              </div>
              <svg
                viewBox="0 0 1024 1024"
                className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
                aria-hidden="true"
              >
                <circle cx={512} cy={512} r={512} fill="url(#gradient)" fillOpacity="0.15" />
                <defs>
                  <radialGradient id="gradient">
                    <stop stopColor="#0EA5E9" />
                    <stop offset={1} stopColor="#0C2340" />
                  </radialGradient>
                </defs>
              </svg>
            </div>
          </div>
        </section>

        {/* --- Footer --- */}
        <footer className="mx-auto max-w-7xl px-6 pb-12">
          <div className="border-t border-slate-200 pt-12">
            <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0C2340] text-white">
                  <Plane className="h-5 w-5" />
                </div>
                <span className="text-xl font-bold tracking-tight text-slate-900">6E Creative Studio</span>
              </div>
              <nav className="flex gap-8 text-sm font-semibold text-slate-600">
                <Link to="/login" className="hover:text-[#0C2340]">Sign in</Link>
                <Link to="/projects" className="hover:text-[#0C2340]">Projects</Link>
                <Link to="/workspace" className="hover:text-[#0C2340]">Workspace</Link>
              </nav>
            </div>
            <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-slate-100 pt-8 md:flex-row">
              <p className="text-xs text-slate-500">
                © {new Date().getFullYear()} IndiGo Internal Hackathon. Not for public campaign use.
              </p>
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                <ShieldCheck className="h-3 w-3" />
                Brand Safety Certified
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
