import { Link, useNavigate } from 'react-router-dom'
import { Plane, LogOut } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'

const navLinks = [
  { to: '/projects', label: 'Projects' },
  { to: '/explore', label: 'Explore' },
  { to: '/analytics', label: 'Analytics' },
]

export function TopNav() {
  const user = useAuthStore((s) => s.user)
  const signOut = useAuthStore((s) => s.signOut)
  const navigate = useNavigate()

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-6">
          <Link to="/projects" className="flex items-center gap-2 text-[#0C2340]">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0C2340] text-white">
              <Plane className="h-4 w-4" aria-hidden />
            </span>
            <span className="font-semibold tracking-tight">6E Creative Studio</span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-[#0C2340]"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex w-full shrink-0 items-center justify-between gap-4 sm:w-auto sm:justify-end">
          {user && (
            <div className="min-w-0 text-right text-sm">
              <p className="truncate font-medium text-gray-900">
                {user.name}{' '}
                <span className="font-normal text-gray-500">
                  ({user.role}, {user.department})
                </span>
              </p>
              <p className="truncate text-gray-500">{user.email}</p>
            </div>
          )}
          <button
            type="button"
            onClick={() => {
              signOut()
              navigate('/')
            }}
            className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
          >
            <LogOut className="h-4 w-4" aria-hidden />
            Sign out
          </button>
        </div>
      </div>
    </header>
  )
}
