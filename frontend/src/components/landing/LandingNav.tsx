import { Link } from 'react-router-dom'
import { Plane } from 'lucide-react'

interface LandingNavProps {
  userSignedIn: boolean
}

export function LandingNav({ userSignedIn }: LandingNavProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-6 pt-6 animate-fade-in">
      <div className="flex w-full max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-6 py-3.5 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-2xl ring-1 ring-white/10">
        <Link to="/" className="group flex items-center gap-3 font-bold tracking-tight">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-800 text-white shadow-lg shadow-indigo-900/50 transition-transform group-hover:scale-105 group-active:scale-95">
            <Plane className="h-5 w-5 -rotate-45" aria-hidden />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-lg text-white">6E Studio</span>
            <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-brand-orange">Creative</span>
          </div>
        </Link>

        <div className="flex items-center gap-6">
          {!userSignedIn && (
            <Link to="/login" className="hidden text-sm font-bold text-white/70 transition hover:text-white sm:block">
              Sign In
            </Link>
          )}
          <Link
            to={userSignedIn ? '/projects' : '/login'}
            className="btn-orange text-sm"
          >
            <span>{userSignedIn ? 'Open Studio' : 'Get Started'}</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
