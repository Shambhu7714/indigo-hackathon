import { type FormEvent, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { LandingBackground } from '@/components/landing/LandingBackground'
import {
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  Plane,
  User,
  ShieldCheck,
} from 'lucide-react'

type Tab = 'login' | 'signup'

export function LoginPage() {
  const user = useAuthStore((s) => s.user)
  const signIn = useAuthStore((s) => s.signIn)
  const signUp = useAuthStore((s) => s.signUp)
  const loading = useAuthStore((s) => s.loading)
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? '/projects'

  const [tab, setTab] = useState<Tab>('login')
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (user) return <Navigate to={from} replace />

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    const err =
      tab === 'login'
        ? await signIn(email, password)
        : await signUp(email, fullName, password)
    if (err) setError(err)
    else navigate(from, { replace: true })
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden text-white">
      <LandingBackground />

      {/* Nav */}
      <header className="px-8 pt-8 animate-fade-in">
        <Link to="/" className="group inline-flex items-center gap-3 font-bold">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-800 text-white shadow-lg shadow-indigo-900/40 transition-transform group-hover:scale-105">
            <Plane className="h-5 w-5 -rotate-45" />
          </div>
          <span className="text-xl tracking-tighter">6E Studio</span>
        </Link>
      </header>

      {/* Auth Container */}
      <div className="flex flex-1 items-center justify-center px-4 py-12 lg:py-20">
        <div className="w-full max-w-md animate-slide-up">
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
              {tab === 'login' ? 'Welcome back.' : 'Join the fleet.'}
            </h1>
            <p className="mt-3 text-white/50 text-sm font-medium">
              {tab === 'login' 
                ? 'Sign in to access your creative workspace.' 
                : 'Create your internal account to start building.'}
            </p>
          </div>

          {/* Glass Card */}
          <div className="glass-card overflow-hidden shadow-2xl">
            {/* Custom Tab Switcher */}
            <div className="flex p-2 gap-1 border-b border-white/5 bg-white/5">
              {(['login', 'signup'] as Tab[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => { setTab(t); setError(null) }}
                  className={`flex-1 py-3 text-xs font-black uppercase tracking-widest transition-all rounded-xl ${
                    tab === t
                      ? 'bg-white/10 text-brand-orange shadow-inner ring-1 ring-white/10'
                      : 'text-white/40 hover:text-white/70 hover:bg-white/[0.02]'
                  }`}
                >
                  {t === 'login' ? 'Sign In' : 'Register'}
                </button>
              ))}
            </div>

            <div className="px-8 py-10">
              <form onSubmit={onSubmit} className="space-y-6">
                {/* Full name — signup only */}
                {tab === 'signup' && (
                  <div className="space-y-2 animate-fade-in">
                    <label htmlFor="fullName" className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">
                      Full Name
                    </label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/20 group-focus-within:text-brand-orange transition-colors" />
                      <input
                        id="fullName"
                        type="text"
                        required={tab === 'signup'}
                        autoComplete="name"
                        placeholder="Akshay Malik"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full rounded-2xl border border-white/5 bg-white/5 py-4 pl-12 pr-4 text-sm text-white placeholder:text-white/20 focus:border-brand-orange/50 focus:outline-none focus:ring-4 focus:ring-brand-orange/5 transition-all"
                      />
                    </div>
                  </div>
                )}

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">
                    Work Email
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/20 group-focus-within:text-brand-orange transition-colors" />
                    <input
                      id="email"
                      type="email"
                      required
                      autoComplete="username"
                      placeholder="you@goindigo.in"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-2xl border border-white/5 bg-white/5 py-4 pl-12 pr-4 text-sm text-white placeholder:text-white/20 focus:border-brand-orange/50 focus:outline-none focus:ring-4 focus:ring-brand-orange/5 transition-all"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center ml-1">
                    <label htmlFor="password" className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                      Password
                    </label>
                    {tab === 'login' && (
                      <button type="button" className="text-[10px] font-bold text-brand-orange/70 hover:text-brand-orange transition-colors">
                        Forgot?
                      </button>
                    )}
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/20 group-focus-within:text-brand-orange transition-colors" />
                    <input
                      id="password"
                      type={showPass ? 'text' : 'password'}
                      required
                      autoComplete={tab === 'login' ? 'current-password' : 'new-password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-2xl border border-white/5 bg-white/5 py-4 pl-12 pr-12 text-sm text-white placeholder:text-white/20 focus:border-brand-orange/50 focus:outline-none focus:ring-4 focus:ring-brand-orange/5 transition-all"
                    />
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={() => setShowPass((v) => !v)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                    >
                      {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Error Alert */}
                {error && (
                  <div role="alert" className="flex items-start gap-3 rounded-2xl bg-red-500/10 border border-red-500/20 px-4 py-4 text-sm text-red-400 animate-fade-in">
                    <div className="mt-0.5 h-4 w-4 shrink-0 rounded-full bg-red-500/20 text-center text-[10px] font-black leading-4 text-red-500">!</div>
                    <p className="font-medium">{error}</p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-orange w-full py-5 text-base flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      <span>{tab === 'login' ? 'Sign In to Studio' : 'Create 6E Account'}</span>
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>

              {/* Security Hint */}
              <div className="mt-10 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/20">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Internal 6E Security Enabled</span>
              </div>
            </div>
          </div>

          <p className="mt-12 text-center text-xs font-bold text-white/20 uppercase tracking-[0.2em]">
            IndiGo Internal Systems · Hackathon Preview
          </p>
        </div>
      </div>
    </div>
  )
}
