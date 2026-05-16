import { type FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FolderOpen, Plus, Clock, ArrowRight } from 'lucide-react'
import { AppShell } from '@/components/layout/AppShell'
import { useProjectsStore } from '@/store/projectsStore'

export function ProjectsPage() {
  const { projects, addProject } = useProjectsStore()
  const [name, setName] = useState('')
  const navigate = useNavigate()

  function create(e: FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    const p = addProject(name)
    setName('')
    navigate(`/projects/${p.id}`)
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="animate-slide-up">
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl">Campaign Fleet.</h1>
            <p className="mt-3 text-lg text-white/50">Manage your active creative orbits.</p>
          </div>
          
          <form onSubmit={create} className="flex w-full max-w-md gap-3 animate-slide-up delay-100">
            <div className="relative flex-1 group">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Campaign name..."
                className="w-full rounded-2xl border border-white/5 bg-white/5 py-4 px-5 text-sm text-white placeholder:text-white/20 focus:border-brand-orange/50 focus:outline-none focus:ring-4 focus:ring-brand-orange/5 transition-all"
              />
            </div>
            <button
              type="submit"
              className="btn-orange whitespace-nowrap px-8"
            >
              <Plus className="h-4 w-4" />
              <span>Launch</span>
            </button>
          </form>
        </div>

        {projects.length === 0 ? (
          <div className="mt-20 flex flex-col items-center justify-center rounded-[40px] border-2 border-dashed border-white/5 py-32 animate-fade-in delay-200">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/5 text-white/20">
              <FolderOpen className="h-10 w-10" />
            </div>
            <h3 className="mt-6 text-xl font-bold">No active campaigns.</h3>
            <p className="mt-2 text-white/40">Start by creating your first project above.</p>
          </div>
        ) : (
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 animate-fade-in delay-200">
            {projects.map((p, idx) => (
              <Link
                key={p.id}
                to={`/projects/${p.id}`}
                className="glass-card group relative p-8 flex flex-col h-full"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-brand-orange ring-1 ring-white/10 group-hover:scale-110 transition-transform">
                    <FolderOpen className="h-6 w-6" />
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-white/30 group-hover:text-brand-orange transition-colors">
                    <span>Studio</span>
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
                
                <h3 className="mt-8 text-2xl font-bold truncate group-hover:text-shimmer transition-all">
                  {p.name}
                </h3>
                
                <div className="mt-auto pt-8 flex items-center justify-between border-t border-white/5">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-white/30 uppercase tracking-widest">
                    <Clock className="h-3 w-3" />
                    <span>{new Date(p.updatedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-6 w-6 rounded-full border-2 border-[#020e4a] bg-indigo-800 flex items-center justify-center text-[8px] font-bold">
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  )
}
