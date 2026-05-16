import { Link, useNavigate } from 'react-router-dom'
import { Plane, LogOut, LayoutGrid, BarChart3, Compass } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'

const navLinks = [
  { to: '/projects', label: 'Workspace', icon: LayoutGrid },
  { to: '/explore', label: 'Explore', icon: Compass },
  { to: '/analytics', label: 'Insights', icon: BarChart3 },
]

export function TopNav() {
  const user = useAuthStore((s) => s.user)
  const signOut = useAuthStore((s) => s.signOut)
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#020e4a]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-10">
          <Link to="/projects" className="group flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-800 text-white shadow-lg shadow-indigo-900/40 group-hover:scale-105 transition-transform">
              <Plane className="h-4.5 w-4.5 -rotate-45" />
            </div>
            <span className="font-black text-lg tracking-tighter text-white">6E Studio</span>
          </Link>
          
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-black uppercase tracking-widest text-white/40 transition-all hover:text-white hover:bg-white/5"
              >
                <l.icon className="h-3.5 w-3.5" />
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-6">
          {user && (
            <div className="hidden lg:flex flex-col items-end leading-tight">
              <span className="text-xs font-black text-white">{user.name}</span>
              <span className="text-[10px] font-bold text-brand-orange uppercase tracking-widest">{user.role}</span>
            </div>
          )}
          
          <button
            type="button"
            onClick={() => {
              signOut()
              navigate('/')
            }}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white/40 ring-1 ring-white/10 transition-all hover:text-brand-orange hover:bg-white/10"
            title="Sign Out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  )
}
