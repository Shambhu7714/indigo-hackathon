import { Link } from 'react-router-dom'
import { Plane } from 'lucide-react'

interface LandingNavProps {
  userSignedIn: boolean
}

/** Minimal bar — home is one canvas, no in-page section jumps. */
export function LandingNav({ userSignedIn }: LandingNavProps) {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:px-6">
      <div className="pointer-events-auto flex w-full max-w-7xl items-center justify-between rounded-2xl border border-white/50 bg-white/70 px-4 py-3 shadow-lg shadow-slate-900/5 backdrop-blur-xl supports-[backdrop-filter]:bg-white/55">
        <Link to="/" className="flex items-center gap-2.5 font-semibold tracking-tight text-[#0C2340]">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0C2340] text-white shadow-lg shadow-[#0C2340]/20">
            <Plane className="h-[18px] w-[18px]" aria-hidden />
          </span>
          <span className="text-[15px] sm:text-base">6E Creative Studio</span>
        </Link>
        <Link
          to={userSignedIn ? '/projects' : '/login'}
          className="rounded-xl bg-[#0C2340] px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#0C2340]/25 transition hover:bg-[#0a1c34]"
        >
          {userSignedIn ? 'Open studio' : 'Sign in'}
        </Link>
      </div>
    </header>
  )
}
