import { type FormEvent, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import {
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  Plane,
  User,
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
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-br from-slate-50 via-white to-sky-50">
      {/* Background blobs */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-32 -left-32 h-[520px] w-[520px] rounded-full bg-[#0C2340]/[0.06] blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-[440px] w-[440px] rounded-full bg-sky-400/10 blur-3xl" />
      </div>

      {/* Nav */}
      <header className="px-6 pt-6">
        <Link to="/" className="inline-flex items-center gap-2.5 font-semibold text-[#0C2340]">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0C2340] text-white shadow-lg shadow-[#0C2340]/25">
            <Plane className="h-4 w-4" />
          </span>
          <span className="text-[15px]">6E Creative Studio</span>
        </Link>
      </header>

      {/* Card */}
      <div className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          {/* Glass card */}
          <div className="overflow-hidden rounded-3xl bg-white/70 shadow-2xl shadow-slate-300/30 ring-1 ring-slate-200/60 backdrop-blur-2xl">
            {/* Tab switcher */}
            <div className="flex">
              {(['login', 'signup'] as Tab[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => { setTab(t); setError(null) }}
                  className={`flex-1 py-4 text-sm font-bold capitalize tracking-wide transition-colors ${
                    tab === t
                      ? 'bg-white text-[#0C2340] shadow-sm'
                      : 'bg-slate-50/80 text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {t === 'login' ? 'Sign In' : 'Create Account'}
                </button>
              ))}
            </div>

            <div className="px-8 pb-10 pt-8">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                {tab === 'login' ? 'Welcome back' : 'Join 6E Studio'}
              </h1>
              <p className="mt-1.5 text-sm text-slate-500">
                {tab === 'login'
                  ? 'Sign in to access your campaign workspace.'
                  : 'Create your account and start building campaigns.'}
              </p>

              <form onSubmit={onSubmit} className="mt-8 space-y-5">
                {/* Full name — signup only */}
                {tab === 'signup' && (
                  <div className="group">
                    <label htmlFor="fullName" className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-slate-500">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <input
                        id="fullName"
                        type="text"
                        required={tab === 'signup'}
                        autoComplete="name"
                        placeholder="Akshay Malik"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white/80 py-3 pl-10 pr-4 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-[#0C2340] focus:outline-none focus:ring-2 focus:ring-[#0C2340]/10 transition"
                      />
                    </div>
                  </div>
                )}

                {/* Email */}
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-slate-500">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      id="email"
                      type="email"
                      required
                      autoComplete="username"
                      placeholder="you@goindigo.in"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white/80 py-3 pl-10 pr-4 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-[#0C2340] focus:outline-none focus:ring-2 focus:ring-[#0C2340]/10 transition"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-slate-500">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      id="password"
                      type={showPass ? 'text' : 'password'}
                      required
                      autoComplete={tab === 'login' ? 'current-password' : 'new-password'}
                      placeholder={tab === 'signup' ? 'Min 8 characters' : '••••••••'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white/80 py-3 pl-10 pr-12 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-[#0C2340] focus:outline-none focus:ring-2 focus:ring-[#0C2340]/10 transition"
                    />
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={() => setShowPass((v) => !v)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <div
                    role="alert"
                    className="flex items-start gap-2.5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-100"
                  >
                    <span className="mt-0.5 h-4 w-4 shrink-0 rounded-full bg-red-200 text-center text-xs font-bold leading-4 text-red-700">!</span>
                    {error}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#0C2340] py-3.5 text-sm font-bold text-white shadow-lg shadow-[#0C2340]/20 transition-all hover:bg-[#0a1c34] hover:shadow-[#0C2340]/30 disabled:opacity-60"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      {tab === 'login' ? 'Sign In' : 'Create Account'}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 flex items-center gap-4">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-xs text-slate-400">or</span>
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <p className="mt-6 text-center text-sm text-slate-500">
                {tab === 'login' ? "Don't have an account? " : 'Already have an account? '}
                <button
                  type="button"
                  onClick={() => { setTab(tab === 'login' ? 'signup' : 'login'); setError(null) }}
                  className="font-bold text-[#0C2340] hover:underline"
                >
                  {tab === 'login' ? 'Create one' : 'Sign in'}
                </button>
              </p>

              <p className="mt-4 text-center text-[11px] text-slate-400">
                <Link to="/" className="hover:text-[#0C2340]">← Back to home</Link>
              </p>
            </div>
          </div>

          {/* Hint */}
          <p className="mt-6 text-center text-xs text-slate-400">
            Internal hackathon preview · not production IndiGo systems.
          </p>
        </div>
      </div>
    </div>
  )
}
