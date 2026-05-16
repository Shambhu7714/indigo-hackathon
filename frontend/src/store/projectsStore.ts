import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Project } from '@/types'

interface ProjectsState {
  projects: Project[]
  addProject: (name: string) => Project
  removeProject: (id: string) => void
}

function seedProjects(): Project[] {
  const now = new Date().toISOString()
  return [
    { id: 'p-test', name: 'test', updatedAt: now },
    { id: 'p-summer', name: 'Summer destinations 2026', updatedAt: now },
  ]
}

export const useProjectsStore = create<ProjectsState>()(
  persist(
    (set, get) => ({
      projects: seedProjects(),
      addProject: (name) => {
        const project: Project = {
          id: `p-${crypto.randomUUID().slice(0, 8)}`,
          name: name.trim() || 'Untitled project',
          updatedAt: new Date().toISOString(),
        }
        set({ projects: [project, ...get().projects] })
        return project
      },
      removeProject: (id) => set({ projects: get().projects.filter((p) => p.id !== id) }),
    }),
    {
      name: '6e-creative-projects',
      partialize: (s) => ({ projects: s.projects.length ? s.projects : seedProjects() }),
    }
  )
)
