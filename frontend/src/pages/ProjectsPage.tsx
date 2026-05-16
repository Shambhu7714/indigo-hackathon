import { type FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FolderOpen, Plus } from 'lucide-react'
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
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
            <p className="mt-1 text-sm text-gray-600">Pick a campaign workspace or start a new one.</p>
          </div>
          <form onSubmit={create} className="flex w-full max-w-md flex-col gap-2 sm:flex-row sm:items-center">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="New project name"
              className="flex-1 rounded-lg border border-gray-300 px-3 py-2.5 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0C2340] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#0a1c34]"
            >
              <Plus className="h-4 w-4" />
              New project
            </button>
          </form>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <li key={p.id}>
              <Link
                to={`/projects/${p.id}`}
                className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:shadow-md"
              >
                <span className="rounded-lg bg-blue-50 p-3 text-blue-900">
                  <FolderOpen className="h-5 w-5" aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-gray-900">{p.name}</p>
                  <p className="mt-1 text-xs text-gray-500">
                    Updated {new Date(p.updatedAt).toLocaleString()}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </AppShell>
  )
}
